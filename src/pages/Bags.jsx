import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaTimes, FaCheck, FaHeart, FaEye } from "react-icons/fa";

// --- Bags Data ---
const bags = [
  { id: 1, brand: "Hidesign", name: "Leather Handbag", price: 5999, image: "/image/bag1.jpeg", category: "Handbag", description: "Premium leather handbag perfect for daily elegance." },
  { id: 2, brand: "Puma", name: "Sports Backpack", price: 2799, image: "/image/bag2.jpeg", category: "Backpack", description: "Lightweight sports backpack with spacious compartments." },
  { id: 3, brand: "Fossil", name: "Sling Bag", price: 3499, image: "/image/bag3.jpeg", category: "Sling Bag", description: "Stylish sling bag with premium finish." },
  { id: 4, brand: "Titan", name: "Leather Tote Bag", price: 4199, image: "/image/bag4.jpeg", category: "Tote Bag", description: "Spacious leather tote bag for office and travel." },

];

const Bags = () => {
  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);
  const [addedItems, setAddedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const brands = ["All", ...new Set(bags.map((b) => b.brand))];
  const categories = ["All", ...new Set(bags.map((b) => b.category))];

  const filteredBags = useMemo(() => {
    return bags.filter((item) => {
      const brandMatch = filters.brand === "All" || item.brand === filters.brand;
      const categoryMatch = filters.category === "All" || item.category === filters.category;
      const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return brandMatch && categoryMatch && searchMatch;
    });
  }, [filters, searchTerm]);

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
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
          Stylish Bags Collection
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Premium bags designed for style, comfort, and everyday use
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
              className={`font-medium ${
                filters.brand === b ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-600"
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
                filters.category === c ? "text-purple-600 border-b-2 border-purple-600" : "text-gray-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBags.map((item) => (
            <div key={item.id} className="relative bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

              {/* ICONS */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <button
                  onClick={() => setQuickView(item)}
                  className="bg-white p-2 rounded-full shadow hover:bg-pink-600 hover:text-white"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => addToWishlist(item)}
                  className="bg-white p-2 rounded-full shadow hover:bg-pink-600 hover:text-white"
                >
                  <FaHeart className={isWishlisted(item.id) ? "text-red-500" : "text-gray-400"} />
                </button>
              </div>

              {/* IMAGE */}
              <div className="h-52 md:h-80 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* INFO */}
              <div className="p-4 text-center">
                <h3 className="font-semibold truncate">{item.name}</h3>
                <p className="text-pink-600 font-bold text-lg">₹{item.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{item.brand}</p>

                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={isAdded(item.id)}
                  className={`mt-3 w-full py-2 rounded-xl font-semibold ${
                    isAdded(item.id) ? "bg-pink-500 text-white" : "bg-pink-600 text-white hover:bg-pink-700"
                  }`}
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
              <button onClick={() => setQuickView(null)} className="absolute top-4 right-4 text-xl"><FaTimes /></button>
              <div className="grid md:grid-cols-2 gap-6">
                <img src={quickView.image} alt={quickView.name} className="w-full h-80 object-cover rounded-2xl" />
                <div>
                  <h2 className="text-3xl font-bold">{quickView.name}</h2>
                  <p className="text-gray-500">{quickView.brand}</p>
                  <p className="text-pink-600 text-2xl font-bold mt-4">₹{quickView.price.toLocaleString()}</p>
                  <p className="mt-4 text-gray-700">{quickView.description}</p>
                  <button
                    onClick={() => handleAddToCart(quickView)}
                    disabled={isAdded(quickView.id)}
                    className={`mt-8 w-full py-3 rounded-2xl font-semibold ${
                      isAdded(quickView.id) ? "bg-pink-500 text-white" : "bg-pink-600 text-white hover:bg-pink-700"
                    }`}
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

export default Bags;
