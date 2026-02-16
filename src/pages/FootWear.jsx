import React, { useState, useMemo, useContext } from "react";
import { FaHeart, FaTimes, FaEye } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// ---------------- DATA ----------------
const products = [
  {
    id: 1,
    name: "Black Air Force 1",
    category: "SPORTS",
    price: "₹8,999",
    brand: "Nike",
    image: "/image/shoes1.jpeg",
    description: "Iconic Nike Air Force 1 with premium comfort.",
  },
  {
    id: 2,
    name: "Green & White Runner",
    category: "SPORTS",
    price: "₹7,499",
    brand: "Adidas",
    image: "/image/shoes2.jpeg",
    description: "Lightweight running shoes for daily workouts.",
  },
  {
    id: 3,
    name: "White High-Tops",
    category: "CASUAL",
    price: "₹12,495",
    brand: "Converse",
    image: "/image/shoes3.jpeg",
    description: "Classic high-top sneakers with timeless style.",
  },
  {
    id: 4,
    name: "Premium Leather Boots",
    category: "LEATHER",
    price: "₹15,999",
    brand: "Woodland",
    image: "/image/shoes7.jpeg",
    description: "Durable leather boots built for rugged use.",
  },
];

// ---------------- COMPONENT ----------------
const FootWear = () => {
  const { cart, addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist } = useWishlist();

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);
  const [addedItems, setAddedItems] = useState([]);

  const brands = ["All", ...new Set(products.map((p) => p.brand))];
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const brandOk = filters.brand === "All" || p.brand === filters.brand;
      const catOk =
        filters.category === "All" || p.category === filters.category;
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
  const isWishlisted = (id) => wishlist.some((w) => w.id === id);

  return (
    <div className="min-h-screen bg-gray-100 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Explore Footwear
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Sneakers, shoes & boots for every step
        </p>

        {/* FILTERS (EthnicWear style) */}
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
          {filteredProducts.map((item) => (
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
                    className={
                      isWishlisted(item.id)
                        ? "text-red-500"
                        : "text-gray-400"
                    }
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
                <p className="text-indigo-600 font-bold text-lg">
                  {item.price}
                </p>
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

                <p className="text-indigo-600 text-2xl font-bold mt-4">
                  {quickView.price}
                </p>

                <p className="mt-4 text-gray-700">
                  {quickView.description}
                </p>

                <button
                  onClick={() => handleAddToCart(quickView)}
                  disabled={isAdded(quickView.id)}
                  className={`mt-8 w-full py-3 rounded-2xl font-semibold ${
                    isAdded(quickView.id)
                      ? "bg-green-500 text-white"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {isAdded(quickView.id)
                    ? "Added to Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FootWear;
