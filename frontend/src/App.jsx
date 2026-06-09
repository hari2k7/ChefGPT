import { useState } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />

      <main>
        <Home />
      </main>
    </>
  )
}

export default App
