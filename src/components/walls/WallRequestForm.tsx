import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface WallRequestFormProps {
  onSubmit: (data: {
    country: string;
    city: string;
    physicalAddress: string;
    longitude: number;
    latitude: number;
    size: number;
    ownershipPercentage: number;
  }) => Promise<void>;
  isLoading: boolean;
}

const WallRequestForm: React.FC<WallRequestFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    physicalAddress: '',
    longitude: 0,
    latitude: 0,
    size: 0,
    ownershipPercentage: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">Country</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">City</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300">Physical Address</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
            value={formData.physicalAddress}
            onChange={(e) => setFormData({ ...formData, physicalAddress: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Longitude</label>
          <input
            type="number"
            step="0.000001"
            required
            className="mt-1 block w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
            value={formData.longitude}
            onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Latitude</label>
          <input
            type="number"
            step="0.000001"
            required
            className="mt-1 block w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
            value={formData.latitude}
            onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Size (in square meters)</label>
          <input
            type="number"
            min="1"
            required
            className="mt-1 block w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Ownership Percentage</label>
          <input
            type="number"
            min="1"
            max="90"
            required
            className="mt-1 block w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
            value={formData.ownershipPercentage}
            onChange={(e) => setFormData({ ...formData, ownershipPercentage: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold px-6 py-3 rounded-lg hover:from-gold-dark hover:to-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Submitting...
          </div>
        ) : (
          'Submit Wall Request'
        )}
      </button>
    </form>
  );
};

export default WallRequestForm;