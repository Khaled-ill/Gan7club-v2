'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    // Only check auth on client side
    const auth = isAuthenticated();
    setIsAuth(auth);
    
    if (!auth) {
      router.push('/login');
    }
  }, [router]);

  // Show loading state during initial check to avoid hydration mismatch
  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If not authenticated, show redirecting message
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Redirecting to login...</div>
      </div>
    );
  }

  return <>{children}</>;
}

