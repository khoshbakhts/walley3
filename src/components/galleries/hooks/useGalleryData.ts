import { useState, useCallback } from 'react';
import { useWallContract } from '../../../hooks/useWallContract';
import { useGalleryContract } from '../../../hooks/useGalleryContract';
import { WallData } from '../../../hooks/useWallContract';

export const useGalleryData = (galleryId: number) => {
  const [wallsData, setWallsData] = useState<WallData[]>([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getWall } = useWallContract();
  const { getPendingWallRequests, getGalleryWalls } = useGalleryContract();

  const fetchGalleryData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch gallery walls
      const wallIds = await getGalleryWalls(galleryId);
      
      // Fetch details for each wall
      const wallsDetails = await Promise.all(
        wallIds.map(async (wallId: number) => {
          try {
            const wall = await getWall(wallId);
            if (!wall) {
              console.warn(`Wall ${wallId} not found`);
              return null;
            }
            return wall;
          } catch (error) {
            console.error(`Error fetching wall ${wallId}:`, error);
            return null;
          }
        })
      );

      setWallsData(wallsDetails.filter((wall): wall is WallData => wall !== null));

      // Fetch pending requests
      const requests = await getPendingWallRequests(galleryId);
      setPendingRequests(requests);
    } catch (error) {
      console.error('Error fetching gallery data:', error);
      setError('Failed to load gallery data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [galleryId, getWall, getGalleryWalls, getPendingWallRequests]);

  return {
    wallsData,
    pendingRequests,
    loading,
    error,
    fetchGalleryData
  };
};