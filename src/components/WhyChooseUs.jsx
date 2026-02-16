import React, { useEffect, useRef, useState } from "react";
import {
  FaShippingFast,
  FaHeadset,
  FaMoneyBillWave,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast size={46} className="text-blue-600" />,
    title: "Free & Fast Delivery",
    description:
      "Fast, reliable delivery with trusted logistics partners across India.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: <FaHeadset size={46} className="text-green-600" />,
    title: "24/7 Customer Support",
    description:
      "Our expert support team is always available to help you anytime.",
    gradient: "from-green-500 to-teal-400",
  },
  {
    icon: <FaMoneyBillWave size={46} className="text-purple-600" />,
    title: "Secure Payments",
    description:
      "Multiple encrypted and trusted payment options for peace of mind.",
    gradient: "from-purple-500 to-indigo-500",
  },
];

const WhyChooseUs = () => {
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      if (isDragging.current) return;

      const cardWidth = slider.firstChild.offsetWidth + 24;
      slider.scrollBy({ left: cardWidth, behavior: "smooth" });

      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - cardWidth
      ) {
        setTimeout(() => {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        }, 600);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  /* ================= DRAG HANDLERS ================= */
  const startDrag = (e) => {
    isDragging.current = true;
    sliderRef.current.classList.add("cursor-grabbing");
    startX.current = e.pageX || e.touches[0].pageX;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const onDrag = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX.current) * 1.4;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDrag = () => {
    isDragging.current = false;
    sliderRef.current.classList.remove("cursor-grabbing");
  };

  return (
    <section className="bg-white py-24 overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[#A3B763]">
          Our Promise
        </h2>
        <h3 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-900">
          Why Choose Us?
        </h3>
        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
          Built to deliver trust, speed, and a stress-free shopping experience.
        </p>
      </div>

      {/* ================= SLIDER ================= */}
      <div
          ref={sliderRef}
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={startDrag}
          onTouchMove={onDrag}
          onTouchEnd={stopDrag}
          onScroll={(e) => {
            e.currentTarget.style.scrollbarWidth = "none";
          }}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="
            flex gap-6 md:gap-10
            px-6 sm:px-12 md:px-24
            overflow-x-auto
            cursor-grab
            select-none
          "
        >

        {[...features, ...features].map((item, index) => (
          <div
            key={index}
            className="
              min-w-[280px]
              sm:min-w-[320px]
              md:min-w-[360px]
              h-[360px]
              sm:h-[380px]
              group
              [perspective:1000px]
            "
          >
            <div
              className={`
                relative h-full w-full rounded-2xl
                shadow-lg transition-transform duration-700
                [transform-style:preserve-3d]
                group-hover:[transform:rotateY(180deg)]
              `}
            >
              {/* Front */}
              <div className="absolute inset-0 bg-white rounded-2xl p-8 flex flex-col items-center justify-center [backface-visibility:hidden]">
                <div className="w-24 h-24 mb-8 flex items-center justify-center rounded-full bg-slate-100">
                  {item.icon}
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
                  {item.title}
                </h4>
              </div>

              {/* Back */}
              <div
                className={`
                  absolute inset-0 rounded-2xl
                  bg-gradient-to-br ${item.gradient}
                  p-8 flex flex-col items-center justify-center
                  text-center
                  [transform:rotateY(180deg)]
                  [backface-visibility:hidden]
                `}
              >
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  {item.title}
                </h4>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
