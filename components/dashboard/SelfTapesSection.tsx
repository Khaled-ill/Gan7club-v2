'use client';

import Link from 'next/link';
import { Video, Clock, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface SelfTape {
  id: string;
  project?: {
    id: string;
    name?: string | null;
  } | null;
  status?: string | null;
  submittedAt?: string | null;
  videoUrl?: string | null;
  videoThumbnailUrl?: string | null;
  videoDuration?: number | null;
  notes?: string | null;
  adminNotes?: string | null;
}

interface SelfTapesSectionProps {
  selfTapes?: SelfTape[] | null;
}

export default function SelfTapesSection({ selfTapes }: SelfTapesSectionProps) {
  if (!selfTapes || selfTapes.length === 0) {
    return null;
  }

  const getStatusBadge = (status: string | null | undefined) => {
    switch (status?.toUpperCase()) {
      case 'SUBMITTED':
      case 'PENDING':
        return {
          icon: Clock,
          color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
          label: 'Pending',
        };
      case 'VIEWED':
      case 'REVIEWED':
        return {
          icon: AlertCircle,
          color: 'text-blue-600 bg-blue-50 border-blue-200',
          label: 'Reviewed',
        };
      case 'ACCEPTED':
      case 'SHORTLISTED':
        return {
          icon: CheckCircle,
          color: 'text-green-600 bg-green-50 border-green-200',
          label: 'Accepted',
        };
      case 'REJECTED':
        return {
          icon: XCircle,
          color: 'text-red-600 bg-red-50 border-red-200',
          label: 'Rejected',
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600 bg-gray-50 border-gray-200',
          label: status || 'Pending',
        };
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Unknown date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const formatDuration = (seconds: number | null | undefined) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Self-Tapes</h2>
        <Link
          href="/self-tapes"
          className="text-sm text-charcoal hover:text-charcoal/70 font-medium"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {selfTapes.map((selfTape) => {
          const statusBadge = getStatusBadge(selfTape.status);
          const StatusIcon = statusBadge.icon;

          return (
            <div
              key={selfTape.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex gap-4">
                {/* Video Thumbnail */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {selfTape.videoThumbnailUrl ? (
                      <img
                        src={selfTape.videoThumbnailUrl}
                        alt="Self-tape thumbnail"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Video className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {selfTape.project?.name || 'Untitled Project'}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Submitted {formatDate(selfTape.submittedAt)}
                      </p>
                    </div>
                    <span
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${statusBadge.color}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusBadge.label}
                    </span>
                  </div>

                  {selfTape.videoDuration && (
                    <p className="text-xs text-gray-500 mb-2">
                      Duration: {formatDuration(selfTape.videoDuration)}
                    </p>
                  )}

                  {selfTape.adminNotes && (
                    <p className="text-sm text-gray-600 mb-2 italic">
                      Admin: {selfTape.adminNotes}
                    </p>
                  )}

                  <Link
                    href={`/self-tapes/${selfTape.id}`}
                    className="inline-flex items-center gap-1 text-sm text-charcoal hover:text-charcoal/70 font-medium"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

