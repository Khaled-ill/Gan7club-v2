'use client';

import Link from 'next/link';
import {
  Plus,
  Search,
  Users,
  FolderKanban,
  BookOpen,
  Download,
  Tag,
  Zap,
} from 'lucide-react';

export default function QuickActions() {
  const actions = [
    {
      label: 'Create Project',
      href: '/admin/projects/new',
      icon: Plus,
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      description: 'Start a new project',
    },
    {
      label: 'Generate Lookbook',
      href: '/admin/lookbooks/new',
      icon: BookOpen,
      color: 'text-pink-600 bg-pink-50 hover:bg-pink-100',
      description: 'Create a new lookbook',
    },
    {
      label: 'Search Talents',
      href: '/admin/search',
      icon: Search,
      color: 'text-purple-600 bg-purple-50 hover:bg-purple-100',
      description: 'Advanced talent search',
    },
    {
      label: 'Manage Categories',
      href: '/admin/categories',
      icon: Tag,
      color: 'text-green-600 bg-green-50 hover:bg-green-100',
      description: 'Edit categories',
    },
    {
      label: 'Bulk Operations',
      href: '/admin/bulk',
      icon: Zap,
      color: 'text-orange-600 bg-orange-50 hover:bg-orange-100',
      description: 'Bulk actions',
    },
    {
      label: 'View All Talents',
      href: '/admin/talents',
      icon: Users,
      color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100',
      description: 'Browse all profiles',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className={`${action.color} p-4 rounded-lg border border-transparent hover:border-gray-300 transition-all group`}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 group-hover:text-gray-900">
                    {action.label}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

