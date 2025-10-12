import React, { useState, useMemo } from 'react';
import Footer from '../components/Footer';

// --- SVG Icons for Occasions ---
const WeddingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>;
const PartyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 5a3 3 0 013-3h4a3 3 0 013 3v1h-1.618a1.5 1.5 0 00-1.445.894L10 8.618l-1.937-1.724A1.5 1.5 0 006.618 6H5V5zM3 9a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" clipRule="evenodd" /></svg>;
const FestiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v1.333a3.333 3.333 0 013.333 3.334h1.334a1 1 0 110 2h-1.334a3.333 3.333 0 01-3.333 3.333V16a1 1 0 11-2 0v-2.333A3.333 3.333 0 014.333 10H3a1 1 0 110-2h1.333A3.333 3.333 0 017.667 4.667V4a1 1 0 011-1h.667z" /><path d="M10 11.667a1.667 1.667 0 100-3.334 1.667 1.667 0 000 3.334z" /></svg>;
const CasualIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1A.5.5 0 0110 2zM15.5 10a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM10 15.5a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM4.5 10a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5z" /><path d="M12.5 5.5a.5.5 0 01.354.146l.707.707a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707 0l-.707-.707a.5.5 0 010-.707l.707-.707a.5.5 0 01.353-.146zM7.5 12.5a.5.5 0 01.354.146l.707.707a.5.5 0 010 .707l-.707.707a.5.5 0 01-.707 0l-.707-.707a.5.5 0 010-.707l.707-.707a.5.5 0 01.353-.146zM10 5.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM5.5 7.5a.5.5 0 01.146.354l.707.707a.5.5 0 01-.707 0l-.707-.707a.5.5 0 010-.707l.707-.707a.5.5 0 01.353-.146z" /></svg>;


// --- Saree Data ---
const sarees = [
  { id: 1, type: 'Katan Silk', name: 'Crimson Red Bridal Saree', price: '₹14,999', image: '/image/sa1.jpg', occasion: 'Wedding' },
  { id: 2, type: 'Organza', name: 'Pastel Green Floral Saree', price: '₹8,499', image: '/image/sa2.jpg', occasion: 'Party' },
  { id: 3, type: 'Georgette', name: 'Royal Blue Zari Saree', price: '₹12,799', image: '/image/sa3.jpg', occasion: 'Festive' },
  { id: 4, type: 'Shattir', name: 'Classic Cream & Gold Saree', price: '₹6,299', image: '/image/sa4.jpg', occasion: 'Casual' },
];

const Saree = () => {
  const [filters, setFilters] = useState({ type: 'All', occasion: 'All' });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredSarees = useMemo(() => {
    return sarees.filter(saree => {
      const typeMatch = filters.type === 'All' || saree.type === filters.type;
      const occasionMatch = filters.occasion === 'All' || saree.occasion === filters.occasion;
      return typeMatch && occasionMatch;
    });
  }, [filters]);

  const types = ['All', ...new Set(sarees.map(saree => saree.type))];
  const occasions = ['All', ...new Set(sarees.map(saree => saree.occasion))];
  const occasionIcons = { 'Wedding': <WeddingIcon />, 'Party': <PartyIcon />, 'Festive': <FestiveIcon />, 'Casual': <CasualIcon /> };
  
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
                Banarasi Silk Emporium
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Drape yourself in elegance. Discover our handpicked collection of authentic Banarasi silk sarees.
            </p>
          </header>

          {/* --- Filter Section --- */}
          <div className="mb-12 p-6 bg-white/50 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200">
              <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Saree Types</h3>
                  <div className="flex flex-wrap gap-4">
                      {types.map(type => (
                          <FilterButton key={type} isActive={filters.type === type} onClick={() => handleFilterChange('type', type)}>{type}</FilterButton>
                      ))}
                  </div>
              </div>
              <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Occasions</h3>
                  <div className="flex flex-wrap gap-4">
                      {occasions.map(occasion => (
                          <FilterButton key={occasion} isActive={filters.occasion === occasion} onClick={() => handleFilterChange('occasion', occasion)}>
                              {occasionIcons[occasion]}
                              <span>{occasion}</span>
                          </FilterButton>
                      ))}
                  </div>
              </div>
          </div>

          {/* --- Saree Grid Section --- */}
          <main>
            {filteredSarees.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {filteredSarees.map((saree) => (
                  <div key={saree.id} className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
                      <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-pink-600 text-xs font-semibold px-2 py-1 rounded-full z-10">
                          {saree.type}
                      </div>
                      <div className="h-80 overflow-hidden relative">
                        <img 
                          src={saree.image} 
                          alt={`${saree.type} ${saree.name}`} 
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
                        <p className="text-lg font-bold text-gray-800 truncate">{saree.name}</p>
                        <p className="mt-2 text-xl font-semibold text-pink-600">{saree.price}</p>
                      </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-800">No Sarees Found</h2>
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

export default Saree;

