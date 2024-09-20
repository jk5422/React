import { useCallback, useState } from 'react';
import './App.css'
import Select from 'react-select'

function App() {
  const [inputValue, setInputValue] = useState('');

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  // API call function
  const fetchData = (inputValue) => {
    // Replace this with your API call logic
    console.log('Fetching data for:', inputValue);
  };

  // Debounced API call
  const debouncedFetchData = useCallback(
    debounce((value) => {
      if (value.trim() !== '') {  // Skip API call if value is empty
        fetchData(value);
      }
    }, 800), // 500ms debounce delay
    []
  );

  const handleInputChange = (value) => {
    setInputValue(value);
    debouncedFetchData(value);
  };
  return (
    <>
      <Select
        onInputChange={handleInputChange}
        inputValue={inputValue}
        placeholder="Type to search..."
      />
    </>
  )
}

export default App
