import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
// https://dribbble.com/shots/17159089-DoWhith-Personal-Wallet-Dashboard
function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default App
