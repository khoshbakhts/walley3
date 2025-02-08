import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Users, Palette, Coins, MapPin, Building } from 'lucide-react';

const ecosystemItems = [
  {
    icon: Building2,
    title: 'Municipalities',
    description: 'Funding public art projects from around the world',
  },
  {
    icon: Building,
    title: 'Building Owners',
    description: 'Income from turning the walls of buildings into museum panels',
  },
  {
    icon: Palette,
    title: 'Street Painters',
    description: 'Maintaining intellectual ownership of works forever',
  },
  {
    icon: Coins,
    title: 'Investors',
    description: 'Safe, fast and borderless investment in a new range of art',
  },
  {
    icon: MapPin,
    title: 'Neighborhoods',
    description: 'Empowering the local economy by redefining its tourism brand',
  },
  {
    icon: Users,
    title: 'Advertising Companies',
    description: 'New methods of marketing and urban advertising',
  },
];

const Ecosystem: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="ecosystem" className="py-24 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ecosystem</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ecosystemItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-dark-lighter p-6 rounded-xl border border-gold-light/10 hover:border-gold-light/30 transition-colors"
            >
              <item.icon className="w-12 h-12 text-gold-light mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;