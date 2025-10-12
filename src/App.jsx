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
import Watch from './pages/Watch'
import Aboutus from './pages/Aboutus'
import Security from './pages/Security'
import Cancellation from './pages/Cancellation'
import Blog from './pages/Blog'
import Faq from './pages/Faq'
import Saree from './pages/saree'
import Tshirt from './pages/Tshirt'
import Shirt from './pages/Shirt'
import Kurta from './pages/Kurta'
import Kurti from './pages/Kurti'
import Jwellery from './pages/Jwellery'
import Matic from './pages/Matic' 
import Anging from './pages/Anging'

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
          <Route path="/watch" element={<Watch />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/security" element={<Security />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/saree" element={<Saree />} />
          <Route path="/tshirt" element={<Tshirt />} />
          <Route path="/shirt" element={<Shirt />} />
          <Route path="/kurta" element={<Kurta />} />
          <Route path="/kurti" element={<Kurti />} />
          <Route path="/jwellery" element={<Jwellery />} />
          <Route path="/matic" element={<Matic />} />
          <Route path="/laging" element={<Anging />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
