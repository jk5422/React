import './App.css'

import DebouncedSearchBar from 'react-debounced-searchbar';

function App() {

  return (
    <>
      <div>
        <DebouncedSearchBar delay={750} callback={(val) => {
          console.log(val);
        }} />
      </div>
    </>
  )
}

export default App
