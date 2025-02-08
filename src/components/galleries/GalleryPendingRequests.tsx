import React, { useState } from 'react';
import PendingWallRequest from './PendingWallRequest';

interface WallRequest {
  wallId: number;
  wallOwner: string;
  wallOwnerPercentage: number;
  pending: boolean;
  approved: boolean;
}

interface GalleryPendingRequestsProps {
  galleryId: number;
  pendingRequests: WallRequest[];
  onApprove: (wallId: number) => Promise<void>;
  onReject: (wallId: number) => Promise<void>;
}

const GalleryPendingRequests: React.FC<GalleryPendingRequestsProps> = ({
  galleryId,
  pendingRequests,
  onApprove,
  onReject
}) => {
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

  const handleApprove = async (wallId: number) => {
    setLoadingStates(prev => ({ ...prev, [wallId]: true }));
    try {
      await onApprove(wallId);
    } finally {
      setLoadingStates(prev => ({ ...prev, [wallId]: false }));
    }
  };

  const handleReject = async (wallId: number) => {
    setLoadingStates(prev => ({ ...prev, [wallId]: true }));
    try {
      await onReject(wallId);
    } finally {
      setLoadingStates(prev => ({ ...prev, [wallId]: false }));
    }
  };

  if (pendingRequests.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-lg font-medium text-white">Pending Wall Requests</h3>
      <div className="space-y-3">
        {pendingRequests.map((request) => (
          <PendingWallRequest
            key={request.wallId}
            wallId={request.wallId}
            wallOwner={request.wallOwner}
            ownershipPercentage={request.wallOwnerPercentage}
            onApprove={() => handleApprove(request.wallId)}
            onReject={() => handleReject(request.wallId)}
            isLoading={loadingStates[request.wallId]}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryPendingRequests;