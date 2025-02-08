import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { WallData } from '../../hooks/useWallContract';
import PaintingSubmissionCard from './PaintingSubmissionCard';

interface PendingSubmissionsListProps {
  loading: boolean;
  walls: WallData[];
  onFinalize: (wallId: number) => Promise<void>;
}

const PendingSubmissionsList: React.FC<PendingSubmissionsListProps> = ({
  loading,
  walls,
  onFinalize
}) => {
  const [processingWalls, setProcessingWalls] = useState<Record<number, boolean>>({});

  const handleFinalize = async (wallId: number) => {
    setProcessingWalls(prev => ({ ...prev, [wallId]: true }));
    try {
      await onFinalize(wallId);
    } finally {
      setProcessingWalls(prev => ({ ...prev, [wallId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-gold-light" />
        <span className="ml-2 text-gray-400">Loading pending submissions...</span>
      </div>
    );
  }

  if (walls.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No pending submissions found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {walls.map((wall) => (
        <PaintingSubmissionCard
          key={wall.id}
          wall={wall}
          onFinalize={() => handleFinalize(wall.id)}
          isLoading={processingWalls[wall.id]}
        />
      ))}
    </div>
  );
};

export default PendingSubmissionsList;