import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './paths/Login'
import Prodcart from './paths/Prodcart'
import Register from './paths/Register'
import Home from './paths/Home'


function App() {

  return (
    <>
      <Routes>

        <Route path='/' Component={Login}/>
        <Route path='/cart' Component={Prodcart}/>
        <Route path='/register' Component={Register}/>
        <Route path='/home' Component={Home}/>

      </Routes>

    </>
  )
}

export default App
