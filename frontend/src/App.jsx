import { useState } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Cookbook from './pages/Cookbook'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cookbook" element={<Cookbook />} />
      </Routes>
    </>
  )
}

export default App
