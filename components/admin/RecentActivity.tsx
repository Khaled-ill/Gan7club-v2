'use client';

import { Clock, User, FolderKanban, BookOpen, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface ActivityItem {
  id: string;
  type: 'profile' | 'project' | 'lookbook' | 'featured' | 'verified';
  title: string;
  description?: string;
  timestamp: string;
  href?: string;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
}

export default function RecentActivity({ activities = [] }: RecentActivityProps) {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'profile':
        return User;
      case 'project':
        return FolderKanban;
      case 'lookbook':
        return BookOpen;
      case 'featured':
        return Star;
      case 'verified':
        return CheckCircle;
      default:
        return Clock;
    }
  };

  const getColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'profile':
        return 'text-blue-600 bg-blue-50';
      case 'project':
        return 'text-orange-600 bg-orange-50';
      case 'lookbook':
        return 'text-pink-600 bg-pink-50';
      case 'featured':
        return 'text-yellow-600 bg-yellow-50';
      case 'verified':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>No recent activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          const colorClass = getColor(activity.type);
          const content = (
            <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`${colorClass} p-2 rounded-lg`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                {activity.description && (
                  <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{formatTime(activity.timestamp)}</p>
              </div>
            </div>
          );

          if (activity.href) {
            return (
              <Link key={activity.id} href={activity.href}>
                {content}
              </Link>
            );
          }

          return <div key={activity.id}>{content}</div>;
        })}
      </div>
    </div>
  );
}

