import React from 'react';

// Main App Component
const Explor = () => {
  // --- Data for Testimonials ---
  // You can replace this with data fetched from an API
  const testimonials = [
    {
      quote: "This is the best shopping experience I've ever had! The products are high-quality, and the customer service is outstanding. I'll definitely be back for more.",
      name: "Sarah Johnson",
      title: "Fashion Blogger",
      img: "https://placehold.co/100x100/A3E635/4D7C0F?text=SJ&font=sans",
    },
    {
      quote: "I was amazed by the fast shipping and the careful packaging. My items arrived in perfect condition. The variety on this website is incredible!",
      name: "Michael Chen",
      title: "Tech Enthusiast",
      img: "https://placehold.co/100x100/93C5FD/1E3A8A?text=MC&font=sans",
    },
    {
      quote: "A fantastic selection of products at great prices. The website is so easy to navigate, and I found exactly what I was looking for in minutes. Highly recommended!",
      name: "Jessica Williams",
      title: "Happy Customer",
      img: "https://placehold.co/100x100/F9A8D4/831843?text=JW&font=sans",
    },
    {
      quote: "The quality of the items exceeded my expectations. You can tell they care about their customers. The return policy is also very fair and straightforward.",
      name: "David Rodriguez",
      title: "First-time Buyer",
      img: "https://placehold.co/100x100/FCD34D/B45309?text=DR&font=sans",
    },
  ];

  // --- State and Refs ---
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  // --- Functions for Navigation ---
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  const goNext = () => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // --- Effect for Automatic Sliding ---
  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        ),
      4000 // Change slide every 4 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, testimonials.length]);


  // --- Render Component ---
  return (
    <div className="bg-gray-100 font-sans flex items-center justify-center py-12">
      <div 
        className="relative w-full max-w-3xl mx-auto p-4 md:p-8"
        onMouseEnter={resetTimeout} // Pause on hover
        onMouseLeave={() => { // Resume on hover out
            timeoutRef.current = setTimeout(goNext, 4000);
        }}
      >
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          What Our Customers Say
        </h2>
        <p className="text-center text-gray-500 mb-8 md:mb-12">
          Real stories from real people.
        </p>

        {/* Slider inner content */}
        <div className="relative h-80 md:h-64 overflow-hidden rounded-xl">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="absolute w-full h-full transition-opacity duration-700 ease-in-out"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                transform: `translateX(${(index - currentIndex) * 100}%)`,
                transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
              }}
            >
              <div className="bg-white rounded-lg shadow-lg p-8 h-full flex flex-col items-center text-center">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4 border-4 border-indigo-200 object-cover"
                />
                <p className="text-gray-600 italic mb-4 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto">
                    <h3 className="font-bold text-gray-800 text-xl">{testimonial.name}</h3>
                    <p className="text-indigo-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, slideIndex) => (
                <button
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-indigo-500 w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                    aria-label={`Go to slide ${slideIndex + 1}`}
                ></button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Explor;

