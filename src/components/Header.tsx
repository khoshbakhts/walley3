import React, { useState } from 'react';
import { Menu, X, Wallet } from 'lucide-react';
import { connectWallet, formatAddress } from '../utils/wallet';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    const address = await connectWallet();
    if (address) {
      setIsConnected(true);
      setUserAddress(address);
    }
  };

  return (
    <header className="fixed w-full bg-dark-lighter/90 backdrop-blur-md z-50 border-b border-gold-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-gold-light via-gold-dark to-purple-400 text-transparent bg-clip-text">
              Wallery
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-300 hover:text-gold-light">About</a>
            <a href="#features" className="text-gray-300 hover:text-gold-light">Features</a>
            <a href="#museum" className="text-gray-300 hover:text-gold-light">Museum</a>
            <a href="#ecosystem" className="text-gray-300 hover:text-gold-light">Ecosystem</a>
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center px-4 py-2 bg-dark-light rounded-full border border-gold-light/20">
                  <Wallet className="w-4 h-4 text-gold-light mr-2" />
                  <span className="text-gold-light font-medium">
                    {userAddress && formatAddress(userAddress)}
                  </span>
                </div>
                <a href="/dashboard" className="bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold px-6 py-2 rounded-full hover:from-gold-dark hover:to-gold-light transition-colors">
                  Dashboard
                </a>
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                className="bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold px-6 py-2 rounded-full hover:from-gold-dark hover:to-gold-light transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-dark-light text-gold-light"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <a href="#about" className="text-gray-300 hover:text-gold-light">About</a>
              <a href="#features" className="text-gray-300 hover:text-gold-light">Features</a>
              <a href="#museum" className="text-gray-300 hover:text-gold-light">Museum</a>
              <a href="#ecosystem" className="text-gray-300 hover:text-gold-light">Ecosystem</a>
              {isConnected ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center px-4 py-2 bg-dark-light rounded-full border border-gold-light/20">
                    <Wallet className="w-4 h-4 text-gold-light mr-2" />
                    <span className="text-gold-light font-medium">
                      {userAddress && formatAddress(userAddress)}
                    </span>
                  </div>
                  <a href="/dashboard" className="block bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold px-6 py-2 rounded-full hover:from-gold-dark hover:to-gold-light transition-colors text-center">
                    Dashboard
                  </a>
                </div>
              ) : (
                <button
                  onClick={handleConnectWallet}
                  className="bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold px-6 py-2 rounded-full hover:from-gold-dark hover:to-gold-light transition-colors"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;