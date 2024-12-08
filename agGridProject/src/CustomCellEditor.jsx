function CustomCellEditor(props) {
    const { value, column, api, node, closeEditor } = props;

    const handleValueChange = (e) => {
        const newValue = e.target.value;

        // Update the value in the grid directly
        api.getRowNode(node.id).setDataValue(column.colId, newValue);

        // Trigger recalculation logic
        const updatedRow = calculateRowData(node.data, 'InwardGrid');

        let updatedLstItemData = [...lstitemData];
        updatedLstItemData[node.rowIndex] = { ...updatedRow, ['SrNo']: (node.rowIndex + 1) };
        setLstItemData(updatedLstItemData);

        // Recalculate totals
        setTotalOfItemGrid(); // Recalculate totals for the first grid
        calculateGrandTotal(); // Recalculate grand total

        closeEditor(); // Close the custom editor
    };

    return (
        <input
            value={value}
            onBlur={handleValueChange} // Or another event like onChange depending on your use case
        />
    );
}
