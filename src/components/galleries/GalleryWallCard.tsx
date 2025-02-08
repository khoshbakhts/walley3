import React from 'react';
import { MapPin, Maximize2, Percent } from 'lucide-react';
import { WallData } from '../../hooks/useWallContract';
import { formatAddress } from '../../utils/wallet';
import { getWallImage, DEFAULT_WALL_IMAGE } from '../../assets/images';
import WallPaintingRequests from './WallPaintingRequests';

interface GalleryWallCardProps {
  wall: WallData;
  onApprovePainting: (wallId: number) => Promise<void>;
  onRejectPainting: (wallId: number) => Promise<void>;
}

const GalleryWallCard: React.FC<GalleryWallCardProps> = ({ 
  wall,
  onApprovePainting,
  onRejectPainting
}) => {
  return (
    <div className="bg-dark rounded-lg p-4 border border-gold-light/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Wall Image */}
        <div className="md:col-span-1">
          <img
            src={getWallImage(wall.id)}
            alt={`Wall ${wall.id}`}
            className="w-full h-32 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_WALL_IMAGE;
            }}
          />
        </div>

        {/* Wall Details */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-white">Wall #{wall.id}</h4>
            <span className="text-sm text-gold-light">Owner: {formatAddress(wall.owner)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{wall.location.city}, {wall.location.country}</span>
            </div>

            <div className="flex items-center text-gray-400">
              <Maximize2 className="w-4 h-4 mr-2" />
              <span>{wall.size}m²</span>
            </div>

            <div className="flex items-center text-gray-400">
              <Percent className="w-4 h-4 mr-2" />
              <span>{wall.ownershipPercentage}% Ownership</span>
            </div>

            <div className="text-gray-400">
              Added: {new Date(wall.createdAt * 1000).toLocaleDateString()}
            </div>
          </div>

          {/* Painting Requests */}

        </div>
      </div>
    </div>
  );
};

export default GalleryWallCard;