'use client';

import { CheckCircle2, XCircle, Image as ImageIcon, Video, Play } from 'lucide-react';
import Link from 'next/link';
import type { ProfileData } from '@/lib/profile-completion';
import { getMediaLimits } from '@/lib/subscription-tiers';

interface ProfileOverviewProps {
  profile: ProfileData | null;
  subscriptionTier?: string | null;
  isVerified?: boolean | null;
  isFeatured?: boolean | null;
  birthdate?: string | null;
  nationality?: string | null;
  languages?: string[] | null;
  introVideoUrl?: string | null;
  introVideoThumbnailUrl?: string | null;
  introVideoDuration?: number | null;
  profileCategories?: Array<{
    isPrimary: boolean;
    experienceYears?: number | null;
    category: {
      code: string;
      name: string;
    };
  }> | null;
}

export default function ProfileOverview({
  profile,
  subscriptionTier,
  isVerified,
  isFeatured,
  birthdate,
  nationality,
  languages,
  introVideoUrl,
  introVideoThumbnailUrl,
  introVideoDuration,
  profileCategories,
}: ProfileOverviewProps) {
  const mediaCount = profile?.media?.length || 0;
  const categoriesCount = profile?.categories?.length || 0;
  const primaryCategory = profile?.primaryCategory;
  const mediaLimits = getMediaLimits((subscriptionTier as any) || 'FREE');
  const imageCount = profile?.media?.filter((m: any) => m.mediaType === 'IMAGE').length || 0;
  const videoCount = profile?.media?.filter((m: any) => m.mediaType === 'VIDEO').length || 0;
  const maxImages = mediaLimits.images === Infinity ? 'Unlimited' : mediaLimits.images;
  const maxVideos = mediaLimits.videos === Infinity ? 'Unlimited' : mediaLimits.videos;

  // Check attribute blocks
  const hasPhysical = !!(
    profile?.attributes?.heightCm ||
    profile?.attributes?.weightKg ||
    (profile?.attributes as any)?.hairColor ||
    (profile?.attributes as any)?.eyeColor
  );
  const hasSkills = !!(
    (profile?.attributes?.danceStyles && profile.attributes.danceStyles.length > 0) ||
    ((profile?.attributes as any)?.martialArts && (profile.attributes as any).martialArts.length > 0) ||
    ((profile?.attributes as any)?.accents && (profile.attributes as any).accents.length > 0)
  );
  const hasTechnical = !!(
    ((profile?.attributes as any)?.equipmentList && (profile.attributes as any).equipmentList.length > 0) ||
    ((profile?.attributes as any)?.softwareList && (profile.attributes as any).softwareList.length > 0) ||
    (profile?.attributes as any)?.studioAvailable
  );
  const hasPerformance = !!(
    (profile?.attributes as any)?.vocalRange ||
    ((profile?.attributes as any)?.actingMethods && (profile.attributes as any).actingMethods.length > 0)
  );

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">My Profile Overview</h2>

      <div className="space-y-6">
        {/* A. Basic Information Card */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Basic Information
          </h3>
          <div className="space-y-2 text-gray-700">
            <div>
              <span className="text-gray-500">Full Name:</span>{' '}
              <span className="font-medium">{profile?.fullName || 'Not set'}</span>
            </div>
            {birthdate && (
              <div>
                <span className="text-gray-500">Born on:</span>{' '}
                <span className="font-medium">{formatDate(birthdate)}</span>
              </div>
            )}
            {nationality && (
              <div>
                <span className="text-gray-500">Nationality:</span>{' '}
                <span className="font-medium">{nationality}</span>
              </div>
            )}
            {languages && languages.length > 0 && (
              <div>
                <span className="text-gray-500">Languages:</span>{' '}
                <span className="font-medium">{languages.join(', ')}</span>
              </div>
            )}
            <div>
              <span className="text-gray-500">Location:</span>{' '}
              <span className="font-medium">
                {profile?.city && profile?.country
                  ? `${profile.city}, ${profile.country}`
                  : 'Not set'}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Subscription Tier:</span>{' '}
              <span className="font-semibold text-charcoal">{subscriptionTier || 'FREE'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Verification:</span>
              {isVerified ? (
                <span className="flex items-center gap-1 text-green-600 font-medium">
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
            {isFeatured && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Status:</span>
                <span className="flex items-center gap-1 text-amber-600 font-medium">
                  <span>⭐</span>
                  Featured
                </span>
              </div>
            )}
          </div>
          <Link
            href="/profile/edit"
            className="inline-block mt-3 text-sm text-charcoal hover:text-charcoal/70 font-medium"
          >
            Edit Profile →
          </Link>
        </div>

        {/* B. Categories Card */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Categories
          </h3>
          {categoriesCount > 0 ? (
            <div className="space-y-2">
              {primaryCategory && (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-charcoal text-white rounded-lg text-sm font-medium">
                    Primary: {primaryCategory.name}
                  </span>
                </div>
              )}
              {profileCategories && profileCategories.length > 0 && (
                <div className="space-y-1">
                  {profileCategories.map((pc, idx) => (
                    <div key={idx} className="text-sm text-gray-600">
                      {pc.category.name}
                      {pc.experienceYears && (
                        <span className="text-gray-500 ml-2">
                          ({pc.experienceYears} years)
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {profile?.categories && profile.categories.length > 1 && (
                <div className="text-gray-600 text-sm">
                  +{profile.categories.length - 1} more categories
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No categories added</p>
          )}
          <Link
            href="/profile/categories"
            className="inline-block mt-3 text-sm text-charcoal hover:text-charcoal/70 font-medium"
          >
            Manage Categories →
          </Link>
        </div>

        {/* C. Media Gallery Preview */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Media Gallery
          </h3>
          {mediaCount > 0 ? (
            <div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {profile?.media?.slice(0, 6).map((item, index) => (
                  <div
                    key={item.id || index}
                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200"
                  >
                    {item.mediaType === 'VIDEO' ? (
                      <Video className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-2">
                {imageCount} / {maxImages} images, {videoCount} / {maxVideos} videos
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm mb-2">No media uploaded</p>
          )}
          <Link
            href="/profile/media"
            className="inline-block text-sm text-charcoal hover:text-charcoal/70 font-medium"
          >
            {mediaCount > 0 ? 'View All Media' : 'Upload Media'} →
          </Link>
        </div>

        {/* D. Attributes Summary */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Attributes
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {hasPhysical ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm text-gray-700">Physical Block</span>
            </div>
            <div className="flex items-center gap-2">
              {hasSkills ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm text-gray-700">Skills Block</span>
            </div>
            <div className="flex items-center gap-2">
              {hasTechnical ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm text-gray-700">Technical Block</span>
            </div>
            <div className="flex items-center gap-2">
              {hasPerformance ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-sm text-gray-700">Performance Block</span>
            </div>
          </div>
          <Link
            href="/profile/attributes"
            className="inline-block mt-3 text-sm text-charcoal hover:text-charcoal/70 font-medium"
          >
            Edit Attributes →
          </Link>
        </div>

        {/* E. Video Introduction */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Video Introduction
          </h3>
          {introVideoUrl ? (
            <div className="space-y-2">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 relative">
                {introVideoThumbnailUrl ? (
                  <img
                    src={introVideoThumbnailUrl}
                    alt="Intro video thumbnail"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Video className="w-12 h-12 text-gray-400" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>
              </div>
              {introVideoDuration && (
                <p className="text-sm text-gray-600">
                  Duration: {Math.floor(introVideoDuration / 60)}:{(introVideoDuration % 60).toString().padStart(2, '0')}
                </p>
              )}
            </div>
          ) : (
            <div className="aspect-video bg-gray-50 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
              <Video className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Upload your introduction video</p>
            </div>
          )}
          <Link
            href="/profile/intro-video"
            className="inline-block mt-3 text-sm text-charcoal hover:text-charcoal/70 font-medium"
          >
            {introVideoUrl ? 'Update Video' : 'Upload Video'} →
          </Link>
        </div>
      </div>
    </div>
  );
}
