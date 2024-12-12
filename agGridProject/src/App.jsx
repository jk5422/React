import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ParentForm from "./ParentForm";

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
        totalOtherAmount: 18, // Precomputed
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
        totalOtherAmount: 14, // Precomputed
      },
    ],
  });

  const [lstitem, setLstitem] = useState(addEdit.lstitem || []);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [lstother, setLstother] = useState(lstitem[0]?.lstother || []);

  // Totals row data for first grid
  const pinnedBottomRowDataFirstGrid = useMemo(() => {
    return [
      {
        itemName: "Totals",
        grossWt: lstitem.reduce((sum, row) => sum + (row.grossWt || 0), 0),
        lessWt: lstitem.reduce((sum, row) => sum + (row.lessWt || 0), 0),
        netWt: lstitem.reduce((sum, row) => sum + (row.netWt || 0), 0),
        totalOtherAmount: lstitem.reduce(
          (sum, row) => sum + (row.totalOtherAmount || 0),
          0
        ),
        grandTotal: lstitem.reduce(
          (sum, row) =>
            sum + ((row.netWt || 0) - (row.totalOtherAmount || 0)),
          0
        ),
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
    { field: "itemName", editable: (params) => !(params.node.rowPinned) },
    { field: "grossWt", editable: (params) => !(params.node.rowPinned) },
    { field: "lessWt", editable: (params) => !(params.node.rowPinned) },
    { field: "netWt", editable: false },
    {
      field: "totalOtherAmount",
      headerName: "Total Other Amount",
      editable: false,
    },
    {
      field: "grandTotal",
      headerName: "Grand Total",
      editable: false,
      valueGetter: (params) =>
        params.node.rowPinned
          ? null
          : (params.data.netWt || 0) - (params.data.totalOtherAmount || 0),
    },
    {
      field: "isOther",
      cellRenderer: "agCheckboxCellRenderer",
      editable: true,
      valueGetter: (params) =>
        params.node.rowPinned ? null : params.data?.isOther || false,
      cellStyle: (params) => (params.node.rowPinned ? { display: "none" } : null),
    },
  ];

  // Second grid column definitions
  const secondGridColumnDefs = [
    { field: "otherName", editable: (params) => !(params.node.rowPinned) },
    { field: "rate", editable: (params) => !(params.node.rowPinned) },
    { field: "quantity", editable: (params) => !(params.node.rowPinned) },
    { field: "amount", editable: false },
  ];

  // Handle row selection in the first grid
  const handleRowSelection = (rowIndex) => {
    setSelectedRowIndex(rowIndex);
    setLstother(lstitem[rowIndex]?.lstother || []);
  };

  // Handle key navigation in the first grid
  const handleCellFocused = (event) => {
    const { rowIndex } = event;
    handleRowSelection(rowIndex);
  };

  // Handle row click in the first grid
  const handleRowClicked = (event) => {
    handleRowSelection(event.rowIndex);
  };

  // Handle changes in the first grid
  const handleFirstGridChange = (event) => {
    const { rowIndex, colDef, newValue, data } = event;
    const validatedValue = newValue; // Add validation logic if needed

    // Update the modified row
    const updatedRow = { ...data, [colDef.field]: validatedValue };

    // Recalculate totalOtherAmount if lstother changes
    if (colDef.field === "lstother") {
      updatedRow.totalOtherAmount = (updatedRow.lstother || []).reduce(
        (sum, other) => sum + (other.amount || 0),
        0
      );
    }

    const updatedLstitem = [...lstitem];
    updatedLstitem[rowIndex] = updatedRow;
    setLstitem(updatedLstitem);
  };

  const handleSecondGridChange = (event) => {
    const { rowIndex, colDef, newValue, data } = event;

    // Update the changed field in lstother
    const updatedRow = { ...data, [colDef.field]: newValue };

    // Recalculate the amount field if rate or quantity changes
    if (colDef.field === "rate" || colDef.field === "quantity") {
      const rate = parseFloat(updatedRow.rate || 0);
      const quantity = parseFloat(updatedRow.quantity || 0);
      updatedRow.amount = rate * quantity; // Calculate amount
    }

    // Update the lstother array
    const updatedLstother = [...lstother];
    updatedLstother[rowIndex] = updatedRow;
    setLstother(updatedLstother);

    // Update the lstitem array
    const updatedLstitem = [...lstitem];
    const selectedRow = updatedLstitem[selectedRowIndex];
    selectedRow.lstother = updatedLstother;

    // Recalculate totalOtherAmount for the selected row
    selectedRow.totalOtherAmount = updatedLstother.reduce(
      (sum, row) => sum + (row.amount || 0),
      0
    );

    // Recalculate grandTotal for the selected row
    selectedRow.grandTotal =
      (selectedRow.netWt || 0) - (selectedRow.totalOtherAmount || 0);

    setLstitem(updatedLstitem);
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
        domLayout="autoHeight"
      />

      <h3>Second Grid (lstother)</h3>
      <AgGridReact
        rowData={lstother}
        columnDefs={secondGridColumnDefs}
        singleClickEdit={true}
        onCellValueChanged={handleSecondGridChange}
        pinnedBottomRowData={pinnedBottomRowDataSecondGrid}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default App;
