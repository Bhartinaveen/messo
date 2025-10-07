import React, { useState } from 'react';
import Footer from '../components/Footer';

const Blog = () => {
  const [expandedPostId, setExpandedPostId] = useState(null);

  // Data for the shopping website blog
  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Fall 2025 Fashion",
      excerpt: "Discover the must-have jackets, boots, and color palettes for this autumn season.",
      date: "Oct 05, 2025",
      readTime: "5 min read",
      imageUrl: "https://picsum.photos/seed/fallfashion/600/400",
      fullContent: "This fall is all about rich textures and bold silhouettes. We're seeing a return of classic trench coats, chunky-soled leather boots, and earthy tones like rust, olive, and deep burgundy. In this guide, we break down how to mix and match these key pieces to create stunning looks for any occasion, from a casual weekend outing to a formal evening event."
    },
    {
      id: 2,
      title: "5 Ways to Style Your New Denim Jacket",
      excerpt: "From casual weekends to chic evenings, unlock the versatility of this timeless wardrobe staple.",
      date: "Sep 28, 2025",
      readTime: "4 min read",
      imageUrl: "https://picsum.photos/seed/denimstyle/600/400",
      fullContent: "The denim jacket is more than just a piece of clothing; it's a canvas for your personal style. Pair it with a floral dress for a soft, feminine look, or go for an edgy vibe with black jeans and combat boots. We'll show you five curated outfits that prove a simple denim jacket can be the most versatile item in your closet."
    },
    {
      id: 3,
      title: "Sneaker Spotlight: The Top Kicks of the Season",
      excerpt: "Check out the latest sneaker drops that combine comfort, style, and cutting-edge design.",
      date: "Sep 22, 2025",
      readTime: "3 min read",
      imageUrl: "https://picsum.photos/seed/sneakers/600/400",
      fullContent: "Comfort is king, but style is everything. This season's top sneakers deliver both. From retro-inspired designs making a huge comeback to futuristic, minimalist silhouettes, there's a pair for every taste. We'll give you a closer look at the materials, technology, and style notes for the sneakers everyone is talking about right now."
    },
    {
      id: 4,
      title: "How to Choose Eco-Friendly and Sustainable Brands",
      excerpt: "Make your wardrobe greener with our tips for conscious and responsible shopping.",
      date: "Sep 15, 2025",
      readTime: "6 min read",
      imageUrl: "https://picsum.photos/seed/ecofriendly/600/400",
      fullContent: "Sustainable fashion is the future. But what does it really mean to shop consciously? This article helps you understand materials to look for, certifications that matter, and questions to ask before you buy. Learn how to build a stylish, long-lasting wardrobe that's kinder to our planet."
    },
    {
      id: 5,
      title: "Accessorize Like a Pro: The Finishing Touches",
      excerpt: "Learn how the right accessories can elevate any outfit from simple to spectacular.",
      date: "Sep 05, 2025",
      readTime: "4 min read",
      imageUrl: "https://picsum.photos/seed/accessories/600/400",
      fullContent: "Accessories are the secret weapon of the stylish. A statement necklace, a silk scarf, or a classic leather belt can completely transform your look. We explore the art of layering jewelry, choosing the right handbag, and how to use accessories to express your unique personality."
    },
    {
      id: 6,
      title: "Get Ready: Our Annual Winter Sale is Coming!",
      excerpt: "A sneak peek at the incredible deals and collections that will be featured in our biggest sale of the year.",
      date: "Aug 29, 2025",
      readTime: "2 min read",
      imageUrl: "https://picsum.photos/seed/sale/600/400",
      fullContent: "Mark your calendars! Our annual winter sale is just around the corner, and it's bigger than ever. Expect massive discounts on last season's favorites, exclusive bundles, and special offers on new arrivals. Get your wishlist ready and prepare to snag the best deals on coats, sweaters, and more!"
    }
  ];

  const handleReadMoreClick = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <div>
      <div className="bg-stone-50 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Header Section */}
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-stone-800 mb-4 tracking-tight">
              The Style Hub
            </h1>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              Your daily dose of fashion, trends, and shopping tips from our experts.
            </p>
          </header>

          {/* Blog Posts Grid */}
          <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden group flex flex-col transition-all duration-300 hover:shadow-lg"
              >
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-56 object-cover" 
                />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center text-sm text-stone-500 mb-3">
                    <span>{post.date}</span>
                    <span className="bg-stone-100 text-stone-600 font-medium px-2 py-1 rounded-full">{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-stone-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-stone-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Animated Full Content Section */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedPostId === post.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="text-stone-700 leading-relaxed pt-2 border-t border-stone-200">
                      <p>{post.fullContent}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleReadMoreClick(post.id)}
                    className="mt-auto text-teal-600 font-semibold hover:text-teal-700 transition-colors duration-300 flex items-center gap-2 self-start pt-4"
                  >
                    {expandedPostId === post.id ? 'Read Less' : 'Read More'}
                    {/* Arrow Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 transition-transform duration-300 ${expandedPostId === post.id ? 'rotate-180' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Blog;