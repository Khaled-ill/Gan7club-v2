'use client';

import Link from 'next/link';
import {
  User,
  Upload,
  Tag,
  Settings,
  Eye,
  CreditCard,
} from 'lucide-react';

export default function QuickActions() {
  const actions = [
    {
      label: 'Edit Profile',
      href: '/profile/edit',
      icon: User,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
    },
    {
      label: 'Upload Media',
      href: '/profile/media',
      icon: Upload,
      color: 'text-charcoal',
      bgColor: 'bg-charcoal/10',
    },
    {
      label: 'Manage Categories',
      href: '/profile/categories',
      icon: Tag,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
    },
    {
      label: 'Edit Attributes',
      href: '/profile/attributes',
      icon: Settings,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20',
    },
    {
      label: 'View Public Profile',
      href: '/profile/public',
      icon: Eye,
      color: 'text-pink-400',
      bgColor: 'bg-pink-900/20',
    },
    {
      label: 'Subscription',
      href: '/subscription',
      icon: CreditCard,
      color: 'text-orange-400',
      bgColor: 'bg-orange-900/20',
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors border border-gray-600"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.bgColor}`}
              >
                <Icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <span className="text-gray-300 text-sm text-center font-medium">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

