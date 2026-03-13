import React, { useState, useMemo } from "react";
import { FaHeart, FaTimes, FaCheck, FaEye } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// --- Home Living Data ---
const homeliving = [
  { id: 1, brand: "HomeCentre", name: "Cotton Bedsheet Set", price: 2499, image: "/image/h1.jpeg", category: "Bedding", description: "Premium cotton bedsheet set with soft texture and elegant design." },
  { id: 2, brand: "Ikea", name: "Blackout Curtains", price: 1299, image: "/image/h2.jpeg", category: "Curtains", description: "High-quality blackout curtains for complete privacy." },
  { id: 3, brand: "West Elm", name: "Ceramic Vase", price: 899, image: "/image/h3.jpeg", category: "Decor", description: "Minimalist ceramic vase perfect for modern interiors." },
  { id: 4, brand: "Prestige", name: "Non-Stick Cookware Set", price: 3499, image: "/image/h4.jpeg", category: "Kitchenware", description: "Durable non-stick cookware set for everyday cooking." },
 
];

const HomeLiving = () => {
  const { addToCart, cart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);

  const brands = ["All", ...new Set(homeliving.map((i) => i.brand))];
  const categories = ["All", ...new Set(homeliving.map((i) => i.category))];

  const filteredHomeLiving = useMemo(() => {
    return homeliving.filter((item) => {
      const brandOk = filters.brand === "All" || item.brand === filters.brand;
      const catOk = filters.category === "All" || item.category === filters.category;

        const searchOk = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.brand.toLowerCase().includes(searchTerm.toLowerCase());

      return brandOk && catOk && searchOk;
    });
  }, [filters, searchTerm]);

  const isAdded = (id) => cart.some((i) => i.id === id);
  const isWishlisted = (id) => wishlist.some((i) => i.id === id);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Home & Living Collection
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Stylish & functional essentials for your home
        </p>

        {/* SEARCH BAR */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by product name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setFilters({ ...filters, brand: b })}
              className={`font-medium ${filters.brand === b ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"}`}
            >
              {b}
            </button>
          ))}
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilters({ ...filters, category: c })}
              className={`font-medium ${filters.category === c ? "text-pink-500 border-b-2 border-pink-500" : "text-gray-600"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredHomeLiving.map((item) => (
            <div key={item.id} className="relative bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

              {/* ICONS */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <button onClick={() => setQuickView(item)} className="bg-white p-2 rounded-full shadow hover:bg-purple-600 hover:text-white">
                  <FaEye />
                </button>
                <button onClick={() => addToWishlist(item)} className="bg-white p-2 rounded-full shadow hover:bg-purple-600 hover:text-white">
                  <FaHeart className={isWishlisted(item.id) ? "text-red-500" : "text-gray-400"} />
                </button>
              </div>

              {/* IMAGE */}
              <div className="h-44 md:h-64 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* INFO */}
              <div className="p-4 text-center">
                <h3 className="font-semibold truncate">{item.name}</h3>
                <p className="text-purple-600 font-bold text-lg">₹{item.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{item.brand}</p>

                <button
                  onClick={() => addToCart(item)}
                  disabled={isAdded(item.id)}
                  className={`mt-3 w-full py-2 rounded-xl font-semibold ${isAdded(item.id) ? "bg-green-500 text-white" : "bg-purple-600 text-white hover:bg-purple-700"}`}
                >
                  {isAdded(item.id) ? (<><FaCheck className="inline mr-1" /> Added</>) : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* QUICK VIEW MODAL */}
        {quickView && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl max-w-4xl w-full p-6 relative">
              <button onClick={() => setQuickView(null)} className="absolute top-4 right-4 text-xl">
                <FaTimes />
              </button>
              <div className="grid md:grid-cols-2 gap-6">
                <img src={quickView.image} alt={quickView.name} className="w-full h-80 object-cover rounded-2xl" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">{quickView.name}</h2>
                  <p className="text-gray-500">{quickView.brand}</p>
                  <p className="text-purple-600 text-2xl font-bold mt-4">₹{quickView.price.toLocaleString()}</p>
                  <p className="mt-4 text-gray-700">{quickView.description}</p>
                  <button
                    onClick={() => addToCart(quickView)}
                    disabled={isAdded(quickView.id)}
                    className={`mt-6 w-full py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 ${isAdded(quickView.id) ? "bg-green-500 text-white" : "bg-purple-600 text-white hover:bg-purple-700"}`}
                  >
                    {isAdded(quickView.id) ? (<><FaCheck className="inline mr-1" /> Added to Cart</>) : "Add to Cart"}
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

export default HomeLiving;
