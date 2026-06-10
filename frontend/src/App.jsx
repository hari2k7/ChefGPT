import Home from './pages/Home'
import Navbar from './components/Navbar'
import Cookbook from './pages/Cookbook'
import RecipeDetail from './pages/RecipeDetail'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const location = useLocation();

  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cookbook"
          element={
            <ProtectedRoute>
              <Cookbook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipe/:id"
          element={
            <ProtectedRoute>
              <RecipeDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
