import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

const App = () => {
    const [lstitem, setLstitem] = useState([
        { itemName: "", grossWt: 0, lessWt: 0, netWt: 0, isOther: false },
    ]);
    const [lstother, setLstother] = useState([
        { taxRate: 0, additionalCharge: 0, remarks: "" },
    ]);

    let firstGridApi = null;
    let secondGridApi = null;

    const firstGridColumnDefs = [
        {
            field: "itemName",
            editable: true,
            validationRules: [{ required: true, message: "Item Name is required" }],
        },
        {
            field: "grossWt",
            editable: true,
            validationRules: [
                { required: true, message: "Gross Weight is required" },
                { isNumeric: true, message: "Gross Weight must be a number" },
            ],
        },
        { field: "lessWt", editable: true, validationRules: [] },
        { field: "netWt", editable: false, validationRules: [] },
    ];

    const secondGridColumnDefs = [
        {
            field: "taxRate",
            editable: true,
            validationRules: [
                { required: true, message: "Tax Rate is required" },
                { isNumeric: true, message: "Tax Rate must be a number" },
            ],
        },
        {
            field: "additionalCharge",
            editable: true,
            validationRules: [
                { required: true, message: "Additional Charge is required" },
                { isNumeric: true, message: "Must be a number" },
            ],
        },
        {
            field: "remarks",
            editable: true,
            validationRules: [{ required: true, message: "Remarks are required" }],
        },
    ];

    // Validation function for a single row
    const validateRow = (rowData, columnDefs) => {
        for (const colDef of columnDefs) {
            const rules = colDef.validationRules || [];
            for (const rule of rules) {
                if (rule.required && !rowData[colDef.field]) {
                    return { isValid: false, field: colDef.field, message: rule.message };
                }
                if (rule.isNumeric && isNaN(rowData[colDef.field])) {
                    return { isValid: false, field: colDef.field, message: rule.message };
                }
            }
        }
        return { isValid: true };
    };

    // Validate all rows of a grid
    const validateAllRows = (rowData, columnDefs, gridApi) => {
        for (let i = 0; i < rowData.length; i++) {
            const row = rowData[i];
            const validationResult = validateRow(row, columnDefs);
            if (!validationResult.isValid) {
                gridApi.ensureIndexVisible(i);
                gridApi.setFocusedCell(i, validationResult.field);
                alert(`Validation Error: ${validationResult.message}`);
                return false;
            }
        }
        return true;
    };

    // Add new row with validation
    const handleAddRow = () => {
        const isValid = validateAllRows(lstitem, firstGridColumnDefs, firstGridApi);
        if (!isValid) return;

        setLstitem([
            ...lstitem,
            { itemName: "", grossWt: 0, lessWt: 0, netWt: 0, isOther: false },
        ]);
    };

    // Submit both grids after validation
    const handleSubmit = () => {
        const isFirstGridValid = validateAllRows(lstitem, firstGridColumnDefs, firstGridApi);
        const isSecondGridValid = validateAllRows(lstother, secondGridColumnDefs, secondGridApi);

        if (!isFirstGridValid || !isSecondGridValid) return;

        alert("All data is valid. Submitting...");
        // Submit logic
        console.log("First Grid Data:", lstitem);
        console.log("Second Grid Data:", lstother);
    };

    return (
        <div>
            <h3>First Grid</h3>
            <div className="ag-theme-alpine" style={{ height: 200, width: "100%" }}>
                <AgGridReact
                    rowData={lstitem}
                    columnDefs={firstGridColumnDefs}
                    domLayout="autoHeight"
                    onGridReady={(params) => (firstGridApi = params.api)}
                    defaultColDef={{ editable: true }}
                />
            </div>
            <button onClick={handleAddRow}>Add Row</button>

            <h3>Second Grid</h3>
            <div className="ag-theme-alpine" style={{ height: 200, width: "100%" }}>
                <AgGridReact
                    rowData={lstother}
                    columnDefs={secondGridColumnDefs}
                    domLayout="autoHeight"
                    onGridReady={(params) => (secondGridApi = params.api)}
                    defaultColDef={{ editable: true }}
                />
            </div>

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default App;
