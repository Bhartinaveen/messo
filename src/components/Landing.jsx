import React, { useState, useEffect } from 'react';

// SVG component for a Cloth Icon
const ClothIcon = () => (
    <svg
        className="w-8 h-8 md:w-10 md:h-10 text-gray-800"
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

// Data for the slider
const slides = [
    {
        series: 'The Minimalist Collection',
        title: 'Effortless Style',
        image: '/image/s2.jpg',
        alt: 'A collection of colorful t-shirts'
    },
    {
        series: 'The Urban Explorer',
        title: 'Ready for the City',
        image: '/image/l5.jpg',
        alt: 'A stylish brown leather jacket'
    },
    {
        series: 'Denim Essentials',
        title: 'Your Everyday Wear',
        image: '/image/s7.jpg',
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
        }, 600);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleSlideChange((activeIndex + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex]);

    const currentSlide = slides[activeIndex];

    return (
        <div className="font-sans flex items-center justify-center h-screen w-screen bg-neutral-100 p-4 sm:p-8 overflow-hidden">
            <div className="relative w-full h-full flex flex-col-reverse md:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white">
                {/* Text Content Section (Left on desktop, Bottom on mobile) */}
                <div className="w-full h-1/2 md:h-full md:w-1/2 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center text-center md:text-left">
                    <div className={`transition-all duration-700 delay-300 ${animating ? 'opacity-0 -translate-y-10 md:translate-y-0 md:-translate-x-10' : 'opacity-100 translate-y-0 md:translate-x-0'}`}>
                        <div className="flex items-center justify-center md:justify-start mb-4">
                            <ClothIcon />
                            <p className="text-sm sm:text-base font-medium tracking-widest uppercase ml-2 text-gray-800">{currentSlide.series}</p>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
                            {currentSlide.title}
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
                            Discover our curated collection of essential pieces, designed to elevate your everyday style with simplicity and grace.
                        </p>
                        <button className="px-8 py-3 text-sm sm:text-base font-semibold text-white bg-gray-800 hover:bg-black transition-colors duration-300 rounded-full shadow-lg">
                            Shop Now
                        </button>
                    </div>
                </div>
                
                {/* Image Section (Right on desktop, Top on mobile) */}
                <div className="relative w-full h-1/2 md:h-full md:w-1/2">
                    <img
                        src={currentSlide.image}
                        alt={currentSlide.alt}
                        className={`w-full h-full object-cover object-center transition-all duration-700 ease-in-out ${animating ? 'opacity-0 translate-y-10 md:translate-y-0 md:translate-x-10' : 'opacity-100 translate-y-0 md:translate-x-0'}`}
                        key={currentSlide.image}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1000x1200/FFFFFF/000000?text=Clothing'; }}
                    />
                </div>
            </div>
            
            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleSlideChange(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-gray-800 scale-150' : 'bg-gray-300 hover:bg-gray-500'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Landing;