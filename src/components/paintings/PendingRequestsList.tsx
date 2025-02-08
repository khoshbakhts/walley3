import React from 'react';
import { Loader2 } from 'lucide-react';
import { WallData } from '../../hooks/useWallContract';
import PaintingRequestCard from './PaintingRequestCard';

interface PendingRequestsListProps {
  loading: boolean;
  walls: WallData[];
  requests: any[];
  onSubmitCompletion: (requestId: number) => Promise<void>;
}

const PendingRequestsList: React.FC<PendingRequestsListProps> = ({
  loading,
  walls,
  requests,
  onSubmitCompletion
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-gold-light" />
        <span className="ml-2 text-gray-400">Loading requests...</span>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No pending requests found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {requests.map((request) => {
        const wall = walls.find(w => w.id === request.wallId);
        if (!wall) return null;
        
        return (
          <PaintingRequestCard
            key={request.requestId}
            wall={wall}
            request={request}
            onSubmitCompletion={() => onSubmitCompletion(request.requestId)}
            showGalleryActions={false} // Important: this is for painter view
          />
        );
      })}
    </div>
  );
};

export default PendingRequestsList;