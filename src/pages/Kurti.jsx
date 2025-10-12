import { div } from 'framer-motion/client';
import React, { useState, useMemo } from 'react';
import Footer from '../components/Footer';

// --- SVG Icons for Categories ---
const StyleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 011.414-1.414L10 14.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd" /><path fillRule="evenodd" d="M10 3a1 1 0 011 1v10a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;


// --- Kurti Data ---
const kurtis = [
  { id: 1, brand: 'W for Woman', name: 'A-Line Cotton Kurti', price: '₹1,599', image: '/image/kr1.jpg', style: 'Casual' },
  { id: 2, brand: 'Biba', name: 'Embroidered Rayon Kurti', price: '₹2,199', image: '/image/kr8.jpg', style: 'Festive' },
  { id: 3, brand: 'Global Desi', name: 'Bohemian Print Kurti', price: '₹1,899', image: '/image/kr3.jpg', style: 'Casual' },
  { id: 4, brand: 'Libas', name: 'Straight Silk Kurti', price: '₹2,499', image: '/image/kr4.jpg', style: 'Formal' },
];

const Kurti = () => {
  const [filters, setFilters] = useState({ brand: 'All', style: 'All' });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredKurtis = useMemo(() => {
    return kurtis.filter(kurti => {
      const brandMatch = filters.brand === 'All' || kurti.brand === filters.brand;
      const styleMatch = filters.style === 'All' || kurti.style === filters.style;
      return brandMatch && styleMatch;
    });
  }, [filters]);

  const brands = ['All', ...new Set(kurtis.map(kurti => kurti.brand))];
  const styles = ['All', 'Casual', 'Festive', 'Formal'];
  
  // --- Reusable Filter Button Component ---
  const FilterButton = ({ onClick, isActive, children }) => {
    return (
      <button
        onClick={onClick}
        className={`flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
          isActive
            ? 'bg-pink-600 text-white shadow-lg transform scale-105'
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                The Kurti Collection
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover traditional and contemporary kurtis for every occasion. Find your perfect style.
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
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Styles</h3>
                  <div className="flex flex-wrap gap-4">
                      {styles.map(style => (
                          <FilterButton key={style} isActive={filters.style === style} onClick={() => handleFilterChange('style', style)}>
                              <StyleIcon />
                              <span>{style}</span>
                          </FilterButton>
                      ))}
                  </div>
              </div>
          </div>

          {/* --- Kurti Grid Section --- */}
          <main>
            {filteredKurtis.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {filteredKurtis.map((kurti) => (
                  <div key={kurti.id} className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
                      <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-pink-600 text-xs font-semibold px-2 py-1 rounded-full z-10">
                          {kurti.brand}
                      </div>
                      <div className="h-80 overflow-hidden relative">
                        <img 
                          src={kurti.image} 
                          alt={`${kurti.brand} ${kurti.name}`} 
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                            <button className="bg-white/90 backdrop-blur-sm text-pink-600 font-bold py-3 px-8 rounded-full border-2 border-pink-600 transition-all duration-300 transform scale-90 group-hover:scale-100 hover:bg-pink-600 hover:text-white shadow-2xl">
                              View Now
                            </button>
                        </div>
                      </div>
                      <div className="p-5 text-center">
                        <p className="text-lg font-bold text-gray-800 truncate">{kurti.name}</p>
                        <p className="mt-2 text-xl font-semibold text-pink-600">{kurti.price}</p>
                      </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-800">No Kurtis Found</h2>
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

export default Kurti;
