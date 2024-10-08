import React, { useState } from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import '@progress/kendo-theme-default/dist/all.css'; // Import Kendo UI styles
import CustomDatePicker from './DatePickerManual';
import DatePickerOutSide from './DatePickerCustom';
import DatePickerWithClient from './DatePickerWithClient';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (e) => {
    setSelectedDate(e.value);
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      console.log('No date selected');
      // API call with null or empty value
      apiCall({ date: null });
    } else {
      const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB');
      apiCall({ date: formattedDate });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <DatePickerWithClient />
      <h2>Kendo DatePicker in Vite</h2>

      <DatePickerOutSide />
      <h2>Kendo DatePicker in Vite</h2>

      <CustomDatePicker />
      <h2>Kendo DatePicker in Vite</h2>

      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        format="dd/MM/yyyy"
        placeholder="Select a date"
      />
      <button onClick={handleSubmit} style={{ marginTop: '10px' }}>Submit</button>
    </div>
  );
};

const apiCall = (data) => {
  console.log('API call with data:', data);
};

export default App;
