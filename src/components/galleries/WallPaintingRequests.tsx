import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { WallData } from '../../hooks/useWallContract';
import { usePaintingContract, PaintingStatus } from '../../hooks/usePaintingContract';
import { formatAddress } from '../../utils/wallet';

interface WallPaintingRequestsProps {
  wall: WallData;
}

const WallPaintingRequests: React.FC<WallPaintingRequestsProps> = ({ wall }) => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingRequestId, setProcessingRequestId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { 
    getWallRequests, 
    getPaintingRequest,
    approvePaintingRequest, 
    rejectPaintingRequest, 
    finalizePainting 
  } = usePaintingContract();

  useEffect(() => {
    const fetchPaintingRequests = async () => {
      setLoading(true);
      try {
        // Get all request IDs for this wall
        const requestIds = await getWallRequests(wall.id);
        
        // Get details for each request
        const requestDetails = await Promise.all(
          requestIds.map(async (requestId) => {
            return await getPaintingRequest(requestId);
          })
        );

        // Filter out null responses and sort by timestamp
        setRequests(
          requestDetails
            .filter(request => request !== null)
            .sort((a, b) => b.timestamp - a.timestamp)
        );
      } catch (err) {
        console.error('Error fetching painting requests:', err);
        setError('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    fetchPaintingRequests();
  }, [wall.id, getWallRequests, getPaintingRequest]);

  const handleApprove = async (requestId: number) => {
    setProcessingRequestId(requestId);
    try {
      await approvePaintingRequest(requestId);
      // Refresh the requests
      const requestIds = await getWallRequests(wall.id);
      const refreshedRequests = await Promise.all(
        requestIds.map(id => getPaintingRequest(id))
      );
      setRequests(refreshedRequests.filter(req => req !== null));
    } catch (err) {
      console.error('Error approving request:', err);
      setError('Failed to approve request');
    } finally {
      setProcessingRequestId(null);
    }
  };

  const handleReject = async (requestId: number) => {
    setProcessingRequestId(requestId);
    try {
      await rejectPaintingRequest(requestId);
      // Refresh the requests
      const requestIds = await getWallRequests(wall.id);
      const refreshedRequests = await Promise.all(
        requestIds.map(id => getPaintingRequest(id))
      );
      setRequests(refreshedRequests.filter(req => req !== null));
    } catch (err) {
      console.error('Error rejecting request:', err);
      setError('Failed to reject request');
    } finally {
      setProcessingRequestId(null);
    }
  };

  const handleFinalize = async (requestId: number) => {
    setProcessingRequestId(requestId);
    try {
      await finalizePainting(requestId);
      // Refresh the requests
      const requestIds = await getWallRequests(wall.id);
      const refreshedRequests = await Promise.all(
        requestIds.map(id => getPaintingRequest(id))
      );
      setRequests(refreshedRequests.filter(req => req !== null));
    } catch (err) {
      console.error('Error finalizing painting:', err);
      setError('Failed to finalize painting');
    } finally {
      setProcessingRequestId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="w-6 h-6 animate-spin text-gold-light" />
        <span className="ml-2 text-gray-400">Loading requests...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-500/10 rounded-lg">
        {error}
      </div>
    );
  }

  if (requests.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div 
          key={request.requestId}
          className="flex items-center justify-between p-4 bg-dark rounded-lg border border-gold-light/10"
        >
          <div>
            <p className="text-white font-medium">
              Request #{request.requestId} by {formatAddress(request.painter)}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {request.description}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Requested: {new Date(request.timestamp * 1000).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {request.status === PaintingStatus.Requested && (
              <>
                <button
                  onClick={() => handleApprove(request.requestId)}
                  disabled={processingRequestId === request.requestId}
                  className="px-4 py-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors disabled:opacity-50 flex items-center"
                >
                  {processingRequestId === request.requestId ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request.requestId)}
                  disabled={processingRequestId === request.requestId}
                  className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50 flex items-center"
                >
                  {processingRequestId === request.requestId ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  Reject
                </button>
              </>
            )}

            {request.status === PaintingStatus.InProcess && (
              <div className="flex items-center text-yellow-500">
                <Clock className="w-4 h-4 mr-2" />
                Awaiting Completion
              </div>
            )}

            {request.status === PaintingStatus.Completed && (
              <button
                onClick={() => handleFinalize(request.requestId)}
                disabled={processingRequestId === request.requestId}
                className="px-4 py-2 bg-purple-500/10 text-purple-500 rounded-lg hover:bg-purple-500/20 transition-colors disabled:opacity-50 flex items-center"
              >
                {processingRequestId === request.requestId ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                Finalize
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WallPaintingRequests;