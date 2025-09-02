import React from 'react';
import Footer from '../components/Footer';

// --- SVG Icon Components ---

const UserIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const MailIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const LockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 35.398 44 30.023 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);


const Register = () => {
  return (
    <div>
    <div 
      className="bg-cover bg-center min-h-screen font-sans"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="min-h-screen flex items-center justify-center font-sans p-4 bg-black/40">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl p-8 space-y-6">
        
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h1>
            <p className="text-gray-600">Join us and start your journey!</p>
          </div>

          {/* Form */}
          <form action="#" method="POST" className="space-y-6">
            {/* Name Input */}
            <div className="relative">
               <div className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400">
                  <UserIcon className="w-5 h-5"/>
               </div>
               <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  placeholder="Full Name"
               />
            </div>

            {/* Email or Phone Input */}
            <div className="relative">
               <div className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400">
                  <MailIcon className="w-5 h-5"/>
               </div>
               <input
                  id="email-or-phone"
                  name="email-or-phone"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  placeholder="Email or Phone"
               />
            </div>

            {/* Password Input */}
            <div className="relative">
               <div className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400">
                  <LockIcon className="w-5 h-5"/>
               </div>
               <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  placeholder="Password"
               />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Create Account
              </button>
            </div>
          </form>
          
          {/* Divider */}
          <div className="flex items-center justify-center">
              <div className="border-b border-gray-300 w-full"></div>
              <p className="px-4 text-sm text-gray-500">OR</p>
              <div className="border-b border-gray-300 w-full"></div>
          </div>

          {/* Google Sign Up */}
          <div>
            <button
              type="button"
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <GoogleIcon />
              Sign up with Google
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                Log in
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
     <Footer/>
    </div>
  );
}

export default Register;

