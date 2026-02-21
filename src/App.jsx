import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { products } from "/src/data/products.js";

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import BottomNav from './components/BottomNav'

import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import PartnerAuth from './pages/PartnerAuth'
import Profile from './pages/Profile'

import AdminDashboard from './pages/AdminDashboard'
import AdminProfile from './pages/AdminProfile'

import About from './pages/About'

import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Cancellation from './pages/Cancellation'
import Blog from './pages/Blog'
import Faq from './pages/Faq'
import Aboutus from './pages/Aboutus'
import Security from './pages/Security'

import Explore from './pages/Explore'
import PromoProducts from './pages/PromoProducts'
import BudgetPage from './pages/BudgetPage'

import CartPage from './pages/CartPage'
import ProductDetails from './pages/ProductDetails'
import Categorypage from './pages/Categorypage'
import Wishlist from './pages/Wishlist'

// Merchant and checkout pages
import Checkout from './pages/Checkout'
import MyOrdersPage from './pages/Merchant/MyOrders'
import MerchantDashboard from './pages/Merchant/Dashboard'
import MerchantProfile from './pages/Merchant/MyProfile'
import MerchantAddresses from './pages/Merchant/MyAddresses'
import TrackOrder from './pages/TrackOrder'
import Watch from './pages/Watch'
import Accessories from './pages/Accessories'
import FootWear from './pages/FootWear'
import Bags from './pages/Bags'
import KidsWear from './pages/KidsWear'
import HomeLiving from './pages/HomeLiving'
import TopWear from './pages/TopWear'
import EthnicWear from './pages/EthnicWear'
import Jewellery from './pages/Jewellery'
import Cosmetics from './pages/Cosmetics' 
import BottomWear from './pages/BottomWear'


function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen pt-20 pb-16">
        
        {/* Top Navbar */}
        <Navbar />

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/partner-auth" element={<PartnerAuth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        
          <Route path="/about" element={<About />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/security" element={<Security />} />
          <Route path="/cancellation" element={<Cancellation />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route path="/explore" element={<Explore />} />
          <Route path="/promo" element={<PromoProducts allProducts={products} />} />
          <Route path="/budget/:max" element={<BudgetPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:slug" element={<Categorypage />} />

          {/* Merchant */}
          <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
          <Route path="/merchant/profile" element={<MerchantProfile />} />
          <Route path="/merchant/addresses" element={<MerchantAddresses />} />
          <Route path="/merchant/orders" element={<MyOrdersPage />} />

          <Route path="/track" element={<TrackOrder />} />

          {/* Categories */}
          <Route path="/foot" element={<FootWear />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/bags" element={<Bags />} />
          <Route path="/kids-wear" element={<KidsWear />} />
          <Route path="/home-living" element={<HomeLiving />} />
          <Route path="/top" element={<TopWear />} />
          <Route path="/ethnic" element={<EthnicWear />} />
          <Route path="/jewel" element={<Jewellery />} />
          <Route path="/cosmetics" element={<Cosmetics />} />
          <Route path="/bottom" element={<BottomWear />} />
        </Routes>

        {/* 🔥 Mobile Bottom Navigation */}
        <BottomNav />
      </div>

      {/* Footer (desktop friendly) */}
      <Footer />
    </Router>
  );
}

export default App;