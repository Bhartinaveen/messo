import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Eye, 
  Award, 
  Truck, 
  Lock, 
  MessageSquare, 
  DollarSign, 
  Leaf 
} from 'lucide-react';
import Footer from '../components/Footer';

// Animation variants for Framer Motion
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function AboutUs() {
  const coreValues = [
    { icon: <Award size={32} className="text-blue-500" />, title: "Quality First", description: "Curating only the best products from trusted brands with rigorous quality checks." },
    { icon: <Truck size={32} className="text-blue-500" />, title: "Fast Delivery", description: "Quick and reliable shipping with real-time tracking to get your orders to you faster." },
    { icon: <Lock size={32} className="text-blue-500" />, title: "Secure Shopping", description: "Your data is protected with advanced encryption and security protocols." },
    { icon: <MessageSquare size={32} className="text-blue-500" />, title: "24/7 Support", description: "Always here to help with any questions through multiple support channels." },
    { icon: <DollarSign size={32} className="text-blue-500" />, title: "Best Prices", description: "Competitive pricing and regular deals to ensure you get the best value." },
    { icon: <Leaf size={32} className="text-blue-500" />, title: "Sustainability", description: "Committed to eco-friendly packaging and responsible business practices." },
  ];

  const teamMembers = [
    { name: "Alice Johnson", role: "Founder & CEO", image: "https://i.pravatar.cc/150?img=1" },
    { name: "Bob Williams", role: "Head of Operations", image: "https://i.pravatar.cc/150?img=2" },
    { name: "Charlie Brown", role: "Marketing Director", image: "https://i.pravatar.cc/150?img=3" },
  ];

  const stats = [
    { value: "1M+", label: "Happy Customers" },
    { value: "50K+", label: "Products Available" },
    { value: "500+", label: "Brand Partners" },
    { value: "24/7", label: "Customer Support" },
  ];

  return (
    <div>
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-shadow-lg">
              Crafting Your Perfect Shopping Experience
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl opacity-90 leading-relaxed">
              We're more than just a store. We're your partner in discovering products you love, making online shopping simple, enjoyable, and accessible to all.
            </p>
            {/* <motion.a 
              href="#our-story" 
              className="mt-10 inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full text-lg shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover Our Story
            </motion.a> */}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section (Mission & Vision Combined) */}
      <section id="our-story" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-16">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <div className="lg:pr-10">
              <div className="flex items-center text-blue-600 mb-4">
                <Target className="mr-3" size={30} />
                <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower customers by providing a seamless shopping experience with the best products at unbeatable prices. We strive to bridge the gap between quality and affordability, ensuring everyone can access the products they love and need to live a better life.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070" alt="Team working" className="w-full h-full object-cover"/>
            </div>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <div className="rounded-lg overflow-hidden shadow-2xl lg:order-last">
              <img src="https://images.unsplash.com/photo-1556740738-b6a63e2775d2?q=80&w=2070" alt="Happy customer" className="w-full h-full object-cover"/>
            </div>
            <div>
              <div className="flex items-center text-blue-600 mb-4">
                <Eye className="mr-3" size={30} />
                <h2 className="text-3xl md:text-4xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a future where shopping is not just a transaction, but an experience. A world with no crowded stores or long queues—just smart, intuitive, and personalized shopping with delivery right to your doorstep, connecting you with what matters most.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Stand For</h2>
          <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">Our values are the compass that guides every decision we make.</p>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {coreValues.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
                variants={fadeIn}
              >
                <div className="bg-blue-100 p-4 rounded-full mb-5">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="flex flex-col items-center" variants={fadeIn}>
                <span className="text-4xl md:text-5xl font-extrabold">{stat.value}</span>
                <span className="text-lg opacity-90 mt-2">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leaders</h2>
          <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">The passionate minds dedicated to revolutionizing your shopping experience.</p>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center" 
                variants={fadeIn}
              >
                <img src={member.image} alt={member.name} className="w-36 h-36 rounded-full object-cover mb-4 shadow-lg"/>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-blue-600 font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gray-100">
        <div className="max-w-4xl mx-auto text-center py-20 px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Explore thousands of curated products and experience shopping like never before.
            </p>
            {/* <motion.button 
              className="bg-indigo-600 text-white font-semibold px-10 py-4 rounded-full text-lg shadow-lg hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping Now
            </motion.button> */}
          </motion.div>
        </div>
      </section>
    </div>
      <Footer/>
    </div>
  );
}

export default AboutUs;