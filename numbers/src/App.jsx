import './App.css'

function App() {
  const numbers = Array.from({ length: 100 }, (ignore_item, index) => index + 1);
  /* ignore_item variable iterate over  100 times in array every time ignore the item only work on index and then one by one increment */

  return (
    <div>
      <h1>Numbers from 1 to 100:</h1>
      <ul>
        {numbers.map(number => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
