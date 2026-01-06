// Subscription tier utilities

export interface TierInfo {
  name: string;
  displayName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  benefits: string[];
  mediaLimits: {
    images: number;
    videos: number;
  };
  groupLimit: number;
}

export function getTierInfo(tier: string): TierInfo {
  const normalizedTier = tier?.toUpperCase() || 'FREE';

  switch (normalizedTier) {
    case 'PLATINUM':
      return {
        name: 'PLATINUM',
        displayName: 'Platinum',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        benefits: [
          'Unlimited media (images & videos)',
          'Featured Status (Always in Top 5 search results)',
          'Z-Card Generator (Professional PDF)',
          'Priority Shortlist (Auto-suggested to admins)',
          'Unlimited Groups/Troupes',
        ],
        mediaLimits: {
          images: Infinity,
          videos: Infinity,
        },
        groupLimit: Infinity,
      };
    case 'SILVER':
      return {
        name: 'SILVER',
        displayName: 'Silver',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        benefits: [
          '10 gallery slots',
          '2 video reels',
          'Search Boost (Top 20% visibility)',
          'Verified Badge',
          'Create 1 Group/Troupe',
        ],
        mediaLimits: {
          images: 10,
          videos: 2,
        },
        groupLimit: 1,
      };
    default: // FREE
      return {
        name: 'FREE',
        displayName: 'Free',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        benefits: [
          '2 gallery slots',
          'Discoverable in search',
        ],
        mediaLimits: {
          images: 2,
          videos: 0,
        },
        groupLimit: 0,
      };
  }
}

export function getMediaLimits(subscriptionTier: string): { images: number; videos: number } {
  return getTierInfo(subscriptionTier).mediaLimits;
}

export function getGroupLimit(subscriptionTier: string): number {
  return getTierInfo(subscriptionTier).groupLimit;
}
