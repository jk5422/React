import { createContext } from "react"
import ComB from "./ComB"

function ComA() {
    const bioData = createContext();
    return (
        <>
            <h1>
                component A
            </h1>
            <ComB name={'Jaimin'} />
        </>
    )
}

export default ComA
