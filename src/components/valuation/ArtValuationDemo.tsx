import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle, BadgeCheck, Sparkles, BarChart3, Clock, DollarSign, PaintBucket, ImageIcon, History, Tag, Info, Palette, MapPin, User, Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import artworkImage from "../../images/image.jpg";

const mockPriceHistory = [
  { month: 'Jan', price: 65000 },
  { month: 'Feb', price: 68000 },
  { month: 'Mar', price: 66000 },
  { month: 'Apr', price: 70000 },
  { month: 'May', price: 72000 },
  { month: 'Jun', price: 75000 },
  { month: 'Jul', price: 78000 },
  { month: 'Aug', price: 82000 },
  { month: 'Sep', price: 85000 },
  { month: 'Oct', price: 88000 },
  { month: 'Nov', price: 92000 },
  { month: 'Dec', price: 95000 },
];

const mockTransactions = [
  { date: '2023-12-15', price: 88000, location: 'New York', auction: 'Christie\'s' },
  { date: '2023-09-28', price: 82000, location: 'London', auction: 'Sotheby\'s' },
  { date: '2023-06-10', price: 75000, location: 'Paris', auction: 'Artcurial' },
  { date: '2023-03-22', price: 70000, location: 'Dubai', auction: 'Bonhams' },
];

const ArtValuationDemo = () => {
  const [artworkName, setArtworkName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showReport, setShowReport] = useState(false);

  const steps = [
    { label: 'Analyzing visual elements', icon: PaintBucket, duration: 2000 },
    { label: 'Processing market data', icon: BarChart3, duration: 2500 },
    { label: 'Evaluating historical context', icon: Clock, duration: 1800 },
    { label: 'Analyzing comparable sales', icon: History, duration: 2000 },
    { label: 'Calculating final valuation', icon: DollarSign, duration: 1500 }
  ];

  const startProcessing = () => {
    if (!artworkName) return;
    setIsProcessing(true);
    setCurrentStep(0);
    setShowReport(false);
    processSteps();
  };

  const processSteps = () => {
    let currentTimeout = 0;
    steps.forEach((step, index) => {
      currentTimeout += step.duration;
      setTimeout(() => {
        setCurrentStep(index + 1);
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsProcessing(false);
            setShowReport(true);
          }, 1000);
        }
      }, currentTimeout);
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-dark-lighter rounded-lg p-6 border border-gold-light/10">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">
            Artwork Name
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={artworkName}
              onChange={(e) => setArtworkName(e.target.value)}
              disabled={isProcessing}
              placeholder="Enter artwork name..."
              className="flex-1 rounded-lg bg-dark border border-gold-light/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-light"
            />
            <button
              onClick={startProcessing}
              disabled={!artworkName || isProcessing}
              className="px-6 py-2 bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold rounded-lg hover:from-gold-dark hover:to-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing
                </div>
              ) : (
                'Start Analysis'
              )}
            </button>
          </div>
        </div>

        {isProcessing && (
          <div className="mt-8 space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isComplete = currentStep > index;
              const isActive = currentStep === index;

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg border ${
                    isComplete
                      ? 'border-green-500/20 bg-green-500/5'
                      : isActive
                      ? 'border-gold-light/20 bg-gold-light/5'
                      : 'border-gray-700 bg-dark'
                  }`}
                >
                  <div className="w-8">
                    {isComplete ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : isActive ? (
                      <Loader2 className="w-6 h-6 text-gold-light animate-spin" />
                    ) : (
                      <Icon className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  <span
                    className={
                      isComplete
                        ? 'text-green-500'
                        : isActive
                        ? 'text-gold-light'
                        : 'text-gray-500'
                    }
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {showReport && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <div className="flex items-center space-x-2 text-green-500 mb-8">
              <BadgeCheck className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Analysis Complete</h3>
            </div>

            {/* Artwork Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="bg-dark rounded-lg overflow-hidden border border-gold-light/10">
                <img
  src={artworkImage}
  alt="Artwork"
  className="w-full h-64 object-cover"
/>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">{artworkName}</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>Artist: John Smith</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Year: 2023</span>
                      </div>
                      <div className="flex items-center">
                        <Palette className="w-4 h-4 mr-2" />
                        <span>Medium: Oil on canvas</span>
                      </div>
                      <div className="flex items-center">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        <span>Dimensions: 100 x 80 cm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="bg-dark p-6 rounded-lg border border-gold-light/10">
                  <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-gold-light" />
                    Price Trend Analysis
                  </h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockPriceHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="month" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '0.5rem',
                          }}
                          labelStyle={{ color: '#e2e8f0' }}
                        />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="#ffd700"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-dark p-6 rounded-lg border border-gold-light/10">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-gold-light" />
                      Key Attributes
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Museum-quality execution</li>
                      <li>• Rare color palette</li>
                      <li>• Strong provenance</li>
                      <li>• Excellent condition</li>
                      <li>• Certificate of authenticity</li>
                      <li>• Featured in major exhibitions</li>
                    </ul>
                  </div>

                  <div className="bg-dark p-6 rounded-lg border border-gold-light/10">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-gold-light" />
                      Market Indicators
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• High collector demand</li>
                      <li>• Strong auction performance</li>
                      <li>• Growing artist recognition</li>
                      <li>• Positive market momentum</li>
                      <li>• International appeal</li>
                      <li>• Active secondary market</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-dark p-6 rounded-lg border border-gold-light/10">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <History className="w-5 h-5 mr-2 text-gold-light" />
                Recent Transaction History
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-700">
                      <th className="pb-3 text-gray-400">Date</th>
                      <th className="pb-3 text-gray-400">Location</th>
                      <th className="pb-3 text-gray-400">Auction House</th>
                      <th className="pb-3 text-gray-400 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTransactions.map((transaction, index) => (
                      <tr key={index} className="border-b border-gray-700/50">
                        <td className="py-3 text-gray-300">{transaction.date}</td>
                        <td className="py-3 text-gray-300">{transaction.location}</td>
                        <td className="py-3 text-gray-300">{transaction.auction}</td>
                        <td className="py-3 text-gray-300 text-right">
                          ${transaction.price.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Final Valuation */}
            <div className="bg-dark p-6 rounded-lg border border-gold-light/10">
              <h4 className="text-lg font-semibold text-white mb-4">Current Valuation Range</h4>
              <div className="flex items-center justify-center py-6">
                <span className="text-4xl font-bold text-gold-light">
                  $75,000 - $95,000
                </span>
              </div>
              <div className="text-gray-400 text-sm space-y-2">
                <p className="text-center">
                  This estimate is based on current market conditions, recent transactions,
                  and comprehensive analysis of comparable works.
                </p>
                <p className="text-center text-gold-light/80">
                  Confidence Level: High
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-dark p-6 rounded-lg border border-gold-light/10">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-gold-light" />
                Additional Information
              </h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  • The artwork shows strong potential for value appreciation based on the artist's growing reputation
                  and recent museum acquisitions.
                </p>
                <p>
                  • Similar works by the artist have shown consistent price growth over the past 24 months.
                </p>
                <p>
                  • Current market conditions and collector interest suggest high liquidity potential.
                </p>
                <p>
                  • Recommendation: Consider for acquisition with medium to long-term investment horizon.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtValuationDemo;