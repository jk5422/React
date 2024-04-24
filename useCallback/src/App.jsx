import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  console.log("parent component rendered..!");

  return (
    <>
      <h1>useCallback Hook</h1>
      <p>count : {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  )
}

export default App
