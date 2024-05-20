import { useMemo, useState } from 'react'
import './App.css'

function App() {

  const [count, setCount] = useState(0);
  const [item, setItem] = useState(10);

  const multiCountMemo = useMemo(() => {
    console.log("MultiCount");
    return count * 5;
  }, [count])

  return (
    <>
      <h1>UseMemoHook in React</h1>
      <h2>count :- {count}</h2>
      <h2>Item :- {item}</h2>
      <h2>{multiCountMemo}</h2>
      <button onClick={() => setCount(count + 1)}>Update Count</button>
      <button onClick={() => setItem(item + 1)}>Update Item</button>

    </>
  )
}

export default App
