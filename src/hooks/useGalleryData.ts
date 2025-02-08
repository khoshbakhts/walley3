import { useState, useCallback } from 'react';
import { useWallContract } from './useWallContract';
import { useGalleryContract } from './useGalleryContract';
import { usePaintingContract } from './usePaintingContract';
import { WallData } from './useWallContract';
import { PaintingRequest } from './usePaintingContract';

export const useGalleryData = (galleryId: number) => {
  const [wallsData, setWallsData] = useState<WallData[]>([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [paintingRequests, setPaintingRequests] = useState<PaintingRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getWall } = useWallContract();
  const { getPendingWallRequests, getGalleryWalls } = useGalleryContract();
  const { getAllRequestsForGallery } = usePaintingContract();

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

      const validWalls = wallsDetails.filter((wall): wall is WallData => wall !== null);
      setWallsData(validWalls);

      // Fetch pending wall requests
      const requests = await getPendingWallRequests(galleryId);
      setPendingRequests(requests);

      // Fetch painting requests for all walls
      const paintingReqs = await getAllRequestsForGallery(galleryId, validWalls.map(wall => wall.id));
      setPaintingRequests(paintingReqs);
    } catch (error) {
      console.error('Error fetching gallery data:', error);
      setError('Failed to load gallery data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [galleryId, getWall, getGalleryWalls, getPendingWallRequests, getAllRequestsForGallery]);

  return {
    wallsData,
    pendingRequests,
    paintingRequests,
    loading,
    error,
    fetchGalleryData
  };
};