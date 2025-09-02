import React from 'react';
import { FaUsers, FaShoppingCart, FaUserFriends, FaMoneyBill, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import Foot from './Foot';
import Footer from '../components/Footer';

const About = () => {
  return (

    <div>
    <div className="bg-white min-h-screen font-sans">
      {/* Our Story Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Founded in <span className="font-semibold text-black">2025</span>, <span className="text-red-600 font-bold">FirstUShop</span> is India’s next-generation online shopping marketplace, built to provide customers with a seamless and modern shopping experience. 
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            With a wide range of products, exclusive deals, and trusted sellers, FirstUShop empowers Indian customers to shop smarter, faster, and safer. From electronics to fashion and home essentials, we are committed to delivering excellence with every order. 
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, FirstUShop continues to grow rapidly with thousands of sellers and millions of customers across India, redefining the future of e-commerce.
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1521334884684-d80222895322?w=800"
            alt="Our Story"
            className="rounded-2xl shadow-lg hover:scale-105 transform transition duration-300"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <FaUsers className="text-4xl mx-auto text-red-600 mb-3" />
            <h3 className="text-2xl font-bold">10.5k</h3>
            <p className="text-gray-500 text-sm">Sellers active on our site</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <FaShoppingCart className="text-4xl mx-auto text-red-600 mb-3" />
            <h3 className="text-2xl font-bold">33k</h3>
            <p className="text-gray-500 text-sm">Monthly Product Sales</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <FaUserFriends className="text-4xl mx-auto text-red-600 mb-3" />
            <h3 className="text-2xl font-bold">45.5k</h3>
            <p className="text-gray-500 text-sm">Customers active in our site</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <FaMoneyBill className="text-4xl mx-auto text-red-600 mb-3" />
            <h3 className="text-2xl font-bold">25k</h3>
            <p className="text-gray-500 text-sm">Annual gross sales in our site</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center">
          {/* Member 1 */}
          <div className="group">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Tom Cruise"
              className="w-full h-72 object-cover rounded-xl shadow-md mb-4 group-hover:scale-105 transform transition duration-300"
            />
            <h3 className="text-xl font-semibold">Tom Cruise</h3>
            <p className="text-gray-500 text-sm mb-3">Founder & Chairman</p>
            <div className="flex justify-center space-x-4 text-gray-500">
              <FaLinkedin className="hover:text-red-600 cursor-pointer" />
              <FaTwitter className="hover:text-red-600 cursor-pointer" />
              <FaInstagram className="hover:text-red-600 cursor-pointer" />
            </div>
          </div>
          {/* Member 2 */}
          <div className="group">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Emma Watson"
              className="w-full h-72 object-cover rounded-xl shadow-md mb-4 group-hover:scale-105 transform transition duration-300"
            />
            <h3 className="text-xl font-semibold">Emma Watson</h3>
            <p className="text-gray-500 text-sm mb-3">Managing Director</p>
            <div className="flex justify-center space-x-4 text-gray-500">
              <FaLinkedin className="hover:text-red-600 cursor-pointer" />
              <FaTwitter className="hover:text-red-600 cursor-pointer" />
              <FaInstagram className="hover:text-red-600 cursor-pointer" />
            </div>
          </div>
          {/* Member 3 */}
          <div className="group">
            <img
              src="https://randomuser.me/api/portraits/men/65.jpg"
              alt="Will Smith"
              className="w-full h-72 object-cover rounded-xl shadow-md mb-4 group-hover:scale-105 transform transition duration-300"
            />
            <h3 className="text-xl font-semibold">Will Smith</h3>
            <p className="text-gray-500 text-sm mb-3">Product Designer</p>
            <div className="flex justify-center space-x-4 text-gray-500">
              <FaLinkedin className="hover:text-red-600 cursor-pointer" />
              <FaTwitter className="hover:text-red-600 cursor-pointer" />
              <FaInstagram className="hover:text-red-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
       <Footer/>
    </div>
  );
};

export default About;
