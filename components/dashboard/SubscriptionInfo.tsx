'use client';

import { getTierInfo } from '@/lib/subscription-tiers';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

interface SubscriptionInfoProps {
  subscriptionTier?: string | null;
}

export default function SubscriptionInfo({
  subscriptionTier,
}: SubscriptionInfoProps) {
  const tierInfo = getTierInfo((subscriptionTier as any) || 'FREE');

  const benefits = [
    {
      label:
        tierInfo.benefits.gallerySlots === 'unlimited'
          ? 'Unlimited gallery slots'
          : `${tierInfo.benefits.gallerySlots} gallery slots`,
      included: true,
    },
    ...(tierInfo.benefits.videoReels
      ? [
          {
            label:
              tierInfo.benefits.videoReels === 'unlimited'
                ? 'Unlimited video reels'
                : `${tierInfo.benefits.videoReels} video reels`,
            included: true,
          },
        ]
      : []),
    ...(tierInfo.benefits.searchBoost
      ? [
          {
            label: `Search Boost (${tierInfo.benefits.searchBoost})`,
            included: true,
          },
        ]
      : []),
    {
      label: 'Verified Badge',
      included: tierInfo.benefits.verifiedBadge,
    },
    {
      label:
        tierInfo.benefits.canCreateTroupes === true
          ? 'Unlimited Troupes'
          : tierInfo.benefits.canCreateTroupes === false
          ? 'Create Troupes'
          : `Create ${tierInfo.benefits.canCreateTroupes} Troupe`,
      included: !!tierInfo.benefits.canCreateTroupes,
    },
    ...(tierInfo.benefits.featuredStatus
      ? [
          {
            label: 'Featured Status (Top 5%)',
            included: true,
          },
        ]
      : []),
    ...(tierInfo.benefits.zCardGenerator
      ? [
          {
            label: 'Z-Card Generator',
            included: true,
          },
        ]
      : []),
    ...(tierInfo.benefits.priorityShortlist
      ? [
          {
            label: 'Priority Shortlist',
            included: true,
          },
        ]
      : []),
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Subscription Plan</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${tierInfo.bgColor} ${tierInfo.color} ${tierInfo.borderColor} border`}
        >
          {tierInfo.displayName}
        </span>
      </div>

      <p className="text-gray-400 text-sm mb-6">
        You're on the <span className="font-semibold">{tierInfo.name}</span> plan
      </p>

      <div className="space-y-3 mb-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.included ? Check : X;
          const iconColor = benefit.included
            ? 'text-green-400'
            : 'text-gray-600';

          return (
            <div key={index} className="flex items-center gap-3">
              <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
              <span
                className={`text-sm ${
                  benefit.included ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {benefit.label}
              </span>
            </div>
          );
        })}
      </div>

      {tierInfo.canUpgrade && (
        <Link
          href="/subscription"
          className="block w-full text-center px-4 py-2 bg-charcoal hover:bg-charcoal/90 text-white rounded-lg font-medium transition-colors"
        >
          {tierInfo.upgradeMessage}
        </Link>
      )}

      {!tierInfo.canUpgrade && (
        <div className="text-center px-4 py-2 bg-green-900/20 text-green-400 rounded-lg text-sm font-medium">
          You have all features!
        </div>
      )}
    </div>
  );
}

