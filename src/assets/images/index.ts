// Default fallback images
export const DEFAULT_WALL_IMAGE = 'https://images.unsplash.com/photo-1533105045747-12a4fa0d8093?auto=format&fit=crop&q=80';
export const DEFAULT_GALLERY_IMAGE = 'https://images.unsplash.com/photo-1561059488-916d69792237?auto=format&fit=crop&q=80';
export const DEFAULT_STREET_ART_IMAGE = 'https://images.unsplash.com/photo-1533105045747-12a4fa0d8093?auto=format&fit=crop&q=80';

// API endpoints for dynamic images
export const getWallImage = (wallId: number) => `https://www.bitra.market/${wallId}.png`;

// Landing page images
export const HERO_IMAGE = 'https://images.unsplash.com/photo-1533105045747-12a4fa0d8093?auto=format&fit=crop&q=80';
export const MUSEUM_IMAGE = 'https://images.unsplash.com/photo-1561059488-916d69792237?auto=format&fit=crop&q=80';