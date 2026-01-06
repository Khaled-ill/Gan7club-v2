'use client';

import { useQuery } from '@apollo/client';
import { GET_ADMIN_DASHBOARD } from '@/lib/graphql/admin-queries';
import AdminGuard from '@/components/AdminGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminKPIs from '@/components/admin/AdminKPIs';
import RecentActivity from '@/components/admin/RecentActivity';
import QuickActions from '@/components/admin/QuickActions';
import { mockLogin, isMockMode } from '@/lib/mock-auth';
import { useEffect, useState } from 'react';

// Mock admin dashboard data for development
const mockAdminDashboardData = {
  allProfiles: [{ id: '1' }],
  freeProfiles: [{ id: '1' }],
  silverProfiles: [{ id: '1' }],
  platinumProfiles: [{ id: '1' }],
  featuredProfiles: { totalCount: 45 },
  verifiedProfiles: { totalCount: 120 },
  recentProfiles: [
    {
      id: '1',
      fullName: 'John Doe',
      subscriptionTier: 'PLATINUM',
      createdAt: new Date().toISOString(),
      isVerified: true,
      isFeatured: true,
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      subscriptionTier: 'SILVER',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      isVerified: false,
      isFeatured: false,
    },
    {
      id: '3',
      fullName: 'Mike Johnson',
      subscriptionTier: 'FREE',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      isVerified: true,
      isFeatured: false,
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Summer Campaign 2026',
      shortlistItemsCount: 12,
      createdAt: new Date().toISOString(),
      clientName: 'Brand X',
    },
    {
      id: '2',
      name: 'Music Video Production',
      shortlistItemsCount: 8,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      clientName: 'Artist Y',
    },
  ],
  myLookbooks: [
    {
      id: '1',
      viewCount: 45,
      project: {
        name: 'Summer Campaign 2026',
        clientName: 'Brand X',
      },
      createdAt: new Date().toISOString(),
    },
  ],
  myNotifications: [
    {
      id: '1',
      title: 'New Platinum Signup',
      message: 'John Doe has upgraded to Platinum tier',
      priority: 'high',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Profile Verified',
      message: 'Jane Smith profile has been verified',
      priority: 'medium',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ],
};

export default function AdminDashboardPage() {
  const [useMock, setUseMock] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mockData] = useState(mockAdminDashboardData);

  const { data, loading, error, refetch } = useQuery(GET_ADMIN_DASHBOARD, {
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
      <AdminGuard>
        <div className="min-h-screen bg-gray-50 flex">
          <AdminSidebar />
          <div className="flex-1 p-8">
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-600">Loading admin dashboard...</div>
            </div>
          </div>
        </div>
      </AdminGuard>
    );
  }

  if (error && !useMock) {
    return (
      <AdminGuard>
        <div className="min-h-screen bg-gray-50 flex">
          <AdminSidebar />
          <div className="flex-1 p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              Error loading admin dashboard: {error.message}
            </div>
          </div>
        </div>
      </AdminGuard>
    );
  }

  // Calculate statistics
  const totalProfiles = dashboardData?.allProfiles?.length || 0;
  const freeProfiles = dashboardData?.freeProfiles?.length || 0;
  const silverProfiles = dashboardData?.silverProfiles?.length || 0;
  const platinumProfiles = dashboardData?.platinumProfiles?.length || 0;
  const featuredProfiles = dashboardData?.featuredProfiles?.totalCount || 0;
  const verifiedProfiles = dashboardData?.verifiedProfiles?.totalCount || 0;
  const totalProjects = dashboardData?.projects?.length || 0;
  const activeProjects = dashboardData?.projects?.filter((p: any) => p.isActive)?.length || 0;
  const totalLookbooks = dashboardData?.myLookbooks?.length || 0;
  const recentSignups = dashboardData?.recentProfiles?.filter((p: any) => {
    const createdAt = new Date(p.createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return createdAt >= sevenDaysAgo;
  })?.length || 0;

  // Prepare recent activity
  const activities = [
    ...(dashboardData?.recentProfiles?.slice(0, 3).map((profile: any) => ({
      id: `profile-${profile.id}`,
      type: 'profile' as const,
      title: `New profile: ${profile.fullName}`,
      description: `${profile.subscriptionTier} tier`,
      timestamp: profile.createdAt,
      href: `/admin/talents/${profile.id}`,
    })) || []),
    ...(dashboardData?.projects?.slice(0, 2).map((project: any) => ({
      id: `project-${project.id}`,
      type: 'project' as const,
      title: `Project created: ${project.name}`,
      description: `Client: ${project.clientName}`,
      timestamp: project.createdAt,
      href: `/admin/projects/${project.id}`,
    })) || []),
    ...(dashboardData?.myLookbooks?.slice(0, 1).map((lookbook: any) => ({
      id: `lookbook-${lookbook.id}`,
      type: 'lookbook' as const,
      title: `Lookbook generated: ${lookbook.project.name}`,
      description: `${lookbook.viewCount} views`,
      timestamp: lookbook.createdAt,
      href: `/admin/lookbooks/${lookbook.id}`,
    })) || []),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSidebar />
        <div className="flex-1 overflow-auto lg:ml-0">
          <div className="bg-white min-h-screen">
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-charcoal">Admin Dashboard</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Welcome back, Admin
                  </span>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
              {/* KPIs */}
              <AdminKPIs
                totalProfiles={totalProfiles}
                freeProfiles={freeProfiles}
                silverProfiles={silverProfiles}
                platinumProfiles={platinumProfiles}
                featuredProfiles={featuredProfiles}
                verifiedProfiles={verifiedProfiles}
                totalProjects={totalProjects}
                activeProjects={activeProjects}
                totalLookbooks={totalLookbooks}
                recentSignups={recentSignups}
              />

              {/* Quick Actions */}
              <div className="mb-8">
                <QuickActions />
              </div>

              {/* Recent Activity and Stats Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentActivity activities={activities} />
                
                {/* Subscription Tier Distribution */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Subscription Tier Distribution
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Platinum</span>
                        <span className="text-sm text-gray-600">{platinumProfiles}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{
                            width: `${totalProfiles > 0 ? (platinumProfiles / totalProfiles) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Silver</span>
                        <span className="text-sm text-gray-600">{silverProfiles}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-400 h-2 rounded-full"
                          style={{
                            width: `${totalProfiles > 0 ? (silverProfiles / totalProfiles) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Free</span>
                        <span className="text-sm text-gray-600">{freeProfiles}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-400 h-2 rounded-full"
                          style={{
                            width: `${totalProfiles > 0 ? (freeProfiles / totalProfiles) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}

