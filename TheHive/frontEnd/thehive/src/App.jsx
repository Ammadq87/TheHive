import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import Create from './pages/Create'
import Spaces from './pages/Spaces'
import Navbar from './components/Navbar';

// https://dribbble.com/shots/17159089-DoWhith-Personal-Wallet-Dashboard

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="root">
      <Navbar/>

      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/spaces' element={<Spaces/>}/>          
          
          {/* <Route path='/profile' element={<Profile/>}/> */}
          {/* <Route path='/*' element={<Error/>}></Route> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
