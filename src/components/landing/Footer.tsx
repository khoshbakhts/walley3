import React from 'react';
import { Palette } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-lighter border-t border-gold-light/10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <Palette className="h-10 w-10 text-gold-light mb-4" />
          <span className="text-2xl font-bold bg-gradient-to-r from-gold-light to-purple-400 text-transparent bg-clip-text mb-4">
            Wallery
          </span>
          <p className="text-gray-400 text-sm text-center">
            Transforming city walls into digital art galleries, one masterpiece at a time.
          </p>
          <div className="mt-8 text-sm text-gray-400">
            © {new Date().getFullYear()} Wallery. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;