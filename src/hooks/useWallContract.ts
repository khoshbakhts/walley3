import { ethers } from 'ethers';
import { useState, useEffect, useCallback } from 'react';
import { WALL_CONTRACT_ABI } from '../contracts/wallContractAbi';
import { ROLE_MANAGER_ABI } from '../contracts/roleManagerAbi';

const WALL_CONTRACT_ADDRESS = "0x377f17e2e00fc1419FbdEe9256dBEB2d10BF80B4";
const ROLE_MANAGER_ADDRESS = "0x0Ec3C186B24a9441dEc0323C95D736C15229D7F4";
const WALL_OWNER_ROLE = "0x329c74013ba5a00a181f8b3dc9d0ae428c8a88ad0625246c0382e31759b580db";

export interface WallLocation {
  country: string;
  city: string;
  physicalAddress: string;
  longitude: number;
  latitude: number;
}

export interface WallData {
  id: number;
  owner: string;
  location: WallLocation;
  size: number;
  ownershipPercentage: number;
  isInGallery: boolean;
  galleryId: number;
  createdAt: number;
  lastUpdated: number;
}

export const useWallContract = () => {
  const [wallContract, setWallContract] = useState<ethers.Contract | null>(null);
  const [roleManagerContract, setRoleManagerContract] = useState<ethers.Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasWallOwnerRole, setHasWallOwnerRole] = useState(false);

  useEffect(() => {
    const initContracts = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          
          // Initialize Wall Contract
          const wall = new ethers.Contract(
            WALL_CONTRACT_ADDRESS,
            WALL_CONTRACT_ABI,
            signer
          );
          setWallContract(wall);

          // Initialize RoleManager Contract
          const roleManager = new ethers.Contract(
            ROLE_MANAGER_ADDRESS,
            ROLE_MANAGER_ABI,
            signer
          );
          setRoleManagerContract(roleManager);

          // Check if user has wall owner role
          const hasRole = await roleManager.hasRole(WALL_OWNER_ROLE, await signer.getAddress());
          setHasWallOwnerRole(hasRole);
        } catch (error) {
          console.error('Error initializing contracts:', error);
          setHasWallOwnerRole(false);
        } finally {
          setLoading(false);
        }
      }
    };

    initContracts();
  }, []);

  const getWall = useCallback(async (wallId: number): Promise<WallData | null> => {
    if (!wallContract) return null;
    try {
      const wall = await wallContract.getWall(wallId);
      
      return {
        id: Number(wall.id),
        owner: wall.owner,
        location: {
          country: wall.location.country,
          city: wall.location.city,
          physicalAddress: wall.location.physicalAddress,
          longitude: Number(wall.location.longitude),
          latitude: Number(wall.location.latitude)
        },
        size: Number(wall.size),
        ownershipPercentage: Number(wall.ownershipPercentage),
        isInGallery: wall.isInGallery,
        galleryId: Number(wall.galleryId),
        createdAt: Number(wall.createdAt),
        lastUpdated: Number(wall.lastUpdated)
      };
    } catch (error) {
      console.error('Error fetching wall:', error);
      return null;
    }
  }, [wallContract]);

  const getWallsByOwner = useCallback(async (owner: string): Promise<WallData[]> => {
    if (!wallContract) return [];
    try {
      const wallIds = await wallContract.getWallsByOwner(owner);
      const walls = await Promise.all(
        wallIds.map(async (id: number) => {
          try {
            return await getWall(id);
          } catch (error) {
            console.error(`Error fetching wall ${id}:`, error);
            return null;
          }
        })
      );
      return walls.filter((wall): wall is WallData => wall !== null);
    } catch (error) {
      console.error('Error fetching walls:', error);
      return [];
    }
  }, [wallContract, getWall]);

  const requestWall = async (
    country: string,
    city: string,
    physicalAddress: string,
    longitude: number,
    latitude: number,
    size: number,
    ownershipPercentage: number
  ) => {
    if (!wallContract) return false;
    try {
      const tx = await wallContract.requestWall(
        country,
        city,
        physicalAddress,
        longitude,
        latitude,
        size,
        ownershipPercentage
      );
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error requesting wall:', error);
      return false;
    }
  };

  const setOwnershipPercentage = async (wallId: number, percentage: number) => {
    if (!wallContract) return false;
    try {
      const tx = await wallContract.setOwnershipPercentage(wallId, percentage);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error setting ownership percentage:', error);
      return false;
    }
  };

  return {
    loading,
    hasWallOwnerRole,
    getWall,
    requestWall,
    getWallsByOwner,
    setOwnershipPercentage
  };
};
//test