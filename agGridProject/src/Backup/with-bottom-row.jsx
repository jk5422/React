import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const App = () => {
    const [addEdit, setAddEdit] = useState({
        voucherNo: 123,
        daybookName: "",
        lstitem: [
            {
                itemName: "Item 1",
                grossWt: 20,
                lessWt: 5,
                netWt: 15,
                isOther: true,
                lstother: [
                    { otherName: "Other Item 1A", rate: 2, quantity: 5, amount: 10 },
                    { otherName: "Other Item 1B", rate: 4, quantity: 2, amount: 8 },
                ],
            },
            {
                itemName: "Item 2",
                grossWt: 30,
                lessWt: 10,
                netWt: 20,
                isOther: true,
                lstother: [
                    { otherName: "Other Item 2A", rate: 3, quantity: 3, amount: 9 },
                    { otherName: "Other Item 2B", rate: 5, quantity: 1, amount: 5 },
                ],
            },
        ],
    });

    const [lstitem, setLstitem] = useState(addEdit.lstitem || []);
    const [selectedRowIndex, setSelectedRowIndex] = useState(0);
    const [lstother, setLstother] = useState(lstitem[0]?.lstother || []);


    // Calculation functions
    const calculateNetWt = (data, outputFiled = 'netWt') => {
        const {
            grossWt = 0,
            lessWt = 0,
        } = data || {};
        return { [outputFiled]: grossWt - lessWt }
    };
    const calculateAmount = (data, outputFiled = 'amount') => {
        const {
            rate = 0,
            quantity = 0,
        } = data || {};

        return { [outputFiled]: rate * quantity }
    };


    // Utility to calculate dependent fields dynamically
    // Dependency map referencing functions
    const dependencyMap = {
        grossWt: (data) => calculateNetWt(data, "netWt"), // Calls calculateNetWt function
        lessWt: (data) => calculateNetWt(data, "netWt"),  // Same function handles grossWt and lessWt
        rate: (data) => calculateAmount(data, 'amount'),   // Calls calculateAmount function
        quantity: (data) => calculateAmount(data, 'amount'), // Same function handles rate and quantity
    };


    // Dynamic calculation function
    const calculateDependenciesDynamic = (data, field, value) => {
        const updatedData = { ...data, [field]: value };
        if (dependencyMap[field]) {
            return { ...updatedData, ...dependencyMap[field](updatedData) };
        }
        return updatedData;
    };


    // Totals row data for first grid
    const pinnedBottomRowDataFirstGrid = useMemo(() => {
        return [
            {
                itemName: "Totals",
                grossWt: lstitem.reduce((sum, row) => sum + (row.grossWt || 0), 0),
                lessWt: lstitem.reduce((sum, row) => sum + (row.lessWt || 0), 0),
                netWt: lstitem.reduce((sum, row) => sum + (row.netWt || 0), 0),
                editable: false,
            },
        ];
    }, [lstitem]);

    // Totals row data for second grid
    const pinnedBottomRowDataSecondGrid = useMemo(() => {
        return [
            {
                otherName: "Totals",
                amount: lstother.reduce((sum, row) => sum + (row.amount || 0), 0),
            },
        ];
    }, [lstother]);

    // First grid column definitions
    const firstGridColumnDefs = [
        { field: "itemName", editable: (params) => !(params.node.rowPinned), suppressAggregation: true },
        { field: "grossWt", editable: (params) => !(params.node.rowPinned), aggFunc: "sum" },
        { field: "lessWt", editable: (params) => !(params.node.rowPinned), aggFunc: "sum" },
        { field: "netWt", editable: false, aggFunc: "sum" },
        {
            field: "isOther",
            cellRenderer: "agCheckboxCellRenderer",
            editable: true,
            suppressAggregation: true,
            valueGetter: (params) => {
                if (params.node.rowPinned) return null; // Suppress checkbox value in totals row
                return params.data?.isOther || false;
            },
            cellEditorSelector: (params) => {
                if (params.node.rowPinned) return null; // No editor for pinned rows
                return { component: "agCheckboxCellRenderer" };
            },
            onCellClicked: (params) => {
                if (!params.node.rowPinned) {
                    params.api.startEditingCell({
                        rowIndex: params.rowIndex,
                        colKey: "isOther",
                    });
                }
            },
            cellRendererParams: {
                checkbox: true, // Ensure checkbox renders correctly
            },
            cellRendererSelector: (params) => {
                if (params.node.rowPinned) return null; // No renderer for pinned rows
                return { component: "agCheckboxCellRenderer" };
            },
            cellStyle: (params) => {
                // Apply styles to hide checkbox in totals row
                return params.node.rowPinned ? { display: "none" } : null;
            },
        },
    ];

    // Second grid column definitions
    const secondGridColumnDefs = [
        { field: "otherName", editable: (params) => !(params.node.rowPinned), suppressAggregation: true },
        { field: "rate", editable: (params) => !(params.node.rowPinned), suppressAggregation: true },
        { field: "quantity", editable: (params) => !(params.node.rowPinned), suppressAggregation: true },
        { field: "amount", editable: false, aggFunc: "sum" },
    ];

    const isRowEditable = (params) => {
        if (params.node.rowPinned) {
            return false; // Disable editing for totals row explicitly
        }
        return true; // Allow editing for other rows
    };

    // Handle row selection in the first grid
    const handleRowSelection = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
        setLstother(lstitem[rowIndex]?.lstother || []);
    };

    // Handle key navigation in the first grid
    const handleCellFocused = (event) => {
        const { rowIndex } = event;
        handleRowSelection(rowIndex);
        setLstother(lstitem[rowIndex]?.lstother || []);

    };

    // Handle row click in the first grid
    const handleRowClicked = (event) => {
        handleRowSelection(event.rowIndex);
    };

    // Handle changes in the first grid
    const handleFirstGridChange = (event) => {
        console.log(event, "handleFirstGridChange")
        const { rowIndex, colDef, newValue, data } = event;
        const validatedValue = newValue; // Add validation logic if needed
        const updatedRow = calculateDependenciesDynamic(data, colDef.field, validatedValue);

        const updatedLstitem = [...lstitem];
        updatedLstitem[rowIndex] = updatedRow;
        setLstitem(updatedLstitem);
    };

    // Handle changes in the second grid
    const handleSecondGridChange = (event) => {
        const { rowIndex, colDef, newValue, data } = event;
        const validatedValue = newValue; // Add validation logic if needed
        const updatedRow = calculateDependenciesDynamic(data, colDef.field, validatedValue);

        const updatedLstother = [...lstother];
        updatedLstother[rowIndex] = updatedRow;
        setLstother(updatedLstother);

        // Update lstitem for the selected row
        const updatedLstitem = [...lstitem];
        updatedLstitem[selectedRowIndex].lstother = updatedLstother;
        setLstitem(updatedLstitem);
    };


    // Handle form submission
    const handleSubmit = () => {
        const updatedAddEdit = {
            ...addEdit,
            lstitem,
        };
        console.log("Form data to be submitted:", updatedAddEdit);

        // Example API call:
        // fetch('/api/save', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(updatedAddEdit),
        // })
        //   .then(response => response.json())
        //   .then(data => console.log("Data saved successfully!", data))
        //   .catch(error => console.error("Error saving data:", error));
    };




    return (
        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
            <h3>First Grid (lstitem)</h3>
            <AgGridReact
                rowData={lstitem}
                columnDefs={firstGridColumnDefs}
                singleClickEdit={true}
                onCellFocused={handleCellFocused}
                onRowClicked={handleRowClicked}
                onCellValueChanged={handleFirstGridChange}
                pinnedBottomRowData={pinnedBottomRowDataFirstGrid}
                enableCellTextSelection={true}
                isRowEditable={isRowEditable}
                suppressAggFuncInHeader={true}
                domLayout="autoHeight"

            />

            <h3>Second Grid (lstother)</h3>
            <AgGridReact
                rowData={lstother}
                columnDefs={secondGridColumnDefs}
                singleClickEdit={true}
                domLayout="autoHeight"
                onCellValueChanged={handleSecondGridChange}
                pinnedBottomRowData={pinnedBottomRowDataSecondGrid}
                enableCellTextSelection={true}
                isRowEditable={isRowEditable}
            />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default App;
