import React, { useState } from 'react';

const Foot = () => {
  // Sample product data with prices in rupees
  const products = [
    {
      id: 1,
      name: "Black Air Force 1",
      category: "SHOES",
      price: "₹8,999",
      numericPrice: 8999,
      brand: "Nike",
      color: "Black",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "Green & White Runner",
      category: "SHOES",
      price: "₹7,499",
      numericPrice: 7499,
      brand: "Adidas",
      color: "Green",
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      name: "Red & White High-Tops",
      category: "SHOES",
      price: "₹12,495",
      numericPrice: 12495,
      brand: "Converse",
      color: "Red",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1605030753481-bb38b08c384a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      name: "Blue Sport Running",
      category: "SHOES",
      price: "₹9,499",
      numericPrice: 9499,
      brand: "Nike",
      color: "Blue",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      name: "Classic White Sneakers",
      category: "SHOES",
      price: "₹6,999",
      numericPrice: 6999,
      brand: "Adidas",
      color: "White",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1549289524-06cf8837ace4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      name: "Urban Street Style",
      category: "SHOES",
      price: "₹11,299",
      numericPrice: 11299,
      brand: "Puma",
      color: "Gray",
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1560769624-6a4c2dfc7f4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 7,
      name: "Premium Leather Boots",
      category: "BOOTS",
      price: "₹15,999",
      numericPrice: 15999,
      brand: "Woodland",
      color: "Brown",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 8,
      name: "Orange Trail Runners",
      category: "SHOES",
      price: "₹8,299",
      numericPrice: 8299,
      brand: "Skechers",
      color: "Orange",
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1573100925118-870b8efc799d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 9,
      name: "Purple Basketball Shoes",
      category: "SPORTS",
      price: "₹13,499",
      numericPrice: 13499,
      brand: "Nike",
      color: "Purple",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 10,
      name: "Yellow Casual Sneakers",
      category: "CASUAL",
      price: "₹5,799",
      numericPrice: 5799,
      brand: "Reebok",
      color: "Yellow",
      rating: 3.9,
      image: "https://images.unsplash.com/photo-1605030753481-bb38b08c384a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 11,
      name: "Pink Training Shoes",
      category: "SPORTS",
      price: "₹7,899",
      numericPrice: 7899,
      brand: "Puma",
      color: "Pink",
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 12,
      name: "Maroon Formal Shoes",
      category: "FORMAL",
      price: "₹10,499",
      numericPrice: 10499,
      brand: "Hush Puppies",
      color: "Maroon",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }
  ];

  // Filter options
  const brands = ["All", "Nike", "Adidas", "Converse", "Puma", "Reebok", "Skechers", "Woodland", "Hush Puppies"];
  const colors = ["All", "Black", "Green", "Red", "Blue", "White", "Gray", "Brown", "Orange", "Purple", "Yellow", "Pink", "Maroon"];
  const categories = ["All", "SHOES", "BOOTS", "SPORTS", "CASUAL", "FORMAL"];
  const priceRanges = [
    { id: 1, name: "All", min: 0, max: 20000 },
    { id: 2, name: "Under ₹5,000", min: 0, max: 5000 },
    { id: 3, name: "₹5,000 - ₹7,500", min: 5000, max: 7500 },
    { id: 4, name: "₹7,500 - ₹10,000", min: 7500, max: 10000 },
    { id: 5, name: "₹10,000 - ₹15,000", min: 10000, max: 15000 },
    { id: 6, name: "Over ₹15,000", min: 15000, max: 20000 }
  ];
  const ratings = ["All", "4.5+", "4.0+", "3.5+", "3.0+"];

  // State for filters
  const [filters, setFilters] = useState({
    brand: "All",
    color: "All",
    category: "All",
    priceRange: "All",
    rating: "All",
    searchQuery: "",
    sortBy: "featured"
  });

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Brand filter
    const brandMatch = filters.brand === "All" || product.brand === filters.brand;
    
    // Color filter
    const colorMatch = filters.color === "All" || product.color === filters.color;
    
    // Category filter
    const categoryMatch = filters.category === "All" || product.category === filters.category;
    
    // Price range filter
    let priceMatch = true;
    if (filters.priceRange !== "All") {
      const range = priceRanges.find(r => r.name === filters.priceRange);
      priceMatch = product.numericPrice >= range.min && product.numericPrice <= range.max;
    }
    
    // Rating filter
    let ratingMatch = true;
    if (filters.rating !== "All") {
      const minRating = parseFloat(filters.rating.replace('+', ''));
      ratingMatch = product.rating >= minRating;
    }
    
    // Search query filter
    const searchMatch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    return brandMatch && colorMatch && categoryMatch && priceMatch && ratingMatch && searchMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === "priceLowToHigh") {
      return a.numericPrice - b.numericPrice;
    } else if (filters.sortBy === "priceHighToLow") {
      return b.numericPrice - a.numericPrice;
    } else if (filters.sortBy === "rating") {
      return b.rating - a.rating;
    }
    // Default: featured (original order)
    return a.id - b.id;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Trending Footwear</h1>
          <p className="text-gray-600">Discover this week's most wanted products</p>
        </header>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4 bg-white p-6 rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Filters</h2>
            
            {/* Search Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category}`}
                      name="category"
                      checked={filters.category === category}
                      onChange={() => handleFilterChange("category", category)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Brand</h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="radio"
                      id={`brand-${brand}`}
                      name="brand"
                      checked={filters.brand === brand}
                      onChange={() => handleFilterChange("brand", brand)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Color Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-70 mb-2">Color</h3>
              <div className="space-y-2">
                {colors.map(color => (
                  <div key={color} className="flex items-center">
                    <input
                      type="radio"
                      id={`color-${color}`}
                      name="color"
                      checked={filters.color === color}
                      onChange={() => handleFilterChange("color", color)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`color-${color}`} className="ml-2 text-sm text-gray-700">
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <div key={range.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`price-${range.id}`}
                      name="priceRange"
                      checked={filters.priceRange === range.name}
                      onChange={() => handleFilterChange("priceRange", range.name)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`price-${range.id}`} className="ml-2 text-sm text-gray-700">
                      {range.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Rating</h3>
              <div className="space-y-2">
                {ratings.map(rating => (
                  <div key={rating} className="flex items-center">
                    <input
                      type="radio"
                      id={`rating-${rating}`}
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleFilterChange("rating", rating)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700">
                      {rating === "All" ? "All Ratings" : `${rating} Stars`}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reset Filters Button */}
            <button
              onClick={() => setFilters({
                brand: "All",
                color: "All",
                category: "All",
                priceRange: "All",
                rating: "All",
                searchQuery: "",
                sortBy: "featured"
              })}
              className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>
          
          {/* Products Grid */}
          <div className="w-full lg:w-3/4">
            {/* Results Count and Sort */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">
                Showing {sortedProducts.length} of {products.length} products
              </p>
              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-2">Sort by:</span>
                <select 
                  className="border border-gray-300 rounded-lg p-2 text-sm"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>
            
            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    {/* Product Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {product.brand}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.category}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current'}`} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <p className="text-xl font-bold text-gray-900">{product.price}</p>
                        <span className="inline-block h-4 w-4 rounded-full border border-gray-300" style={{backgroundColor: product.color.toLowerCase()}}></span>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 mt-4 flex items-center justify-center">
                        Add to Cart
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mt-4">No products found</h3>
                <p className="text-gray-600 mt-2">Try adjusting your filters to find what you're looking for.</p>
                <button
                  onClick={() => setFilters({
                    brand: "All",
                    color: "All",
                    category: "All",
                    priceRange: "All",
                    rating: "All",
                    searchQuery: "",
                    sortBy: "featured"
                  })}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>© 2023 Footwear Store. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Foot;