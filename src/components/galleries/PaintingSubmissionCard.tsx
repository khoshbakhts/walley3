import React from 'react';
import { MapPin, Building2, Maximize2, Calendar, Loader2, CheckCircle } from 'lucide-react';
import { WallData } from '../../hooks/useWallContract';
import { getWallImage, DEFAULT_WALL_IMAGE } from '../../assets/images';

interface PaintingSubmissionCardProps {
  wall: WallData;
  onFinalize: () => Promise<void>;
  isLoading?: boolean;
}

const PaintingSubmissionCard: React.FC<PaintingSubmissionCardProps> = ({
  wall,
  onFinalize,
  isLoading = false
}) => {
  return (
    <div className="bg-dark-lighter rounded-lg overflow-hidden border border-gold-light/10">
      <img
        src={getWallImage(wall.id)}
        alt={`Wall ${wall.id}`}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src = DEFAULT_WALL_IMAGE;
        }}
      />
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Wall #{wall.id}</h3>
            <div className="flex items-center text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{wall.location.city}, {wall.location.country}</span>
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
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date(wall.lastUpdated * 1000).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gold-light/10">
          <button
            onClick={onFinalize}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <CheckCircle className="w-4 h-4 mr-2" />
            )}
            Finalize Painting
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaintingSubmissionCard;