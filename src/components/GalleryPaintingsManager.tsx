import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useGalleryContract } from '../hooks/useGalleryContract';
import { usePaintingContract } from '../hooks/usePaintingContract';
import { useWallContract } from '../hooks/useWallContract';

const GalleryPaintingsManager = ({ galleryId, walls }) => {
  const [paintingRequests, setPaintingRequests] = useState({});
  const [loading, setLoading] = useState(true);
  const [processingRequestId, setProcessingRequestId] = useState(null);
  const [error, setError] = useState(null);

  const { getWall } = useWallContract();
  const { 
    paintingRequests: getPaintingRequests,
    approvePaintingRequest,
    rejectPaintingRequest,
    finalizePainting
  } = usePaintingContract();

  useEffect(() => {
    const fetchPaintingRequests = async () => {
      setLoading(true);
      try {
        const requests = {};
        
        // For each wall, get all painting requests
        for (const wall of walls) {
          const wallRequests = await getPaintingRequests(wall.id);
          if (wallRequests && wallRequests.length > 0) {
            requests[wall.id] = wallRequests;
          }
        }
        
        setPaintingRequests(requests);
      } catch (err) {
        console.error('Error fetching painting requests:', err);
        setError('Failed to load painting requests');
      } finally {
        setLoading(false);
      }
    };

    fetchPaintingRequests();
  }, [walls, getPaintingRequests]);

  const handleApproveRequest = async (requestId) => {
    setProcessingRequestId(requestId);
    try {
      await approvePaintingRequest(requestId);
      // Refresh painting requests
      const wallId = paintingRequests[requestId].wallId;
      const updatedRequests = await getPaintingRequests(wallId);
      setPaintingRequests(prev => ({
        ...prev,
        [wallId]: updatedRequests
      }));
    } catch (err) {
      console.error('Error approving request:', err);
      setError('Failed to approve request');
    } finally {
      setProcessingRequestId(null);
    }
  };

  const handleRejectRequest = async (requestId) => {
    setProcessingRequestId(requestId);
    try {
      await rejectPaintingRequest(requestId);
      // Refresh painting requests
      const wallId = paintingRequests[requestId].wallId;
      const updatedRequests = await getPaintingRequests(wallId);
      setPaintingRequests(prev => ({
        ...prev,
        [wallId]: updatedRequests
      }));
    } catch (err) {
      console.error('Error rejecting request:', err);
      setError('Failed to reject request');
    } finally {
      setProcessingRequestId(null);
    }
  };

  const handleFinalizePainting = async (requestId) => {
    setProcessingRequestId(requestId);
    try {
      await finalizePainting(requestId);
      // Refresh painting requests
      const wallId = paintingRequests[requestId].wallId;
      const updatedRequests = await getPaintingRequests(wallId);
      setPaintingRequests(prev => ({
        ...prev,
        [wallId]: updatedRequests
      }));
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
        <span className="ml-2 text-gray-400">Loading painting requests...</span>
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

  return (
    <div className="space-y-6">
      {walls.map((wall) => {
        const wallRequests = paintingRequests[wall.id] || [];
        
        if (wallRequests.length === 0) {
          return null;
        }

        return (
          <div key={wall.id} className="bg-dark-lighter rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Wall #{wall.id} Painting Requests
            </h3>
            
            <div className="space-y-4">
              {wallRequests.map((request) => (
                <div 
                  key={request.requestId} 
                  className="flex items-center justify-between p-4 bg-dark rounded-lg border border-gold-light/10"
                >
                  <div>
                    <p className="text-white font-medium">
                      Request #{request.requestId} by {request.painter.slice(0, 6)}...{request.painter.slice(-4)}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {request.description}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Requested: {new Date(request.timestamp * 1000).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {request.status === 0 && ( // Pending
                      <>
                        <button
                          onClick={() => handleApproveRequest(request.requestId)}
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
                          onClick={() => handleRejectRequest(request.requestId)}
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

                    {request.status === 1 && ( // In Process
                      <div className="flex items-center text-yellow-500">
                        <Clock className="w-4 h-4 mr-2" />
                        Awaiting Completion
                      </div>
                    )}

                    {request.status === 2 && ( // Completed
                      <button
                        onClick={() => handleFinalizePainting(request.requestId)}
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
          </div>
        );
      })}
      
      {Object.keys(paintingRequests).length === 0 && (
        <div className="text-center text-gray-400 py-4">
          No painting requests for any walls in this gallery
        </div>
      )}
    </div>
  );
};

export default GalleryPaintingsManager;