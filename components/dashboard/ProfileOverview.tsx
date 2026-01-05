'use client';

import { CheckCircle2, XCircle, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import type { ProfileData } from '@/lib/profile-completion';

interface ProfileOverviewProps {
  profile: ProfileData | null;
  subscriptionTier?: string | null;
  isVerified?: boolean | null;
}

export default function ProfileOverview({
  profile,
  subscriptionTier,
  isVerified,
}: ProfileOverviewProps) {
  const mediaCount = profile?.media?.length || 0;
  const categoriesCount = profile?.categories?.length || 0;
  const primaryCategory = profile?.primaryCategory;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-6">My Profile Overview</h2>

      <div className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
            Basic Information
          </h3>
          <div className="space-y-2 text-gray-300">
            <div>
              <span className="text-gray-500">Name:</span>{' '}
              {profile?.fullName || 'Not set'}
            </div>
            <div>
              <span className="text-gray-500">Entity Type:</span>{' '}
              {profile?.entityType || 'Not set'}
            </div>
            <div>
              <span className="text-gray-500">Location:</span>{' '}
              {profile?.city && profile?.country
                ? `${profile.city}, ${profile.country}`
                : 'Not set'}
            </div>
            <div>
              <span className="text-gray-500">Subscription:</span>{' '}
              <span className="text-charcoal font-semibold">{subscriptionTier || 'FREE'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Verification:</span>
              {isVerified ? (
                <span className="flex items-center gap-1 text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-500">
                  <XCircle className="w-4 h-4" />
                  Not Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
            Categories
          </h3>
          {categoriesCount > 0 ? (
            <div className="space-y-2">
              {primaryCategory && (
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-charcoal/10 text-charcoal rounded text-sm font-medium border border-charcoal/20">
                    Primary: {primaryCategory.name}
                  </span>
                </div>
              )}
              {profile?.categories && profile.categories.length > 1 && (
                <div className="text-gray-300 text-sm">
                  +{profile.categories.length - 1} more categories
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No categories added</p>
          )}
          <Link
            href="/profile/categories"
            className="inline-block mt-2 text-charcoal hover:text-charcoal/70 text-sm font-medium"
          >
            Manage Categories →
          </Link>
        </div>

        {/* Media Gallery Preview */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
            Media Gallery
          </h3>
          {mediaCount > 0 ? (
            <div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {profile?.media?.slice(0, 6).map((item, index) => (
                  <div
                    key={item.id || index}
                    className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center"
                  >
                    <ImageIcon className="w-6 h-6 text-gray-500" />
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm mb-2">
                {mediaCount} items uploaded
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm mb-2">No media uploaded</p>
          )}
          <Link
            href="/profile/media"
            className="inline-block text-purple-400 hover:text-purple-300 text-sm font-medium"
          >
            {mediaCount > 0 ? 'View All Media' : 'Upload Media'} →
          </Link>
        </div>

        {/* Attributes Summary */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
            Attributes
          </h3>
          <div className="space-y-2">
            {profile?.attributes ? (
              <>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Physical Block</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Skills Block</span>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-sm">No attributes added</p>
            )}
          </div>
          <Link
            href="/profile/attributes"
            className="inline-block mt-2 text-charcoal hover:text-charcoal/70 text-sm font-medium"
          >
            Edit Attributes →
          </Link>
        </div>
      </div>
    </div>
  );
}

