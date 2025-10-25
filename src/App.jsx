import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProjectList from './pages/ProjectList'
import { ToastContainer } from 'react-toastify'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <ToastContainer position="top-right" theme="colored" />

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/pro' element={<ProjectList/>}/>
      </Routes>
    </>
  )
}

export default App
