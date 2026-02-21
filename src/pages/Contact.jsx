import React from "react";
import { FiMail, FiPhone, FiGrid } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white font-sans py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden md:flex">

        {/* Left Panel */}
        <div className="md:w-1/3 bg-gray-900 text-white p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4 text-cyan-400">Contact Us</h2>
          <p className="text-gray-300 mb-10 leading-relaxed">
            Have a question, business inquiry, or need support?
            We're here to help — just send us a message.
          </p>

          <div className="space-y-8">

            {/* Company */}
            <div className="flex items-start gap-3">
              <div className="bg-gray-800 p-3 rounded-lg">
                <FiGrid size={24} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold">Company Name</h3>
                <p className="text-gray-300">Abc</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="bg-gray-800 p-3 rounded-lg">
                <FiMail size={24} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-300">support@creativesolutions.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="bg-gray-800 p-3 rounded-lg">
                <FiPhone size={24} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-300">+91 12345 67890</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="md:w-2/3 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Send us a message
          </h2>

          <form className="space-y-6">

            {/* Name */}
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Phone */}
            <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
              <span className="px-4 flex items-center bg-gray-200 text-gray-600">+91</span>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 bg-gray-100 focus:outline-none"
              />
            </div>

            {/* Message */}
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl text-lg shadow hover:bg-blue-700 transition"
            >
              Send Message
            </button>

            {/* Floating WhatsApp Button */}
              <a
                href="https://wa.me/911234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition transform hover:scale-110 z-50"
                >
                  <FaWhatsapp size={28} />
                </a>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
