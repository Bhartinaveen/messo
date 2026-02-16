import React, { useState, useMemo, useContext } from "react";
import { FaHeart, FaTimes, FaEye, FaCheck } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// ---------------- DATA ----------------
const products = [
  {
    id: 1,
    brand: "Fenty Beauty",
    name: "Pro Filt'r Foundation",
    price: "₹3,499",
    image: "/image/cos1.jpeg",
    category: "Makeup",
    description: "Long-wear, buildable foundation with a natural matte finish.",
  },
  {
    id: 2,
    brand: "Dior",
    name: "J'adore Eau de Perfume",
    price: "₹12,999",
    image: "/image/cos2.jpeg",
    category: "Fragrance",
    description: "An iconic floral fragrance with a sensual feminine touch.",
  },
  {
    id: 3,
    brand: "The Ordinary",
    name: "Niacinamide 10% + Zinc 1%",
    price: "₹899",
    image: "/image/cos3.jpeg",
    category: "Skincare",
    description: "Reduces blemishes & balances oil production.",
  },
  {
    id: 4,
    brand: "MAC",
    name: "Ruby Woo Lipstick",
    price: "₹1,799",
    image: "/image/cos4.jpeg",
    category: "Makeup",
    description: "Iconic matte red lipstick loved by professionals.",
  },
];

// ---------------- COMPONENT ----------------
const Cosmetic = () => {
  const { cart, addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist } = useWishlist();

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);
  const [addedItems, setAddedItems] = useState([]);

  const brands = ["All", ...new Set(products.map(p => p.brand))];
  const categories = ["All", "Makeup", "Skincare", "Fragrance"];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const brandOk = filters.brand === "All" || p.brand === filters.brand;
      const catOk =
        filters.category === "All" || p.category === filters.category;
      return brandOk && catOk;
    });
  }, [filters]);

  const handleAddToCart = (item) => {
    if (!addedItems.includes(item.id)) {
      addToCart(item);
      setAddedItems(prev => [...prev, item.id]);
    }
  };

  const isAdded = (id) => addedItems.includes(id);
  const isWishlisted = (id) => wishlist.some(w => w.id === id);

  return (
    <div className="min-h-screen bg-gray-100 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
          Explore Cosmetics
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Beauty, skincare & fragrances curated for you
        </p>

        {/* FILTERS (EthnicWear style) */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {brands.map(b => (
            <button
              key={b}
              onClick={() => setFilters({ ...filters, brand: b })}
              className={`font-medium ${
                filters.brand === b
                  ? "text-rose-600 border-b-2 border-rose-600"
                  : "text-gray-600"
              }`}
            >
              {b}
            </button>
          ))}

          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilters({ ...filters, category: c })}
              className={`font-medium ${
                filters.category === c
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(item => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              {/* ICONS */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <button
                  onClick={() => setQuickView(item)}
                  className="bg-white p-2 rounded-full shadow hover:bg-rose-600 hover:text-white"
                >
                  <FaEye />
                </button>

                <button
                  onClick={() => addToWishlist(item)}
                  className="bg-white p-2 rounded-full shadow"
                >
                  <FaHeart
                    className={
                      isWishlisted(item.id)
                        ? "text-red-500"
                        : "text-gray-400"
                    }
                  />
                </button>
              </div>

              {/* IMAGE */}
              <div className="h-52 md:h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* INFO */}
              <div className="p-4 text-center">
                <h3 className="font-semibold truncate">{item.name}</h3>
                <p className="text-rose-600 font-bold text-lg">
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
                        : "bg-rose-600 text-white hover:bg-rose-700"
                    }`}
                >
                  {isAdded(item.id) ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK VIEW MODAL (EthnicWear style) */}
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

                <p className="text-rose-600 text-2xl font-bold mt-4">
                  {quickView.price}
                </p>

                <p className="mt-4 text-gray-700">
                  {quickView.description}
                </p>

                <button
                  onClick={() => handleAddToCart(quickView)}
                  disabled={isAdded(quickView.id)}
                  className={`mt-8 w-full py-3 rounded-2xl font-semibold
                    ${
                      isAdded(quickView.id)
                        ? "bg-green-500 text-white"
                        : "bg-rose-600 text-white hover:bg-rose-700"
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
  );
};

export default Cosmetic;
