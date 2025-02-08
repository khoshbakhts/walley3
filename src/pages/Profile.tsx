import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useRoleManager } from '../hooks/useRoleManager';
import ProfileForm from '../components/profile/ProfileForm';
import ProfileInfo from '../components/profile/ProfileInfo';
import { Loader2 } from 'lucide-react';

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  walletAddress: string;
}

interface RequestStatus {
  requester: string;
  info: UserInfo;
  isUpdate: boolean;
  pending: boolean;
  approved: boolean;
}

const Profile: React.FC = () => {
  const { loading: contractLoading, getUserInfo, getUserInfoRequest, requestUserInfo } = useRoleManager();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [requestStatus, setRequestStatus] = useState<RequestStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!contractLoading && window.ethereum?.selectedAddress) {
        try {
          // First check for verified user info
          const info = await getUserInfo(window.ethereum.selectedAddress);
          
          if (info?.firstName) {
            setUserInfo(info);
          } else {
            // If no verified info, check for pending request
            const request = await getUserInfoRequest(window.ethereum.selectedAddress);
            if (request?.info?.firstName) {
              setRequestStatus(request);
            }
          }
        } catch (err) {
          console.error('Error fetching profile data:', err);
          setError('Failed to load profile data. Please try again later.');
        } finally {
          setLoading(false);
        }
      } else if (!contractLoading) {
        setError('Please connect your wallet to view your profile.');
        setLoading(false);
      }
    };

    fetchData();
  }, [contractLoading, getUserInfo, getUserInfoRequest, window.ethereum?.selectedAddress]);

  const handleProfileSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
  }) => {
    try {
      setLoading(true);
      const success = await requestUserInfo(
        data.firstName,
        data.lastName,
        data.email,
        data.organization
      );

      if (success) {
        const request = await getUserInfoRequest(window.ethereum.selectedAddress);
        if (request) {
          setRequestStatus(request);
        }
      } else {
        setError('Failed to submit profile request. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting profile:', err);
      setError('An error occurred while submitting your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading || contractLoading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center space-x-2 text-gold-light">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
          {error}
        </div>
      );
    }

    if (userInfo) {
      return <ProfileInfo userInfo={userInfo} isVerified={true} />;
    }

    if (requestStatus) {
      return <ProfileInfo userInfo={requestStatus.info} isVerified={false} />;
    }

    return (
      <div className="space-y-8">
        <div className="bg-dark-lighter p-6 rounded-lg border border-gold-light/10">
          <h2 className="text-xl font-semibold text-white mb-4">Create Profile</h2>
          <ProfileForm onSubmit={handleProfileSubmit} />
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold text-white mb-8">Profile</h1>
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default Profile;