import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ArtValuationDemo from '../components/valuation/ArtValuationDemo';

const Requests: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">AI Valuation System</h1>
            <p className="text-gray-400 mt-1">
              Automated artwork valuation using advanced AI analysis
            </p>
          </div>
        </div>

        <div className="mt-8">
          <ArtValuationDemo />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Requests;