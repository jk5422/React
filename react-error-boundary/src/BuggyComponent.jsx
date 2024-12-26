import React, { useState } from "react";

const BuggyComponent = () => {
    const [count, setCount] = useState(0);

    if (count === 3) {
        throw new Error("Counter reached 3 and caused an error!");
    }

    return (
        <div>
            <h2>Increment Counter:</h2>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
};

export default BuggyComponent;
