import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Coins, Users, LineChart, Building2, Brush, Palette } from 'lucide-react';

const features = [
  {
    icon: Coins,
    title: 'Micro Investment',
    description: 'Everyone can get involved with any level of capital',
  },
  {
    icon: Users,
    title: 'Artist Recognition',
    description: 'Artists will forever own the material and spiritual interests of their work',
  },
  {
    icon: LineChart,
    title: 'High Liquidity',
    description: 'Selling an artwork has never been so fast and accurate',
  },
  {
    icon: Building2,
    title: 'Public Art Funding',
    description: 'Get help from all over the world to beautify cities',
  },
  {
    icon: Brush,
    title: 'Exemplary Transparency',
    description: 'Accurate and unalterable record of all transfers and fair auctions',
  },
  {
    icon: Palette,
    title: 'Wall Commercialization',
    description: 'A new economy for the development of underutilized neighborhoods',
  },
];

const Features: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-24 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Why Wallery is a Good Solution?</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-dark-lighter p-6 rounded-xl border border-gold-light/10 hover:border-gold-light/30 transition-colors"
            >
              <feature.icon className="w-12 h-12 text-gold-light mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;