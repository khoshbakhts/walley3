export const GALLERY_CONTRACT_ABI =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_roleManagerAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_wallContractAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			}
		],
		"name": "GalleryRequestApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			}
		],
		"name": "GalleryRequestRejected",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "requester",
				"type": "address"
			}
		],
		"name": "GalleryRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newPercentage",
				"type": "uint256"
			}
		],
		"name": "PlatformPercentageUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "wallId",
				"type": "uint256"
			}
		],
		"name": "WallRemovedFromGallery",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "wallId",
				"type": "uint256"
			}
		],
		"name": "WallToGalleryRequestApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "wallId",
				"type": "uint256"
			}
		],
		"name": "WallToGalleryRequestRejected",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "wallId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "wallOwner",
				"type": "address"
			}
		],
		"name": "WallToGalleryRequested",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			}
		],
		"name": "approveGalleryRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "wallId",
				"type": "uint256"
			}
		],
		"name": "approveWallToGallery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "galleries",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "city",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "country",
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
				"internalType": "struct Gallery.Location",
				"name": "location",
				"type": "tuple"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "ownershipPercentage",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
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
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			}
		],
		"name": "galleryExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "galleryRequests",
		"outputs": [
			{
				"internalType": "address",
				"name": "requester",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "city",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "country",
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
				"internalType": "struct Gallery.Location",
				"name": "location",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "ownershipPercentage",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "pending",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "galleryWalls",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getGalleriesByOwner",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "city",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "country",
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
						"internalType": "struct Gallery.Location",
						"name": "location",
						"type": "tuple"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ownershipPercentage",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
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
				"internalType": "struct Gallery.GalleryData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			}
		],
		"name": "getGallery",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "city",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "country",
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
						"internalType": "struct Gallery.Location",
						"name": "location",
						"type": "tuple"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ownershipPercentage",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
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
				"internalType": "struct Gallery.GalleryData",
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
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			}
		],
		"name": "getGalleryOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			}
		],
		"name": "getGalleryWalls",
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
				"name": "galleryId",
				"type": "uint256"
			}
		],
		"name": "getPendingWallRequests",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "wallId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "wallOwner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "wallOwnerPercentage",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "pending",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "approved",
						"type": "bool"
					}
				],
				"internalType": "struct Gallery.WallToGalleryRequest[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPlatformPercentage",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			}
		],
		"name": "isGalleryActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pendingWallsPerGallery",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "platformPercentage",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			}
		],
		"name": "rejectGalleryRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "wallId",
				"type": "uint256"
			}
		],
		"name": "rejectWallToGallery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "wallId",
				"type": "uint256"
			}
		],
		"name": "removeWallFromGallery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "city",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "country",
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
						"name": "ownershipPercentage",
						"type": "uint256"
					}
				],
				"internalType": "struct Gallery.GalleryCreationParams",
				"name": "params",
				"type": "tuple"
			}
		],
		"name": "requestGallery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "galleryId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "wallId",
				"type": "uint256"
			}
		],
		"name": "requestWallToGallery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "roleManager",
		"outputs": [
			{
				"internalType": "contract IRoleManager",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_percentage",
				"type": "uint256"
			}
		],
		"name": "setPlatformPercentage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "wallContract",
		"outputs": [
			{
				"internalType": "contract IWall",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "wallToGalleryRequests",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "wallId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "wallOwner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "wallOwnerPercentage",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "pending",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];