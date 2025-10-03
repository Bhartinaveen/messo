import React, { useState, useMemo } from 'react';
import Footer from '../components/Footer';

// --- SVG Icons for Categories ---
const MaleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const FemaleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>; // Using same icon for simplicity, can be replaced
const KidsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.03 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>; // Eye icon for 'view'

// --- Watch Data ---
const watches = [
  { id: 1, brand: 'Rolex', name: 'Submariner', price: '₹9,50,000', image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=2070&auto=format&fit=crop', category: 'Men' },
  { id: 2, brand: 'Omega', name: 'Speedmaster Moonwatch', price: '₹6,75,000', image: 'https://images.unsplash.com/photo-1620625432655-b6a6a72592ac?q=80&w=1974&auto=format&fit=crop', category: 'Men' },
  { id: 3, brand: 'Titan', name: 'Raga Viva', price: '₹8,500', image: 'https://images.unsplash.com/photo-1609581125292-39c490a78732?q=80&w=1974&auto=format&fit=crop', category: 'Women' },
  { id: 4, brand: 'Casio', name: 'G-Shock GA-2100', price: '₹9,995', image: 'https://images.unsplash.com/photo-1617232231268-6c8bf1843b23?q=80&w=1964&auto=format&fit=crop', category: 'Men' },
  { id: 5, brand: 'Fossil', name: 'Gen 6 Smartwatch', price: '₹24,995', image: 'https://images.unsplash.com/photo-1543468949-86c321172e73?q=80&w=1965&auto=format&fit=crop', category: 'Unisex' },
  { id: 6, brand: 'Rolex', name: 'Datejust 36', price: '₹12,00,000', image: 'https://images.unsplash.com/photo-1619134731321-c3935515c15a?q=80&w=1974&auto=format&fit=crop', category: 'Women' },
  { id: 7, brand: 'Timex', name: 'Weekender', price: '₹4,500', image: 'https://images.unsplash.com/photo-1594576722539-a71958644f53?q=80&w=1974&auto=format&fit=crop', category: 'Unisex' },
  { id: 8, brand: 'Garmin', name: 'Forerunner 245', price: '₹32,000', image: 'https://images.unsplash.com/photo-1617502237983-27357c2a712f?q=80&w=2070&auto=format&fit=crop', category: 'Unisex' },
  { id: 9, brand: 'Casio', name: 'Vintage Series', price: '₹3,500', image: 'https://images.unsplash.com/photo-1610130033104-2b769f3d32d0?q=80&w=1974&auto=format&fit=crop', category: 'Women' },
  { id: 10, brand: 'Titan', name: 'Zoop', price: '₹999', image: 'https://images.unsplash.com/photo-1595857186192-3a32f41b2e2a?q=80&w=2070&auto=format&fit=crop', category: 'Kids' },
  { id: 11, brand: 'Omega', name: 'Seamaster Aqua Terra', price: '₹5,20,000', image: 'https://images.unsplash.com/photo-1600003023827-019a6fed0d7a?q=80&w=1974&auto=format&fit=crop', category: 'Men' },
  { id: 12, brand: 'Timex', name: 'Kids Analog', price: '₹1,200', image: 'https://images.unsplash.com/photo-1508057198894-247b232d2161?q=80&w=2070&auto=format&fit=crop', category: 'Kids' },
];

const Watch = () => {
  const [filters, setFilters] = useState({ brand: 'All', category: 'All' });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredWatches = useMemo(() => {
    return watches.filter(watch => {
      const brandMatch = filters.brand === 'All' || watch.brand === filters.brand;
      const categoryMatch = filters.category === 'All' || watch.category === filters.category || (watch.category === 'Unisex' && (filters.category === 'Men' || filters.category === 'Women'));
      return brandMatch && categoryMatch;
    });
  }, [filters]);

  const brands = ['All', ...new Set(watches.map(watch => watch.brand))];
  const categories = ['All', 'Men', 'Women', 'Kids'];
  const categoryIcons = { 'Men': <MaleIcon />, 'Women': <FemaleIcon />, 'Kids': <KidsIcon /> };
  
  // --- Reusable Filter Button Component ---
  const FilterButton = ({ onClick, isActive, children }) => {
    return (
      <button
        onClick={onClick}
        className={`flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          isActive
            ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
            : 'bg-white text-gray-800 hover:bg-gray-100 shadow-md'
        }`}
      >
        {children}
      </button>
    );
  };

  return (
    <div>
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Timeless Collections
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of exquisite watches. Find your perfect timepiece with our advanced filters.
          </p>
        </header>

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
                <h3 className="text-xl font-bold text-gray-800 mb-4">Categories</h3>
                <div className="flex flex-wrap gap-4">
                    {categories.map(category => (
                        <FilterButton key={category} isActive={filters.category === category} onClick={() => handleFilterChange('category', category)}>
                          {categoryIcons[category]}
                          <span>{category}</span>
                        </FilterButton>
                    ))}
                </div>
            </div>
        </div>

        <main>
          {filteredWatches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {filteredWatches.map((watch) => (
                <div key={watch.id} className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-indigo-600 text-xs font-semibold px-2 py-1 rounded-full z-10">
                        {watch.brand}
                    </div>
                    <div className="h-72 overflow-hidden relative">
                      <img 
                        src={watch.image} 
                        alt={`${watch.brand} ${watch.name}`} 
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                      />
                      {/* Hover Overlay with only "View Now" button */}
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                          <button className="bg-white/90 backdrop-blur-sm text-indigo-600 font-bold py-3 px-8 rounded-full border-2 border-indigo-600 transition-all duration-300 transform scale-90 group-hover:scale-100 hover:bg-indigo-600 hover:text-white shadow-2xl cursor-pointer hover:cursor-pointer">
                            View Now
                          </button>
                      </div>
                    </div>
                    <div className="p-5 text-center">
                      <p className="text-lg font-bold text-gray-800 truncate">{watch.name}</p>
                      <p className="mt-2 text-xl font-semibold text-indigo-600">{watch.price}</p>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800">No Watches Found</h2>
                <p className="mt-3 text-gray-500">Please broaden your filter criteria to see more results.</p>
            </div>
          )}
        </main>
      </div>
    </div>

  <Footer/>
    </div>
  );
}

export default Watch;