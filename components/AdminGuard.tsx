'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, isAdmin } from '@/lib/auth';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean | null>(null);

  useEffect(() => {
    // Only check auth on client side
    const auth = isAuthenticated();
    const admin = isAdmin();
    setIsAuth(auth);
    setIsAdminUser(admin);
    
    if (!auth) {
      router.push('/admin/login');
    } else if (!admin) {
      // If authenticated but not admin, redirect to dashboard
      router.push('/dashboard');
    }
  }, [router]);

  // Show loading state during initial check to avoid hydration mismatch
  if (isAuth === null || isAdminUser === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // If not authenticated, show redirecting message
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Redirecting to login...</div>
      </div>
    );
  }

  // If not admin, show access denied message
  if (!isAdminUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 font-semibold mb-2">Access Denied</div>
          <div className="text-gray-600">Admin access required</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

