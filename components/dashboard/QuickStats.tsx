'use client';

import { Image, Tag, Eye, Briefcase } from 'lucide-react';

interface QuickStatsProps {
  categoriesCount?: number;
  mediaCount?: number;
  profileViews?: number;
  opportunities?: number;
}

export default function QuickStats({
  categoriesCount = 0,
  mediaCount = 0,
  profileViews = 0,
  opportunities = 0,
}: QuickStatsProps) {
  const stats = [
    {
      label: 'Categories',
      value: categoriesCount,
      icon: Tag,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
    },
    {
      label: 'Media Items',
      value: mediaCount,
      icon: Image,
      color: 'text-charcoal',
      bgColor: 'bg-charcoal/10',
    },
    {
      label: 'Profile Views',
      value: profileViews,
      icon: Eye,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
    },
    {
      label: 'Opportunities',
      value: opportunities,
      icon: Briefcase,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-5 h-5 ${stat.color}`} />
              <span className={`${stat.bgColor} ${stat.color} px-2 py-1 rounded text-xs font-medium`}>
                {stat.value}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}

