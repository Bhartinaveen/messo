import React from 'react';

// --- Helper Component for the "Shop Now" link with an underline effect ---
const ShopNowLink = () => (
    <a href="#" className="mt-4 inline-block text-gray-900 dark:text-white font-semibold relative group text-sm">
        <span>Shop Now</span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 dark:bg-white transform scale-x-100 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
    </a>
);


// --- Main NewAriv Component ---
const NewAriv = () => {
  return (
    <div className="bg-[#FEEBF6]  text-gray-900 dark:text-white min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-5 h-8 bg-red-500 rounded-sm"></div>
            <p className="text-red-500 font-semibold">Featured</p>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">New Arrival</h1>
        </div>
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side: Large Product Card (PlayStation 5) */}
          <div className="relative col-span-1 bg-white dark:bg-gray-900 rounded-lg overflow-hidden flex flex-col justify-between p-8 min-h-[30rem] lg:min-h-[40rem]">
              <img 
                src="/image/l7.jpg"
                alt="Tshirt" 
                className="absolute inset-0 w-full h-full object-contain object-center z-0"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x800/FFFFFF/000000?text=Image+Error'; }}
              />
              <div className="relative z-10 flex flex-col justify-end h-full text-gray-900 dark:text-white">
                <h2 className="text-3xl font-bold">Tshirt</h2>
                
                <ShopNowLink />
              </div>
          </div>
          
          {/* Right Side: Grid for smaller cards */}
          <div className="col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            
            {/* Women's Collections Card */}
            <div className="relative md:col-span-2 lg:col-span-1 bg-white dark:bg-gray-900 rounded-lg overflow-hidden flex items-center p-8 min-h-[19rem]">
                <img 
                    src="/image/s9.jpg" 
                    alt="Woman in a stylish hat" 
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 dark:opacity-40"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/FFFFFF/000000?text=Image+Error'; }}
                />
                <div className="relative z-10 text-gray-900 dark:text-white">
                    <h3 className="text-2xl font-bold">Women's Collections</h3>
                   
                    <ShopNowLink />
                </div>
            </div>
            
            <div className="md:col-span-2 lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Speakers Card */}
              <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center p-8 min-h-[19rem]">
                  <img 
                      src="/image/s10.jpg" 
                      alt="Amazon Alexa speakers" 
                      className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 dark:opacity-40"
                      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/FFFFFF/000000?text=Image+Error'; }}
                  />
                  <div className="relative z-10 text-gray-900 dark:text-white text-center">
                      <h3 className="text-2xl font-bold">coat pant</h3>
                     
                      <ShopNowLink />
                  </div>
              </div>
              
              {/* Perfume Card */}
              <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center p-8 min-h-[19rem]">
                  <img 
                      src="/image/s11.jpg" 
                      alt="Gucci Intense Oud EDP perfume" 
                      className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 dark:opacity-40"
                      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/FFFFFF/000000?text=Image+Error'; }}
                  />
                  <div className="relative z-10 text-gray-900 dark:text-white text-center">
                      <h3 className="text-2xl font-bold">Perfume</h3>
                     
                      <ShopNowLink />
                  </div>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default NewAriv;

