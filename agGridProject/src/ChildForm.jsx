import React, { useState, useImperativeHandle, forwardRef } from "react";

const ChildForm = forwardRef((props, ref) => {
    const [localState, setLocalState] = useState({});

    const handleInputChange = (key, value) => {
        setLocalState((prev) => ({ ...prev, [key]: value }));
    };

    useImperativeHandle(ref, () => ({
        getValues: () => localState,
    }));

    return (
        <div>
            <input
                value={localState.field1 || ""}
                onChange={(e) => handleInputChange("field1", e.target.value)}
            />
            <input
                value={localState.field2 || ""}
                onChange={(e) => handleInputChange("field2", e.target.value)}
            />
        </div>
    );
});

export default ChildForm;
