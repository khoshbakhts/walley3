import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import PaintingRequestForm from '../components/paintings/PaintingRequestForm';
import { usePaintingContract } from '../hooks/usePaintingContract';
import { useWallContract } from '../hooks/useWallContract';
import { Loader2, Plus, AlertCircle } from 'lucide-react';
import PaintingRequestCard from '../components/paintings/PaintingRequestCard';

const Paintings = () => {
  const {
    loading: contractLoading,
    hasPainterRole,
    requestPainting,
    getPainterPendingRequests,
    getPainterAcceptedRequests,
    submitPaintingCompletion,
    getPaintingRequest
  } = usePaintingContract();

  const { getWall } = useWallContract();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // States for different request categories
  const [pendingApprovalWalls, setPendingApprovalWalls] = useState([]);
  const [acceptedWalls, setAcceptedWalls] = useState([]);
  const [pendingFinalizationWalls, setPendingFinalizationWalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!window.ethereum?.selectedAddress || contractLoading) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch pending requests (status = 0)
        const pendingIds = await getPainterPendingRequests(window.ethereum.selectedAddress);
        const pendingWallsData = await Promise.all(
          pendingIds.map(async (id: number) => {
            try {
              const wall = await getWall(id);
              const request = await getPaintingRequest(id);
              return { wall, request };
            } catch (error) {
              console.error(`Error fetching wall ${id}:`, error);
              return null;
            }
          })
        );

        // Fetch accepted requests (status = 1)
        const acceptedIds = await getPainterAcceptedRequests(window.ethereum.selectedAddress);
        const acceptedWallsData = await Promise.all(
          acceptedIds.map(async (id: number) => {
            try {
              const wall = await getWall(id);
              const request = await getPaintingRequest(id);
              return { wall, request };
            } catch (error) {
              console.error(`Error fetching wall ${id}:`, error);
              return null;
            }
          })
        );

        // Sort walls based on request status
        const allWalls = [...pendingWallsData, ...acceptedWallsData].filter(data => data !== null);
        
        setPendingApprovalWalls(allWalls.filter(data => data.request.status === 1));  // Requested
        setAcceptedWalls(allWalls.filter(data => data.request.status === 2));         // InProcess 
        setPendingFinalizationWalls(allWalls.filter(data => data.request.status === 3)); // Completed

      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Failed to load painting requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [contractLoading, getPainterPendingRequests, getPainterAcceptedRequests, getWall]);

  const handlePaintingRequest = async (wallId: number, description: string) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const success = await requestPainting(wallId, description);
      
      if (success) {
        setShowRequestForm(false);
        // Refresh data
        const pendingIds = await getPainterPendingRequests(window.ethereum.selectedAddress);
        const pendingWallsData = await Promise.all(
          pendingIds.map(async (id) => {
            const wall = await getWall(id);
            const request = await getPaintingRequest(id);
            return { wall, request };
          })
        );
        setPendingApprovalWalls(pendingWallsData.filter(data => data !== null));
      } else {
        setError('Failed to submit painting request. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting painting request:', err);
      setError('An error occurred while submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitCompletion = async (wallId: number) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const success = await submitPaintingCompletion(wallId);
      
      if (success) {
        // Move wall from accepted to pending finalization
        const updatedWall = await getWall(wallId);
        const request = await getPaintingRequest(wallId);
        
        setAcceptedWalls(prev => prev.filter(item => item.wall.id !== wallId));
        setPendingFinalizationWalls(prev => [...prev, { wall: updatedWall, request }]);
      } else {
        setError('Failed to submit completion. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting completion:', err);
      setError('An error occurred while submitting completion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (contractLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-6 h-6 animate-spin text-gold-light" />
          <span className="ml-2">Loading...</span>
        </div>
      </DashboardLayout>
    );
  }

  if (!hasPainterRole) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gold-light mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Painter Access Required</h1>
          <p className="text-gray-400">
            You need the Painter role to access this section. Please request it from an admin.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Paintings</h1>
          <button
            onClick={() => setShowRequestForm(!showRequestForm)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold rounded-lg hover:from-gold-dark hover:to-gold-light transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Request New Painting
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
            {error}
          </div>
        )}

        {/* Request Form */}
        {showRequestForm && (
          <div className="bg-dark-lighter p-6 rounded-lg border border-gold-light/10">
            <h2 className="text-xl font-semibold text-white mb-6">Request New Painting</h2>
            <PaintingRequestForm
              onSubmit={handlePaintingRequest}
              isLoading={isSubmitting}
            />
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gold-light" />
            <span className="ml-2 text-gray-400">Loading painting requests...</span>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Pending Approval Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Pending Approval</h2>
              {pendingApprovalWalls.length === 0 ? (
                <p className="text-gray-400">No pending requests</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingApprovalWalls.map(({ wall, request }) => (
                    <PaintingRequestCard
                      key={wall.id}
                      wall={wall}
                      request={request}
                      status="pending_approval"
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Accepted Requests Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Accepted Requests</h2>
              {acceptedWalls.length === 0 ? (
                <p className="text-gray-400">No accepted requests</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {acceptedWalls.map(({ wall, request }) => (
                    <PaintingRequestCard
                      key={wall.id}
                      wall={wall}
                      request={request}
                      status="accepted"
                      onSubmitCompletion={() => handleSubmitCompletion(wall.id)}
                      isLoading={isSubmitting}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Pending Finalization Section */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">Pending Finalization</h2>
              {pendingFinalizationWalls.length === 0 ? (
                <p className="text-gray-400">No paintings pending finalization</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingFinalizationWalls.map(({ wall, request }) => (
                    <PaintingRequestCard
                      key={wall.id}
                      wall={wall}
                      request={request}
                      status="pending_finalization"
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Paintings;