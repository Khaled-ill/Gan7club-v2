'use client';

import Link from 'next/link';
import {
  User,
  Upload,
  Tag,
  Settings,
  Eye,
  CreditCard,
  Video,
  FileText,
  Users,
  ArrowUp,
} from 'lucide-react';

interface QuickActionsProps {
  subscriptionTier?: string | null;
  canCreateGroups?: boolean;
}

export default function QuickActions({
  subscriptionTier,
  canCreateGroups = false,
}: QuickActionsProps) {
  const isPlatinum = subscriptionTier?.toUpperCase() === 'PLATINUM';

  const actions = [
    {
      label: 'Edit Profile',
      href: '/profile/edit',
      icon: User,
    },
    {
      label: 'Upload Media',
      href: '/profile/media',
      icon: Upload,
    },
    {
      label: 'Manage Categories',
      href: '/profile/categories',
      icon: Tag,
    },
    {
      label: 'Edit Attributes',
      href: '/profile/attributes',
      icon: Settings,
    },
    {
      label: 'Upload Intro Video',
      href: '/profile/intro-video',
      icon: Video,
    },
    {
      label: 'View Public Profile',
      href: '/profile/public',
      icon: Eye,
    },
    ...(isPlatinum
      ? [
          {
            label: 'Generate Z-Card',
            href: '/profile/z-card',
            icon: FileText,
          },
        ]
      : []),
    ...(canCreateGroups
      ? [
          {
            label: 'Manage Groups',
            href: '/groups',
            icon: Users,
          },
        ]
      : []),
    ...(subscriptionTier?.toUpperCase() !== 'PLATINUM'
      ? [
          {
            label: 'Upgrade Plan',
            href: '/subscription',
            icon: ArrowUp,
          },
        ]
      : []),
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
            >
              <div className="w-10 h-10 rounded-lg bg-charcoal/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-charcoal" />
              </div>
              <span className="text-gray-700 text-sm text-center font-medium">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

