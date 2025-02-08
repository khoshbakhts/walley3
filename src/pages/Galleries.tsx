import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import GalleryRequestForm from '../components/galleries/GalleryRequestForm';
import GalleryCard from '../components/galleries/GalleryCard';
import { useGalleryContract, GalleryCreationParams } from '../hooks/useGalleryContract';
import { Loader2, Plus } from 'lucide-react';

const Galleries: React.FC = () => {
  const { loading, hasGalleryOwnerRole, requestGallery, getGalleriesByOwner } = useGalleryContract();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [galleries, setGalleries] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      if (window.ethereum?.selectedAddress) {
        try {
          const galleryData = await getGalleriesByOwner(window.ethereum.selectedAddress);
          console.log('Fetched galleries:', galleryData); // Debug log
          setGalleries(galleryData.filter(gallery => gallery.owner !== '0x0000000000000000000000000000000000000000'));
        } catch (err) {
          console.error('Error fetching galleries:', err);
          setError('Failed to load galleries. Please try again.');
        }
      }
    };

    if (!loading) {
      fetchGalleries();
    }
  }, [loading, getGalleriesByOwner]);

  const handleGalleryRequest = async (data: GalleryCreationParams) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const success = await requestGallery(data);

      if (success) {
        setShowRequestForm(false);
        // Refresh galleries list
        if (window.ethereum?.selectedAddress) {
          const galleryData = await getGalleriesByOwner(window.ethereum.selectedAddress);
          setGalleries(galleryData.filter(gallery => gallery.owner !== '0x0000000000000000000000000000000000000000'));
        }
      } else {
        setError('Failed to submit gallery request. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting gallery request:', err);
      setError('An error occurred while submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-2xl font-bold text-white">Galleries</h1>
          {hasGalleryOwnerRole && (
            <button
              onClick={() => setShowRequestForm(!showRequestForm)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold rounded-lg hover:from-gold-dark hover:to-gold-light transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Request New Gallery
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
            <h2 className="text-xl font-semibold text-white mb-6">Request New Gallery</h2>
            <GalleryRequestForm onSubmit={handleGalleryRequest} isLoading={isSubmitting} />
          </div>
        )}

        {galleries.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {galleries.map((gallery: any) => (
              <GalleryCard
                key={gallery.id}
                gallery={gallery}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            {hasGalleryOwnerRole ? (
              <p>You don't have any galleries yet. Request your first gallery to get started!</p>
            ) : (
              <p>You need the Gallery Owner role to manage galleries. Please request it from an admin.</p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Galleries;