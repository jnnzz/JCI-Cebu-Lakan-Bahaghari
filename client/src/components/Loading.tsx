import React from 'react';
import { motion } from 'framer-motion';
import JCIlogo from '../assets/logo-JCI.png';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1818] overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Pirata+One&family=Rye&display=swap');
      `}</style>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="tribal-loading-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0 30 L30 0 L60 30 L30 60 Z" fill="none" stroke="#FFBC00" strokeWidth="1"/>
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#tribal-loading-pattern)" />
        </svg>
      </div>

      {/* Radial Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#A83232]/10 via-transparent to-transparent"></div>

      {/* Main Loading Content */}
      <div className="text-center z-10">
        {/* Simple Logo */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img 
            src={JCIlogo} 
            alt="JCI" 
            className="w-24 h-24 mx-auto object-contain"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl text-[#F4F1E8] mb-2 uppercase tracking-wide">
            Loading
          </h2>
          <p className="text-sm text-[#FFBC00] uppercase tracking-widest">
            JCI CEBU LAKAN BAHAGHARI
          </p>
        </motion.div>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#A83232]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Tribal Border Bottom */}
        <motion.div 
          className="mt-8 flex justify-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-8 h-1 bg-gradient-to-r from-[#A83232] to-[#FFBC00]"
              style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
              animate={{ 
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
