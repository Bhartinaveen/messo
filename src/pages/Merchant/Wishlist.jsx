import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { HeartOff, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 text-center">
        <HeartOff size={60} className="text-gray-400" />
        <h2 className="text-xl font-semibold mt-4">Your Wishlist is Empty</h2>
        <p className="text-sm mt-1">Save items you love to your wishlist</p>

        <Link
          to="/explore"
          className="mt-5 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Wishlist</h2>
        <span className="text-sm text-gray-500">
          {wishlist.length} Items
        </span>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {wishlist.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >

            {/* Product Image */}
            <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">

              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}

            </div>

            {/* Product Info */}
            <div className="flex-1 mt-4">

              <h3 className="font-semibold text-gray-800 line-clamp-2">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {item.description || "No description available"}
              </p>

              <p className="text-lg font-bold text-orange-600 mt-2">
                ₹ {item.price}
              </p>

            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">

              <button
                onClick={() => {
                  addToCart(item);
                  removeFromWishlist(item.id);
                }}
                className="flex items-center justify-center gap-1 flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm"
              >
                <ShoppingCart size={16} />
                Move to Cart
              </button>

              <button
                onClick={() => removeFromWishlist(item.id)}
                className="flex items-center justify-center border border-gray-300 hover:bg-gray-100 px-3 rounded-lg"
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
};

export default Wishlist;