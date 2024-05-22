import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Layout from './components/Layout'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import { createContext, useState } from 'react'

export const GlobalInfo = createContext();

function App() {

  const [users, setUsers] = useState([]);

  return (
    <>
      <GlobalInfo.Provider value={{ users: users, setUsers: setUsers }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<Welcome />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/*' element={<h1>Page not found..!</h1>} />

            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalInfo.Provider>
    </>
  )
}

export default App
