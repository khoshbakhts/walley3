import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const Auctions: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Auctions</h1>
        <p className="text-gray-400">View active and past auctions.</p>
      </div>
    </DashboardLayout>
  );
};

export default Auctions;