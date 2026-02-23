import React, { useState, useMemo } from "react";
import { FaHeart, FaTimes, FaEye } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// ---------------- DATA ----------------
const bottomWear = [
  {
    id: 1,
    brand: "UrbanFit",
    name: "Men Slim Fit Jeans",
    price: "₹1,499",
    image: "/image/mbottom1.jpeg",
    category: "Men",
    description: "Comfortable slim fit jeans for daily wear.",
  },
  {
    id: 2,
    brand: "StyleAura",
    name: "Women A-Line Skirt",
    price: "₹999",
    image: "/image/wbottom1.jpeg",
    category: "Women",
    description: "Elegant A-line skirt for casual & party wear.",
  },
  {
    id: 3,
    brand: "UrbanFit",
    name: "Men Chino Pants",
    price: "₹1,299",
    image: "/image/mbottom2.jpeg",
    category: "Men",
    description: "Stylish chinos with perfect fit.",
  },
  {
    id: 4,
    brand: "StyleAura",
    name: "Women Palazzos",
    price: "₹1,099",
    image: "/image/wbottom2.jpeg",
    category: "Women",
    description: "Trendy palazzos with soft fabric.",
  },
];

// ---------------- COMPONENT ----------------
const BottomWear = () => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();

  const [filters, setFilters] = useState({ brand: "All", category: "All" });
  const [quickView, setQuickView] = useState(null);
  const [addedItems, setAddedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const brands = ["All", ...new Set(bottomWear.map((i) => i.brand))];
  const categories = ["All", "Men", "Women"];

  const filteredItems = useMemo(() => {
    return bottomWear.filter((item) => {
      const brandOk = filters.brand === "All" || item.brand === filters.brand;
      const catOk =
        filters.category === "All" || item.category === filters.category;

      const searchOk = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.brand.toLowerCase().includes(searchTerm.toLowerCase());

      return brandOk && catOk && searchOk;
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Explore Bottom Wear
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Perfect fits for everyday comfort & style
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

export default BottomWear;
