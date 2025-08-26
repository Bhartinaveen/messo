import React, { useState, useEffect } from 'react';

// SVG component for the Apple logo
const AppleLogo = () => (
  <svg
    className="w-10 h-10 md:w-12 md:h-12 mr-4 text-gray-800"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.534 6.945c.007-2.252 1.834-3.986 1.842-3.993a.49.49 0 00-.39-.088c-1.53.188-2.923.95-3.82 1.82-1.025.99-1.83 2.43-1.822 3.91.01 2.33 1.93 4.1 1.922 4.108a.487.487 0 00.39.088c.07-.005.137-.02.2-.045.06-.025.116-.06.165-.106.05-.045.09-.098.122-.155.03-.057.054-.12.068-.185.01-.06.01-.11.01-.15v-.01c0-.02-.002-.04-.004-.06-.002-.02-.004-.04-.006-.06-.002-.02-.004-.04-.006-.06-.002-.02-.003-.035-.005-.052a2.8 2.8 0 01-.06-1.562c.002-.5.106-.99.3-1.45.2-.46.48-.89.84-1.27.36-.38.78-.7 1.25-.94.47-.24.98-.39 1.5-.43a.48.48 0 00.43-.52zm-3.08 10.963c.88.01 1.73-.34 2.34-1.05.6-.7.94-1.56.93-2.48-.01-.07-.02-.14-.04-.2a.48.48 0 00-.47-.39.48.48 0 00-.47.39c-.01.07-.01.13-.01.2 0 .6-.2 1.18-.58 1.63-.38.45-.9.7-1.46.7-.08 0-.15.01-.23.02a.48.48 0 00-.38.5c.04.25.26.44.51.44.03 0 .07-.004.1-.01zM12.016.088a.495.495 0 00-.495.485v.002c-.004 1.11-.21 2.2-.6 3.21-.4.99-.96 1.9-1.66 2.68-1.2 1.32-2.8 2.1-4.5 2.22a.49.49 0 00-.41.54c.01.08.03.16.05.23.53 2.1 1.8 3.85 3.53 4.9.8.48 1.67.8 2.58.93 1.05.15 2.1.01 3.08-.4a.49.49 0 00.3-.62.49.49 0 00-.62-.3c-.88.36-1.82.48-2.75.35-.8-.12-1.56-.4-2.26-.82-1.5-1.02-2.65-2.58-3.1-4.4a.49.49 0 00.05-.37.49.49 0 00-.3-.37c-.08-.01-.16-.02-.24-.02-1.56-.1-3.04-.8-4.14-1.98C.3 9.4.01 7.8.01 6.18c0-1.6.28-3.18 1.03-4.5.75-1.3 1.9-2.26 3.25-2.75A.49.49 0 004.8.97a.49.49 0 00.16-.56c-.08-.24-.32-.4-.57-.4-.05 0-.1 0-.15.01C2.8.5 1.5 1.5.7 2.85-.09 4.2-.4 5.7-.4 7.26c0 1.7.3 3.4 1.1 4.9.8 1.5 2.1 2.6 3.6 3.2.1.04.2.06.3.08v-.01c.04.01.08.02.12.02.16 0 .3-.04.44-.13a.48.48 0 00.28-.43c.01-1.8 1.4-3.4 3-4.3.8-.48 1.7-.8 2.6-.94 1.05-.15 2.1-.01 3.08-.4a.49.49 0 00.3.62.49.49 0 00-.62-.3c-.88.36-1.82.48-2.75.35-.9-.13-1.74-.48-2.5-.98-1.3-1.1-2.2-2.6-2.5-4.26a.49.49 0 00-.49-.48z" />
  </svg>
);

// Data for the slider
const slides = [
  {
    series: 'iPhone 14 Series',
    title: 'Up to 10% off Voucher',
    image: 'https://www.pngmart.com/files/22/iPhone-14-Pro-Max-PNG-Isolated-File.png',
    alt: 'iPhone 14 Pro in Deep Purple'
  },
  {
    series: 'iPhone 13 Series',
    title: 'Save Big on last gen',
    image: 'https://www.pngmart.com/files/21/iPhone-13-Pro-PNG-Photo.png',
    alt: 'iPhone 13 Pro in Sierra Blue'
  },
  {
    series: 'iPhone SE',
    title: 'Compact Power, A15 Chip',
    image: 'https://www.pngmart.com/files/22/iPhone-SE-2022-PNG-File.png',
    alt: 'iPhone SE in Midnight'
  },
];


const Landing = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleSlideChange = (index) => {
    if (index === activeIndex) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setAnimating(false);
    }, 600); // Animation duration
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange((activeIndex + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [activeIndex]);

  const currentSlide = slides[activeIndex];

  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100">
      <div className="relative w-full max-w-6xl text-gray-800 rounded-3xl shadow-2xl overflow-hidden bg-white/50 backdrop-blur-xl border border-white/20">
        {/* Changed flex-row to flex-col for mobile and md:flex-row-reverse for desktop */}
        <div className="flex flex-col md:flex-row-reverse items-center min-h-[80vh] md:min-h-0 md:h-[600px]">
          
          {/* Image section - now comes first in mobile flow */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-4 self-stretch inset-0">
            <img 
              src={currentSlide.image}
              alt={currentSlide.alt}
              className={`w-auto h-full max-h-[300px] sm:max-h-[350px] md:max-h-[500px] object-contain transition-all duration-500 ease-in-out ${animating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}
              key={currentSlide.image}
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x600/FFFFFF/000000?text=iPhone'; }}
            />
          </div>

          {/* Text content section - now flex-col and centered for mobile */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col items-center md:items-start justify-center text-center md:text-left h-full z-10">
            <div className={`transition-all duration-500 delay-200 ${animating ? 'opacity-0 -translate-y-5' : 'opacity-100'}`}>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <AppleLogo />
                <p className="text-lg md:text-xl font-semibold tracking-wider">{currentSlide.series}</p>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                {currentSlide.title}
              </h1>
            </div>
          </div>
          
        </div>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button 
              key={index}
              onClick={() => handleSlideChange(index)}
              className="w-8 h-1 bg-black/10 rounded-full overflow-hidden"
            >
              <div className={`h-full bg-gray-800 rounded-full ${activeIndex === index ? 'w-full' : 'w-0'} transition-all duration-5000 ease-linear`}></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;