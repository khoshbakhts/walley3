import React, { useState, useEffect } from 'react';
import { useWallContract } from '../hooks/useWallContract';
import { usePaintingContract } from '../hooks/usePaintingContract';
import { Loader2, CheckCircle, XCircle, Clock, Paintbrush } from 'lucide-react';

const PaintingRequestStatus = {
  NONE: 0,
  REQUESTED: 1,
  IN_PROCESS: 2,
  COMPLETED: 3
};

const PaintingRequestManagement = ({ 
  isGalleryOwner, 
  isPainter, 
  wallId,
  refreshTrigger,
  onStatusChange 
}) => {
  const { getWall } = useWallContract();
  const { 
    getPaintingRequest,
    approvePaintingRequest,
    rejectPaintingRequest,
    submitPaintingCompletion,
    finalizePainting
  } = usePaintingContract();

  const [wall, setWall] = useState(null);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const wallData = await getWall(wallId);
        const requestData = await getPaintingRequest(wallId);
        setWall(wallData);
        setRequest(requestData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load request data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [wallId, refreshTrigger]);

  const handleApprove = async () => {
    setProcessing(true);
    try {
      await approvePaintingRequest(wallId);
      const updatedRequest = await getPaintingRequest(wallId);
      setRequest(updatedRequest);
      onStatusChange?.();
    } catch (err) {
      console.error('Error approving request:', err);
      setError('Failed to approve request');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    setProcessing(true);
    try {
      await rejectPaintingRequest(wallId);
      const updatedRequest = await getPaintingRequest(wallId);
      setRequest(updatedRequest);
      onStatusChange?.();
    } catch (err) {
      console.error('Error rejecting request:', err);
      setError('Failed to reject request');
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmitCompletion = async () => {
    setProcessing(true);
    try {
      await submitPaintingCompletion(wallId);
      const updatedRequest = await getPaintingRequest(wallId);
      setRequest(updatedRequest);
      onStatusChange?.();
    } catch (err) {
      console.error('Error submitting completion:', err);
      setError('Failed to submit completion');
    } finally {
      setProcessing(false);
    }
  };

  const handleFinalize = async () => {
    setProcessing(true);
    try {
      await finalizePainting(wallId);
      const updatedRequest = await getPaintingRequest(wallId);
      setRequest(updatedRequest);
      onStatusChange?.();
    } catch (err) {
      console.error('Error finalizing painting:', err);
      setError('Failed to finalize painting');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="w-6 h-6 animate-spin text-gold-light" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-sm">{error}</div>
    );
  }

  if (!request) {
    return null;
  }

  const renderGalleryOwnerActions = () => {
    if (request.status === PaintingRequestStatus.REQUESTED) {
      return (
        <div className="flex space-x-2">
          <button
            onClick={handleApprove}
            disabled={processing}
            className="flex items-center px-3 py-1 bg-green-500/10 text-green-500 rounded hover:bg-green-500/20 transition-colors disabled:opacity-50"
          >
            {processing ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <CheckCircle className="w-4 h-4 mr-2" />
            )}
            Approve
          </button>
          <button
            onClick={handleReject}
            disabled={processing}
            className="flex items-center px-3 py-1 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors disabled:opacity-50"
          >
            {processing ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <XCircle className="w-4 h-4 mr-2" />
            )}
            Reject
          </button>
        </div>
      );
    }

    if (request.status === PaintingRequestStatus.COMPLETED) {
      return (
        <button
          onClick={handleFinalize}
          disabled={processing}
          className="flex items-center px-3 py-1 bg-gold-light/10 text-gold-light rounded hover:bg-gold-light/20 transition-colors disabled:opacity-50"
        >
          {processing ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <CheckCircle className="w-4 h-4 mr-2" />
          )}
          Finalize Painting
        </button>
      );
    }

    return null;
  };

  const renderPainterActions = () => {
    if (request.status === PaintingRequestStatus.IN_PROCESS) {
      return (
        <button
          onClick={handleSubmitCompletion}
          disabled={processing}
          className="flex items-center px-3 py-1 bg-gold-light/10 text-gold-light rounded hover:bg-gold-light/20 transition-colors disabled:opacity-50"
        >
          {processing ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Paintbrush className="w-4 h-4 mr-2" />
          )}
          Submit Completion
        </button>
      );
    }

    return null;
  };

  const getStatusDisplay = () => {
    switch (request.status) {
      case PaintingRequestStatus.REQUESTED:
        return <span className="text-yellow-500 flex items-center"><Clock className="w-4 h-4 mr-1" /> Pending Approval</span>;
      case PaintingRequestStatus.IN_PROCESS:
        return <span className="text-blue-500 flex items-center"><Paintbrush className="w-4 h-4 mr-1" /> In Progress</span>;
      case PaintingRequestStatus.COMPLETED:
        return <span className="text-green-500 flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-dark-lighter rounded-lg p-4 border border-gold-light/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="font-medium text-white">Wall #{wallId}</div>
          {getStatusDisplay()}
        </div>
        <div>
          {isGalleryOwner && renderGalleryOwnerActions()}
          {isPainter && renderPainterActions()}
        </div>
      </div>
    </div>
  );
};

export default PaintingRequestManagement;