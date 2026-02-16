import React from "react";

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
  Leaf,
} from 'lucide-react';

// Animations
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerWrapper = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

export default function AboutUs() {
  const coreValues = [
    { icon: <Award size={30} className="text-pink-600" />, title: "Premium Quality", desc: "Only top-rated and verified products curated specially for you." },
    { icon: <Truck size={30} className="text-blue-600" />, title: "Express Delivery", desc: "Fast doorstep delivery across India with real-time tracking." },
    { icon: <Lock size={30} className="text-green-600" />, title: "100% Secure", desc: "End-to-end encrypted payment & world-class data safety." },
    { icon: <MessageSquare size={30} className="text-purple-600" />, title: "24×7 Support", desc: "Friendly, fast & dedicated support whenever you need us." },
    { icon: <DollarSign size={30} className="text-indigo-600" />, title: "Best Prices", desc: "Exclusive discounts, festival offers & loyalty rewards." },
    { icon: <Leaf size={30} className="text-emerald-600" />, title: "Sustainable", desc: "Eco-friendly packaging & responsible sourcing." },
  ];

  const team = [
    { name: "Alice Johnson", role: "Founder & CEO", image: "https://i.pravatar.cc/300?img=11" },
    { name: "Rahul Sharma", role: "Head of Operations", image: "https://i.pravatar.cc/300?img=32" },
    { name: "Sofia Rodriguez", role: "Brand Director", image: "https://i.pravatar.cc/300?img=49" },
  ];

  const stats = [
    { value: "1M+", label: "Happy Shoppers" },
    { value: "50K+", label: "Products Listed" },
    { value: "700+", label: "Verified Sellers" },
    { value: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">

      {/* HERO */}
        <div className="min-h-[60vh] flex items-center justify-center text-center px-6
          bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-800">

        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
            Welcome to{" "}
            <span className="text-black">First {""} </span>
            <span className="text-red-500">U</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
              Shop
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-white/90 text-base sm:text-lg md:text-xl">
            India's modern online shopping destination for fashion, lifestyle,
            and everyday essentials — trusted by millions across the country.
          </p>
        </div>
      </div>



      {/* CORE VALUES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-14">Why Customers Love Us</h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={staggerWrapper}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {coreValues.map((item, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-xl transition-all border border-gray-100"
                variants={fadeUp}
              >
                <div className="mx-auto bg-white p-4 rounded-full shadow-md w-fit mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-gradient-to-r from-indigo-700 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h3 className="text-4xl font-extrabold">{s.value}</h3>
              <p className="text-sm opacity-90 mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Meet Our Team</h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
            variants={staggerWrapper}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((m, i) => (
              <motion.div key={i} className="text-center" variants={fadeUp}>
                <img
                  src={m.image}
                  className="w-36 h-36 object-cover rounded-full mx-auto shadow-lg mb-4"
                  alt={m.name}
                />
                <h3 classname="text-xl font-bold">{m.name}</h3>
                <p className="text-indigo-600 font-medium">{m.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
