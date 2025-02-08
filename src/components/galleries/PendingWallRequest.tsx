import React from 'react';
import { Loader2, Check, X, MapPin, Maximize2, Percent, User, ArrowRight } from 'lucide-react';
import { useWallContract } from '../../hooks/useWallContract';
import { formatAddress } from '../../utils/wallet';
import { getWallImage, DEFAULT_WALL_IMAGE } from '../../assets/images';

interface PendingWallRequestProps {
  wallId: number;
  wallOwner: string;
  ownershipPercentage: number;
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
  isLoading?: boolean;
}

const PendingWallRequest: React.FC<PendingWallRequestProps> = ({
  wallId,
  wallOwner,
  ownershipPercentage,
  onApprove,
  onReject,
  isLoading
}) => {
  const { getWall } = useWallContract();
  const [wallData, setWallData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchWallData = async () => {
      try {
        const data = await getWall(wallId);
        setWallData(data);
      } catch (error) {
        console.error('Error fetching wall data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallData();
  }, [wallId, getWall]);

  if (loading) {
    return (
      <div className="bg-dark p-6 rounded-lg border border-gold-light/10">
        <div className="flex items-center justify-center text-gold-light">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Loading wall details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark p-6 rounded-lg border border-gold-light/10">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-lg font-semibold text-white flex items-center">
              Wall #{wallId}
              <ArrowRight className="w-4 h-4 mx-2 text-gold-light" />
              <span className="text-gold-light">Request Pending</span>
            </h4>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onApprove}
              disabled={isLoading}
              className="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors disabled:opacity-50 flex items-center font-medium"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Check className="w-4 h-4 mr-2" />
              )}
              Approve
            </button>
            <button
              onClick={onReject}
              disabled={isLoading}
              className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50 flex items-center font-medium"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <X className="w-4 h-4 mr-2" />
              )}
              Reject
            </button>
          </div>
        </div>

        {/* Wall Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-400">
            <User className="w-4 h-4 mr-2" />
            <span>Owner: {formatAddress(wallOwner)}</span>
          </div>
          
          <div className="flex items-center text-gray-400">
            <Percent className="w-4 h-4 mr-2" />
            <span>Requested Ownership: {ownershipPercentage}%</span>
          </div>

          {wallData && (
            <>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Location: {wallData.location.city}, {wallData.location.country}</span>
              </div>

              <div className="flex items-center text-gray-400">
                <Maximize2 className="w-4 h-4 mr-2" />
                <span>Size: {wallData.size}m²</span>
              </div>
            </>
          )}
        </div>

        {/* Wall Image */}
        <div className="mt-4">
          <img
            src={getWallImage(wallId)}
            alt={`Wall ${wallId}`}
            className="w-full h-48 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_WALL_IMAGE;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PendingWallRequest;