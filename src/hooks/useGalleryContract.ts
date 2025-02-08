import { ethers } from 'ethers';
import { useState, useEffect, useCallback } from 'react';
import { GALLERY_CONTRACT_ABI } from '../contracts/galleryContractAbi';
import { ROLE_MANAGER_ABI } from '../contracts/roleManagerAbi';

const GALLERY_CONTRACT_ADDRESS = "0x1A948eFfce9778a90B301D05BC877c353E2dd7c8";
const ROLE_MANAGER_ADDRESS = "0x0Ec3C186B24a9441dEc0323C95D736C15229D7F4";
const GALLERY_OWNER_ROLE = "0x876bbbf5907d194533faadcead8cfa42ad0f2b1653cc89d94228f5c04f389a15";

export interface GalleryLocation {
  city: string;
  country: string;
  longitude: number;
  latitude: number;
}

export interface GalleryData {
  id: number;
  name: string;
  description: string;
  location: GalleryLocation;
  owner: string;
  ownershipPercentage: number;
  isActive: boolean;
  createdAt: number;
  lastUpdated: number;
}

export interface GalleryCreationParams {
  name: string;
  description: string;
  city: string;
  country: string;
  longitude: number;
  latitude: number;
  ownershipPercentage: number;
}

export interface WallRequest {
  wallId: number;
  wallOwner: string;
  wallOwnerPercentage: number;
  pending: boolean;
  approved: boolean;
}

export const useGalleryContract = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [roleManagerContract, setRoleManagerContract] = useState<ethers.Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasGalleryOwnerRole, setHasGalleryOwnerRole] = useState(false);

  useEffect(() => {
    const initContracts = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          
          // Initialize Gallery Contract
          const gallery = new ethers.Contract(
            GALLERY_CONTRACT_ADDRESS,
            GALLERY_CONTRACT_ABI,
            signer
          );
          setContract(gallery);

          // Initialize RoleManager Contract
          const roleManager = new ethers.Contract(
            ROLE_MANAGER_ADDRESS,
            ROLE_MANAGER_ABI,
            signer
          );
          setRoleManagerContract(roleManager);

          // Check if user has gallery owner role
          const hasRole = await roleManager.hasRole(GALLERY_OWNER_ROLE, await signer.getAddress());
          setHasGalleryOwnerRole(hasRole);
        } catch (error) {
          console.error('Error initializing contracts:', error);
          setHasGalleryOwnerRole(false);
        } finally {
          setLoading(false);
        }
      }
    };

    initContracts();
  }, []);

  const getPlatformPercentage = useCallback(async (): Promise<number> => {
    if (!contract) return 0;
    try {
      const percentage = await contract.getPlatformPercentage();
      return Number(percentage);
    } catch (error) {
      console.error('Error getting platform percentage:', error);
      return 0;
    }
  }, [contract]);

  const isGalleryActive = useCallback(async (galleryId: number): Promise<boolean> => {
    if (!contract) return false;
    try {
      return await contract.isGalleryActive(galleryId);
    } catch (error) {
      console.error('Error checking gallery active status:', error);
      return false;
    }
  }, [contract]);

  const getGalleryOwner = useCallback(async (galleryId: number): Promise<string> => {
    if (!contract) return ethers.ZeroAddress;
    try {
      return await contract.getGalleryOwner(galleryId);
    } catch (error) {
      console.error('Error getting gallery owner:', error);
      return ethers.ZeroAddress;
    }
  }, [contract]);

  const getGallery = useCallback(async (galleryId: number): Promise<GalleryData | null> => {
    if (!contract) return null;
    try {
      const gallery = await contract.galleries(galleryId);
      
      if (!gallery || !gallery.owner || gallery.owner === ethers.ZeroAddress) {
        return null;
      }
      
      return {
        id: Number(gallery.id),
        name: gallery.name,
        description: gallery.description,
        location: {
          city: gallery.location.city,
          country: gallery.location.country,
          longitude: Number(gallery.location.longitude),
          latitude: Number(gallery.location.latitude)
        },
        owner: gallery.owner,
        ownershipPercentage: Number(gallery.ownershipPercentage),
        isActive: gallery.isActive,
        createdAt: Number(gallery.createdAt),
        lastUpdated: Number(gallery.lastUpdated)
      };
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return null;
    }
  }, [contract]);

  const getGalleryWalls = useCallback(async (galleryId: number): Promise<number[]> => {
    if (!contract) return [];
    try {
      const walls = await contract.getGalleryWalls(galleryId);
      return walls.map((id: ethers.BigNumber) => Number(id));
    } catch (error) {
      console.error('Error fetching gallery walls:', error);
      return [];
    }
  }, [contract]);

  const getPendingWallRequests = useCallback(async (galleryId: number): Promise<WallRequest[]> => {
    if (!contract) return [];
    try {
      const requests = await contract.getPendingWallRequests(galleryId);
      return requests.map((request: any) => ({
        wallId: Number(request.wallId),
        wallOwner: request.wallOwner,
        wallOwnerPercentage: Number(request.wallOwnerPercentage),
        pending: request.pending,
        approved: request.approved
      }));
    } catch (error) {
      console.error('Error fetching pending wall requests:', error);
      return [];
    }
  }, [contract]);

  const requestGallery = async (params: GalleryCreationParams) => {
    if (!contract) return false;
    try {
      const tx = await contract.requestGallery({
        name: params.name,
        description: params.description,
        city: params.city,
        country: params.country,
        longitude: params.longitude,
        latitude: params.latitude,
        ownershipPercentage: params.ownershipPercentage
      });
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error requesting gallery:', error);
      return false;
    }
  };

  const requestWallToGallery = async (galleryId: number, wallId: number): Promise<boolean> => {
    if (!contract) return false;
    try {
      const tx = await contract.requestWallToGallery(galleryId, wallId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error requesting wall to gallery:', error);
      return false;
    }
  };

  const approveWallToGallery = async (galleryId: number, wallId: number) => {
    if (!contract) return false;
    try {
      const tx = await contract.approveWallToGallery(galleryId, wallId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error approving wall to gallery:', error);
      return false;
    }
  };

  const rejectWallToGallery = async (galleryId: number, wallId: number) => {
    if (!contract) return false;
    try {
      const tx = await contract.rejectWallToGallery(galleryId, wallId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error rejecting wall to gallery:', error);
      return false;
    }
  };

  const getGalleriesByOwner = useCallback(async (ownerAddress: string): Promise<GalleryData[]> => {
    if (!contract) return [];
    try {
      const galleries = await contract.getGalleriesByOwner(ownerAddress);
      console.log('Raw gallery data:', galleries); // Debug log
      
      // Convert the returned data to our GalleryData interface
      return galleries.map((gallery: any) => ({
        id: Number(gallery.id),
        name: gallery.name,
        description: gallery.description,
        location: {
          city: gallery.location.city,
          country: gallery.location.country,
          longitude: Number(gallery.location.longitude),
          latitude: Number(gallery.location.latitude)
        },
        owner: gallery.owner,
        ownershipPercentage: Number(gallery.ownershipPercentage),
        isActive: gallery.isActive,
        createdAt: Number(gallery.createdAt),
        lastUpdated: Number(gallery.lastUpdated)
      })).filter((gallery: GalleryData) => 
        gallery.isActive && 
        gallery.owner !== '0x0000000000000000000000000000000000000000'
      );
    } catch (error) {
      console.error('Error fetching galleries by owner:', error);
      return [];
    }
  }, [contract]);

  return {
    loading,
    hasGalleryOwnerRole,
    getGalleriesByOwner,
    getPlatformPercentage,
    isGalleryActive,
    getGalleryOwner,
    getGallery,
    getGalleryWalls,
    requestGallery,
    requestWallToGallery,
    getPendingWallRequests,
    approveWallToGallery,
    rejectWallToGallery
  };
};