import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { EyeIcon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useWishlist } from "../../context/WishlistContext";

const recommendedProducts = [
  { id: 1, name: "Laptop Backpack", price: 45999, image: "/image/recommend 1.jpg", tag: "Best Seller" },
  { id: 2, name: "Stainless Steel Water Bottle", price: 1299, image: "/image/recommend 2.jpg", tag: "Trending" },
  { id: 3, name: "Sneakers", price: 2599, image: "/image/recommend 3.jpg", tag: "Hot" },
  { id: 4, name: "Sunglasses", price: 1299, image: "/image/recommend 4.jpg", tag: "New" },
  { id: 5, name: "Wireless Mouse", price: 999, image: "/image/recommend 5.jpg", tag: "Popular" },
];

const Recommended = ({ sortBy }) => {
  const { addToCart, cart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [quickView, setQuickView] = useState(null);

  const isInCart = (id) => cart.some((item) => item.id === id);
  const isWished = (id) => wishlist.some((w) => w.id === id);

  // sorting
  const sortedProducts = [...recommendedProducts];
  if (sortBy === "lowToHigh") sortedProducts.sort((a, b) => a.price - b.price);
  else if (sortBy === "highToLow") sortedProducts.sort((a, b) => b.price - a.price);
  else if (sortBy === "newest") sortedProducts.sort((a, b) => b.id - a.id);

  return (
    <div className="mb-10 px-2 md:px-0">
      <h3 className="text-2xl md:text-3xl font-bold mb-4">✨ Recommended for You</h3>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-44 md:w-52 bg-white rounded-2xl shadow-md overflow-hidden snap-start"
          >
            {/* IMAGE SECTION */}
            <div className="relative h-40 md:h-44 w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-t-2xl"
              />

              <span className="absolute top-2 left-2 text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
                {product.tag}
              </span>

              {/* WISHLIST */}
              <button
                onClick={() =>
                  isWished(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
              >
                {isWished(product.id) ? (
                  <HeartSolid className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartOutline className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {/* QUICK VIEW (EYE ICON) */}
              <button
                onClick={() => setQuickView(product)}
                className="absolute top-2 right-12 p-2 bg-white rounded-full shadow"
              >
                <EyeIcon className="h-5 w-5" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-3 text-center">
              <h4 className="font-semibold text-sm md:text-base truncate">
                {product.name}
              </h4>
              <p className="text-sm md:text-lg font-bold mt-1">
                ₹{product.price}
              </p>

              <button
                onClick={() => addToCart(product)}
                disabled={isInCart(product.id)}
                className={`mt-2 w-full py-2 rounded-lg text-white text-sm flex items-center justify-center gap-2 ${
                  isInCart(product.id)
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700"
                }`}
              >
                <ShoppingCartIcon className="h-4 w-4" />
                {isInCart(product.id) ? "Added ✓" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK VIEW MODAL */}
      {quickView && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <div className="bg-white p-5 rounded-2xl w-full max-w-md relative">
            <button
              onClick={() => setQuickView(null)}
              className="absolute top-3 right-3"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <img
              src={quickView.image}
              alt={quickView.name}
              className="w-full h-56 object-cover rounded-xl"
            />

            <h2 className="mt-4 text-xl font-bold">{quickView.name}</h2>
            <p className="text-xl font-semibold text-pink-600">
              ₹{quickView.price}
            </p>

            <button
              onClick={() => addToCart(quickView)}
              disabled={isInCart(quickView.id)}
              className={`mt-4 w-full py-2 rounded-lg text-white ${
                isInCart(quickView.id)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}
            >
              {isInCart(quickView.id) ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommended;
