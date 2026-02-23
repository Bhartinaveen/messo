import React, { useState, useMemo } from "react";
import { FaHeart, FaTimes, FaCheck, FaEye } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const kidswear = [
  { id: 1, brand: "Gini & Jony", name: "Cartoon Print T-Shirt", price: 799, image: "/image/kid1.jpeg", category: "T-Shirt", description: "Fun cartoon print t-shirt made with soft cotton fabric." },
  { id: 2, brand: "H&M", name: "Denim Shorts", price: 999, image: "/image/kid2.jpeg", category: "Shorts", description: "Comfortable denim shorts perfect for outdoor play." },
  { id: 3, brand: "Mini Klub", name: "Floral Dress", price: 1299, image: "/image/kid3.jpeg", category: "Dress", description: "Beautiful floral dress with breathable fabric." },
  { id: 4, brand: "UCB", name: "Hooded Jacket", price: 1499, image: "/image/kid4.jpeg", category: "Jacket", description: "Warm hooded jacket for winter outings." },

];

const KidsWear = () => {
  const { addToCart, cart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const brands = ["All", ...new Set(kidswear.map((i) => i.brand))];
  const categories = ["All", ...new Set(kidswear.map((i) => i.category))];

  const filteredKidswear = useMemo(() => {
    return kidswear.filter((item) => {
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-600">
          KidsWear Collection
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Cute, colorful & comfy styles for kids
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
              className={`font-medium ${filters.brand === b ? "text-green-600 border-b-2 border-green-600" : "text-gray-600"}`}
            >
              {b}
            </button>
          ))}
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilters({ ...filters, category: c })}
              className={`font-medium ${filters.category === c ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-600"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredKidswear.map((item) => (
            <div key={item.id} className="relative bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

              {/* ICONS */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <button onClick={() => setQuickView(item)} className="bg-white p-2 rounded-full shadow hover:bg-green-600 hover:text-white">
                  <FaEye />
                </button>
                <button onClick={() => addToWishlist(item)} className="bg-white p-2 rounded-full shadow hover:bg-green-600 hover:text-white">
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
                <p className="text-green-600 font-bold text-lg">₹{item.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{item.brand}</p>

                <button
                  onClick={() => addToCart(item)}
                  disabled={isAdded(item.id)}
                  className={`mt-3 w-full py-2 rounded-xl font-semibold ${isAdded(item.id) ? "bg-green-500 text-white" : "bg-teal-600 text-white hover:bg-teal-700"}`}
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
                  <p className="text-green-600 text-2xl font-bold mt-4">₹{quickView.price.toLocaleString()}</p>
                  <p className="mt-4 text-gray-700">{quickView.description}</p>
                  <button
                    onClick={() => addToCart(quickView)}
                    disabled={isAdded(quickView.id)}
                    className={`mt-6 w-full py-3 rounded-2xl font-semibold ${isAdded(quickView.id) ? "bg-green-500 text-white" : "bg-teal-600 text-white hover:bg-teal-700"}`}
                  >
                    {isAdded(quickView.id) ? (<><FaCheck className="inline mr-1" /> Added</>) : "Add to Cart"}
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

export default KidsWear;
