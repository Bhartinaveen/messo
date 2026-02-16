import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { HeartOff, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-gray-500">
        <HeartOff size={40} />
        <p className="mt-3">Your wishlist is empty</p>
        <Link to="/explore" className="mt-3 px-4 py-2 bg-orange-500 text-white rounded">Browse Products</Link>
      
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishlist.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl shadow flex gap-4 items-center">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="text-sm text-gray-400">No Image</div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600 font-bold">₹ {item.price}</p>
              </div>

              <p className="text-sm text-gray-500 mt-1 truncate">{item.description || ''}</p>

              <div className="flex items-center gap-3 mt-3">
                <button onClick={() => { addToCart(item); removeFromWishlist(item.id); }} className="px-3 py-1 bg-orange-500 text-white rounded">Move to Cart</button>
                <button onClick={() => removeFromWishlist(item.id)} className="px-3 py-1 border rounded">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
