"use client";
import React, { useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const categories = [
  { name: "Mobile", img: "/image/l1.jpg" },
  { name: "Cosmetics", img: "/image/l2.jpg" },
  { name: "Electronics", img: "/image/l3.jpg" },
  { name: "jewellery", img: "/image/l8.jpg" },
  { name: "Watches", img: "/image/l5.jpg" },
  { name: "tshirt", img: "/image/l7.jpg" },
  { name: "Shirt", img: "/image/l6.jpg" },
];

// autoplay plugin
function Autoplay(slider) {
  let timeout;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }
  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 2000); // 2 seconds autoplay
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

const Tranding = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      mode: "free-snap",
      slides: {
        perView: 3,
        spacing: 15,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 4, spacing: 20 },
        },
        "(min-width: 768px)": {
          slides: { perView: 5, spacing: 25 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 7, spacing: 30 },
        },
      },
    },
    [Autoplay] // plugin
  );

  return (
    <div className="w-full px-4 md:px-12 lg:px-24 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl font-semibold">
          Shop From{" "}
          <span className="text-blue-600 cursor-pointer">Top Categories</span>
        </h2>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          View All →
        </a>
      </div>

      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="keen-slider__slide flex flex-col items-center text-center cursor-pointer group"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-full bg-gray-100 group-hover:shadow-md transition overflow-hidden">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm sm:text-base">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tranding;