import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Tranding from './components/Tranding'
import Footer from './components/Footer'
import Bestpro from './components/Bestpro'
import NewAriv from './components/NewAriv'
import Explor from './components/Explor'
import Last from './components/Last'
import Women from './components/Women'


// Pages
import Home from './pages/Home'
import Foot from './pages/Foot'
import Contact from './pages/Contact'
import Register from './pages/Register'
import About from './pages/About'
import Explore from './pages/Explore'
import Terms from './pages/Terms'
import Privcy from './pages/Privcy'

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
                <Women/>
                <Bestpro/>
                <NewAriv/>
                <Explor/>
                <Last/>
                <Footer/>
              </>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/foot" element={<Foot />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privcy" element={<Privcy />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
