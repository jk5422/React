import { Button } from 'antd';
import './App.css'
import SecondWordExtractor from './camelCaseExtractor';

function App() {
  console.log("hellon world.!");
  return (
    <div className="App">

      <Button type="primary">Button</Button>
    </div>
    <SecondWordExtractor />
  )
}

export default App
