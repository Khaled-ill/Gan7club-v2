'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_DASHBOARD_DATA } from '@/lib/graphql/queries';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import QuickStats from '@/components/dashboard/QuickStats';
import ProfileCompletionCard from '@/components/dashboard/ProfileCompletionCard';
import ProfileOverview from '@/components/dashboard/ProfileOverview';
import SubscriptionInfo from '@/components/dashboard/SubscriptionInfo';
import QuickActions from '@/components/dashboard/QuickActions';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import AuthGuard from '@/components/AuthGuard';
import { mockLogin, isMockMode } from '@/lib/mock-auth';
import { useEffect, useState } from 'react';

// Mock dashboard data for development
const mockDashboardData = {
  me: {
    id: '1',
    email: 'user@example.com',
    username: 'user',
  },
  myProfile: {
    id: '1',
    fullName: 'Irene Brooks',
    entityType: 'Interface and Brand Designer',
    subscriptionTier: 'SILVER',
    isVerified: true,
    bio: 'Creative designer passionate about creating beautiful user experiences.',
    city: 'San Antonio',
    country: 'USA',
    categories: [
      { code: 'PERFORMER', name: 'Performer' },
      { code: 'VISUAL', name: 'Visual Artist' },
    ],
    primaryCategory: {
      code: 'PERFORMER',
      name: 'Performer',
    },
    media: [
      { id: '1', file: 'media1.jpg', mediaType: 'IMAGE', isPrimary: true, order: 1 },
      { id: '2', file: 'media2.jpg', mediaType: 'IMAGE', isPrimary: false, order: 2 },
      { id: '3', file: 'media3.jpg', mediaType: 'IMAGE', isPrimary: false, order: 3 },
    ],
    attributes: {
      heightCm: 175,
      weightKg: 70,
      danceStyles: ['Contemporary', 'Jazz'],
    },
  },
};

export default function DashboardPage() {
  const [useMock, setUseMock] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mockData] = useState(mockDashboardData);

  const { data, loading, error, refetch } = useQuery(GET_DASHBOARD_DATA, {
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
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-600">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !useMock) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
            Error loading dashboard: {error.message}
          </div>
        </div>
      </div>
    );
  }

  const profile = dashboardData?.myProfile || null;
  const user = dashboardData?.me || null;

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
                  <span className="text-2xl font-bold text-charcoal">
                    GAN7Club
                  </span>
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
              {/* Profile Header Section */}
              <DashboardHeader
                fullName={profile?.fullName}
                subscriptionTier={profile?.subscriptionTier}
                profile={profile}
              />

              {/* Content Tabs */}
              <div className="border-b border-gray-200 mb-8">
                <div className="flex gap-8">
                  <button className="pb-4 border-b-2 border-gray-900 text-gray-900 font-medium">
                    Work {profile?.media?.length || 0}
                  </button>
                  <button className="pb-4 text-gray-500 hover:text-gray-900 font-medium transition-colors">
                    Categories
                  </button>
                  <button className="pb-4 text-gray-500 hover:text-gray-900 font-medium transition-colors">
                    Attributes
                  </button>
                  <button className="pb-4 text-gray-500 hover:text-gray-900 font-medium transition-colors">
                    About
                  </button>
                </div>
              </div>

              {/* Work/Media Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile?.media && profile.media.length > 0 ? (
                  profile.media.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <div className="text-gray-400">Media Preview</div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Project {index + 1}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {profile.primaryCategory?.name || 'Category'}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <span>❤️</span> 0
                          </span>
                          <span className="flex items-center gap-1">
                            <span>👁️</span> 0
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    {/* Empty State - Show placeholder cards */}
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl border-2 border-dashed border-gray-300 overflow-hidden hover:border-purple-400 transition-colors"
                      >
                        <div className="aspect-video bg-gray-50 flex flex-col items-center justify-center">
                          <div className="text-gray-400 mb-2">📸</div>
                          <div className="text-sm text-gray-500">No media yet</div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-400 mb-1">
                            Upload your work
                          </h3>
                          <p className="text-sm text-gray-400 mb-3">
                            Start building your portfolio
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Profile Completion Card */}
              {profile && (
                <div className="mt-8">
                  <ProfileCompletionCard profile={profile} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

