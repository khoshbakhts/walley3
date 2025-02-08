import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
//import { MUSEUM_IMAGE } from '../../assets/images';
import MUSEUM_IMAGE from "../../images/musume.jpg";

const Museum: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="museum" className="py-24 bg-dark-lighter relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Wallery Museum: The Digital Twin of Street Art
            </h2>
            <p className="text-lg text-gray-300">
              The treasure of street art of the world is a metaverse digital museum that houses street 
              galleries of different cities of the world. The museum has facilities such as different 
              halls for different cities and localities, special rooms for artists, auction room, online 
              drawing exhibition room, galleries, stores and the board room for the museum.
            </p>
          </div>
          <div className="relative">
            <img
              src={MUSEUM_IMAGE}
              alt="Digital Museum"
              className="rounded-xl shadow-2xl border-2 border-gold-light/10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Museum;