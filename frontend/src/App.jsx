import Home from './pages/Home'
import Navbar from './components/Navbar'
import Cookbook from './pages/Cookbook'
import RecipeDetail from './pages/RecipeDetail'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cookbook" element={<Cookbook />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </>
  )
}

export default App
