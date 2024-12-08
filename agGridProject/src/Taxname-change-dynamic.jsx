import React, { useState, useEffect } from "react";

const InwardGrid = () => {
    const [colDefs, setColDefs] = useState([
        { field: "TaxPrc1", headerName: "Tax % 1" },
        { field: "TaxPrc2", headerName: "Tax % 2" },
        { field: "TaxPrc3", headerName: "Tax % 3" },
        { field: "TaxAmount1", headerName: "Tax Amount 1" },
        { field: "TaxAmount2", headerName: "Tax Amount 2" },
        { field: "TaxAmount3", headerName: "Tax Amount 3" },
        // Add other columns as needed
    ]);

    const [apiTaxTypes, setApiTaxTypes] = useState(null);

    useEffect(() => {
        // Mock API call
        const fetchTaxNames = async () => {
            const apiResponse = {
                tax1name: "GST",
                tax2name: "VAT",
                tax3name: "Service Tax",
                // Add more tax names as per the API response
            };

            setApiTaxTypes(apiResponse);

            // Update colDefs dynamically based on the API response
            setColDefs((prevColDefs) =>
                prevColDefs.map((col) => {
                    if (col.field.startsWith("TaxPrc")) {
                        const index = col.field.replace("TaxPrc", ""); // Get the index (1, 2, 3, ...)
                        return {
                            ...col,
                            headerName: apiResponse[`tax${index}name`] || col.headerName,
                        };
                    }
                    if (col.field.startsWith("TaxAmount")) {
                        const index = col.field.replace("TaxAmount", ""); // Get the index (1, 2, 3, ...)
                        return {
                            ...col,
                            headerName: `Amount for ${apiResponse[`tax${index}name`] || "Unknown Tax"}`,
                        };
                    }
                    return col; // Keep other columns unchanged
                })
            );
        };

        fetchTaxNames();
    }, []);

    return (
        <div>
            <h3>Inward Grid</h3>
            {/* Render grid or debug column definitions */}
            <pre>{JSON.stringify(colDefs, null, 2)}</pre>
        </div>
    );
};

export default InwardGrid;
