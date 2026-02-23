import React, { useState, useMemo, useContext } from "react";
import { FaHeart, FaTimes, FaEye, FaCheck } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// --- Jewellery Data ---
const jewellery = [
  {
    id: 1,
    brand: "Kalyan",
    name: "Diamond Solitaire Necklace",
    price: 89999,
    image: "/image/jewel1.jpeg",
    type: "Necklace",
    description: "Premium diamond solitaire necklace with elegant finish."
  },
  {
    id: 2,
    brand: "Tanishq",
    name: "Gold Jhumka Earrings",
    price: 45499,
    image: "/image/jewel2.jpeg",
    type: "Earrings",
    description: "Traditional gold jhumkas perfect for weddings & festivals."
  },
  {
    id: 3,
    brand: "CaratLane",
    name: "Emerald Cut Ring",
    price: 62899,
    image: "/image/jewel3.jpeg",
    type: "Ring",
    description: "Modern emerald cut ring crafted with precision."
  },
  {
    id: 4,
    brand: "BlueStone",
    name: "Classic Tennis Bracelet",
    price: 124999,
    image: "/image/jewel4.jpeg",
    type: "Bracelet",
    description: "Luxury tennis bracelet with timeless sparkle."
  },
];

const Jewellery = () => {
  const { cart, addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist } = useWishlist();

  const [filters, setFilters] = useState({ brand: "All", type: "All" });
  const [quickView, setQuickView] = useState(null);
  const [addedItems, setAddedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const brands = ["All", ...new Set(jewellery.map((j) => j.brand))];
  const types = ["All", ...new Set(jewellery.map((j) => j.type))];

  const filteredJewellery = useMemo(() => {
    return jewellery.filter((item) => {
      const brandOk = filters.brand === "All" || item.brand === filters.brand;
      const typeOk = filters.type === "All" || item.type === filters.type;

      const searchOk = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.brand.toLowerCase().includes(searchTerm.toLowerCase());

      return brandOk && typeOk && searchOk;
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-amber-500">
          Jewellery Collection
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Elegant jewellery crafted for every occasion
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
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-600"
              }`}
            >
              {b}
            </button>
          ))}

          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilters({ ...filters, type: t })}
              className={`font-medium ${
                filters.type === t
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredJewellery.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              {/* ICONS */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <button
                  onClick={() => setQuickView(item)}
                  className="bg-white p-2 rounded-full shadow hover:bg-teal-600 hover:text-white"
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
                <p className="text-teal-600 font-bold text-lg">₹{item.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{item.brand}</p>

                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={isAdded(item.id)}
                  className={`mt-3 w-full py-2 rounded-xl font-semibold ${
                    isAdded(item.id)
                      ? "bg-green-500 text-white"
                      : "bg-teal-600 text-white hover:bg-teal-700"
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

                  <p className="text-teal-600 text-2xl font-bold mt-4">
                    ₹{quickView.price.toLocaleString()}
                  </p>

                  <p className="mt-4 text-gray-700">{quickView.description}</p>

                  <button
                    onClick={() => handleAddToCart(quickView)}
                    disabled={isAdded(quickView.id)}
                    className={`mt-8 w-full py-3 rounded-2xl font-semibold ${
                      isAdded(quickView.id)
                        ? "bg-green-500 text-white"
                        : "bg-teal-600 text-white hover:bg-teal-700"
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

export default Jewellery;
