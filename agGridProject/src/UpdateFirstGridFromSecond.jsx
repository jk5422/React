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

    // Calculate total lessWt from lstother and update lessWt in the first grid
    const totalLessWt = updatedLstother.reduce(
        (sum, row) => sum + (row.quantity || 0), // Use the appropriate column for lessWt
        0
    );

    // Update lessWt and recalculate dependent fields
    const updatedRowInFirstGrid = calculateDependenciesDynamic(
        { ...updatedLstitem[selectedRowIndex], lessWt: totalLessWt },
        "lessWt",
        totalLessWt
    );

    updatedLstitem[selectedRowIndex] = updatedRowInFirstGrid;
    setLstitem(updatedLstitem);
};
