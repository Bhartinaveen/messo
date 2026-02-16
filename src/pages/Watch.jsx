import React, { useState, useMemo, useContext } from "react";
import { FaHeart, FaTimes, FaEye, FaCheck } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// --- Watch Data ---
const watches = [
  {
    id: 1,
    brand: "Apex",
    name: "Chronograph Steel",
    price: 4999,
    image: "/image/watch1.jpeg",
    category: "Men",
    description: "Premium chronograph steel watch with bold masculine design."
  },
  {
    id: 2,
    brand: "Nova",
    name: "Elegance Gold",
    price: 3499,
    image: "/image/watch2.jpeg",
    category: "Women",
    description: "Elegant gold finish watch perfect for formal occasions."
  },
  {
    id: 3,
    brand: "Zephyr",
    name: "Classic Leather",
    price: 2799,
    image: "/image/watch3.jpeg",
    category: "Unisex",
    description: "Timeless leather strap watch for everyday elegance."
  },
  {
    id: 4,
    brand: "Astra",
    name: "Explorer Digital",
    price: 1299,
    image: "/image/watch4.jpeg",
    category: "Kids",
    description: "Durable digital watch designed for active kids."
  },
];

const Watch = () => {
  const { cart, addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist } = useWishlist();

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);
  const [addedItems, setAddedItems] = useState([]);

  const brands = ["All", ...new Set(watches.map((w) => w.brand))];
  const categories = ["All", "Men", "Women", "Kids"];

  const filteredWatches = useMemo(() => {
    return watches.filter((watch) => {
      const brandMatch = filters.brand === "All" || watch.brand === filters.brand;
      const categoryMatch =
        filters.category === "All" ||
        watch.category === filters.category ||
        (watch.category === "Unisex" &&
          (filters.category === "Men" || filters.category === "Women"));
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  const handleAddToCart = (item) => {
    if (!addedItems.includes(item.id)) {
      addToCart(item);
      setAddedItems((prev) => [...prev, item.id]);
    }
  };

  const isAdded = (id) => addedItems.includes(id);
  const isWishlisted = (id) => wishlist.some((w) => w.id === id);

  return (
    <div className="min-h-screen bg-gray-100 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Watch Collection
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Timeless watches crafted for every lifestyle
        </p>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
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
          {filteredWatches.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              {/* ICONS */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <button
                  onClick={() => setQuickView(item)}
                  className="bg-white p-2 rounded-full shadow hover:bg-indigo-600 hover:text-white"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => addToWishlist(item)}
                  className="bg-white p-2 rounded-full shadow"
                >
                  <FaHeart
                    className={isWishlisted(item.id) ? "text-red-500" : "text-gray-400"}
                  />
                </button>
              </div>

              {/* IMAGE */}
              <div className="h-52 md:h-80 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* INFO */}
              <div className="p-4 text-center">
                <h3 className="font-semibold truncate">{item.name}</h3>
                <p className="text-indigo-600 font-bold text-lg">₹{item.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{item.brand}</p>

                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={isAdded(item.id)}
                  className={`mt-3 w-full py-2 rounded-xl font-semibold ${
                    isAdded(item.id)
                      ? "bg-green-500 text-white"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {isAdded(item.id) ? (
                    <>
                      <FaCheck className="inline mr-1" /> Added
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* QUICK VIEW MODAL */}
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
                    ₹{quickView.price.toLocaleString()}
                  </p>

                  <p className="mt-4 text-gray-700">{quickView.description}</p>

                  <button
                    onClick={() => handleAddToCart(quickView)}
                    disabled={isAdded(quickView.id)}
                    className={`mt-8 w-full py-3 rounded-2xl font-semibold ${
                      isAdded(quickView.id)
                        ? "bg-green-500 text-white"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {isAdded(quickView.id) ? (
                      <>
                        <FaCheck className="inline mr-1" /> Added
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
    </div>
  );
};

export default Watch;
