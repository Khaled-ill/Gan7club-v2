'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Image,
  Tag,
  Settings,
  Users,
  BarChart3,
  CreditCard,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { removeTokens } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'My Profile',
      href: '/profile',
      icon: User,
    },
    {
      label: 'Media Gallery',
      href: '/profile/media',
      icon: Image,
    },
    {
      label: 'Categories',
      href: '/profile/categories',
      icon: Tag,
    },
    {
      label: 'Attributes',
      href: '/profile/attributes',
      icon: Settings,
    },
    {
      label: 'Groups/Troupes',
      href: '/groups',
      icon: Users,
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
    },
    {
      label: 'Subscription',
      href: '/subscription',
      icon: CreditCard,
    },
  ];

  const handleLogout = () => {
    removeTokens();
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white text-gray-900 rounded-lg border border-gray-200 shadow-sm"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 min-h-screen p-4 z-40 transform transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="mb-8">
          <Link href="/" className="text-2xl font-bold text-charcoal">
            GAN7Club
          </Link>
        </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-charcoal text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}

