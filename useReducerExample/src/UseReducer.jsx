import { useReducer } from "react";

const initialState = 0;

// reducer function takes two args one for current state and one is action
const reducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }

}

const UseReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    /* intialstate goes into state and dispatch function is providing feature for update the state */
    return (

        <div>
            <p>{state}</p>
            <div>
                <button onClick={() => dispatch({ type: "INCREMENT" })}>INC</button>
                <button onClick={() => dispatch({ type: "DECREMENT" })}>DEC</button>
            </div>
        </div>

    )
}

export default UseReducer;