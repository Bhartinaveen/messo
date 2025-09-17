import React from 'react';
import Footer from '../components/Footer';

const Explore = () => {
  // Sample data for categories with image URLs
  const categories = [
    { 
      name: 'Personal Care', 
      icon: '🧴',
      image: '/image/e1.jpg',
      description: 'Premium personal care products for your daily routine',
      brand: 'Messo Care'
    },
    { 
      name: 'Electronics', 
      icon: '💻',
      image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Latest gadgets and electronic devices',
      brand: 'Messo Tech'
    },
    { 
      name: 'Makeup', 
      icon: '💄',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Professional makeup and beauty products',
      brand: 'Messo Beauty'
    },
    { 
      name: 'Smart Phones', 
      icon: '📱',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Cutting-edge smartphones with latest features',
      brand: 'Messo Mobile'
    },
    { 
      name: 'Men Perfume', 
      icon: '🧴',
      image: '/image/e2.jpg',
      description: 'Luxury fragrances for the modern man',
      brand: 'Messo Fragrance'
    },
    { 
      name: 'Skincare', 
      icon: '✨',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Luxury skincare for radiant complexion',
      brand: 'Messo Skin'
    },
    { 
      name: 'Home Appliances', 
      icon: '🏠',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Smart home appliances for modern living',
      brand: 'Messo Home'
    },
    { 
      name: 'Fitness', 
      icon: '💪',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Premium fitness equipment and accessories',
      brand: 'Messo Fitness'
    },
  ];

  // Messo special products
  const messoProducts = [
    {
      name: 'Messo Pro Phone',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '$899',
      oldPrice: '$999',
      description: 'Flagship smartphone with advanced camera',
      tag: 'BESTSELLER'
    },
    {
      name: 'Messo Watch Series',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '$349',
      oldPrice: '$399',
      description: 'Smartwatch with health monitoring',
      tag: 'NEW'
    },
    {
      name: 'Messo Air Pods',
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '$179',
      oldPrice: '$199',
      description: 'Wireless earbuds with noise cancellation',
      tag: 'SALE'
    },
    {
      name: 'Messo Beauty Kit',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '$129',
      oldPrice: '$159',
      description: 'Complete makeup collection',
      tag: 'POPULAR'
    },
  ];

  return (

    <div>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Original Brands</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of high-quality products across various categories
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            {/* <span className="bg-blue-100 text-blue-800 p-2 rounded mr-3"></span> */}
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {messoProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.tag && (
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        product.tag === 'BESTSELLER' ? 'bg-red-100 text-red-800' :
                        product.tag === 'NEW' ? 'bg-blue-100 text-blue-800' :
                        product.tag === 'SALE' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {product.tag}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-gray-900">{product.price}</span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">{product.oldPrice}</span>
                      )}
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm">{category.description}</span>
                </div>
                <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                  <span className="text-xl">{category.icon}</span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-blue-600 text-sm font-medium">{category.brand}</p>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center text-sm">
                  Explore Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        
        
      </div>
    </div>
     <Footer />
    </div>
  );
};

export default Explore;