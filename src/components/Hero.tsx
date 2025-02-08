import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import artworkImage from "../images/image.jpg";

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-dark pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-dark to-gold-light/20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Palette className="mx-auto h-16 w-16 text-gold-light" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Transform City Walls into
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-dark to-purple-400">
              Digital Art Galleries
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto"
          >
            Join the revolution of urban art ownership. Connect your wallet to start transforming city walls into valuable digital assets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <a
              href="#about"
              className="rounded-full bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-3 text-white shadow-lg hover:from-purple-600 hover:to-purple-700 transition-colors"
            >
              Learn More
            </a>
            <a
              href="#ecosystem"
              className="rounded-full bg-gradient-to-r from-gold-light to-gold-dark px-8 py-3 text-dark font-semibold shadow-lg hover:from-gold-dark hover:to-gold-light transition-colors"
            >
              View Ecosystem
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 relative"
        >
          <div className="aspect-[16/9] overflow-hidden rounded-xl shadow-2xl border-2 border-gold-light/10">
            <img
  src={artworkImage}
  alt="Street Art Gallery"
  className="w-full h-full object-cover"
/>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;