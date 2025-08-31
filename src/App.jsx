import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Tranding from './components/Tranding'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Foot from './pages/Foot'

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        {/* Navbar always visible */}
        <Navbar />

        {/* Landing + Tranding only show on homepage */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Landing />
                <Tranding />
                <Footer/>
              </>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/foot" element={<Foot />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
