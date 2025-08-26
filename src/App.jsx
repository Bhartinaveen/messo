import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './components/Landing'
import Itemfor from './components/Itemfor'

// Pages
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar stays static */}
        <Navbar />

        {/* Landing and Itemfor stay static */}
        <Landing />
        <Itemfor />

        <main className="flex-1">
          <Routes>
            {/* Other pages */}
            <Route path="/home" element={<Home />} />
          </Routes>
        </main>

        {/* Footer stays static */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
