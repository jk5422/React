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
                otherTotalAmount: 18, // Initial total amount
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
                otherTotalAmount: 14, // Initial total amount
            },
        ],
    });

    const [lstitem, setLstitem] = useState(addEdit.lstitem || []);
    const [selectedRowIndex, setSelectedRowIndex] = useState(0);
    const [lstother, setLstother] = useState(lstitem[0]?.lstother || []);

    // Calculation functions
    const calculateNetWt = (data, outputFiled = "netWt") => {
        const { grossWt = 0, lessWt = 0 } = data || {};
        return { [outputFiled]: grossWt - lessWt };
    };

    const calculateAmount = (data, outputFiled = "amount") => {
        const { rate = 0, quantity = 0 } = data || {};
        return { [outputFiled]: rate * quantity };
    };

    const calculateOtherTotal = (lstother) => {
        return lstother.reduce((sum, item) => sum + (item.amount || 0), 0);
    };

    // Dependency map
    const dependencyMap = {
        grossWt: (data) => calculateNetWt(data, "netWt"),
        lessWt: (data) => calculateNetWt(data, "netWt"),
        rate: (data) => calculateAmount(data, "amount"),
        quantity: (data) => calculateAmount(data, "amount"),
    };

    const calculateDependenciesDynamic = (data, field, value) => {
        const updatedData = { ...data, [field]: value };
        if (dependencyMap[field]) {
            return { ...updatedData, ...dependencyMap[field](updatedData) };
        }
        return updatedData;
    };

    const pinnedBottomRowDataFirstGrid = useMemo(() => {
        return [
            {
                itemName: "Totals",
                grossWt: lstitem.reduce((sum, row) => sum + (row.grossWt || 0), 0),
                lessWt: lstitem.reduce((sum, row) => sum + (row.lessWt || 0), 0),
                netWt: lstitem.reduce((sum, row) => sum + (row.netWt || 0), 0),
                otherTotalAmount: lstitem.reduce(
                    (sum, row) => sum + (row.otherTotalAmount || 0),
                    0
                ),
                editable: false,
            },
        ];
    }, [lstitem]);

    const pinnedBottomRowDataSecondGrid = useMemo(() => {
        return [
            {
                otherName: "Totals",
                amount: lstother.reduce((sum, row) => sum + (row.amount || 0), 0),
            },
        ];
    }, [lstother]);

    const handleRowSelection = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
        setLstother(lstitem[rowIndex]?.lstother || []);
    };

    const handleCellFocused = (event) => {
        const { rowIndex } = event;
        handleRowSelection(rowIndex);
    };

    const handleRowClicked = (event) => {
        handleRowSelection(event.rowIndex);
    };

    const handleFirstGridChange = (event) => {
        const { rowIndex, colDef, newValue, data } = event;
        const validatedValue = newValue;
        const updatedRow = calculateDependenciesDynamic(data, colDef.field, validatedValue);

        const updatedLstitem = [...lstitem];
        updatedLstitem[rowIndex] = updatedRow;
        setLstitem(updatedLstitem);
    };

    const handleSecondGridChange = (event) => {
        const { rowIndex, colDef, newValue, data } = event;
        const validatedValue = newValue;
        const updatedRow = calculateDependenciesDynamic(data, colDef.field, validatedValue);

        const updatedLstother = [...lstother];
        updatedLstother[rowIndex] = updatedRow;
        setLstother(updatedLstother);

        // Update lstitem for the selected row
        const updatedLstitem = [...lstitem];
        const otherTotal = calculateOtherTotal(updatedLstother); // Recalculate total
        updatedLstitem[selectedRowIndex] = {
            ...updatedLstitem[selectedRowIndex],
            lstother: updatedLstother,
            otherTotalAmount: otherTotal,
        };

        // Recalculate first grid data
        setLstitem(updatedLstitem);
    };

    const handleSubmit = () => {
        const updatedAddEdit = {
            ...addEdit,
            lstitem,
        };
        console.log("Form data to be submitted:", updatedAddEdit);
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
            <h3>First Grid (lstitem)</h3>
            <AgGridReact
                rowData={lstitem}
                columnDefs={[
                    { field: "itemName", editable: true },
                    { field: "grossWt", editable: true },
                    { field: "lessWt", editable: true },
                    { field: "netWt", editable: false },
                    { field: "otherTotalAmount", editable: false },
                ]}
                singleClickEdit={true}
                onCellFocused={handleCellFocused}
                onRowClicked={handleRowClicked}
                onCellValueChanged={handleFirstGridChange}
                pinnedBottomRowData={pinnedBottomRowDataFirstGrid}
            />

            <h3>Second Grid (lstother)</h3>
            <AgGridReact
                rowData={lstother}
                columnDefs={[
                    { field: "otherName", editable: true },
                    { field: "rate", editable: true },
                    { field: "quantity", editable: true },
                    { field: "amount", editable: false },
                ]}
                singleClickEdit={true}
                onCellValueChanged={handleSecondGridChange}
                pinnedBottomRowData={pinnedBottomRowDataSecondGrid}
            />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default App;
