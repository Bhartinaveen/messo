import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaPaperPlane,
  FaEnvelope, 
  FaMapMarkerAlt,
  FaPhoneAlt
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() === '') return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
  <footer className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-10 px-6 mb-7">

      <div className="container mx-auto px-4">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-12">

          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl font-extrabold tracking-wide">Exclusive</h3>
            <p className="text-xl font-semibold">Stay Updated</p>
            <p className="text-sm text-gray-200">
              Join our newsletter and enjoy <span className="text-yellow-300 font-semibold">10% OFF</span> on your first purchase.
            </p>

            <form className="relative mt-4" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border border-white rounded-md p-2 w-full placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-yellow-300 transition"
              >
                <FaPaperPlane className="w-5 h-5" />
              </button>
            </form>

            {submitted && (
              <p className="text-green-400 animate-fadeIn text-sm">
                You’re subscribed! Thank you.
              </p>
            )}
          </div>

          {/* Column 2: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Contact Us</h3>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-yellow-300 mt-1" />
              <p className="leading-relaxed text-gray-200">
                BMC Bhawani Mall, Saheed Nagar, Bhubaneswar,<br /> Odisha - 751007, India
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-yellow-300" />
              <p className="text-gray-200">support@firstushop.com</p>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-yellow-300" />
              <p className="text-gray-200">+91 90401 70727</p>
            </div>
          </div>

          {/* Column 3: Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Information</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/blog" className="hover:underline">Blog</Link></li>
              <li><Link to="/security" className="hover:underline">Security</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/partner-auth" className="hover:underline">Become a Seller</Link></li>
           
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms of Use</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/cancellation" className="hover:underline">Refund & Cancellation</Link></li>
            
            </ul>
          </div>

          {/* Column 5: Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <p className="text-gray-200 text-sm">Let’s stay connected</p>

            <div className="flex space-x-4 text-lg">
              <a href="#" className="hover:text-blue-400 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-sky-400 transition"><FaTwitter /></a>
              <a href="#" className="hover:text-pink-400 transition"><FaInstagram /></a>
              <a href="#" className="hover:text-blue-300 transition"><FaLinkedin /></a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-400 text-center pt-6 mt-8">
          <p className="bg-clip-text text-transparent bg-white text-md tracking-wide">
            Copyright© 2025 First Track Solution Technologies. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
