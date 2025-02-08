import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface CreateSellOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    paintingId: number;
    tokenAmount: number;
    pricePerToken: number;
  }) => Promise<void>;
}

export default function CreateSellOrderModal({
  isOpen,
  onClose,
  onSubmit
}: CreateSellOrderModalProps) {
  const [paintingId, setPaintingId] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [pricePerToken, setPricePerToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit({
        paintingId: parseInt(paintingId),
        tokenAmount: parseInt(tokenAmount),
        pricePerToken: parseFloat(pricePerToken)
      });
      onClose();
    } catch (err) {
      setError('Failed to create sell order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dark-lighter w-full max-w-lg rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gold-light/10">
          <h2 className="text-xl font-semibold text-white">Create Sell Order</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              Painting ID
            </label>
            <input
              type="number"
              required
              value={paintingId}
              onChange={(e) => setPaintingId(e.target.value)}
              className="w-full px-4 py-2 bg-dark rounded-lg border border-gold-light/20 text-white focus:outline-none focus:border-gold-light/50"
              placeholder="Enter painting ID"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              Token Amount
            </label>
            <input
              type="number"
              required
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              className="w-full px-4 py-2 bg-dark rounded-lg border border-gold-light/20 text-white focus:outline-none focus:border-gold-light/50"
              placeholder="Enter amount of tokens"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">
              Price per Token (ETH)
            </label>
            <input
              type="number"
              required
              step="0.000001"
              value={pricePerToken}
              onChange={(e) => setPricePerToken(e.target.value)}
              className="w-full px-4 py-2 bg-dark rounded-lg border border-gold-light/20 text-white focus:outline-none focus:border-gold-light/50"
              placeholder="Enter price per token in ETH"
            />
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold rounded-lg hover:from-gold-dark hover:to-gold-light transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}