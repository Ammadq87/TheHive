import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home';
import Navbar from './components/Navbar'
import SignIn from './pages/SignIn'
// https://dribbble.com/shots/17159089-DoWhith-Personal-Wallet-Dashboard

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="root">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          {/* <Route path='/profile' element={<Profile/>}/> */}
          {/* <Route path='/*' element={<Error/>}></Route> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
