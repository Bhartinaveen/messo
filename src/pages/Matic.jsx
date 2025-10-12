import React, { useState, useMemo } from 'react';
import Footer from '../components/Footer';

// --- SVG Icons for Categories ---
const ProductIcon = () => <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm3 0a1 1 0 00-1 1v1a1 1 0 001 1h4a1 1 0 001-1V5a1 1 0 00-1-1H8z" /></svg>;

// --- Product Data ---
const products = [
  { id: 1, brand: 'Fenty Beauty', name: 'Pro Filt\'r Foundation', price: '₹3,499', image: '/image/co1.jpg', category: 'Makeup' },
  { id: 2, brand: 'Dior', name: 'J\'adore Eau de Parfum', price: '₹12,999', image: '/image/co2.jpg', category: 'Fragrance' },
  { id: 3, brand: 'The Ordinary', name: 'Niacinamide 10% + Zinc 1%', price: '₹899', image: '/image/co3.jpg', category: 'Skincare' },
  { id: 4, brand: 'MAC', name: 'Ruby Woo Lipstick', price: '₹1,799', image: '/image/co4.jpg', category: 'Makeup' },
];

const Matic = () => {
  const [filters, setFilters] = useState({ brand: 'All', category: 'All' });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const brandMatch = filters.brand === 'All' || item.brand === filters.brand;
      const categoryMatch = filters.category === 'All' || item.category === filters.category;
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  const brands = ['All', ...new Set(products.map(item => item.brand))];
  const categories = ['All', 'Makeup', 'Skincare', 'Fragrance'];
  
  // --- Reusable Filter Button Component ---
  const FilterButton = ({ onClick, isActive, children }) => {
    return (
      <button
        onClick={onClick}
        className={`flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 ${
          isActive
            ? 'bg-rose-600 text-white shadow-lg transform scale-105'
            : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
        }`}
      >
        {children}
      </button>
    );
  };

  return (

    <div>
    <div>
      <div className="bg-gray-100 min-h-screen font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tighter">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500">
                The Cosmetic Collection
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of premium products. Find your perfect match.
            </p>
          </header>

          {/* --- Filter Section --- */}
          <div className="mb-12 p-6 bg-white/50 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200">
              <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Brands</h3>
                  <div className="flex flex-wrap gap-4">
                      {brands.map(brand => (
                          <FilterButton key={brand} isActive={filters.brand === brand} onClick={() => handleFilterChange('brand', brand)}>{brand}</FilterButton>
                      ))}
                  </div>
              </div>
              <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Category</h3>
                  <div className="flex flex-wrap gap-4">
                      {categories.map(category => (
                          <FilterButton key={category} isActive={filters.category === category} onClick={() => handleFilterChange('category', category)}>
                              <ProductIcon />
                              <span>{category}</span>
                          </FilterButton>
                      ))}
                  </div>
              </div>
          </div>

          {/* --- Product Grid Section --- */}
          <main>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {filteredProducts.map((item) => (
                  <div key={item.id} className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
                      <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-rose-600 text-xs font-semibold px-2 py-1 rounded-full z-10">
                          {item.brand}
                      </div>
                      <div className="h-80 overflow-hidden relative">
                        <img 
                          src={item.image} 
                          alt={`${item.brand} ${item.name}`} 
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                            <button className="bg-white/90 backdrop-blur-sm text-rose-600 font-bold py-3 px-8 rounded-full border-2 border-rose-600 transition-all duration-300 transform scale-90 group-hover:scale-100 hover:bg-rose-600 hover:text-white shadow-2xl">
                              View Now
                            </button>
                        </div>
                      </div>
                      <div className="p-5 text-center">
                        <p className="text-lg font-bold text-gray-800 truncate">{item.name}</p>
                        <p className="mt-2 text-xl font-semibold text-rose-600">{item.price}</p>
                      </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-800">No Products Found</h2>
                  <p className="mt-3 text-gray-500">Please broaden your filter criteria to see more results.</p>
              </div>
            )}
          </main>
        </div>
      </div>
      
     
    </div>
     <Footer/>
    </div>
  );
}

export default Matic;

