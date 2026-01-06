'use client';

import AdminGuard from '@/components/AdminGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminTalentsPage() {
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
                  <span className="text-2xl font-bold text-charcoal">Talent Management</span>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Talent Management</h2>
                <p className="text-gray-600">
                  This page will display all talents with filtering, search, and management capabilities.
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Use the queries from <code className="bg-gray-100 px-2 py-1 rounded">lib/graphql/admin-queries.ts</code> to implement this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}

