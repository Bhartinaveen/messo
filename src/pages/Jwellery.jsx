import React, { useState, useMemo } from 'react';
import Footer from '../components/Footer';

// --- SVG Icons for Categories ---
const JewelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 01.894.553l2.5 5.01a1 1 0 01.01 1.05l-2.5 5.008a1 1 0 01-1.808-.823l2.09-4.18-2.09-4.181a1 1 0 01.894-1.428zM3.894.553a1 1 0 011.808.823l-2.09 4.18 2.09 4.181a1 1 0 01-1.808.824l-2.5-5.009a1 1 0 01-.01-1.05l2.5-5.01A1 1 0 013.894.553z" clipRule="evenodd" /></svg>;


// --- Jewellery Data ---
const jwellery = [
  { id: 1, brand: 'Kalyan', name: 'Diamond Solitaire Necklace', price: '₹89,999', image: '/image/ja1.jpg', type: 'Necklace' },
  { id: 2, brand: 'Tanishq', name: 'Gold Jhumka Earrings', price: '₹45,499', image: '/image/ja2.jpg', type: 'Earrings' },
  { id: 3, brand: 'CaratLane', name: 'Emerald Cut Ring', price: '₹62,899', image: '/image/ja3.jpg', type: 'Ring' },
  { id: 4, brand: 'BlueStone', name: 'Classic Tennis Bracelet', price: '₹1,24,999', image: '/image/ja4.jpg', type: 'Bracelet' },
];

const Jwellery = () => {
  const [filters, setFilters] = useState({ brand: 'All', type: 'All' });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredJwellery = useMemo(() => {
    return jwellery.filter(item => {
      const brandMatch = filters.brand === 'All' || item.brand === filters.brand;
      const typeMatch = filters.type === 'All' || item.type === filters.type;
      return brandMatch && typeMatch;
    });
  }, [filters]);

  const brands = ['All', ...new Set(jwellery.map(item => item.brand))];
  const types = ['All', 'Necklace', 'Earrings', 'Ring', 'Bracelet'];
  
  // --- Reusable Filter Button Component ---
  const FilterButton = ({ onClick, isActive, children }) => {
    return (
      <button
        onClick={onClick}
        className={`flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
          isActive
            ? 'bg-teal-600 text-white shadow-lg transform scale-105'
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-amber-500">
                The Jewellery Haven
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our exquisite collection of fine jewellery. Find the perfect piece to adorn yourself.
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
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Type</h3>
                  <div className="flex flex-wrap gap-4">
                      {types.map(type => (
                          <FilterButton key={type} isActive={filters.type === type} onClick={() => handleFilterChange('type', type)}>
                              <JewelIcon />
                              <span>{type}</span>
                          </FilterButton>
                      ))}
                  </div>
              </div>
          </div>

          {/* --- Jewellery Grid Section --- */}
          <main>
            {filteredJwellery.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {filteredJwellery.map((item) => (
                  <div key={item.id} className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
                      <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-teal-600 text-xs font-semibold px-2 py-1 rounded-full z-10">
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
                            <button className="bg-white/90 backdrop-blur-sm text-teal-600 font-bold py-3 px-8 rounded-full border-2 border-teal-600 transition-all duration-300 transform scale-90 group-hover:scale-100 hover:bg-teal-600 hover:text-white shadow-2xl">
                              View Now
                            </button>
                        </div>
                      </div>
                      <div className="p-5 text-center">
                        <p className="text-lg font-bold text-gray-800 truncate">{item.name}</p>
                        <p className="mt-2 text-xl font-semibold text-teal-600">{item.price}</p>
                      </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-800">No Jewellery Found</h2>
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

export default Jwellery;
