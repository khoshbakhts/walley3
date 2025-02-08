import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-24 bg-dark-lighter relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-8">What is Wallery?</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Wallery is the amalgamation of street art and the digital world to set up city-wide art galleries. 
            With technological solutions based on blockchain and cryptocurrencies, we help the cities of the 
            world become living galleries.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;