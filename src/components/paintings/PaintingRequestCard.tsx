import React from 'react';
import { MapPin, Building2, Maximize2, Calendar, Loader2, Clock } from 'lucide-react';
import { WallData } from '../../hooks/useWallContract';
import { PaintingStatus } from '../../hooks/usePaintingContract';

interface PaintingRequestCardProps {
  wall: WallData;
  request: {
    requestId: number;
    status: PaintingStatus;
    description: string;
    timestamp: number;
  };
  onSubmitCompletion?: () => Promise<void>;
  onApprove?: () => Promise<void>;
  onReject?: () => Promise<void>;
  showGalleryActions?: boolean; // To control gallery owner specific actions
  isLoading?: boolean;
}

const PaintingRequestCard: React.FC<PaintingRequestCardProps> = ({
  wall,
  request,
  onSubmitCompletion,
  onApprove,
  onReject,
  showGalleryActions = false,
  isLoading = false
}) => {
  const renderStatus = () => {
    switch (request.status) {
      case PaintingStatus.Requested:
        return (
          <div className="flex items-center text-yellow-500">
            <Clock className="w-4 h-4 mr-2" />
            Pending Approval
          </div>
        );
      case PaintingStatus.InProcess:
        return (
          <div className="flex items-center text-blue-500">
            <Clock className="w-4 h-4 mr-2" />
            In Progress
          </div>
        );
      case PaintingStatus.Completed:
        return (
          <div className="flex items-center text-green-500">
            <Clock className="w-4 h-4 mr-2" />
            Completed - Awaiting Finalization
          </div>
        );
      default:
        return null;
    }
  };

  const renderActions = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      );
    }

    if (showGalleryActions) {
      if (request.status === PaintingStatus.Requested) {
        return (
          <div className="flex space-x-2">
            <button
              onClick={onApprove}
              disabled={isLoading}
              className="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors disabled:opacity-50"
            >
              Approve
            </button>
            <button
              onClick={onReject}
              disabled={isLoading}
              className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        );
      }
      if (request.status === PaintingStatus.Completed) {
        return (
          <button
            onClick={onSubmitCompletion}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-500/10 text-purple-500 rounded-lg hover:bg-purple-500/20 transition-colors disabled:opacity-50"
          >
            Finalize
          </button>
        );
      }
    } else {
      // Painter actions
      if (request.status === PaintingStatus.InProcess) {
        return (
          <button
            onClick={onSubmitCompletion}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors disabled:opacity-50"
          >
            Submit Completion
          </button>
        );
      }
    }

    return null;
  };

  return (
    <div className="bg-dark-lighter rounded-lg overflow-hidden border border-gold-light/10">
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
            <span>{new Date(request.timestamp * 1000).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="text-gray-300">
          <p className="font-medium mb-1">Description:</p>
          <p>{request.description}</p>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gold-light/10">
          {renderStatus()}
          {renderActions()}
        </div>
      </div>
    </div>
  );
};

export default PaintingRequestCard;