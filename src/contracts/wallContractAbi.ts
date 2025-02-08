export const WALL_CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "country",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "city",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "physicalAddress",
        "type": "string"
      },
      {
        "internalType": "int256",
        "name": "longitude",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "latitude",
        "type": "int256"
      },
      {
        "internalType": "uint256",
        "name": "size",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "ownershipPercentage",
        "type": "uint256"
      }
    ],
    "name": "requestWall",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "wallId",
        "type": "uint256"
      }
    ],
    "name": "getWall",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "country",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "city",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "physicalAddress",
                "type": "string"
              },
              {
                "internalType": "int256",
                "name": "longitude",
                "type": "int256"
              },
              {
                "internalType": "int256",
                "name": "latitude",
                "type": "int256"
              }
            ],
            "internalType": "struct Wall.Location",
            "name": "location",
            "type": "tuple"
          },
          {
            "internalType": "uint256",
            "name": "size",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "ownershipPercentage",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isInGallery",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "galleryId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "createdAt",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lastUpdated",
            "type": "uint256"
          }
        ],
        "internalType": "struct Wall.WallData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "getWallsByOwner",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "wallId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "percentage",
        "type": "uint256"
      }
    ],
    "name": "setOwnershipPercentage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "hasRole",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];