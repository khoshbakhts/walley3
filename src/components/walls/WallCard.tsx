import React, { useState } from 'react';
import { MapPin, Building2, Maximize2, Percent, Calendar, Clock } from 'lucide-react';
import { WallData } from '../../hooks/useWallContract';
import GalleryRequestModal from './GalleryRequestModal';
import { useGalleryContract } from '../../hooks/useGalleryContract';

interface WallCardProps {
  wall: WallData;
  onUpdateOwnership: (percentage: number) => Promise<void>;
}

const WallCard: React.FC<WallCardProps> = ({ wall, onUpdateOwnership }) => {
  const [isEditingOwnership, setIsEditingOwnership] = useState(false);
  const [newPercentage, setNewPercentage] = useState(wall.ownershipPercentage);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const { requestWallToGallery } = useGalleryContract();

  const handleOwnershipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateOwnership(newPercentage);
    setIsEditingOwnership(false);
  };

  const handleGalleryRequest = async (galleryId: number) => {
    const success = await requestWallToGallery(galleryId, wall.id);
    if (!success) {
      throw new Error('Failed to request wall addition to gallery');
    }
  };

  return (
    <>
      <div className="bg-dark-lighter rounded-lg overflow-hidden border border-gold-light/10">
      
        <img
  src={`/src/images/${wall.id}.jpg`}
  alt={`Wall ${wall.id}`}
  className="w-full h-48 object-cover"
  onError={(e) => {
    e.currentTarget.src = '/src/images/default.jpg';
  }}
/>
        
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Wall #{wall.id}</h3>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{`${wall.location.city}, ${wall.location.country}`}</span>
              </div>
            </div>
            
            {wall.isInGallery && (
              <div className="flex items-center text-gold-light">
                <Building2 className="w-4 h-4 mr-2" />
                <span>Gallery #{wall.galleryId}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-gray-400">
              <Maximize2 className="w-4 h-4 mr-2" />
              <span>{wall.size}m²</span>
            </div>
            
            <div className="flex items-center text-gray-400">
              <Percent className="w-4 h-4 mr-2" />
              <span>{wall.ownershipPercentage}% Ownership</span>
            </div>
            
            <div className="flex items-center text-gray-400">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{new Date(wall.createdAt * 1000).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              <span>{new Date(wall.lastUpdated * 1000).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gold-light/10">
            {isEditingOwnership ? (
              <form onSubmit={handleOwnershipSubmit} className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={newPercentage}
                  onChange={(e) => setNewPercentage(parseInt(e.target.value))}
                  className="flex-1 rounded-lg bg-dark-light border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gold-light text-dark font-semibold rounded-lg hover:bg-gold-dark transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingOwnership(false)}
                  className="px-4 py-2 bg-dark-light text-gray-300 font-semibold rounded-lg hover:bg-dark transition-colors"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditingOwnership(true)}
                  className="flex-1 px-4 py-2 bg-dark-light text-gray-300 font-semibold rounded-lg hover:bg-dark transition-colors"
                >
                  Update Ownership
                </button>
                {!wall.isInGallery && (
                  <button
                    onClick={() => setShowGalleryModal(true)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold rounded-lg hover:from-gold-dark hover:to-gold-light transition-colors"
                  >
                    Request Gallery
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showGalleryModal && (
        <GalleryRequestModal
          wallId={wall.id}
          onClose={() => setShowGalleryModal(false)}
          onSubmit={handleGalleryRequest}
        />
      )}
    </>
  );
};

export default WallCard;