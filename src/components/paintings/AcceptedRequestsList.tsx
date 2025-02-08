import React from 'react';
import { Loader2 } from 'lucide-react';
import { WallData } from '../../hooks/useWallContract';
import PaintingRequestCard from './PaintingRequestCard';

interface AcceptedRequestsListProps {
  loading: boolean;
  walls: WallData[];
  onSubmitCompletion: (wallId: number) => Promise<void>;
}

const AcceptedRequestsList: React.FC<AcceptedRequestsListProps> = ({
  loading,
  walls,
  onSubmitCompletion
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-gold-light" />
        <span className="ml-2 text-gray-400">Loading accepted requests...</span>
      </div>
    );
  }

  if (walls.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No accepted requests found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {walls.map((wall) => (
        <PaintingRequestCard
          key={wall.id}
          wall={wall}
          onSubmitCompletion={() => onSubmitCompletion(wall.id)}
          showSubmitButton={true}
        />
      ))}
    </div>
  );
};

export default AcceptedRequestsList;