import React from "react";

import {
  FaUsers,
  FaShoppingCart,
  FaUserFriends,
  FaMoneyBillWave,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

/* ================= BRAND NAME ================= */

const BrandName = () => (
  <span className="inline-flex items-baseline font-extrabold">
    <span className="text-black">First</span>
    <span className="ml-1">
      <span className="text-red-600">U</span>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-700">
        Shop
      </span>
    </span>
  </span>
);

/* ================= ABOUT PAGE ================= */

const About = () => {
  return (
    <div className="bg-white font-sans">
      {/* ================= HERO SECTION ================= */}
      <div
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-xl">
            About Us
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-200 text-base sm:text-lg md:text-xl">
            An upcoming e-commerce platform redefining online shopping in India
            with innovation, trust & world-class service.
          </p>
        </div>
      </div>

      {/* ================= OUR JOURNEY ================= */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Our Journey
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            <BrandName /> is a proud venture of{" "}
            <span className="font-semibold text-black">
              First Track Solutions Technologies Pvt. Ltd.
            </span>
            , an organization founded in{" "}
            <span className="font-semibold text-black">october 2022</span> with a vision
            to build reliable, technology-driven digital solutions.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Built on this solid foundation, <BrandName /> is being thoughtfully
            developed as a modern e-commerce platform that connects trusted
            sellers with quality-conscious customers. Our aim is to simplify
            online shopping while maintaining transparency, security, and
            reliability at every step.
          </p>

          <p className="text-gray-600 leading-relaxed">
            We believe every order represents time, expectations, and trust.
            Backed by intelligent systems, a growing seller ecosystem, and strong
            fulfillment capabilities, <BrandName /> aims to deliver seamless
            experiences — from product discovery and secure payments to reliable
            doorstep delivery.
            <span className="block mt-3 font-semibold text-red-600">
              🚀 Launch in 2026
            </span>
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1521334884684-d80222895322?w=800"
          alt="Our Story"
          className="rounded-2xl shadow-xl hover:scale-105 transition duration-500"
        />
      </div>

      {/* ================= STATISTICS ================= */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatCard icon={<FaUsers />} value="2022" label="Company Founded" />
          <StatCard
            icon={<FaShoppingCart />}
            value="2025"
            label="Platform Launch"
          />
          <StatCard
            icon={<FaUserFriends />}
            value="Pan India"
            label="Customer Reach"
          />
          <StatCard
            icon={<FaMoneyBillWave />}
            value="Secure"
            label="Payments & Checkout"
          />
        </div>
      </div>

      {/* ================= TEAM ================= */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Meet Our Leadership Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center">
          <TeamCard
            // img="/image/about2.webp"
            name="Arjun Mehta"
            role="Managing Director"
          />
          <TeamCard
            img="/image/founder.webp"
            name="Teajsh Parekh"
            role="Founder & CEO"
          />
          <TeamCard
            img="/image/product-designer.webp"
            name="Kabir Verma"
            role="Lead Product Designer"
          />
        </div>
      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const StatCard = ({ icon, value, label }) => (
  <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300">
    <div className="text-4xl mx-auto text-red-600 mb-3">{icon}</div>
    <h3 className="text-3xl font-bold">{value}</h3>
    <p className="text-gray-500 text-sm">{label}</p>
  </div>
);

const TeamCard = ({ img, name, role }) => (
  <div className="group">
    <img
      src={img}
      alt={name}
      className="w-full h-72 object-cover rounded-xl shadow-lg group-hover:scale-105 transition duration-500"
    />
    <h3 className="text-xl font-semibold mt-3">{name}</h3>
    <p className="text-gray-500 text-sm mb-3">{role}</p>
    <div className="flex justify-center space-x-4 text-gray-500">
      <FaLinkedin className="hover:text-red-600 cursor-pointer" />
      
    </div>
  </div>
);

export default About;
