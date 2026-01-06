'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_DASHBOARD_DATA, GET_MY_GROUPS, GET_MY_SELF_TAPES } from '@/lib/graphql/queries';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProfileCompletionCard from '@/components/dashboard/ProfileCompletionCard';
import ProfileOverview from '@/components/dashboard/ProfileOverview';
import SubscriptionInfo from '@/components/dashboard/SubscriptionInfo';
import QuickActions from '@/components/dashboard/QuickActions';
import GroupsSection from '@/components/dashboard/GroupsSection';
import SelfTapesSection from '@/components/dashboard/SelfTapesSection';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import AuthGuard from '@/components/AuthGuard';
import { mockLogin, isMockMode } from '@/lib/mock-auth';
import { useEffect, useState } from 'react';
import { getGroupLimit } from '@/lib/subscription-tiers';

// Mock dashboard data for development
const mockDashboardData = {
  me: {
    id: '1',
    email: 'user@example.com',
    username: 'user',
    role: 'USER',
    isActive: true,
  },
  myProfile: {
    id: '1',
    fullName: 'Irene Brooks',
    birthdate: '1990-05-15',
    nationality: 'American',
    languages: ['English', 'Spanish'],
    entityType: 'Interface and Brand Designer',
    subscriptionTier: 'SILVER',
    isVerified: true,
    isFeatured: false,
    isActive: true,
    bio: 'Creative designer passionate about creating beautiful user experiences.',
    city: 'San Antonio',
    country: 'USA',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categories: [
      { id: '1', code: 'PERFORMER', name: 'Performer' },
      { id: '2', code: 'VISUAL', name: 'Visual Artist' },
    ],
    primaryCategory: {
      id: '1',
      code: 'PERFORMER',
      name: 'Performer',
    },
    profileCategories: [
      {
        id: '1',
        isPrimary: true,
        experienceYears: 5,
        category: {
          code: 'PERFORMER',
          name: 'Performer',
        },
      },
    ],
    media: [
      { id: '1', file: 'media1.jpg', mediaType: 'IMAGE', isPrimary: true, order: 1 },
      { id: '2', file: 'media2.jpg', mediaType: 'IMAGE', isPrimary: false, order: 2 },
      { id: '3', file: 'media3.jpg', mediaType: 'IMAGE', isPrimary: false, order: 3 },
    ],
    attributes: {
      id: '1',
      heightCm: 175,
      weightKg: 70,
      hairColor: 'Brown',
      eyeColor: 'Blue',
      danceStyles: ['Contemporary', 'Jazz'],
      martialArts: [],
      accents: [],
      equipmentList: [],
      softwareList: [],
      studioAvailable: false,
      vocalRange: null,
      actingMethods: [],
      experienceLevel: 'Professional',
    },
    introVideoUrl: null,
    introVideoThumbnailUrl: null,
    introVideoDuration: null,
    isGroupLeader: false,
    isGroupMember: false,
    ownedGroupsCount: 0,
    memberGroupsCount: 0,
  },
};

export default function DashboardPage() {
  const [useMock, setUseMock] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mockData] = useState(mockDashboardData);

  const { data, loading, error, refetch } = useQuery(GET_DASHBOARD_DATA, {
    skip: useMock,
  });

  const { data: groupsData } = useQuery(GET_MY_GROUPS, {
    skip: useMock || !data?.myProfile?.isGroupLeader && !data?.myProfile?.isGroupMember,
  });

  const { data: selfTapesData } = useQuery(GET_MY_SELF_TAPES, {
    skip: useMock,
  });

  useEffect(() => {
    setMounted(true);
    // Check if we should use mock mode (only on client)
    if (typeof window !== 'undefined' && isMockMode() && !data) {
      setUseMock(true);
    }
  }, [data]);

  useEffect(() => {
    // Handle GraphQL errors - if in dev mode, use mock data
    if (error && typeof window !== 'undefined' && isMockMode()) {
      setUseMock(true);
    }
  }, [error]);

  const dashboardData = useMock ? mockData : data;
  const groups = useMock ? null : groupsData?.myGroups;
  const selfTapes = useMock ? [] : selfTapesData?.mySelfTapes;

  // Show loading state until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className="w-64 bg-white border-r border-gray-200"></div>
        <div className="flex-1 p-8">
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !useMock) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50 flex">
          <DashboardSidebar />
          <div className="flex-1 p-8">
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-600">Loading dashboard...</div>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (error && !useMock) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50 flex">
          <DashboardSidebar />
          <div className="flex-1 p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              Error loading dashboard: {error.message}
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  const profile = dashboardData?.myProfile || null;
  const user = dashboardData?.me || null;
  const subscriptionTier = profile?.subscriptionTier || 'FREE';
  const groupLimit = getGroupLimit(subscriptionTier);
  const canCreateGroups = groupLimit > 0;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto lg:ml-0">
          <div className="bg-white min-h-screen">
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-charcoal">GAN7Club</span>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href="/profile/media"
                    className="px-4 py-2 bg-charcoal text-white rounded-lg font-medium hover:bg-charcoal/90 transition-colors text-sm"
                  >
                    Upload
                  </Link>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
              {/* 1. Dashboard Header */}
              <DashboardHeader
                fullName={profile?.fullName}
                subscriptionTier={subscriptionTier}
                profile={profile}
                isVerified={profile?.isVerified}
                isFeatured={profile?.isFeatured}
              />

              {/* 2. Profile Completion Card */}
              {profile && (
                <div className="mb-8">
                  <ProfileCompletionCard profile={profile} />
                </div>
              )}

              {/* 3. Quick Actions Panel */}
              <div className="mb-8">
                <QuickActions
                  subscriptionTier={subscriptionTier}
                  canCreateGroups={canCreateGroups}
                />
              </div>

              {/* 4. Profile Overview and Subscription Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Profile Overview */}
                <ProfileOverview
                  profile={profile}
                  subscriptionTier={subscriptionTier}
                  isVerified={profile?.isVerified}
                  isFeatured={profile?.isFeatured}
                  birthdate={profile?.birthdate}
                  nationality={profile?.nationality}
                  languages={profile?.languages}
                  introVideoUrl={profile?.introVideoUrl}
                  introVideoThumbnailUrl={profile?.introVideoThumbnailUrl}
                  introVideoDuration={profile?.introVideoDuration}
                  profileCategories={profile?.profileCategories}
                />

                {/* Subscription Tier Information */}
                <SubscriptionInfo subscriptionTier={subscriptionTier} />
              </div>

              {/* 5. Groups/Troupes Section */}
              {(profile?.isGroupLeader || profile?.isGroupMember || canCreateGroups) && (
                <div className="mb-8">
                  <GroupsSection
                    groups={groups}
                    subscriptionTier={subscriptionTier}
                    isGroupLeader={profile?.isGroupLeader}
                    isGroupMember={profile?.isGroupMember}
                  />
                </div>
              )}

              {/* 6. Self-Tapes Section */}
              {selfTapes && selfTapes.length > 0 && (
                <div className="mb-8">
                  <SelfTapesSection selfTapes={selfTapes} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
