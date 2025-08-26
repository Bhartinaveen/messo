import React from 'react';

// SVG Icon Components for clarity and reusability

const PhoneIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const ComputerIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const SmartWatchIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="5" width="10" height="14" rx="2"></rect>
    <path d="M17 5V2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v3"></path>
    <path d="M17 19v3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-3"></path>
  </svg>
);

const CameraIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
    <circle cx="12" cy="13" r="3"></circle>
  </svg>
);

const HeadphoneIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2z"></path>
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path>
  </svg>
);

const GamingIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
    <path d="M12 12h.01"></path>
    <path d="M17 10v4"></path>
    <path d="M15 12h4"></path>
    <path d="M7 12h2"></path>
  </svg>
);

const SportsIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"></path>
        <path d="M12 5l7 7-7 7"></path>
        <path d="M12 5L5 12l7 7"></path>
    </svg>
);

const GroceryIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
);

// Data for the category items
const categories = [
  { name: 'Phones', icon: PhoneIcon },
  { name: 'Computers', icon: ComputerIcon },
  { name: 'SmartWatch', icon: SmartWatchIcon },
  { name: 'Camera', icon: CameraIcon },
  { name: 'HeadPhones', icon: HeadphoneIcon },
  { name: 'Gaming', icon: GamingIcon },
  { name: 'Sports', icon: SportsIcon },
  { name: 'Grocery', icon: GroceryIcon },
];

const Itemfor = () => {
  return (
    <div className="bg-white font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
            <div className='flex flex-col gap-4'>
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-blue-500 rounded"></div>
                    <p className="text-blue-500 font-semibold">Categories</p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-800">
                    Browse By Category
                </h2>
            </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 text-center">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 sm:p-8 border rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg bg-white text-gray-800 border-gray-200 hover:bg-[#B2B0E8] hover:text-white hover:border-[#B2B0E8]"
              >
                <Icon className="w-10 h-10 sm:w-12 sm:h-12 mb-4" />
                <span className="font-medium text-sm sm:text-base">{category.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Itemfor;
