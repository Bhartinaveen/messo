import React from 'react';

// --- SVG Icon Components ---
const HeartIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ArrowLeftIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6"/>
    </svg>
);

const ArrowRightIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6"/>
    </svg>
);


// --- Main Product Data ---
// Updated mock data to match the new design and structure.
const products = [
  {
    id: 1,
    name: 'The north coat',
    price: 260,
    oldPrice: 360,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tag: { text: 'Hot', color: 'bg-orange-500' }
  },
  {
    id: 2,
    name: 'Gucci duffle bag',
    price: 960,
    oldPrice: 1160,
    image: 'https://images.unsplash.com/photo-1583471240194-83957a3e731e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tag: { text: 'Sale', color: 'bg-red-500' }
  },
  {
    id: 3,
    name: 'RGB liquid CPU Cooler',
    price: 160,
    oldPrice: 170,
    image: 'https://images.unsplash.com/photo-1627281794939-ab8503881677?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tag: { text: 'New', color: 'bg-blue-500' }
  },
  {
    id: 4,
    name: 'Small Booksell',
    price: 360,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tag: { text: 'Trending', color: 'bg-green-500' }
  },
  {
    id: 5,
    name: 'Gaming Laptop',
    price: 1250,
    oldPrice: 1500,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tag: { text: 'New', color: 'bg-blue-500' }
  },
  {
    id: 6,
    name: 'Wireless Gamepad',
    price: 55,
    image: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tag: { text: 'Hot', color: 'bg-orange-500' }
  },
  {
    id: 7,
    name: 'Soccer Cleats',
    price: 120,
    oldPrice: 150,
    image: 'https://images.unsplash.com/photo-1608229842248-8a24493a5530?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tag: { text: 'Sale', color: 'bg-red-500' }
  },
  {
    id: 8,
    name: 'Satin Jacket',
    price: 85,
    image: 'https://images.unsplash.com/photo-1591047139829-d916b67ea74f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    tag: { text: 'Trending', color: 'bg-green-500' }
  },
];

// --- Product Card Component ---
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        {product.tag && (
            <div className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full z-10 ${product.tag.color}`}>
                {product.tag.text}
            </div>
        )}
        <button className="absolute top-4 right-4 bg-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors z-10">
            <HeartIcon className="w-4 h-4" />
        </button>
        <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" 
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/f3f4f6/333333?text=Image+Not+Found&font=sans'; }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800 text-lg truncate mb-4">{product.name}</h3>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
            <div>
                {product.oldPrice && (
                    <span className="text-gray-400 line-through mr-2">₹{product.oldPrice.toLocaleString('en-IN')}</span>
                )}
                <span className="text-gray-800 font-bold text-lg">₹{product.price.toLocaleString('en-IN')}</span>
            </div>
            <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <span className="text-xl">+</span> Add
            </button>
        </div>
      </div>
    </div>
  );
};


// --- Main App Component ---
export default function Explor() {
  return (
    <div className="bg-white font-sans text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-red-500 rounded"></div>
            <h2 className="text-red-500 font-semibold">Our Products</h2>
        </div>

        {/* Section Title and Navigation */}
        <div className="flex justify-between items-end mt-6 mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-wider">Explore Our Products</h1>
            <div className="hidden sm:flex items-center gap-2">
                <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <ArrowLeftIcon className="w-6 h-6"/>
                </button>
                 <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <ArrowRightIcon className="w-6 h-6"/>
                </button>
            </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

