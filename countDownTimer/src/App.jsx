import './App.css'
import CountdownTimer from './CountdownTimer'

function App() {
  console.log("App jsx render")
  return (
    <div>
      <h1>Countdown Timer</h1>
      <CountdownTimer initialMinutes={5} />
    </div>
  )
}

export default App
