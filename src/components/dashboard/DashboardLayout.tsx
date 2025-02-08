import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Layers, Image, Building2, Palette, Gavel, 
  ShoppingBag, Bell, User, LogOut, Menu, X 
} from 'lucide-react';
import { formatAddress } from '../../utils/wallet';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userAddress = window.ethereum?.selectedAddress || '';
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', href: '/dashboard' },
    { icon: Layers, label: 'Assets', href: '/dashboard/assets' },
    { icon: ShoppingBag, label: 'Marketplace', href: '/dashboard/marketplace' },
    { icon: Bell, label: 'AI Valuation', href: '/dashboard/requests' },
    { icon: Building2, label: 'Galleries', href: '/dashboard/galleries' },
    { icon: Image, label: 'Walls', href: '/dashboard/walls' },
    { icon: Palette, label: 'Paintings', href: '/dashboard/paintings' },
    //{ icon: Gavel, label: 'Auctions', href: '/dashboard/auctions' },
    { icon: User, label: 'Profile', href: '/dashboard/profile' },
  ];

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-dark-lighter p-2 rounded-lg text-gold-light"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64 bg-dark-lighter border-r border-gold-light/10`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gold-light/10">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-gold-light to-purple-400 text-transparent bg-clip-text">
              Wallery
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? 'bg-dark-light text-gold-light'
                    : 'text-gray-300 hover:text-gold-light hover:bg-dark-light'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gold-light/10">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-300 hover:text-gold-light hover:bg-dark-light rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`lg:ml-64 min-h-screen`}>
        {/* Header */}
        <header className="bg-dark-lighter border-b border-gold-light/10 py-4 px-6">
          <div className="flex justify-end items-center">
            <div className="flex items-center px-4 py-2 bg-dark rounded-full border border-gold-light/20">
              <span className="text-gold-light font-medium">
                {formatAddress(userAddress)}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;