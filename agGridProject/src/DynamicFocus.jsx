import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const App = () => {
    const [lstitem, setLstitem] = useState([
        { itemName: "Item 1", grossWt: 20, lessWt: 5, netWt: 15 },
        { itemName: "Item 2", grossWt: 30, lessWt: 10, netWt: 20 },
    ]);

    // First grid column definitions
    const firstGridColumnDefs = useMemo(() => [
        { field: "itemName", editable: true },
        { field: "grossWt", editable: true },
        { field: "lessWt", editable: true },
        {
            field: "netWt",
            editable: false,
            cellRenderer: CustomComponent, // Custom component in cell
        },
    ], []);

    // Dynamic Navigation Function
    const navigateToCell = (params, direction) => {
        const { columnApi, api, rowIndex } = params;
        const allColumns = columnApi.getAllColumns();
        const currentColIndex = allColumns.findIndex(
            (col) => col.getColId() === params.column.getColId()
        );

        let nextColIndex = direction === "next" ? currentColIndex + 1 : currentColIndex - 1;

        while (nextColIndex >= 0 && nextColIndex < allColumns.length) {
            const nextCol = allColumns[nextColIndex];
            const colDef = nextCol.getColDef();

            // Check if cell is editable or has a custom component
            if (colDef.editable || colDef.cellRenderer) {
                api.stopEditing(); // Stop current editing
                api.setFocusedCell(rowIndex, nextCol.getColId()); // Set focus on the next cell
                api.startEditingCell({
                    rowIndex,
                    colKey: nextCol.getColId(),
                });
                return;
            }
            nextColIndex = direction === "next" ? nextColIndex + 1 : nextColIndex - 1;
        }
    };

    // Handle key press events
    const handleKeyPress = (params) => {
        const { event } = params;
        if (event.key === "Enter") {
            navigateToCell(params, "next"); // Navigate to the next cell
        } else if (event.key === "Tab" && event.shiftKey) {
            navigateToCell(params, "previous"); // Navigate to the previous cell
        }
    };

    // Custom component renderer for cells
    const CustomComponent = (params) => {
        return <button onClick={() => alert(`Custom component in ${params.value}`)}>Click</button>;
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
            <h3>First Grid (lstitem)</h3>
            <AgGridReact
                rowData={lstitem}
                columnDefs={firstGridColumnDefs}
                singleClickEdit={true}
                onCellValueChanged={(event) => {
                    // Handle changes in the first grid
                    const { rowIndex, colDef, newValue, data } = event;
                    const updatedLstitem = [...lstitem];
                    updatedLstitem[rowIndex] = { ...data, [colDef.field]: newValue };
                    setLstitem(updatedLstitem);
                }}
                onKeyDown={handleKeyPress} // Capture key press events
            />
        </div>
    );
};

export default App;
