import React, { useState } from 'react';
import Footer from '../components/Footer';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Can I reactivate my inactive FTS Shopping account?",
      answer: "Yes, you can usually reactivate your inactive FTS Shopping account by simply logging in with your registered email or mobile number. If you encounter any issues, you can contact FTS Shopping customer support for assistance."
    },
    {
      question: "Do I need to verify my mobile number or email address every time I log in?",
      answer: "No, you don't need to verify your mobile number or email address every time you log in. Verification is typically required during the initial sign-up process or when logging in from a new device for security purposes."
    },
    {
      question: "What is an OTP or verification code?",
      answer: "OTP stands for One-Time Password. It's a secure, temporary code sent to your registered mobile number or email address to verify your identity during login or important account actions. This adds an extra layer of security to your FTS Shopping account."
    },
    {
      question: "Why do I need to verify my mobile number or email address to log into my FTS Shopping account?",
      answer: "Verification ensures that you are the legitimate owner of the account and adds an extra security layer to protect your personal information and prevent unauthorized access. It helps keep your FTS Shopping account secure from potential threats."
    },
    {
      question: "Can I use an international number to sign up?",
      answer: "Yes, FTS Shopping supports international mobile numbers for sign-up. However, please ensure that you can receive SMS or calls on that number as you'll need to verify it during the registration process."
    },
    {
      question: "How can I use my mobile number to login on the FTS Shopping mobile app?",
      answer: "To login using your mobile number on the FTS Shopping app: 1) Open the app, 2) Enter your registered mobile number, 3) You'll receive an OTP on that number, 4) Enter the OTP to verify and access your account. Make sure you have a stable internet connection."
    }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about your FTS Shopping account
          </p>
        </div>
        
        {/* FAQ Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`border-b border-gray-100 last:border-b-0 transition-all duration-300 ${
                activeIndex === index ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'bg-white'
              }`}
            >
              {/* Question */}
              <button
                className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset group"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                        Q
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <span className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180 text-blue-600' : 'text-gray-400'
                  }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </button>
              
              {/* Answer */}
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-6">
                  <div className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                      A
                    </span>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>

   <Footer/>
    </div>
  );
};

export default Faq;