import { useState } from 'react'
import './App.css'

function App() {

  // high order component
  const withCounter = (WrappedComponent) => {
    return function WithCounter() {
      const [count, setCount] = useState(0)
      const increment = () => {
        setCount(count + 1);
      }

      return (
        <WrappedComponent count={count} increment={increment} />
      )
    }
  }


  // functional component
  const Counter = ({ count, increment }) => {
    return (
      <div>
        <p>Count :- {count}</p>
        <button onClick={increment}>Increment</button>
      </div>
    );
  }


  // wrap counter with HOC function

  const CounterWithEnhancement = withCounter(Counter);


  return (
    <>
      <div>Higher Order Component</div>
      <CounterWithEnhancement />
    </>
  )
}

export default App
