'use client';

import { Users, Crown, CheckCircle, FolderKanban, BookOpen, TrendingUp } from 'lucide-react';

interface AdminKPIsProps {
  totalProfiles?: number;
  freeProfiles?: number;
  silverProfiles?: number;
  platinumProfiles?: number;
  featuredProfiles?: number;
  verifiedProfiles?: number;
  totalProjects?: number;
  activeProjects?: number;
  totalLookbooks?: number;
  recentSignups?: number;
}

export default function AdminKPIs({
  totalProfiles = 0,
  freeProfiles = 0,
  silverProfiles = 0,
  platinumProfiles = 0,
  featuredProfiles = 0,
  verifiedProfiles = 0,
  totalProjects = 0,
  activeProjects = 0,
  totalLookbooks = 0,
  recentSignups = 0,
}: AdminKPIsProps) {
  const kpis = [
    {
      label: 'Total Profiles',
      value: totalProfiles,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      label: 'Platinum Tier',
      value: platinumProfiles,
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      label: 'Featured',
      value: featuredProfiles,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      label: 'Verified',
      value: verifiedProfiles,
      icon: CheckCircle,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
    },
    {
      label: 'Active Projects',
      value: activeProjects,
      icon: FolderKanban,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      label: 'Lookbooks',
      value: totalLookbooks,
      icon: BookOpen,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
    },
    {
      label: 'Recent Signups',
      value: recentSignups,
      icon: TrendingUp,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div
            key={index}
            className={`bg-white rounded-lg border ${kpi.borderColor} p-6 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${kpi.bgColor} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-gray-900">{kpi.value.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{kpi.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

