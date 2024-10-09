
import './App.css'
import EmailInputMask from './EmailValidation'
import RupeeInputMask from './Inputmask'
import PANCardInputMask from './PanCard'
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
        <PANCardInputMask />
      </div>
    </>
  )
}

export default App
