import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import Create from './pages/Create'
import Spaces from './pages/Spaces/Spaces'
import Navbar from './components/Navbar';
import NewSpace from './pages/Spaces/NewSpace';
import Register from './pages/Register';

// https://dribbble.com/shots/17159089-DoWhith-Personal-Wallet-Dashboard

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="">
      <Navbar/>
      <div id='content' className=''>      
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signIn' element={<SignIn/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/create' element={<Create/>}/>

            <Route path='/spaces/'>
              <Route path='new' element={<NewSpace/>}/>
              <Route path=':spaceId' element={<Spaces/>}/>
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
