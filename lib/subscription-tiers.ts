// Subscription tier information and benefits

export type SubscriptionTier = 'FREE' | 'SILVER' | 'PLATINUM';

export interface TierBenefits {
  gallerySlots: number | 'unlimited';
  videoReels?: number;
  searchBoost?: string;
  verifiedBadge: boolean;
  canCreateTroupes: boolean | number;
  featuredStatus?: boolean;
  zCardGenerator?: boolean;
  priorityShortlist?: boolean;
}

export interface TierInfo {
  name: SubscriptionTier;
  displayName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  benefits: TierBenefits;
  upgradeMessage?: string;
  canUpgrade: boolean;
  nextTier?: SubscriptionTier;
}

export const subscriptionTiers: Record<SubscriptionTier, TierInfo> = {
  FREE: {
    name: 'FREE',
    displayName: 'Free Plan',
    color: 'text-gray-400',
    bgColor: 'bg-gray-800',
    borderColor: 'border-gray-700',
    benefits: {
      gallerySlots: 2,
      verifiedBadge: false,
      canCreateTroupes: false,
    },
    upgradeMessage: 'Upgrade to SILVER for more features',
    canUpgrade: true,
    nextTier: 'SILVER',
  },
  SILVER: {
    name: 'SILVER',
    displayName: 'Silver Plan',
    color: 'text-gray-300',
    bgColor: 'bg-gray-700',
    borderColor: 'border-gray-600',
    benefits: {
      gallerySlots: 10,
      videoReels: 2,
      searchBoost: 'Top 20%',
      verifiedBadge: true,
      canCreateTroupes: 1,
    },
    upgradeMessage: 'Upgrade to PLATINUM for unlimited features',
    canUpgrade: true,
    nextTier: 'PLATINUM',
  },
  PLATINUM: {
    name: 'PLATINUM',
    displayName: 'Platinum Plan',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    borderColor: 'border-yellow-700',
    benefits: {
      gallerySlots: 'unlimited',
      videoReels: 'unlimited',
      searchBoost: 'Top 5%',
      verifiedBadge: true,
      canCreateTroupes: true,
      featuredStatus: true,
      zCardGenerator: true,
      priorityShortlist: true,
    },
    upgradeMessage: 'You have all features!',
    canUpgrade: false,
  },
};

export function getTierInfo(tier: SubscriptionTier | null | undefined): TierInfo {
  return subscriptionTiers[tier || 'FREE'];
}

