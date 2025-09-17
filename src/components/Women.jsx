import React from 'react';

// A reusable SVG icon for the call-to-action button
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 ml-2 transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

// Redesigned, interactive TrendzCard component
const TrendzCard = ({ imageUrl, label, altText }) => (
  <div className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-full">
    <img
      src={imageUrl}
      alt={altText}
      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
    />
    {/* Gradient overlay to ensure the text is readable */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
    <div className="absolute bottom-4 left-4 p-2">
      <h3 className="text-white text-xl font-bold">{label}</h3>
    </div>
  </div>
);

const Women = () => {
  // New data for the redesigned trend cards with updated, high-quality images
  const trendzItems = [
    {
      imageUrl: '/image/s1.jpg',
      label: 'Summer Dresses',
      altText: 'Woman in a vibrant floral summer dress',
    },
    {
      imageUrl: '/image/s7.jpg',
      label: 'Baggy Jeans',
      altText: 'Woman posing in stylish baggy jeans',
    },
    {
      imageUrl: '/image/s6.jpg',
      label: 'Saree',
      altText: 'Close-up of a woman wearing statement gold earrings',
    },
    {
      imageUrl: '/image/s8.jpg',
      label: 'Chic Handbags',
      altText: 'A stylish woman holding a chic handbag',
    },
  ];

  return (
    // Main wrapper with a dark, sophisticated background
    <div className="w-full min-h-screen bg-[#FFF1F1] flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      
      {/* Main banner container with a modern glassmorphism effect */}
      <div
        className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#FDAAAA]/50 rounded-2xl shadow-2xl p-8 backdrop-blur-sm "
      >
        
        {/* ## Left Section: Text Content and Call to Action */}
        <div className="flex flex-col justify-center text-center md:text-left h-full space-y-6">
          {/* <p className="text-lg font-light text-gray-300 tracking-wider">meesho</p> */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase">
            Latest
            <br />
            {/* Eye-catching gradient text */}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              #TRENDZ
            </span>
          </h1>
          <p className="text-gray-400 max-w-md mx-auto md:mx-0 text-base sm:text-lg">
            Discover the hottest styles of the season. From runway-inspired looks to everyday essentials, find your next favorite outfit right here.
          </p>
          <div className="flex justify-center md:justify-start pt-4">
            <button className="group flex items-center justify-center text-white font-bold text-lg px-8 py-4 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg transform hover:scale-105">
              Shop The Collection
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        {/* ## Right Section: Interactive Trendz Cards Grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
          {trendzItems.map((item, index) => (
            <TrendzCard
              key={index}
              imageUrl={item.imageUrl}
              label={item.label}
              altText={item.altText}
            />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Women;