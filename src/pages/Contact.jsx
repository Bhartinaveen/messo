import React from "react";
import Footer from "../components/Footer";

const Contact = () => {
  return (

    <div>
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden md:flex">
          {/* Left Side: Contact Information */}
          <div className="w-full md:w-1/3 bg-gray-900 text-white p-8">
            <h2 className="text-3xl font-bold mb-4 text-cyan-400">Contact Us</h2>
            <p className="text-gray-300 mb-8">
              Have a question or want to work with us? Fill out the form, and
              we'll get back to you soon.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-cyan-400 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold">Company Name</h3>
                  <p className="text-gray-300">Creative Solutions Ltd.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-cyan-400 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-300">support@creativesolutions.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-cyan-400 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold">Mobile No</h3>
                  <p className="text-gray-300">+91 12345 67890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full md:w-2/3 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Send us a message
            </h2>
            <form action="#" method="POST" className="space-y-6">
              {/* Your Name */}
              <div>
                <label htmlFor="name" className="sr-only">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              {/* Your Email */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone-number" className="sr-only">
                  Phone Number
                </label>
                <div className="flex rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition duration-300">
                  <div className="bg-gray-100 flex items-center px-4 border-r border-gray-300 text-gray-600">
                    IN +91
                  </div>
                  <input
                    type="tel"
                    name="phone-number"
                    id="phone-number"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-r-lg border-none focus:outline-none"
                  />
                </div>
              </div>

              {/* Your Message */}
              <div>
                <label htmlFor="message" className="sr-only">
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                ></textarea>
              </div>

              {/* Send Message Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
   <Footer/>
    </div>
  );
};

export default Contact;
