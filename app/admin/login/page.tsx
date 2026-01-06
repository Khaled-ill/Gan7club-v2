'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';
import { LOGIN_MUTATION } from '@/lib/graphql/queries';
import { setToken, setRefreshToken, setUserRole } from '@/lib/auth';
import { mockLogin, isMockMode } from '@/lib/mock-auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      // Store tokens
      if (data.login.accessToken) {
        setToken(data.login.accessToken);
      }
      if (data.login.refreshToken) {
        setRefreshToken(data.login.refreshToken);
      }
      // Store user role
      if (data.login.user?.role) {
        setUserRole(data.login.user.role);
      }
      
      // Verify admin role before redirecting
      const userRole = data.login.user?.role;
      if (userRole === 'ADMIN' || userRole === 'admin') {
        router.push('/admin');
      } else {
        setError('Access denied. Admin credentials required.');
        setIsLoading(false);
        // Clear tokens if not admin
        setToken('');
        setRefreshToken('');
        setUserRole('');
      }
      router.refresh();
    },
    onError: (error) => {
      setError(error.message || 'Login failed. Please try again.');
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Use mock authentication in development mode
      if (isMockMode()) {
        const data = await mockLogin(email, password);
        
        // Verify admin role
        const userRole = data.user?.role;
        if (userRole !== 'ADMIN' && userRole !== 'admin') {
          setError('Access denied. Admin credentials required.');
          setIsLoading(false);
          return;
        }
        
        // Store tokens
        if (data.accessToken) {
          setToken(data.accessToken);
        }
        if (data.refreshToken) {
          setRefreshToken(data.refreshToken);
        }
        // Store user role
        if (data.user?.role) {
          setUserRole(data.user.role);
        }
        // Redirect to admin panel
        router.push('/admin');
        router.refresh();
      } else {
        // Use real GraphQL mutation
        await login({
          variables: {
            email,
            password,
          },
        });
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Left Section - Admin Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          {/* Top Section */}
          <div className="flex items-start justify-between">
            <Link href="/" className="text-white text-3xl font-bold">
              GAN7Club
            </Link>
            <Link
              href="/login"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm transition-colors backdrop-blur-sm border border-white/20 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              User Login
            </Link>
          </div>

          {/* Center Section */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-white text-4xl font-bold mb-4">Admin Panel</h2>
              <p className="text-white/80 text-lg font-light max-w-md">
                Secure access to the GAN7Club administration dashboard
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-center">
            <p className="text-white/60 text-sm mb-4">Administrative Access Only</p>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
              <div className="w-8 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Mobile Back Button */}
          <div className="lg:hidden mb-6">
            <Link
              href="/login"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to User Login
            </Link>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="text-charcoal text-2xl font-bold">
              GAN7Club
            </Link>
          </div>

          {/* Admin Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4" />
              Admin Access
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600 mb-8">
            Enter your administrator credentials to access the panel
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                placeholder="admin@gan7club.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Access Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Security Notice</p>
                <p className="text-xs text-gray-600">
                  This is a restricted area. Only authorized administrators are permitted to access this panel.
                  Unauthorized access attempts may be logged and monitored.
                </p>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help?{' '}
              <Link href="/" className="text-purple-600 hover:text-purple-700 font-medium">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

