
import './App.css'
import DynamicPercentage from './DynamicPercentage'
import EmailInputMask from './EmailValidation'
import AdvancedCalendar from './InputDatePicker'
import RupeeInputMask from './Inputmask'
import MobileNumberInput from './MobileInputmask'
// import PANCardInputMask from './PanCard'
import PercentageInputMask from './percentage'
import StandardDatePicker from './StandardDatepicker'

function App() {

  return (
    <>
      <div>
        <h1>Amount mask validation</h1>
        <StandardDatePicker />

        <h1>Amount mask validation</h1>
        <RupeeInputMask />
        <h1>Email mask validation</h1>

        <EmailInputMask />
        <h1>Percentage mask validation</h1>

        <PercentageInputMask />
        {/*<ParentComponent />*/}
        <h1>Pancard mask validation</h1>

        {/* <PANCardInputMask /> */}

        <h1>Percentage Dynamic mask validation</h1>
        <DynamicPercentage />

        <h1>Mobile mask validation</h1>
        <MobileNumberInput />

        <h1>Date Picker</h1>
        <AdvancedCalendar />
      </div>
    </>
  )
}

export default App
