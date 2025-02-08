import React from 'react';
import { Shield, ShieldAlert } from 'lucide-react';

interface ProfileInfoProps {
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
    walletAddress: string;
  };
  isVerified: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userInfo, isVerified }) => {
  return (
    <div className="bg-dark-lighter rounded-lg p-6 border border-gold-light/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Profile Information</h2>
        {isVerified ? (
          <div className="flex items-center text-green-400">
            <Shield className="w-5 h-5 mr-2" />
            <span>Verified</span>
          </div>
        ) : (
          <div className="flex items-center text-yellow-400">
            <ShieldAlert className="w-5 h-5 mr-2" />
            <span>Pending Verification</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400">First Name</label>
          <p className="text-white">{userInfo.firstName}</p>
        </div>

        <div>
          <label className="text-sm text-gray-400">Last Name</label>
          <p className="text-white">{userInfo.lastName}</p>
        </div>

        <div>
          <label className="text-sm text-gray-400">Email</label>
          <p className="text-white">{userInfo.email}</p>
        </div>

        <div>
          <label className="text-sm text-gray-400">Organization</label>
          <p className="text-white">{userInfo.organization || 'Not specified'}</p>
        </div>

        <div>
          <label className="text-sm text-gray-400">Wallet Address</label>
          <p className="text-white font-mono">{userInfo.walletAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;