import React, { useRef, useCallback } from "react";
import ChildForm from "./ChildForm";

const ParentForm = () => {
    const childRef1 = useRef(null);
    const childRef2 = useRef(null);
    const childRef3 = useRef(null);
    const childRef4 = useRef(null);

    const handleSubmit = useCallback(() => {
        const values = {
            ...childRef1.current?.getValues(),
            ...childRef2.current?.getValues(),
            ...childRef3.current?.getValues(),
            ...childRef4.current?.getValues(),
        };
        console.log("Final Form Values:", values);
        // Send `values` to API or perform any action.
    }, []);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <ChildForm ref={childRef1} />
            <ChildForm ref={childRef2} />
            <ChildForm ref={childRef3} />
            <ChildForm ref={childRef4} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ParentForm;
