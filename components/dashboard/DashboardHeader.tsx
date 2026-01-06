'use client';

import { getTierInfo, getMediaLimits } from '@/lib/subscription-tiers';
import { calculateProfileCompletion } from '@/lib/profile-completion';
import type { ProfileData } from '@/lib/profile-completion';
import { CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';

interface DashboardHeaderProps {
  fullName?: string | null;
  subscriptionTier?: string | null;
  profile: ProfileData | null;
  isVerified?: boolean | null;
  isFeatured?: boolean | null;
}

export default function DashboardHeader({
  fullName,
  subscriptionTier,
  profile,
  isVerified,
  isFeatured,
}: DashboardHeaderProps) {
  const tierInfo = getTierInfo((subscriptionTier as any) || 'FREE');
  const displayName = fullName || 'User';
  const { percentage } = calculateProfileCompletion(profile);
  const mediaLimits = getMediaLimits((subscriptionTier as any) || 'FREE');
  const mediaCount = profile?.media?.length || 0;
  const categoriesCount = profile?.categories?.length || 0;
  const ownedGroupsCount = (profile as any)?.ownedGroupsCount || 0;
  const memberGroupsCount = (profile as any)?.memberGroupsCount || 0;

  // Calculate media slots used
  const imageCount = profile?.media?.filter((m: any) => m.mediaType === 'IMAGE').length || 0;
  const videoCount = profile?.media?.filter((m: any) => m.mediaType === 'VIDEO').length || 0;
  const maxImages = mediaLimits.images === Infinity ? '∞' : mediaLimits.images;
  const maxVideos = mediaLimits.videos === Infinity ? '∞' : mediaLimits.videos;

  return (
    <div className="mb-8">
      {/* Welcome Message */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {displayName}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Subscription Tier Badge */}
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${tierInfo.bgColor} ${tierInfo.color} border ${tierInfo.borderColor}`}>
              {tierInfo.displayName}
            </span>
            {/* Verification Badge */}
            {isVerified && (
              <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Verified
              </span>
            )}
            {/* Featured Badge */}
            {isFeatured && (
              <span className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                Featured
              </span>
            )}
            {/* Profile Completion */}
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {percentage}% Complete
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900 mb-1">{categoriesCount}</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {imageCount} / {maxImages}
          </div>
          <div className="text-sm text-gray-600">Images</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {videoCount} / {maxVideos}
          </div>
          <div className="text-sm text-gray-600">Videos</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900 mb-1">{ownedGroupsCount}</div>
          <div className="text-sm text-gray-600">Groups Owned</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900 mb-1">{memberGroupsCount}</div>
          <div className="text-sm text-gray-600">Groups Member</div>
        </div>
      </div>
    </div>
  );
}

