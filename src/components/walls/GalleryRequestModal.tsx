import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useGalleryContract, GalleryData } from '../../hooks/useGalleryContract';

interface GalleryRequestModalProps {
  wallId: number;
  onClose: () => void;
  onSubmit: (galleryId: number) => Promise<void>;
}

const GalleryRequestModal: React.FC<GalleryRequestModalProps> = ({ wallId, onClose, onSubmit }) => {
  const [galleryId, setGalleryId] = useState<string>('');
  const [gallery, setGallery] = useState<GalleryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getGallery } = useGalleryContract();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (galleryId === '') return;

    try {
      setLoading(true);
      setError(null);
      await onSubmit(parseInt(galleryId));
      onClose();
    } catch (err) {
      console.error('Error submitting gallery request:', err);
      setError('Failed to submit gallery request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleryDetails = async (id: string) => {
    if (id === '') {
      setGallery(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const galleryData = await getGallery(parseInt(id));
      if (galleryData && galleryData.isActive) {
        setGallery(galleryData);
        setError(null);
      } else {
        setGallery(null);
        setError('Gallery not found or inactive');
      }
    } catch (err) {
      console.error('Error fetching gallery:', err);
      setError('Failed to fetch gallery details');
      setGallery(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (galleryId !== '') {
      fetchGalleryDetails(galleryId);
    }
  }, [galleryId]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-lighter rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Request Gallery Addition</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gallery ID
            </label>
            <input
              type="number"
              min="0"
              required
              value={galleryId}
              onChange={(e) => setGalleryId(e.target.value)}
              className="w-full rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
              placeholder="Enter gallery ID"
            />
          </div>

          {loading && (
            <div className="flex items-center justify-center text-gold-light">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              <span>Loading gallery details...</span>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          {gallery && (
            <div className="bg-dark p-4 rounded-lg border border-gold-light/10">
              <h4 className="font-semibold text-white mb-2">{gallery.name}</h4>
              <p className="text-gray-400 text-sm mb-2">{gallery.description}</p>
              <div className="text-sm text-gray-400">
                <p>Location: {gallery.location.city}, {gallery.location.country}</p>
                <p>Ownership: {gallery.ownershipPercentage}%</p>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-dark-light text-gray-300 font-semibold rounded-lg hover:bg-dark transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !gallery}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold rounded-lg hover:from-gold-dark hover:to-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Submitting...
                </div>
              ) : (
                'Submit Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GalleryRequestModal;