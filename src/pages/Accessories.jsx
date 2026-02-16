import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaTimes, FaCheck, FaEye, FaHeart } from "react-icons/fa";

// --- Accessories Data ---
const accessories = [
  {
    id: 1,
    brand: "Fossil",
    name: "Leather Belt",
    price: 1299,
    image: "/image/a1.jpeg",
    category: "Belt",
    description: "Premium genuine leather belt for everyday and formal wear."
  },
  {
    id: 2,
    brand: "Ray-Ban",
    name: "Aviator Sunglasses",
    price: 4499,
    image: "/image/a2.jpeg",
    category: "Sunglasses",
    description: "Classic aviator sunglasses with UV protection."
  },
  {
    id: 3,
    brand: "Titan",
    name: "Wallet",
    price: 899,
    image: "/image/a3.jpeg",
    category: "Wallet",
    description: "Compact and stylish wallet with multiple compartments."
  },
  {
    id: 4,
    brand: "Puma",
    name: "Cap",
    price: 599,
    image: "/image/a4.jpeg",
    category: "Cap",
    description: "Sporty cap with breathable fabric for daily use."
  },
  {
    id: 5,
    brand: "Fossil",
    name: "Bracelet",
    price: 1199,
    image: "/image/a5.jpeg",
    category: "Bracelet",
    description: "Minimal bracelet with a premium metal finish."
  },
  {
    id: 6,
    brand: "Ray-Ban",
    name: "Wayfarer Sunglasses",
    price: 5299,
    image: "/image/a6.jpeg",
    category: "Sunglasses",
    description: "Iconic wayfarer sunglasses with bold styling."
  }
];

const Accessories = () => {
  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);
  const [addedItems, setAddedItems] = useState([]);

  const brands = ["All", ...new Set(accessories.map((a) => a.brand))];
  const categories = ["All", ...new Set(accessories.map((a) => a.category))];

  const filteredAccessories = useMemo(() => {
    return accessories.filter((item) => {
      const brandMatch = filters.brand === "All" || item.brand === filters.brand;
      const categoryMatch = filters.category === "All" || item.category === filters.category;
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500">
          Essential Accessories
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Premium accessories to complete your everyday style
        </p>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setFilters({ ...filters, brand: b })}
              className={`font-medium ${
                filters.brand === b
                  ? "text-green-600 border-b-2 border-green-600"
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
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAccessories.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              {/* ICONS */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <button
                  onClick={() => setQuickView(item)}
                  className="bg-white p-2 rounded-full shadow hover:bg-green-600 hover:text-white"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => addToWishlist(item)}
                  className="bg-white p-2 rounded-full shadow hover:bg-green-600 hover:text-white"
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
                <p className="text-green-600 font-bold text-lg">₹{item.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{item.brand}</p>

                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={isAdded(item.id)}
                  className={`mt-3 w-full py-2 rounded-xl font-semibold ${
                    isAdded(item.id)
                      ? "bg-green-500 text-white"
                      : "bg-green-600 text-white hover:bg-green-700"
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

                  <p className="text-green-600 text-2xl font-bold mt-4">
                    ₹{quickView.price.toLocaleString()}
                  </p>

                  <p className="mt-4 text-gray-700">{quickView.description}</p>

                  <button
                    onClick={() => handleAddToCart(quickView)}
                    disabled={isAdded(quickView.id)}
                    className={`mt-8 w-full py-3 rounded-2xl font-semibold ${
                      isAdded(quickView.id)
                        ? "bg-green-500 text-white"
                        : "bg-green-600 text-white hover:bg-green-700"
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

export default Accessories;
