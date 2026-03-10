import React from "react";
import { useNavigate } from "react-router-dom";

const CategorySlider = ({ search = "" }) => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Women Fashion",
      icon: "👗",
      slug: "women-fashion",
      image: "/image/women-fashion.jpg",
      tag: "Trending",
    },
    {
      name: "Men Fashion",
      icon: "👕",
      slug: "men-fashion",
      image: "/image/men-fashion.jpg",
      tag: "New",
    },
    // {
    //   name: "Home & Kitchen",
    //   icon: "🏡",
    //   slug: "home-kitchen",
    //   image: "/image/home-kitchen.jpg",
    //   tag: "Popular",
    // },
    {
      name: "Electronics",
      icon: "📱",
      slug: "electronics",
      image: "/image/electronics.jpg",
      tag: "Hot",
    },
    {
      name: "Baby Care",
      icon: "🍼",
      slug: "baby-care",
      image: "/image/baby-care.jpg",
      tag: "Best Seller",
    },
  ];

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

return (
    <div className="mt-6 mb-10">
      <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
        🛍️ Shop by Categories
      </h2>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {filtered.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="min-w-[240px] bg-white rounded-2xl shadow hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <span className="absolute top-3 left-3 text-xs bg-indigo-600 text-white px-3 py-1 rounded-full">
                  {cat.tag}
                </span>
              </div>

              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { scrollbar-width: none; }
        `}
      </style>
    </div>
  );
};

export default CategorySlider;

