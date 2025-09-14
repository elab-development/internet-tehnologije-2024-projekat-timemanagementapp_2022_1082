"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const dotVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 0.5, scale: 1 },
};

const Home: React.FC = () => {
  return (
    <div className="relative flex flex-col rounded-2xl items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {[
        { className: "bg-blue-400 w-6 h-6 top-150 left-160", delay: 0.1 },
        { className: "bg-blue-700 w-4 h-4 top-40 left-60", delay: 0.2 },
        { className: "bg-blue-300 w-5 h-5 top-80 left-30", delay: 0.3 },
        { className: "bg-blue-200 w-7 h-7 top-20 right-40", delay: 0.4 },
        { className: "bg-blue-300 w-3 h-3 bottom-10 right-20", delay: 0.5 },
        { className: "bg-blue-800 w-6 h-6 bottom-40 left-50", delay: 0.6 },
        { className: "bg-blue-300 w-4 h-4 bottom-80 right-70", delay: 0.7 },
        { className: "bg-blue-600 w-5 h-5 top-60 right-10", delay: 0.8 },
        { className: "bg-blue-500 w-6 h-6 top-15 left-10", delay: 0.9 },
        { className: "bg-blue-300 w-5 h-5 top-50 left-140", delay: 1.0 },
        { className: "bg-blue-900 w-4 h-4 bottom-20 right-60", delay: 1.1 },
        { className: "bg-blue-300 w-7 h-7 bottom-70 left-30", delay: 1.2 },
        { className: "bg-blue-900 w-7 h-7 bottom-50 right-30", delay: 1.3 },
        { className: "bg-blue-300 w-5 h-5 top-10 left-115", delay: 1.4 },
        { className: "bg-blue-900 w-6 h-6 top-8 right-130", delay: 1.5 },
        { className: "bg-blue-700 w-4 h-4 top-12 left-70", delay: 1.6 },
        { className: "bg-blue-500 w-5 h-5 bottom-30 left-40", delay: 1.7 },
        { className: "bg-blue-200 w-6 h-6 bottom-25 right-50", delay: 1.8 },
        { className: "bg-blue-900 w-4 h-4 bottom-35 left-20", delay: 1.9 },
      ].map((dot, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${dot.className}`}
          variants={dotVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: dot.delay, duration: 0.5, ease: "easeInOut" }}
        />
      ))}

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-xl px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
          Dobrodošli u <span className="text-blue-600">TimeFlow</span>
        </h1>
        
        <p className="text-gray-600 mb-10 text-lg">
          Preuzmite kontrolu nad vašim vremenom i povećajte produktivnost uz našu jednostavnu platformu za upravljanje vremenom.
        </p>
        
        <Link 
          href="/auth/login" 
          className="inline-block bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-medium py-4 px-18 rounded-lg shadow-md hover:shadow-lg transform text-lg"
        >
          Nastavi
        </Link>
      </motion.div>
      
      <footer className="absolute bottom-4 text-gray-500 text-sm">
        {new Date().getFullYear()} TimeFlow © All Rights Reserved
      </footer>
    </div>
  );
};

export default Home;