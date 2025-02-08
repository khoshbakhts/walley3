
import React, { useState } from 'react';
import { Search, Filter, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

interface MarketOrder {
  id: number;
  paintingId: number;
  tokenAmount: number;
  pricePerToken: number;
  seller: string;
  timestamp: number;
}

const mockOrders: MarketOrder[] = [
  {
    id: 1,
    paintingId: 1,
    tokenAmount: 1000,
    pricePerToken: 0.05,
    seller: "0x1234...5678",
    timestamp: Date.now() - 3600000
  },
  {
    id: 2,
    paintingId: 2,
    tokenAmount: 500,
    pricePerToken: 0.08,
    seller: "0x8765...4321",
    timestamp: Date.now() - 7200000
  },
  // Add more mock orders
];

export default function Marketplace() {
  const [orders] = useState<MarketOrder[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'time'>('time');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Marketplace</h1>
          <button className="px-4 py-2 bg-gradient-to-r from-gold-light to-gold-dark text-dark font-semibold rounded-lg hover:from-gold-dark hover:to-gold-light transition-colors">
            Create Sell Order
          </button>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-lighter p-6 rounded-lg border border-gold-light/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">24h Volume</h3>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-white">Ξ 12.45</p>
            <p className="text-sm text-green-500">+5.2%</p>
          </div>

          <div className="bg-dark-lighter p-6 rounded-lg border border-gold-light/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Active Orders</h3>
              <ArrowUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-white">42</p>
            <p className="text-sm text-green-500">+12 today</p>
          </div>

          <div className="bg-dark-lighter p-6 rounded-lg border border-gold-light/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Avg Price</h3>
              <ArrowDown className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-white">Ξ 0.064</p>
            <p className="text-sm text-red-500">-2.1%</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by painting ID or seller address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-light rounded-lg border border-gold-light/20 text-white focus:outline-none focus:border-gold-light/50"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                onChange={(e) => setSortBy(e.target.value as 'price' | 'time')}
                className="pl-10 pr-8 py-2 bg-dark-light rounded-lg border border-gold-light/20 text-white appearance-none focus:outline-none focus:border-gold-light/50"
              >
                <option value="time">Sort by Time</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
            <button
              onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-2 bg-dark-light rounded-lg border border-gold-light/20 text-white hover:bg-dark-lighter transition-colors"
            >
              {sortDirection === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gold-light/10">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Painting ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Price per Token</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Total Value</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Seller</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-light/10">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-dark-light/50 transition-colors">
                  <td className="px-4 py-4 text-white">#{order.paintingId}</td>
                  <td className="px-4 py-4 text-white">{order.tokenAmount.toLocaleString()}</td>
                  <td className="px-4 py-4 text-white">Ξ {order.pricePerToken}</td>
                  <td className="px-4 py-4 text-white">Ξ {(order.tokenAmount * order.pricePerToken).toFixed(4)}</td>
                  <td className="px-4 py-4 text-white">{order.seller}</td>
                  <td className="px-4 py-4 text-gray-400">
                    {new Date(order.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-4">
                    <button className="px-3 py-1 bg-green-500/10 text-green-500 rounded hover:bg-green-500/20 transition-colors">
                      Buy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}