import { useRef } from "react"
import ChildComponent from "./ChildComponent";

const ParentComponent = () => {
    const inputRef = useRef(true);
    console.log("ref in parent component", inputRef);

    const obj = {
        ref: inputRef
    }
    return (
        <div>
            Parent componennt
            <ChildComponent props={obj} />
        </div>
    )
}

export default ParentComponent
