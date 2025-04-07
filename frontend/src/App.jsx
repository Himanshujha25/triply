import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
 import './App.css'
// import Login from './pages/Login'
// import Register from './pages/Register'
 import Planner from './pages/Planner'
// import Result from './pages/Result'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planner" element={<Planner />} />
         {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    
        <Route path="/result" element={<Result />} /> */ }
      </Routes>
    </Router>
  )
}

export default App
