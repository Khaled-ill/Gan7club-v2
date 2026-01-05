'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Check } from 'lucide-react';
import { REGISTER_MUTATION } from '@/lib/graphql/queries';
import { mockRegister, isMockMode } from '@/lib/mock-auth';

// Available categories (these should come from a query in production)
const AVAILABLE_CATEGORIES = [
  { code: 'dancer', name: 'Dancer' },
  { code: 'actor', name: 'Actor' },
  { code: 'singer', name: 'Singer' },
  { code: 'musician', name: 'Musician' },
  { code: 'photographer', name: 'Photographer' },
  { code: 'videographer', name: 'Videographer' },
  { code: 'director', name: 'Director' },
  { code: 'producer', name: 'Producer' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [entityType, setEntityType] = useState<'individual' | 'troupe'>('individual');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [primaryCategory, setPrimaryCategory] = useState<string>('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [register] = useMutation(REGISTER_MUTATION);

  // Update primary category when categories change
  useEffect(() => {
    if (selectedCategories.length === 1) {
      setPrimaryCategory(selectedCategories[0]);
    } else if (selectedCategories.length > 1 && !selectedCategories.includes(primaryCategory)) {
      setPrimaryCategory('');
    }
  }, [selectedCategories, primaryCategory]);

  const handleCategoryToggle = (categoryCode: string) => {
    if (selectedCategories.includes(categoryCode)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== categoryCode));
      if (primaryCategory === categoryCode) {
        setPrimaryCategory('');
      }
    } else {
      if (selectedCategories.length >= 5) {
        setError('You can select a maximum of 5 categories');
        return;
      }
      setSelectedCategories([...selectedCategories, categoryCode]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (fullName.length < 2 || fullName.length > 255) {
      setError('Full name must be between 2 and 255 characters');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }

    if (selectedCategories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    if (selectedCategories.length > 1 && !primaryCategory) {
      setError('Please select a primary category when choosing multiple categories');
      return;
    }

    if (!termsAccepted) {
      setError('You must agree to the Terms & Conditions');
      return;
    }

    setIsLoading(true);

    try {
      // Use mock authentication in development mode
      if (isMockMode()) {
        await mockRegister(
          email,
          email.split('@')[0],
          password,
          fullName,
          entityType,
          selectedCategories
        );
        setSuccess(true);
        setIsLoading(false);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        // Use real GraphQL mutation
        const input: any = {
          email,
          password,
          passwordConfirm,
          fullName,
          entityType,
          categories: selectedCategories,
          termsAccepted: true,
        };

        if (selectedCategories.length > 1) {
          input.primaryCategory = primaryCategory;
        }

        if (country) input.country = country;
        if (city) input.city = city;

        const { data } = await register({
          variables: { input },
        });

        if (data?.register?.success) {
          setSuccess(true);
          setIsLoading(false);
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          const errors = data?.register?.errors || [data?.register?.message];
          setError(errors.join(', ') || 'Registration failed');
          setIsLoading(false);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-700">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
              <p className="text-gray-400">
                Your account has been created. Redirecting to login...
              </p>
            </div>
            <Link
              href="/login"
              className="text-charcoal font-medium hover:text-charcoal/70 transition-colors inline-block"
            >
              Go to Login →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Left Section - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-gray-900/80"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          <div className="flex items-start justify-between">
            <div className="text-white text-3xl font-bold">GAN7Club</div>
            <Link
              href="/"
              className="bg-gray-800/50 hover:bg-gray-800/70 text-white px-4 py-2 rounded-lg text-sm transition-colors backdrop-blur-sm"
            >
              Back to website →
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-white text-2xl font-light mb-8">
              Capturing Moments, Creating Memories
            </p>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white/30"></div>
              <div className="w-8 h-2 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-900 p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-white text-sm transition-colors"
            >
              ← Back to website
            </Link>
          </div>

          <div className="lg:hidden mb-8">
            <div className="text-white text-2xl font-bold">GAN7Club</div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">Create an account</h1>
          <p className="text-gray-400 mb-8">
            Already have an account?{' '}
            <Link href="/login" className="text-charcoal hover:text-charcoal/70 transition-colors">
              Log in
            </Link>
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                minLength={2}
                maxLength={255}
                className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-charcoal focus:border-transparent outline-none transition-all"
                placeholder="Full name or stage name"
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-charcoal focus:border-transparent outline-none transition-all"
                placeholder="Email"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3.5 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="Password (min 8 characters)"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Confirm */}
            <div className="relative">
              <input
                id="passwordConfirm"
                type={showPasswordConfirm ? 'text' : 'password'}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3.5 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="Confirm password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Entity Type */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Entity Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setEntityType('individual')}
                  className={`px-4 py-3 rounded-lg border transition-colors ${
                    entityType === 'individual'
                      ? 'bg-charcoal border-charcoal text-white'
                      : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                  disabled={isLoading}
                >
                  Individual
                </button>
                <button
                  type="button"
                  onClick={() => setEntityType('troupe')}
                  className={`px-4 py-3 rounded-lg border transition-colors ${
                    entityType === 'troupe'
                      ? 'bg-charcoal border-charcoal text-white'
                      : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                  disabled={isLoading}
                >
                  Troupe
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Categories {selectedCategories.length > 0 && `(${selectedCategories.length}/5)`}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_CATEGORIES.map((category) => {
                  const isSelected = selectedCategories.includes(category.code);
                  const isPrimary = primaryCategory === category.code;
                  return (
                    <button
                      key={category.code}
                      type="button"
                      onClick={() => handleCategoryToggle(category.code)}
                      className={`px-4 py-3 rounded-lg border text-left transition-colors ${
                        isSelected
                          ? 'bg-charcoal/20 border-charcoal text-white'
                          : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                      }`}
                      disabled={isLoading}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-charcoal" />
                        )}
                      </div>
                      {isPrimary && selectedCategories.length > 1 && (
                        <span className="text-xs text-charcoal mt-1 block">Primary</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {selectedCategories.length > 1 && (
                <div className="mt-4">
                  <label className="block text-sm text-gray-400 mb-2">Primary Category</label>
                  <select
                    value={primaryCategory}
                    onChange={(e) => setPrimaryCategory(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-charcoal focus:border-transparent outline-none"
                    disabled={isLoading}
                  >
                    <option value="">Select primary category</option>
                    {selectedCategories.map((code) => {
                      const category = AVAILABLE_CATEGORIES.find((c) => c.code === code);
                      return (
                        <option key={code} value={code}>
                          {category?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
            </div>

            {/* Location (Optional) */}
            <div className="grid grid-cols-2 gap-4">
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                maxLength={100}
                className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-charcoal focus:border-transparent outline-none transition-all"
                placeholder="City (optional)"
                disabled={isLoading}
              />
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                maxLength={100}
                className="w-full px-4 py-3.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-charcoal focus:border-transparent outline-none transition-all"
                placeholder="Country (optional)"
                disabled={isLoading}
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
                className="mt-1 w-4 h-4 bg-gray-800 border-gray-700 rounded text-charcoal focus:ring-charcoal focus:ring-2"
                disabled={isLoading}
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-400">
                I agree to the{' '}
                <Link href="/terms" className="text-charcoal hover:text-charcoal/70 transition-colors">
                  Terms & Conditions
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-charcoal hover:bg-charcoal/90 text-white py-3.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-400">Or register with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.96-3.24-1.44-2.02-1.03-3.25-1.6-3.17-2.94.03-.46.37-.78.75-1.08.77-.61 1.75-1.38 2.78-2.23 1.64-1.35 3.18-2.62 4.6-3.8.45-.38.9-.76 1.34-1.13.87-.75 1.5-1.3 1.89-1.65.6-.55.98-1.1.98-1.7 0-.5-.17-.9-.5-1.2-.33-.3-.75-.45-1.25-.45-.5 0-1.05.15-1.65.45-.6.3-1.25.7-1.95 1.2l-.85.6c-.3.2-.6.4-.9.6-.3.2-.6.35-.9.45-.3.1-.6.15-.9.15-.3 0-.6-.05-.9-.15-.3-.1-.6-.25-.9-.45-.3-.2-.6-.4-.9-.6l-.85-.6c-.7-.5-1.35-.9-1.95-1.2-.6-.3-1.15-.45-1.65-.45-.5 0-.92.15-1.25.45-.33.3-.5.7-.5 1.2 0 .6.38 1.15.98 1.7.39.35 1.02.9 1.89 1.65.44.37.89.75 1.34 1.13 1.42 1.18 2.96 2.45 4.6 3.8 1.03.85 2.01 1.62 2.78 2.23.38.3.72.62.75 1.08.08 1.34-1.15 1.91-3.17 2.94-1.16.48-2.15.94-3.24 1.44-1.03.48-2.1.55-3.08-.4-1.95-1.9-3.9-3.8-5.85-5.7-.98-.95-1.47-2.05-1.47-3.3 0-1.25.49-2.35 1.47-3.3.98-.95 2.08-1.42 3.3-1.42 1.22 0 2.32.47 3.3 1.42l.85.6c.3.2.6.4.9.6.3.2.6.35.9.45.3.1.6.15.9.15.3 0 .6-.05.9-.15.3-.1.6-.25.9-.45.3-.2.6-.4.9-.6l.85-.6c.98-.95 2.08-1.42 3.3-1.42 1.22 0 2.32.47 3.3 1.42 1.95 1.9 3.9 3.8 5.85 5.7.98.95 1.47 2.05 1.47 3.3 0 1.25-.49 2.35-1.47 3.3z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
