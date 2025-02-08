import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { WallData } from '../../hooks/useWallContract';
import PaintingRequestCard from '../paintings/PaintingRequestCard';

interface PaintingRequestsListProps {
  loading: boolean;
  walls: WallData[];
  onApprove: (wallId: number) => Promise<void>;
  onReject: (wallId: number) => Promise<void>;
}

const PaintingRequestsList: React.FC<PaintingRequestsListProps> = ({
  loading,
  walls,
  onApprove,
  onReject
}) => {
  const [processingWalls, setProcessingWalls] = useState<Record<number, boolean>>({});

  const handleApprove = async (wallId: number) => {
    setProcessingWalls(prev => ({ ...prev, [wallId]: true }));
    try {
      await onApprove(wallId);
    } finally {
      setProcessingWalls(prev => ({ ...prev, [wallId]: false }));
    }
  };

  const handleReject = async (wallId: number) => {
    setProcessingWalls(prev => ({ ...prev, [wallId]: true }));
    try {
      await onReject(wallId);
    } finally {
      setProcessingWalls(prev => ({ ...prev, [wallId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-gold-light" />
        <span className="ml-2 text-gray-400">Loading painting requests...</span>
      </div>
    );
  }

  if (walls.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No pending painting requests found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {walls.map((wall) => (
        <PaintingRequestCard
          key={wall.id}
          wall={wall}
          onApprove={() => handleApprove(wall.id)}
          onReject={() => handleReject(wall.id)}
          showApproveReject={true}
          isLoading={processingWalls[wall.id]}
        />
      ))}
    </div>
  );
};

export default PaintingRequestsList;