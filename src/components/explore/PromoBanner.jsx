import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";   

const slides = [
  {
    image: "/image/promo1.jpg",
    title: "🔥 Mega Big Sale!",
    subtitle: "Up to 70% OFF on Best Categories",
    tag: "Limited Time Only ⏳",
    type: "mega-sale",
  },
  {
  image: "/image/promo-2.jpg",
  title: "✨ New Fashion Collection",
  subtitle: "Trendy T-Shirts • Jeans • Sneakers",
  tag: "Shop the Latest →",
  type: "fashion",
  },
  {
    image: "/image/promo3.jpg",
    title: "🎁 Festival Special Offers",
    subtitle: "Buy 1 Get 1 • Combo Deals • Flash Sale",
    tag: "Today Only ⚡",
    type: "festival", 
  },
];

const PromoBanner = () => {
  const sliderRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    sliderRef.current?.scrollTo({
      left: sliderRef.current.clientWidth * index,
      behavior: "smooth",
    });
  }, [index]);

  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-xl mb-8 relative">
      <div
        ref={sliderRef}
        className="flex w-full h-[220px] md:h-[300px] overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {slides.map((slide, i) => (
          <Link
            key={i}
            to={`/promo?type=${slide.type}`}
            className="min-w-full h-full snap-start relative group"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-center px-6 md:px-10">
              <div className="text-white max-w-xl">
                <h2 className="text-2xl md:text-4xl font-extrabold mb-2">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg opacity-90">
                  {slide.subtitle}
                </p>
                <span className="inline-block mt-4 bg-white/20 px-4 py-1 rounded-full text-xs md:text-sm backdrop-blur">
                  {slide.tag}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* DOTS */}
      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              index === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default PromoBanner;
