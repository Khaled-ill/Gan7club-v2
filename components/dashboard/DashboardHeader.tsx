'use client';

import { getTierInfo } from '@/lib/subscription-tiers';
import type { ProfileData } from '@/lib/profile-completion';
import { Heart, Eye, Mail } from 'lucide-react';
import Link from 'next/link';

interface DashboardHeaderProps {
  fullName?: string | null;
  subscriptionTier?: string | null;
  profile: ProfileData | null;
}

export default function DashboardHeader({
  fullName,
  subscriptionTier,
  profile,
}: DashboardHeaderProps) {
  const tierInfo = getTierInfo((subscriptionTier as any) || 'FREE');
  const displayName = fullName || 'User';
  const location = profile?.city && profile?.country
    ? `${profile.city}, ${profile.country}`
    : 'Location not set';
  const title = profile?.entityType || 'Talent';

  // Mock stats for now
  const stats = {
    followers: 2985,
    following: 132,
    likes: 548,
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Profile Picture */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-charcoal flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg">
          {displayName.charAt(0).toUpperCase()}
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {displayName}
            </h1>
            {tierInfo.name !== 'FREE' && (
              <span className="px-3 py-1 bg-charcoal/10 text-charcoal rounded-full text-sm font-semibold border border-charcoal/20">
                {tierInfo.name === 'PLATINUM' ? 'PRO +' : tierInfo.name}
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-4">
            {title} based in {location}
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Edit Profile
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Get in touch
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {stats.followers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {stats.following}
            </div>
            <div className="text-sm text-gray-500">Following</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {stats.likes}
            </div>
            <div className="text-sm text-gray-500">Likes</div>
          </div>
        </div>
      </div>

      {/* Badge Row */}
      <div className="flex gap-3 mt-6">
        <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
          {profile?.categories?.length || 0} Categories
        </div>
        <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
          {profile?.media?.length || 0} Media
        </div>
        <div className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
          {tierInfo.name} Plan
        </div>
      </div>
    </div>
  );
}

