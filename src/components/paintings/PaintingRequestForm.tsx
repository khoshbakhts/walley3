import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useWallContract } from '../../hooks/useWallContract';

interface PaintingRequestFormProps {
  onSubmit: (wallId: number, description: string) => Promise<void>;
  isLoading: boolean;
}

const PaintingRequestForm: React.FC<PaintingRequestFormProps> = ({ onSubmit, isLoading }) => {
  const [wallId, setWallId] = useState<string>('');
  const [description, setDescription] = useState('');
  const [wallData, setWallData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { getWall } = useWallContract();

  const handleWallIdChange = async (value: string) => {
    setWallId(value);
    if (value) {
      try {
        const wall = await getWall(parseInt(value));
        if (wall) {
          setWallData(wall);
          setError(null);
        } else {
          setWallData(null);
          setError('Wall not found');
        }
      } catch (err) {
        setWallData(null);
        setError('Error fetching wall data');
      }
    } else {
      setWallData(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallId || !description) return;
    await onSubmit(parseInt(wallId), description);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300">Wall ID</label>
        <input
          type="number"
          required
          value={wallId}
          onChange={(e) => handleWallIdChange(e.target.value)}
          className="mt-1 block w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
          placeholder="Enter wall ID"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {wallData && (
        <div className="bg-dark p-4 rounded-lg border border-gold-light/10">
          <h4 className="font-semibold text-white mb-2">Wall Details</h4>
          <div className="text-sm text-gray-400">
            <p>Location: {wallData.location.city}, {wallData.location.country}</p>
            <p>Size: {wallData.size}m²</p>
            <p>Gallery: {wallData.isInGallery ? `#${wallData.galleryId}` : 'Not in gallery'}</p>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300">Description</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light h-32"
          placeholder="Describe your painting proposal..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !wallData}
        className="w-full bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold px-6 py-3 rounded-lg hover:from-gold-dark hover:to-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Submitting Request...
          </div>
        ) : (
          'Submit Painting Request'
        )}
      </button>
    </form>
  );
};

export default PaintingRequestForm;