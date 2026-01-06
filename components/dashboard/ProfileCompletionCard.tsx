'use client';

import { calculateProfileCompletion } from '@/lib/profile-completion';
import type { ProfileData } from '@/lib/profile-completion';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProfileCompletionCardProps {
  profile: ProfileData | null;
}

export default function ProfileCompletionCard({
  profile,
}: ProfileCompletionCardProps) {
  const { percentage, checklist } = calculateProfileCompletion(profile);

  const items = [
    {
      label: 'Basic Info (Name, Birthdate, Nationality, Location)',
      completed: checklist.basicInfo,
      link: '/profile/edit',
    },
    {
      label: 'Categories',
      completed: checklist.categories,
      link: '/profile/categories',
    },
    {
      label: 'Attributes (Physical/Skills/Technical/Performance)',
      completed: checklist.attributes,
      link: '/profile/attributes',
    },
    {
      label: 'Media Gallery',
      completed: checklist.media,
      link: '/profile/media',
      count: profile?.media?.length || 0,
    },
    {
      label: 'Bio',
      completed: checklist.bio,
      link: '/profile/edit',
    },
  ];

  const incompleteItems = items.filter((item) => !item.completed);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Profile Completion</h2>
        <span className="text-2xl font-bold text-charcoal">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
        <div
          className="bg-charcoal h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Checklist */}
      <div className="space-y-3 mb-6">
        {items.map((item, index) => {
          const Icon = item.completed ? CheckCircle2 : AlertCircle;
          const iconColor = item.completed
            ? 'text-green-500'
            : 'text-yellow-500';

          return (
            <div
              key={index}
              className="flex items-center gap-3 text-gray-700"
            >
              <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
              <span className="flex-1">{item.label}</span>
              {item.count !== undefined && (
                <span className="text-gray-500 text-sm">
                  {item.count} items
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Button */}
      {incompleteItems.length > 0 && (
        <Link
          href={incompleteItems[0].link}
          className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal hover:bg-charcoal/90 text-white rounded-lg font-medium transition-colors"
        >
          Complete Your Profile
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

