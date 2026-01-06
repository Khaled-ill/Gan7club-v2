'use client';

import { getTierInfo } from '@/lib/subscription-tiers';
import { Check } from 'lucide-react';
import Link from 'next/link';

interface SubscriptionInfoProps {
  subscriptionTier?: string | null;
}

export default function SubscriptionInfo({
  subscriptionTier,
}: SubscriptionInfoProps) {
  const tierInfo = getTierInfo((subscriptionTier as any) || 'FREE');
  const canUpgrade = tierInfo.name !== 'PLATINUM';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Subscription Tier</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${tierInfo.bgColor} ${tierInfo.color} border ${tierInfo.borderColor}`}
        >
          {tierInfo.displayName}
        </span>
      </div>

      <p className="text-gray-600 mb-6">
        You're on the <span className="font-semibold">{tierInfo.name}</span> plan
      </p>

      <div className="space-y-3 mb-6">
        {tierInfo.benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">{benefit}</span>
          </div>
        ))}
      </div>

      {canUpgrade && (
        <Link
          href="/subscription"
          className="block w-full text-center px-4 py-2 bg-charcoal hover:bg-charcoal/90 text-white rounded-lg font-medium transition-colors"
        >
          {tierInfo.name === 'FREE'
            ? 'Upgrade to SILVER for more features'
            : 'Upgrade to PLATINUM for unlimited features'}
        </Link>
      )}

      {!canUpgrade && (
        <div className="text-center px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
          You have all features! 🎉
        </div>
      )}
    </div>
  );
}

