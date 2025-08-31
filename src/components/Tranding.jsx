import React from 'react'
import { useNavigate } from 'react-router-dom'

const Tranding = () => {
  const navigate = useNavigate()

  const categories = [
    {
      name: "SHIRTS",
      description: "Classic and casual shirts for every occasion",
      icon: "fas fa-tshirt",
      color: "blue",
      image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&h=300&fit=crop"
    },
    {
      name: "DENIM",
      description: "Durable and stylish denim wear",
      icon: "fas fa-vest",
      color: "indigo",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop"
    },
    {
      name: "TEES",
      description: "Comfortable and trendy t-shirts",
      icon: "fas fa-tshirt",
      color: "amber",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop"
    },
    {
      name: "PANTS",
      description: "From casual to formal trousers",
      icon: "fas fa-vector-square",
      color: "emerald",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop"
    },
    {
      name: "SWEATERS",
      description: "Cozy and warm sweaters for cold days",
      icon: "fas fa-mitten",
      color: "rose",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop"
    },
    {
      name: "OUTERWEAR",
      description: "Jackets and coats for all seasons",
      icon: "fas fa-jacket",
      color: "cyan",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop"
    },
    {
      name: "FOOTWEAR",
      description: "Shoes and boots for every style",
      icon: "fas fa-shoe-prints",
      color: "purple",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
    }
  ]

  // Navigate dynamically based on category name
  const handleCardClick = (categoryName) => {
    if (categoryName === "FOOTWEAR") {
      navigate("/foot")
    } else {
      alert(`Exploring ${categoryName}`)
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Fashion Collection</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our latest trends and find your perfect style from our diverse collection of clothing and accessories.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              onClick={() => handleCardClick(category.name)}
              className="cursor-pointer category-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-${category.color}-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                  <i className={`${category.icon} text-${category.color}-600 text-xl`}></i>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.name}</h3>
                <p className="text-gray-600 mb-5 leading-relaxed">{category.description}</p>
                <span 
                  className={`inline-flex items-center text-${category.color}-600 font-semibold transition-colors duration-200`}
                >
                  Explore Collection
                  <i className="fas fa-arrow-right ml-3"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
{/* 
        <div className="mt-16 text-center">
          <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
            View All Categories
            <i className="fas fa-arrow-right ml-3"></i>
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default Tranding
