import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Service from './components/Service'
import Navbar from './components/Navbar'
import PageNotFound from './components/PageNotFound'
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'

function App() {

  return (
    <>
      <h1>React Router V6</h1>

      {/* Navigations */}

      <BrowserRouter>
        <Navbar />
        <Routes>
          {/*<Route path='/home' element={<Home />} />*/}
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/service' element={<Service />} />
          <Route path='/user' element={<UserList />} />
          <Route path='/user/:userId' element={<UserProfile />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
