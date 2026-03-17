import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { ShoppingCartIcon, EyeIcon, XMarkIcon, HeartIcon } from "@heroicons/react/24/outline";

const CategoryPage = () => {
  const { slug } = useParams();
  const { addToCart, cart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const isInCart = (id) => cart.some((item) => item.id === id);

  const toggleWishlist = (product) => {
  if (wishlist.some((item) => item.id === product.id)) {
    setWishlist(wishlist.filter((item) => item.id !== product.id));
  } else {
    setWishlist([...wishlist, product]);
  }
};

const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  const filteredProducts = products.filter(
    (p) => { 
      const categoryMatch = p.category === slug;

  const searchMatch =
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.description &&
      p.description.toLowerCase().includes(searchTerm.toLowerCase()));

  return categoryMatch && searchMatch;
});

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 capitalize">
        {slug.replace("-", " ")}
      </h1>

      {/* SEARCH BAR */}
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        placeholder="Search products in this category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md px-4 py-2 rounded-xl border border-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
      />
    </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border hover:shadow-lg transition group"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => setQuickViewProduct(product)}
                  className="w-full h-44 sm:h-52 object-cover cursor-pointer
                            transition-transform duration-300 group-hover:scale-105"
                />
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">

                  {/* WISHLIST */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="bg-white p-2 rounded-full shadow hover:bg-red-50"
                >
                  <HeartIcon
                    className={`h-5 w-5 ${
                      isWishlisted(product.id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>


                {/* QUICK VIEW (DESKTOP HOVER) */}
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="
                    bg-white p-2 rounded-full shadow
                    opacity-0 group-hover:opacity-100
                    transition
                  "
                >
                  <EyeIcon className="h-5 w-5 text-gray-700" />
                </button>
              </div>
              </div>

              {/* CONTENT */}
              <div className="p-3 sm:p-4 flex flex-col">
                <h2 className="font-semibold text-sm sm:text-base line-clamp-1">
                  {product.name}
                </h2>

                <p className="mt-1 text-sm sm:text-base">
                  <span className="font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="ml-2 text-xs sm:text-sm line-through text-red-400">
                      ₹{product.oldPrice}
                    </span>
                  )}
                </p>

                {/* ADD BUTTON */}
                <button
                  onClick={() => addToCart(product)}
                  disabled={isInCart(product.id)}
                  className={`mt-3 sm:mt-4 w-full py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium
                    ${
                      isInCart(product.id)
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-pink-600 text-white hover:bg-pink-700"
                    }
                  `}
                >
                  <ShoppingCartIcon className="h-4 w-4" />
                  {isInCart(product.id) ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))
        )}
       
      </div>

      

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-white w-full max-w-md sm:max-w-lg rounded-2xl p-5 sm:p-6 relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-3 right-3 bg-gray-100 p-2 rounded-full"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-52 sm:h-60 object-cover rounded-xl"
            />

            <h2 className="mt-4 text-xl sm:text-2xl font-bold">
              {quickViewProduct.name}
            </h2>

            <p className="text-gray-600 mt-2 text-sm">
              {quickViewProduct.description ||
                "Premium quality fashion product for everyday style."}
            </p>

            <p className="mt-3 text-lg font-semibold">
              ₹{quickViewProduct.price}
              {quickViewProduct.oldPrice && (
                <span className="ml-2 line-through text-red-400 text-base">
                  ₹{quickViewProduct.oldPrice}
                </span>
              )}
            </p>

            <button
              onClick={() => addToCart(quickViewProduct)}
              disabled={isInCart(quickViewProduct.id)}
              className={`mt-5 w-full py-2 rounded-lg flex items-center justify-center gap-2 font-medium
                ${
                  isInCart(quickViewProduct.id)
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-pink-600 text-white hover:bg-pink-700"
                }
              `}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {isInCart(quickViewProduct.id) ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
