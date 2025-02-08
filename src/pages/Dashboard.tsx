import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useWallContract } from '../hooks/useWallContract';
import { useGalleryContract } from '../hooks/useGalleryContract';
import { usePaintingContract } from '../hooks/usePaintingContract';
import { useRoleManager } from '../hooks/useRoleManager';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, Palette, LayoutTemplate, Users, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, Activity } from 'lucide-react';

const Dashboard = () => {
  const { getWallsByOwner } = useWallContract();
  const { getGalleriesByOwner } = useGalleryContract();
  const { getPaintingRequest } = usePaintingContract();
  const { getUserInfo } = useRoleManager();
  
  const [userStats, setUserStats] = useState({
    walls: [],
    galleries: [],
    paintings: [],
    profile: null
  });

  const [marketMetrics, setMarketMetrics] = useState({
    totalVolume: '2.45M',
    dailyChange: '+12.3%',
    isPositive: true,
    avgWallPrice: '15.2K',
    activeAuctions: 124,
    totalArtists: 892,
    recentTrades: [
      { id: 1, wall: '#1234', price: '12.4', type: 'sell', time: '2h ago' },
      { id: 2, wall: '#892', price: '8.9', type: 'buy', time: '4h ago' },
      { id: 3, wall: '#2156', price: '21.2', type: 'sell', time: '6h ago' }
    ]
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (window.ethereum?.selectedAddress) {
        try {
          const [walls, galleries, userInfo] = await Promise.all([
            getWallsByOwner(window.ethereum.selectedAddress),
            getGalleriesByOwner(window.ethereum.selectedAddress),
            getUserInfo(window.ethereum.selectedAddress)
          ]);

          setUserStats({
            walls,
            galleries: galleries.filter(g => g.owner !== '0x0000000000000000000000000000000000000000'),
            paintings: [], // Would be populated from painting contract
            profile: userInfo
          });
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      }
    };

    fetchUserData();
  }, [getWallsByOwner, getGalleriesByOwner, getUserInfo]);

  const chartData = [
    { name: 'Jan', value: 2400 },
    { name: 'Feb', value: 1398 },
    { name: 'Mar', value: 9800 },
    { name: 'Apr', value: 3908 },
    { name: 'May', value: 4800 },
    { name: 'Jun', value: 3800 }
  ];

  const dashboardContent = (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-dark-lighter rounded-lg p-6 border border-gold-light/10">
        <h1 className="text-2xl font-bold text-white mb-2">
          Welcome back, {userStats.profile?.firstName || 'Artist'}
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your digital art portfolio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-lighter p-6 rounded-lg border border-gold-light/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">My Walls</p>
              <h3 className="text-2xl font-bold text-white">{userStats.walls.length}</h3>
            </div>
            <LayoutTemplate className="w-8 h-8 text-gold-light" />
          </div>
        </div>

        <div className="bg-dark-lighter p-6 rounded-lg border border-gold-light/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">My Galleries</p>
              <h3 className="text-2xl font-bold text-white">{userStats.galleries.length}</h3>
            </div>
            <Building2 className="w-8 h-8 text-gold-light" />
          </div>
        </div>

        <div className="bg-dark-lighter p-6 rounded-lg border border-gold-light/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">My Paintings</p>
              <h3 className="text-2xl font-bold text-white">{userStats.paintings.length}</h3>
            </div>
            <Palette className="w-8 h-8 text-gold-light" />
          </div>
        </div>

        <div className="bg-dark-lighter p-6 rounded-lg border border-gold-light/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Value</p>
              <h3 className="text-2xl font-bold text-white">$45.8K</h3>
            </div>
            <DollarSign className="w-8 h-8 text-gold-light" />
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-dark-lighter p-6 rounded-lg border border-gold-light/10">
          <h3 className="text-lg font-semibold text-white mb-4">Portfolio Value</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: 'none',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill="#FFD700" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Stats */}
        <div className="bg-dark-lighter p-6 rounded-lg border border-gold-light/10">
          <h3 className="text-lg font-semibold text-white mb-4">Market Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Total Volume</p>
                <div className="flex items-center">
                  <h4 className="text-xl font-bold text-white">${marketMetrics.totalVolume}</h4>
                  <span className={`ml-2 flex items-center ${marketMetrics.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {marketMetrics.isPositive ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {marketMetrics.dailyChange}
                  </span>
                </div>
              </div>
              <Activity className="w-8 h-8 text-gold-light" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Avg. Wall Price</p>
                <h4 className="text-xl font-bold text-white">${marketMetrics.avgWallPrice}</h4>
              </div>
              <TrendingUp className="w-8 h-8 text-gold-light" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Active Artists</p>
                <h4 className="text-xl font-bold text-white">{marketMetrics.totalArtists}</h4>
              </div>
              <Users className="w-8 h-8 text-gold-light" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-dark-lighter p-6 rounded-lg border border-gold-light/10">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Trades</h3>
        <div className="space-y-4">
          {marketMetrics.recentTrades.map(trade => (
            <div key={trade.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${trade.type === 'buy' ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-white">Wall {trade.wall}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gold-light">${trade.price}K</span>
                <span className="text-gray-400">{trade.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      {dashboardContent}
    </DashboardLayout>
  );
};

export default Dashboard;