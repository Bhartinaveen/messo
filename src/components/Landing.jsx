import React, { useState, useEffect } from 'react';

// SVG component for a Cloth Icon (T-shirt)
const ClothIcon = () => (
  <svg
    className="w-10 h-10 md:w-12 md:h-12 mr-4 text-gray-800"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
  </svg>
);


// Data for the slider - updated for clothing
const slides = [
  {
    series: 'Summer Collection',
    title: 'New Arrivals are Here',
    image: 'https://www.pngmart.com/files/22/T-Shirt-PNG-Isolated-File.png',
    alt: 'A collection of colorful t-shirts'
  },
  {
    series: 'Autumn Outerwear',
    title: 'Stay Warm in Style',
    image: 'https://www.pngmart.com/files/22/Jacket-PNG-Transparent.png',
    alt: 'A stylish brown leather jacket'
  },
  {
    series: 'Classic Denim',
    title: 'Perfect Fit for Everyone',
    image: 'https://www.pngmart.com/files/5/Jeans-PNG-Transparent-Image.png',
    alt: 'A pair of classic blue jeans'
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
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x600/FFFFFF/000000?text=Clothing'; }}
            />
          </div>

          {/* Text content section - now flex-col and centered for mobile */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col items-center md:items-start justify-center text-center md:text-left h-full z-10">
            <div className={`transition-all duration-500 delay-200 ${animating ? 'opacity-0 -translate-y-5' : 'opacity-100'}`}>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <ClothIcon />
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