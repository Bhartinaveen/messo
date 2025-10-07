import React from 'react';

// A reusable SVG icon for the call-to-action button
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 ml-2 transition-transform duration-300 group-hover:translate-x-1.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

// Enhanced TrendzCard with a subtle glow effect on hover
const TrendzCard = ({ imageUrl, label, altText, isLarge = false }) => (
  <div className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-full transition-all duration-500 hover:shadow-2xl">
    <img
      src={imageUrl}
      alt={altText}
      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x800/FDF7F5/CCC?text=Image+Missing'; }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
    {/* Subtle ring effect on hover for an extra bit of polish */}
    <div className="absolute inset-0 rounded-2xl ring-4 ring-white/0 group-hover:ring-white/20 transition-all duration-500"></div>
    <div className="absolute bottom-0 left-0 p-5">
      <h3 className={`text-white font-bold ${isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>{label}</h3>
    </div>
  </div>
);

// Main component, redesigned for a more attractive and dynamic feel.
const Women = () => {
  // New set of high-quality images for a more cohesive and luxurious look.
  const trendzItems = [
    {
      imageUrl: '/image/s9.jpg',
      label: 'Urban Elegance',
      altText: 'A woman in a stylish beige trench coat in an urban setting.',
      isLarge: true,
    },
    {
      imageUrl: '/image/s8.jpg',
      label: 'Summer Florals',
      altText: 'Woman in a vibrant floral dress against a white background.',
    },
    {
      imageUrl: '/image/l2.jpg',
      label: 'Statement Accessories',
      altText: 'Close-up of a woman wearing elegant gold earrings.',
    },
  ];

  return (
    <>
      {/* CSS for custom animations */}
      <style>{`
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
        .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
      `}</style>
      
      {/* Main wrapper with a soft, warm background */}
      <div className="w-full min-h-screen bg-[#FDF7F5] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
        
        {/* Main container with a glassmorphism effect for a modern feel */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-rose-100 p-8 lg:p-12 border border-white/50">
          
          {/* ## Left Section: Animated Text Content and CTA ## */}
          <div className="flex flex-col justify-center text-center lg:text-left h-full space-y-7">
            <h2 className="text-lg font-medium text-rose-500 tracking-widest uppercase opacity-0 fade-in-down">Elegance</h2>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-gray-900 opacity-0 fade-in-down delay-1">
              Unleash Your
              <br />
              {/* Updated, more luxurious gradient text */}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-rose-500 to-orange-400">
                Inner Style
              </span>
            </h1>
            <p className="text-gray-600 max-w-md mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed opacity-0 fade-in-up delay-2">
              Explore our curated collection of this season's most coveted trends. Find pieces that speak to your soul and elevate your wardrobe.
            </p>
            <div className="flex justify-center lg:justify-start pt-4 opacity-0 fade-in-up delay-3">
              <button className="group flex items-center justify-center text-white font-bold text-lg px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-300">
                Explore Collection
                <ArrowRightIcon />
              </button>
            </div>
          </div>

          {/* ## Right Section: Dynamic & Asymmetrical Image Grid ## */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[30rem] sm:h-[35rem] w-full opacity-0 fade-in-up delay-3">
            <div className="col-span-2 row-span-1">
              <TrendzCard {...trendzItems[1]} />
            </div>
            <div className="col-span-1 row-span-1">
              <TrendzCard {...trendzItems[2]} />
            </div>
            {/* The main featured image takes up more space for emphasis */}
            <div className="col-span-1 row-span-1">
              <TrendzCard {...trendzItems[0]} />
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Women;
