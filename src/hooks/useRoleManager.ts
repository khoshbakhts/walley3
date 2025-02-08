import { ethers } from 'ethers';
import { useState, useEffect, useCallback } from 'react';
import { ROLE_MANAGER_ABI } from '../contracts/roleManagerAbi';

const ROLE_MANAGER_ADDRESS = "0x0Ec3C186B24a9441dEc0323C95D736C15229D7F4";

export const useRoleManager = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initContract = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const roleManagerContract = new ethers.Contract(
            ROLE_MANAGER_ADDRESS,
            ROLE_MANAGER_ABI,
            signer
          );
          setContract(roleManagerContract);
        } catch (error) {
          console.error('Error initializing contract:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    initContract();
  }, []);

  const getUserInfo = useCallback(async (address: string) => {
    if (!contract) return null;
    try {
      const result = await contract.userInfo(address);
      if (!result || !result[0]) return null;
      
      return {
        firstName: result[0],
        lastName: result[1],
        email: result[2],
        organization: result[3],
        walletAddress: result[4]
      };
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  }, [contract]);

  const getUserInfoRequest = useCallback(async (address: string) => {
    if (!contract) return null;
    try {
      const result = await contract.userInfoRequests(address);
      if (!result || !result[0]) return null;

      return {
        requester: result[0],
        info: {
          firstName: result[1][0],
          lastName: result[1][1],
          email: result[1][2],
          organization: result[1][3],
          walletAddress: result[1][4]
        },
        isUpdate: result[2],
        pending: result[3],
        approved: result[4]
      };
    } catch (error) {
      console.error('Error fetching user info request:', error);
      return null;
    }
  }, [contract]);

  const requestUserInfo = async (
    firstName: string,
    lastName: string,
    email: string,
    organization: string
  ) => {
    if (!contract) return false;
    try {
      const tx = await contract.requestUserInfo(firstName, lastName, email, organization);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error requesting user info:', error);
      return false;
    }
  };

  return {
    loading,
    getUserInfo,
    getUserInfoRequest,
    requestUserInfo
  };
};