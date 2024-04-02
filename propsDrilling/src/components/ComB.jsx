import ComC from "./ComC"

function ComB({ name }) {
    return (
        <>
            <h1>
                component B
            </h1>
            <ComC name={name} />
        </>
    )
}

export default ComB
