
import React, { useState, useEffect } from 'react';
import { MapPin, Building2, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { GalleryData } from '../../hooks/useGalleryContract';
import { useGalleryData } from '../../hooks/useGalleryData';
import GalleryPendingRequests from './GalleryPendingRequests';
import GalleryWallsList from './GalleryWallsList';
import WallPaintingRequests from './WallPaintingRequests';
import { useGalleryContract } from '../../hooks/useGalleryContract';

interface GalleryCardProps {
  gallery: GalleryData;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ gallery }) => {
  const [showWalls, setShowWalls] = useState(false);
  const { wallsData, pendingRequests, loading, error, fetchGalleryData } = useGalleryData(gallery.id);
  const { approveWallToGallery, rejectWallToGallery } = useGalleryContract();

  useEffect(() => {
    if (showWalls) {
      fetchGalleryData();
    }
  }, [showWalls, fetchGalleryData]);

  const handleApproveWall = async (wallId: number) => {
    try {
      await approveWallToGallery(gallery.id, wallId);
      await fetchGalleryData();
    } catch (error) {
      console.error('Error approving wall:', error);
    }
  };

  const handleRejectWall = async (wallId: number) => {
    try {
      await rejectWallToGallery(gallery.id, wallId);
      await fetchGalleryData();
    } catch (error) {
      console.error('Error rejecting wall:', error);
    }
  };

  return (
    <div className="bg-dark-lighter rounded-lg overflow-hidden border border-gold-light/10">
      <div className="p-6 space-y-6">
        {/* Gallery Info */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">{gallery.name}</h3>
            <div className="flex items-center text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{`${gallery.location.city}, ${gallery.location.country}`}</span>
            </div>
          </div>
          
          <div className="flex items-center text-gold-light">
            <Building2 className="w-4 h-4 mr-2" />
            <span>{wallsData.length} Walls</span>
          </div>
        </div>

        <p className="text-gray-300">{gallery.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(gallery.createdAt * 1000).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            <span>{new Date(gallery.lastUpdated * 1000).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Wall Requests */}
        {pendingRequests.length > 0 && (
          <div className="pt-4 border-t border-gold-light/10">
            <h4 className="text-lg font-medium text-white mb-4">Pending Wall Requests</h4>
            <GalleryPendingRequests
              galleryId={gallery.id}
              pendingRequests={pendingRequests}
              onApprove={handleApproveWall}
              onReject={handleRejectWall}
            />
          </div>
        )}

        {/* Painting Requests for each Wall */}
        {wallsData.length > 0 && (
          <div className="pt-4 border-t border-gold-light/10">
            <h4 className="text-lg font-medium text-white mb-4">Painting Requests</h4>
            {wallsData.map(wall => (
              <div key={wall.id} className="mb-4">
                <h5 className="text-md font-medium text-white mb-2">Wall #{wall.id}</h5>
                <WallPaintingRequests wall={wall} />
              </div>
            ))}
          </div>
        )}

        {/* Gallery Walls */}
        <div className="pt-4 border-t border-gold-light/10">
          <button
            onClick={() => setShowWalls(!showWalls)}
            className="flex items-center justify-between w-full text-gold-light hover:text-gold-dark transition-colors"
          >
            <span className="font-semibold">Gallery Walls</span>
            {showWalls ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {showWalls && (
            <GalleryWallsList
              loading={loading}
              error={error}
              walls={wallsData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;