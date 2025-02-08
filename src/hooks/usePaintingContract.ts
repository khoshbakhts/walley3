import { ethers } from 'ethers';
import { useState, useEffect, useCallback } from 'react';
import { ROLE_MANAGER_ABI } from '../contracts/roleManagerAbi';
import { PAINTING_NFT_ABI } from '../contracts/paintingNFTAbi';

const ROLE_MANAGER_ADDRESS = "0x0Ec3C186B24a9441dEc0323C95D736C15229D7F4";
const PAINTING_NFT_ADDRESS = "0xa0704674d4174773f6b7ADcA2a6e3CafA5892DBc";
const PAINTER_ROLE = "0x709f71abb733aa2493d642ec84d615695650e6806fd401c97e1fecbd9c84c1d6";


export enum PaintingStatus {
  None = 0,
  Requested = 1,
  InProcess = 2,
  Completed = 3
}

export interface PaintingRequest {
  requestId: number;
  wallId: number;
  painter: string;
  description: string;
  status: PaintingStatus;
  timestamp: number;
}

export const usePaintingContract = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [roleManagerContract, setRoleManagerContract] = useState<ethers.Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasPainterRole, setHasPainterRole] = useState(false);

  useEffect(() => {
    const initContracts = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          
          // Initialize Role Manager Contract
          const roleManager = new ethers.Contract(
            ROLE_MANAGER_ADDRESS,
            ROLE_MANAGER_ABI,
            signer
          );
          setRoleManagerContract(roleManager);

          // Initialize PaintingNFT Contract
          const paintingNFT = new ethers.Contract(
            PAINTING_NFT_ADDRESS,
            PAINTING_NFT_ABI,
            signer
          );
          setContract(paintingNFT);

          // Check if user has painter role
          const hasRole = await roleManager.hasRole(PAINTER_ROLE, await signer.getAddress());
          setHasPainterRole(hasRole);
        } catch (error) {
          console.error('Error initializing contracts:', error);
          setHasPainterRole(false);
        } finally {
          setLoading(false);
        }
      }
    };

    initContracts();
  }, []);


  const approvePaintingRequest = async (requestId: number): Promise<boolean> => {
    if (!contract) return false;
    try {
      const tx = await contract.approvePaintingRequest(requestId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error approving painting request:', error);
      return false;
    }
  };

  const rejectPaintingRequest = async (requestId: number): Promise<boolean> => {
    if (!contract) return false;
    try {
      const tx = await contract.rejectPaintingRequest(requestId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error rejecting painting request:', error);
      return false;
    }
  };

  const getPaintingRequest = useCallback(async (requestId: number): Promise<PaintingRequest | null> => {
    if (!contract) return null;
    try {
      const request = await contract.paintingRequests(requestId);
      return {
        requestId: Number(request.requestId),
        wallId: Number(request.wallId),
        painter: request.painter,
        description: request.description,
        status: Number(request.status),
        timestamp: Number(request.timestamp)
      };
    } catch (error) {
      console.error('Error fetching painting request:', error);
      return null;
    }
  }, [contract]);

  const getWallRequests = useCallback(async (wallId: number): Promise<number[]> => {
    if (!contract) return [];
    try {
      const requests = await contract.getWallRequests(wallId);
      return requests.map((id: ethers.BigNumber) => Number(id));
    } catch (error) {
      console.error('Error fetching wall requests:', error);
      return [];
    }
  }, [contract]);

  const getPainterPendingRequests = useCallback(async (painter: string): Promise<number[]> => {
    if (!contract) return [];
    try {
      const requests = await contract.getPainterPendingRequests(painter);
      return requests.map((id: ethers.BigNumber) => Number(id));
    } catch (error) {
      console.error('Error fetching painter pending requests:', error);
      return [];
    }
  }, [contract]);

  const getPainterAcceptedRequests = useCallback(async (painter: string): Promise<number[]> => {
    if (!contract) return [];
    try {
      const requests = await contract.getPainterAcceptedRequests(painter);
      return requests.map((id: ethers.BigNumber) => Number(id));
    } catch (error) {
      console.error('Error fetching painter accepted requests:', error);
      return [];
    }
  }, [contract]);

  const getWallCompletedRequests = useCallback(async (wallId: number): Promise<number[]> => {
    if (!contract) return [];
    try {
      const requests = await contract.getWallCompletedRequests(wallId);
      return requests.map((id: ethers.BigNumber) => Number(id));
    } catch (error) {
      console.error('Error fetching wall completed requests:', error);
      return [];
    }
  }, [contract]);

  const requestPainting = async (wallId: number, description: string): Promise<boolean> => {
    if (!contract) return false;
    try {
      const tx = await contract.requestPainting(wallId, description);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error requesting painting:', error);
      return false;
    }
  };



  const submitPaintingCompletion = async (requestId: number): Promise<boolean> => {
    if (!contract) return false;
    try {
      const tx = await contract.submitPaintingCompletion(requestId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error submitting painting completion:', error);
      return false;
    }
  };

  const finalizePainting = async (requestId: number): Promise<boolean> => {
    if (!contract) return false;
    try {
      const tx = await contract.finalizePainting(requestId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error finalizing painting:', error);
      return false;
    }
  };

  const getAllRequestsForGallery = useCallback(async (galleryId: number, wallIds: number[]): Promise<PaintingRequest[]> => {
    if (!contract || !wallIds.length) return [];
    try {
      const requests: PaintingRequest[] = [];
      
      for (const wallId of wallIds) {
        const requestIds = await getWallRequests(wallId);
        const wallRequests = await Promise.all(
          requestIds.map(async (requestId) => {
            const request = await getPaintingRequest(requestId);
            return request;
          })
        );
        requests.push(...wallRequests.filter((req): req is PaintingRequest => req !== null));
      }
      
      return requests;
    } catch (error) {
      console.error('Error fetching gallery requests:', error);
      return [];
    }
  }, [contract, getWallRequests, getPaintingRequest]);

  return {
    loading,
    hasPainterRole,
    getPaintingRequest,
    getWallRequests,
    getPainterPendingRequests,
    getPainterAcceptedRequests,
    getWallCompletedRequests,
    getAllRequestsForGallery,
    requestPainting,
    approvePaintingRequest,
    rejectPaintingRequest,
    submitPaintingCompletion,
    finalizePainting
  };
};