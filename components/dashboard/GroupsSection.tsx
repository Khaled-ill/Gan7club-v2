'use client';

import Link from 'next/link';
import { Users, Plus, ArrowRight } from 'lucide-react';
import { getGroupLimit } from '@/lib/subscription-tiers';

interface Group {
  id: string;
  name: string;
  description?: string | null;
  category?: {
    code: string;
    name: string;
  } | null;
  numberOfMembers?: number | null;
  members?: Array<{
    id: string;
    fullName?: string | null;
  }> | null;
  leader?: {
    id: string;
    email?: string | null;
  } | null;
}

interface GroupsSectionProps {
  groups?: Group[] | null;
  ownedGroups?: Group[] | null;
  memberGroups?: Group[] | null;
  subscriptionTier?: string | null;
  isGroupLeader?: boolean | null;
  isGroupMember?: boolean | null;
}

export default function GroupsSection({
  groups,
  ownedGroups,
  memberGroups,
  subscriptionTier,
  isGroupLeader,
  isGroupMember,
}: GroupsSectionProps) {
  const groupLimit = getGroupLimit((subscriptionTier as any) || 'FREE');
  const canCreateGroups = groupLimit > 0;
  const ownedGroupsList = ownedGroups || groups?.filter((g) => g.leader) || [];
  const memberGroupsList = memberGroups || groups?.filter((g) => !g.leader) || [];

  // Don't show section if user can't create groups and isn't in any groups
  if (!canCreateGroups && !isGroupLeader && !isGroupMember) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Groups/Troupes</h2>
        {canCreateGroups && (
          <Link
            href="/groups/new"
            className="flex items-center gap-2 px-4 py-2 bg-charcoal hover:bg-charcoal/90 text-white rounded-lg font-medium transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Create Group
          </Link>
        )}
      </div>

      <div className="space-y-6">
        {/* Groups I Own */}
        {ownedGroupsList.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              Groups I Own
            </h3>
            <div className="space-y-3">
              {ownedGroupsList.map((group) => (
                <div
                  key={group.id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{group.name}</h4>
                      {group.description && (
                        <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {group.category && (
                          <span>{group.category.name}</span>
                        )}
                        {group.numberOfMembers !== null && group.numberOfMembers !== undefined && (
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {group.numberOfMembers} members
                          </span>
                        )}
                      </div>
                    </div>
                    <Link
                      href={`/groups/${group.id}`}
                      className="flex items-center gap-1 text-charcoal hover:text-charcoal/70 text-sm font-medium"
                    >
                      Manage
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Groups I'm In */}
        {memberGroupsList.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              Groups I'm In
            </h3>
            <div className="space-y-3">
              {memberGroupsList.map((group) => (
                <div
                  key={group.id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{group.name}</h4>
                      {group.description && (
                        <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {group.category && (
                          <span>{group.category.name}</span>
                        )}
                        {group.leader?.email && (
                          <span>Leader: {group.leader.email}</span>
                        )}
                      </div>
                    </div>
                    <Link
                      href={`/groups/${group.id}`}
                      className="flex items-center gap-1 text-charcoal hover:text-charcoal/70 text-sm font-medium"
                    >
                      View
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {ownedGroupsList.length === 0 && memberGroupsList.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-2">No groups yet</p>
            {canCreateGroups ? (
              <Link
                href="/groups/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal hover:bg-charcoal/90 text-white rounded-lg font-medium transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Create Your First Group
              </Link>
            ) : (
              <p className="text-sm text-gray-500">
                Upgrade to {subscriptionTier === 'FREE' ? 'SILVER' : 'PLATINUM'} to create groups
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

