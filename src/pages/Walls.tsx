import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import WallRequestForm from '../components/walls/WallRequestForm';
import WallCard from '../components/walls/WallCard';
import { useWallContract } from '../hooks/useWallContract';
import { Loader2, Plus } from 'lucide-react';

const Walls: React.FC = () => {
  const { loading, hasWallOwnerRole, requestWall, getWallsByOwner, setOwnershipPercentage } = useWallContract();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [walls, setWalls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalls = async () => {
      if (window.ethereum?.selectedAddress) {
        const userWalls = await getWallsByOwner(window.ethereum.selectedAddress);
        setWalls(userWalls);
      }
    };

    if (!loading) {
      fetchWalls();
    }
  }, [loading, getWallsByOwner]);

  const handleWallRequest = async (data: {
    country: string;
    city: string;
    physicalAddress: string;
    longitude: number;
    latitude: number;
    size: number;
    ownershipPercentage: number;
  }) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const success = await requestWall(
        data.country,
        data.city,
        data.physicalAddress,
        data.longitude,
        data.latitude,
        data.size,
        data.ownershipPercentage
      );

      if (success) {
        setShowRequestForm(false);
        // Refresh walls list
        if (window.ethereum?.selectedAddress) {
          const userWalls = await getWallsByOwner(window.ethereum.selectedAddress);
          setWalls(userWalls);
        }
      } else {
        setError('Failed to submit wall request. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting wall request:', err);
      setError('An error occurred while submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateOwnership = async (wallId: number, percentage: number) => {
    try {
      setError(null);
      const success = await setOwnershipPercentage(wallId, percentage);
      
      if (success) {
        // Refresh walls list
        if (window.ethereum?.selectedAddress) {
          const userWalls = await getWallsByOwner(window.ethereum.selectedAddress);
          setWalls(userWalls);
        }
      } else {
        setError('Failed to update ownership percentage. Please try again.');
      }
    } catch (err) {
      console.error('Error updating ownership:', err);
      setError('An error occurred while updating ownership. Please try again.');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center space-x-2 text-gold-light">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Walls</h1>
          {hasWallOwnerRole && (
            <button
              onClick={() => setShowRequestForm(!showRequestForm)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold rounded-lg hover:from-gold-dark hover:to-gold-light transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Request New Wall
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
            {error}
          </div>
        )}

        {showRequestForm && (
          <div className="bg-dark-lighter p-6 rounded-lg border border-gold-light/10">
            <h2 className="text-xl font-semibold text-white mb-6">Request New Wall</h2>
            <WallRequestForm onSubmit={handleWallRequest} isLoading={isSubmitting} />
          </div>
        )}

        {walls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {walls.map((wall) => (
              <WallCard
                key={wall.id}
                wall={wall}
                onUpdateOwnership={(percentage) => handleUpdateOwnership(wall.id, percentage)}
                onRequestGallery={async () => {
                  // TODO: Implement gallery request functionality
                  console.log('Request gallery for wall:', wall.id);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            {hasWallOwnerRole ? (
              <p>You don't have any walls yet. Request your first wall to get started!</p>
            ) : (
              <p>You need the Wall Owner role to manage walls. Please request it from an admin.</p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Walls;