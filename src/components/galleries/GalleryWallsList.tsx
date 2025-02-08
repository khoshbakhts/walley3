import React from 'react';
import { WallData } from '../../hooks/useWallContract';
import GalleryWallCard from './GalleryWallCard';
import { AlertCircle, Loader2 } from 'lucide-react';
import { usePaintingContract } from '../../hooks/usePaintingContract';

interface GalleryWallsListProps {
  loading: boolean;
  error: string | null;
  walls: WallData[];
}

const GalleryWallsList: React.FC<GalleryWallsListProps> = ({ loading, error, walls }) => {
  const { 
    approvePaintingRequest,
    rejectPaintingRequest
  } = usePaintingContract();

  const handleApprovePainting = async (wallId: number) => {
    try {
      await approvePaintingRequest(wallId);
      // You might want to refresh the wall data here
    } catch (error) {
      console.error('Error approving painting request:', error);
    }
  };

  const handleRejectPainting = async (wallId: number) => {
    try {
      await rejectPaintingRequest(wallId);
      // You might want to refresh the wall data here
    } catch (error) {
      console.error('Error rejecting painting request:', error);
    }
  };

  if (loading) {
    return (
      <div className="mt-4 flex items-center justify-center text-gray-400 py-8">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Loading walls...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 flex items-center justify-center text-red-500 py-8">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  if (walls.length === 0) {
    return (
      <div className="mt-4 text-center text-gray-400 py-8">
        No walls in this gallery yet
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {walls.map((wall) => (
        <GalleryWallCard 
          key={wall.id} 
          wall={wall}
          onApprovePainting={handleApprovePainting}
          onRejectPainting={handleRejectPainting}
        />
      ))}
    </div>
  );
};

export default GalleryWallsList;