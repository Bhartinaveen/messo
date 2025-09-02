import React, { useState } from 'react';

const Bestpro = () => {
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [cartItems, setCartItems] = useState({});
  
  const products = [
    {
      id: 1,
      name: "The north coat",
      originalPrice: 360,
      salePrice: 260,
      rating: 5,
      reviews: 65,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      badge: "Hot"
    },
    {
      id: 2,
      name: "Qucci duffle bag",
      originalPrice: 160,
      salePrice: 960,
      rating: 5,
      reviews: 65,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      badge: "Sale"
    },
    {
      id: 3,
      name: "ROB liquid CPU Cooler",
      originalPrice: 170,
      salePrice: 160,
      rating: 5,
      reviews: 65,
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      badge: "New"
    },
    {
      id: 4,
      name: "Small Booksell",
      originalPrice: null,
      salePrice: 360,
      rating: 5,
      reviews: 65,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      badge: "Trending"
    },
    {
      id: 5,
      name: "Wireless Headphones",
      originalPrice: 120,
      salePrice: 89,
      rating: 4,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      badge: "Sale"
    },
    {
      id: 6,
      name: "Smart Watch",
      originalPrice: 250,
      salePrice: 199,
      rating: 5,
      reviews: 88,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      badge: "Popular"
    },
    {
      id: 7,
      name: "Designer Sunglasses",
      originalPrice: 180,
      salePrice: 120,
      rating: 4,
      reviews: 36,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      badge: "New"
    },
    {
      id: 8,
      name: "Fitness Tracker",
      originalPrice: 99,
      salePrice: 79,
      rating: 4,
      reviews: 57,
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      badge: "Sale"
    }
  ];

  const loadMore = () => {
    setVisibleProducts(prev => prev + 4);
  };

  const addToCart = (productId) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId) => {
    if (cartItems[productId] > 1) {
      setCartItems(prev => ({
        ...prev,
        [productId]: prev[productId] - 1
      }));
    } else {
      const newCartItems = { ...cartItems };
      delete newCartItems[productId];
      setCartItems(newCartItems);
    }
  };

  const getCartQuantity = (productId) => {
    return cartItems[productId] || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Best Selling Products</h2>
          <p className="mt-3 text-lg text-gray-600">Discover our most popular items loved by customers</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, visibleProducts).map((product) => {
            const cartQuantity = getCartQuantity(product.id);
            
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  {/* Product badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      product.badge === "Sale" ? "bg-red-500 text-white" : 
                      product.badge === "New" ? "bg-blue-500 text-white" : 
                      product.badge === "Hot" ? "bg-orange-500 text-white" : 
                      "bg-emerald-500 text-white"
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                  
                  {/* Wishlist button */}
                  <div className="absolute top-3 right-3">
                    <button className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-red-500 hover:text-white transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-xs text-gray-600">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      {product.originalPrice && (
                        <p className="text-xs text-gray-500 line-through mr-2">${product.originalPrice}</p>
                      )}
                      <p className="text-lg font-bold text-gray-900">${product.salePrice}</p>
                    </div>
                    
                    {cartQuantity > 0 ? (
                      <div className="flex items-center space-x-2 bg-blue-100 rounded-full py-1 px-3">
                        <button 
                          onClick={() => removeFromCart(product.id)}
                          className="text-blue-700 hover:text-blue-900 font-bold text-lg"
                        >
                          -
                        </button>
                        <span className="text-blue-800 font-medium">{cartQuantity}</span>
                        <button 
                          onClick={() => addToCart(product.id)}
                          className="text-blue-700 hover:text-blue-900 font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => addToCart(product.id)}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {visibleProducts < products.length && (
          <div className="text-center mt-12">
            <button 
              onClick={loadMore}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              View More Products
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
        
       
      </div>
    </div>
  );
};

export default Bestpro;