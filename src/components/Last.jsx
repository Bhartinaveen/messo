import React from 'react';

// --- SVG Icon Components ---

const DeliveryIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-12 w-12" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"></path>
    <path d="M14 9h4l4 4v4h-8v-4a2 2 0 0 1 2-2h2Z"></path>
    <circle cx="7.5" cy="18.5" r="2.5"></circle>
    <circle cx="17.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const SupportIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-12 w-12" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
);

const GuaranteeIcon = () => (
   <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-12 w-12"
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);


// --- Main Component ---

const Last = () => {
  const features = [
    {
      icon: <DeliveryIcon />,
      title: 'Free & Fast Delivery',
      description: 'Orders over $140 ship free, arriving at your door quickly and reliably.',
      style: {
        gradient: 'from-blue-500 to-cyan-400',
        shadow: 'shadow-blue-500/20',
        iconText: 'text-blue-600',
      }
    },
    {
      icon: <SupportIcon />,
      title: '24/7 Customer Support',
      description: 'Our expert team is always available to help with any questions or concerns.',
      style: {
        gradient: 'from-green-500 to-teal-400',
        shadow: 'shadow-green-500/20',
        iconText: 'text-green-600',
      }
    },
    {
      icon: <GuaranteeIcon />,
      title: 'Money-Back Guarantee',
      description: 'Not satisfied? We offer a hassle-free 30-day money-back guarantee.',
      style: {
        gradient: 'from-purple-500 to-indigo-500',
        shadow: 'shadow-purple-500/20',
        iconText: 'text-purple-600',
      }
    },
  ];

  return (
    <div className="bg-white text-gray-800 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wider uppercase">Our Commitment to You</h2>
          <p className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Why Shop With Us?
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            We believe in providing more than just products. We offer an experience that is seamless, supportive, and secure from start to finish.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group h-96 w-full [perspective:1000px]"
            >
              <div className={`relative h-full w-full rounded-2xl shadow-lg transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] ${feature.style.shadow}`}>
                
                {/* Front Side */}
                <div className="absolute inset-0 rounded-2xl bg-white p-8 flex flex-col items-center justify-center [backface-visibility:hidden]">
                  <div className={`w-24 h-24 mb-8 flex items-center justify-center rounded-full bg-slate-100 ${feature.style.iconText}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-center">{feature.title}</h3>
                </div>

                {/* Back Side */}
                <div className={`absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br p-8 flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] ${feature.style.gradient}`}>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/90 leading-relaxed text-center mb-6">{feature.description}</p>
                  <a href="#" className="px-6 py-2 rounded-full bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors duration-300">
                    Learn More
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Last;
