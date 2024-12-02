import handleCellUpdate from "./handleCellUpdate";

const firstGridDependencyMap = {
    grossWt: (data) => calculateNetWt(data, "netWt"),
    lessWt: (data) => calculateNetWt(data, "netWt"),
};

const editableFieldsFirstGrid = ["grossWt", "lessWt"];

const handleFirstGridChange = (event) => {
    const { rowIndex, colDef, newValue } = event;
    handleCellUpdate({
        rowData: lstitem,
        rowIndex,
        field: colDef.field,
        value: newValue,
        setRowData: setLstitem,
        dependencyMap: firstGridDependencyMap,
        editableFields: editableFieldsFirstGrid,
    });
};



/**
 * Updates a specific field in a row, calculates dependencies, and updates the grid state.
 * @param {Object} params - Parameters for the update.
 * @param {Array} params.rowData - The current state of the grid rows.
 * @param {Number} params.rowIndex - Index of the row being updated.
 * @param {String} params.field - The field being updated.
 * @param {Any} params.value - The new value for the field.
 * @param {Function} params.setRowData - The state setter function for the grid data.
 * @param {Object} params.dependencyMap - Map of fields to their dependency functions.
 * @param {Array} [params.editableFields] - Optional list of editable fields.
 */
const handleCellUpdate = ({
    rowData,
    rowIndex,
    field,
    value,
    setRowData,
    dependencyMap,
    editableFields = null,
}) => {
    // Check if the field is editable
    if (editableFields && !editableFields.includes(field)) {
        console.warn(`Field "${field}" is not editable.`);
        return;
    }

    // Clone the row being updated
    const updatedRow = { ...rowData[rowIndex], [field]: value };

    // Apply dependency calculations
    if (dependencyMap[field]) {
        Object.assign(updatedRow, dependencyMap[field](updatedRow));
    }

    // Replace the row in the data
    const updatedRowData = [...rowData];
    updatedRowData[rowIndex] = updatedRow;

    // Update the state
    setRowData(updatedRowData);
};

export default handleCellUpdate;
