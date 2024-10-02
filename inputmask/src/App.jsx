
import './App.css'
import EmailInputMask from './EmailValidation'
import RupeeInputMask from './Inputmask'
import ParentComponent from './ParentComponent'
import PercentageInputMask from './percentage'

function App() {

  return (
    <>
      <div>
        <h1>Input mask validation</h1>
        <RupeeInputMask />
        <EmailInputMask />
        <PercentageInputMask />
        <ParentComponent />
      </div>
    </>
  )
}

export default App
