import React, { useState, useMemo } from "react";
import { FaHeart, FaRegHeart, FaTimes, FaCheck, FaEye } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// --- Top Wear Data ---
const topWear = [
  {
    id: 1,
    brand: "UrbanFit",
    name: "Men Casual Shirt",
    price: "₹1,199",
    image: "/image/mtop1.jpeg",
    category: "Men",
    description: "Comfortable cotton casual shirt for everyday wear.",
  },
  {
    id: 2,
    brand: "StyleAura",
    name: "Women Printed Top",
    price: "₹899",
    image: "/image/wtop1.jpeg",
    category: "Women",
    description: "Stylish printed top with soft fabric and modern fit.",
  },
  {
    id: 3,
    brand: "UrbanFit",
    name: "Men Slim Fit Polo",
    price: "₹1,399",
    image: "/image/mtop2.jpeg",
    category: "Men",
    description: "Slim fit polo t-shirt with premium fabric.",
  },
  {
    id: 4,
    brand: "StyleAura",
    name: "Women Sleeveless Top",
    price: "₹999",
    image: "/image/wtop2.jpeg",
    category: "Women",
    description: "Trendy sleeveless top perfect for summer outings.",
  },
  {
    id: 5,
    brand: "UrbanFit",
    name: "Men Checked Shirt",
    price: "₹1,299",
    image: "/image/mtop3.jpeg",
    category: "Men",
    description: "Classic checked shirt with relaxed fit.",
  },
  {
    id: 6,
    brand: "StyleAura",
    name: "Women Casual Blouse",
    price: "₹1,099",
    image: "/image/wtop3.jpeg",
    category: "Women",
    description: "Elegant casual blouse with premium stitching.",
  },
];

const TopWear = () => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);
  const [addedItems, setAddedItems] = useState([]);

  const brands = ["All", ...new Set(topWear.map((i) => i.brand))];
  const categories = ["All", "Men", "Women"];

  const filteredItems = useMemo(() => {
    return topWear.filter((item) => {
      const brandOk = filters.brand === "All" || item.brand === filters.brand;
      const catOk =
        filters.category === "All" || item.category === filters.category;
      return brandOk && catOk;
    });
  }, [filters]);

  const handleAddToCart = (item) => {
    if (!addedItems.includes(item.id)) {
      addToCart(item);
      setAddedItems((prev) => [...prev, item.id]);
    }
  };

  const isAdded = (id) => addedItems.includes(id);
  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <div className="bg-gray-100 min-h-screen py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* HEADER */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Explore Top Wear
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Trendy styles for men & women
        </p>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setFilters({ ...filters, brand: b })}
              className={`font-medium ${
                filters.brand === b
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600"
              }`}
            >
              {b}
            </button>
          ))}

          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilters({ ...filters, category: c })}
              className={`font-medium ${
                filters.category === c
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              {/* 👁️ + ❤️ ICONS */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                {/* Eye */}
                <button
                  onClick={() => setQuickView(item)}
                  className="bg-white p-2 rounded-full shadow hover:bg-indigo-600 hover:text-white"
                >
                  <FaEye />
                </button>

                {/* Wishlist */}
                <button
                  onClick={() =>
                    isWishlisted(item.id)
                      ? removeFromWishlist(item.id)
                      : addToWishlist(item)
                  }
                  className="bg-white p-2 rounded-full shadow"
                >
                  {isWishlisted(item.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </button>
              </div>

              {/* Image */}
              <div className="h-44 md:h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h3 className="font-semibold truncate">{item.name}</h3>
                <p className="text-indigo-600 font-bold text-lg">
                  {item.price}
                </p>
                <p className="text-sm text-gray-500">{item.brand}</p>

                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={isAdded(item.id)}
                  className={`mt-3 w-full py-2 rounded-xl font-semibold
                    ${
                      isAdded(item.id)
                        ? "bg-green-500 text-white"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                >
                  {isAdded(item.id) ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK VIEW */}
      {quickView && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 relative">
            <button
              onClick={() => setQuickView(null)}
              className="absolute top-4 right-4 text-xl"
            >
              <FaTimes />
            </button>

            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={quickView.image}
                alt={quickView.name}
                className="w-full h-80 object-cover rounded-2xl"
              />

              <div>
                <h2 className="text-3xl font-bold">{quickView.name}</h2>
                <p className="text-gray-500">{quickView.brand}</p>

                <p className="text-indigo-600 text-2xl font-bold mt-4">
                  {quickView.price}
                </p>

                <p className="mt-4 text-gray-700">
                  {quickView.description}
                </p>

                <button
                  onClick={() => handleAddToCart(quickView)}
                  disabled={isAdded(quickView.id)}
                  className={`mt-8 w-full py-3 rounded-2xl font-semibold flex justify-center gap-2
                    ${
                      isAdded(quickView.id)
                        ? "bg-green-500 text-white"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                >
                  {isAdded(quickView.id) ? (
                    <>
                      <FaCheck /> Added to Cart
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopWear;
