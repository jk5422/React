import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Layout from './components/Layout'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'

function App() {

  return (
    <>
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
    </>
  )
}

export default App
