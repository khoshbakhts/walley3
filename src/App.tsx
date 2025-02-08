import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Assets from './pages/Assets';
import Galleries from './pages/Galleries';
import Walls from './pages/Walls';
import Paintings from './pages/Paintings';
import Auctions from './pages/Auctions';
import Marketplace from './pages/Marketplace';
import Requests from './pages/Requests';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/assets" element={<Assets />} />
        <Route path="/dashboard/galleries" element={<Galleries />} />
        <Route path="/dashboard/walls" element={<Walls />} />
        <Route path="/dashboard/paintings" element={<Paintings />} />
        <Route path="/dashboard/auctions" element={<Auctions />} />
        <Route path="/dashboard/marketplace" element={<Marketplace />} />
        <Route path="/dashboard/requests" element={<Requests />} />
      </Routes>
    </Router>
  );
}

export default App;