"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col rounded-2xl items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
          Preuzimte kontrolu nad vašim vremenom i povećajte produktivnost uz našu jednostavnu platformu za upravljanje vremenom.
        </p>
        
        <Link 
          href="/auth/login" 
          className="inline-block bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 text-lg"
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