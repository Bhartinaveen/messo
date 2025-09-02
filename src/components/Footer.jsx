import React from 'react';

// You can use an icon library like react-icons or use SVGs directly
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
);

const TwitterIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
);

const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 4.22c.636-.247 1.363.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm0 1.625c-2.403 0-2.728.01-3.688.056-1.003.046-1.503.21-1.894.376-.432.175-.748.385-1.08.717-.332.332-.542.648-.717 1.08-.166.391-.33 1.003-.376 1.894C4.01 8.272 4 8.597 4 11s.01 2.728.056 3.688c.046 1.003.21 1.503.376 1.894.175.432.385.748.717 1.08.332.332.648.542 1.08.717.391.166 1.003.33 1.894.376 1.003.046 1.378.056 3.688.056s2.728-.01 3.688-.056c1.003-.046 1.503-.21 1.894-.376.432-.175.748-.385 1.08-.717.332-.332.542-.648.717-1.08.166-.391.33-1.003-.376-1.894.046-1.003.056-1.378.056-3.688s-.01-2.728-.056-3.688c-.046-1.003-.21-1.503-.376-1.894a3.28 3.28 0 00-.717-1.08 3.28 3.28 0 00-1.08-.717c-.391-.166-1.003-.33-1.894-.376C15.042 3.635 14.717 3.625 12.315 3.625zM12 7.188a4.813 4.813 0 100 9.625 4.813 4.813 0 000-9.625zM12 15a3 3 0 110-6 3 3 0 010 6zm4.838-9.002a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" /></svg>
);

const LinkedinIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
);


const Footer = () => {
  return (
    <footer className="bg-[#B33791] text-white pt-16 pb-6 font-sans">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          
          {/* Column 1: Exclusive */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Exclusive</h3>
            <p className="text-xl">Subscribe</p>
            <p>Get 10% off your first order</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border border-white rounded-md py-2 px-3 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <SendIcon />
              </button>
            </div>
          </div>

          {/* Column 2: Support */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Support</h3>
            <p>jharkhand,<br/> DH 1515, india.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>

          {/* Column 3: Account */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Account</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">My Account</a></li>
              <li><a href="#" className="hover:underline">Login / Register</a></li>
              <li><a href="#" className="hover:underline">Cart</a></li>
              <li><a href="#" className="hover:underline">Wishlist</a></li>
              <li><a href="#" className="hover:underline">Shop</a></li>
            </ul>
          </div>

          {/* Column 4: Quick Link */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Quick Link</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms Of Use</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Column 5: Download App */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Download App</h3>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" aria-label="Twitter"><TwitterIcon /></a>
              <a href="#" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" aria-label="LinkedIn"><LinkedinIcon /></a>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-red-700 text-center pt-6 mt-8">
          <p className="text-red-900"> @ 2025 First Ushop. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
