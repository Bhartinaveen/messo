// Testimonials.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonialsData = [
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

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Variants for slide animation
  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = testimonialsData.length - 1;
      if (next >= testimonialsData.length) next = 0;
      return next;
    });
  };

  return (
    <div className="bg-gray-50 font-sans py-16 flex justify-center">
      <div className="relative w-full max-w-3xl p-4 md:p-8">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#A3B763] mb-2">
          What Our Customers Say
        </h2>
        <p className="text-center text-red-900 mb-12">Real stories from real people.</p>

        <div className="relative min-h-[420px] md:min-h-[350px] overflow-hidden rounded-2xl">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x < -50 || velocity.x < -500) paginate(1);
                else if (offset.x > 50 || velocity.x > 500) paginate(-1);
              }}
              className="absolute w-full h-full flex flex-col items-center justify-center p-6"
            >
              <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 h-full flex flex-col items-center text-center border border-gray-200">
                <img
                  src={testimonialsData[currentIndex].img}
                  alt={testimonialsData[currentIndex].name}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-green-300 object-cover"
                />
                <p className="text-gray-700 italic mb-4 text-base md:text-lg leading-relaxed flex-grow">
                  "{testimonialsData[currentIndex].quote}"
                </p>
                <h3 className="font-bold text-gray-900 text-xl ">
                  {testimonialsData[currentIndex].name}
                </h3>
                <p className="text-green-600">{testimonialsData[currentIndex].title}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
