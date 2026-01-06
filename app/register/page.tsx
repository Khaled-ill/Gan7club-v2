'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Check } from 'lucide-react';
import { REGISTER_MUTATION } from '@/lib/graphql/queries';
import { mockRegister, isMockMode } from '@/lib/mock-auth';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [nationality, setNationality] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [register] = useMutation(REGISTER_MUTATION);

  const validateForm = () => {
    // Email validation
    if (!email) {
      setError('Email is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return false;
    }

    // Password validation
    if (!password) {
      setError('Password is required.');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }
    if (/^\d+$/.test(password)) {
      setError('This password is entirely numeric.');
      return false;
    }

    // Password confirmation
    if (!passwordConfirm) {
      setError('Password confirmation is required.');
      return false;
    }
    if (password !== passwordConfirm) {
      setError('Passwords do not match.');
      return false;
    }

    // Full name validation
    if (!fullName || fullName.trim().length < 2) {
      setError('Full name must be between 2 and 255 characters.');
      return false;
    }
    if (fullName.trim().length > 255) {
      setError('Full name must be between 2 and 255 characters.');
      return false;
    }

    // Birthdate validation
    if (!birthdate) {
      setError('Birthdate is required.');
      return false;
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthdate)) {
      setError('Invalid birthdate format. Use YYYY-MM-DD.');
      return false;
    }
    const birthDate = new Date(birthdate);
    const today = new Date();
    if (birthDate > today) {
      setError('Birthdate cannot be in the future.');
      return false;
    }
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
    if (actualAge < 13) {
      setError('You must be at least 13 years old to register.');
      return false;
    }
    if (actualAge > 120) {
      setError('Invalid birthdate. Please check your date of birth.');
      return false;
    }

    // Nationality validation
    if (!nationality || nationality.trim().length === 0) {
      setError('Nationality is required.');
      return false;
    }

    // Terms validation
    if (!termsAccepted) {
      setError('You must accept the terms and conditions to register.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
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
          fullName.trim()
        );
        setSuccess(true);
        setIsLoading(false);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        // Use real GraphQL mutation
        const input = {
          email: email.trim().toLowerCase(),
          password,
          passwordConfirm,
          fullName: fullName.trim(),
          birthdate,
          nationality: nationality.trim(),
          termsAccepted: true,
        };

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
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200">
            <div className="mb-6">
              <div className="w-16 h-16 bg-charcoal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-charcoal" strokeWidth={3} />
              </div>
              <h2 className="text-2xl font-bold text-charcoal mb-2">Registration Successful!</h2>
              <p className="text-charcoal/70">
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
    <div className="min-h-screen flex bg-white">
      {/* Left Section - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-charcoal to-charcoal/90">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          <div className="flex items-start justify-between">
            <Link href="/" className="text-white text-3xl font-bold">
              GAN7Club
            </Link>
            <Link
              href="/"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm transition-colors backdrop-blur-sm border border-white/20"
            >
              Back to website →
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-white text-2xl font-light mb-8 text-center">
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
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-charcoal/70 hover:text-charcoal text-sm transition-colors"
            >
              ← Back to website
            </Link>
          </div>

          <div className="lg:hidden mb-8">
            <Link href="/" className="text-charcoal text-2xl font-bold">
              GAN7Club
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-charcoal mb-2">Create an account</h1>
          <p className="text-charcoal/70 mb-8">
            Already have an account?{' '}
            <Link href="/login" className="text-charcoal hover:text-charcoal/70 transition-colors font-medium">
              Log in
            </Link>
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-charcoal mb-2">
                Full Name or Stage Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                minLength={2}
                maxLength={255}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-charcoal placeholder-gray-400 focus:ring-2 focus:ring-charcoal focus:border-charcoal outline-none transition-all"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-charcoal placeholder-gray-400 focus:ring-2 focus:ring-charcoal focus:border-charcoal outline-none transition-all"
                placeholder="your.email@example.com"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-charcoal placeholder-gray-400 focus:ring-2 focus:ring-charcoal focus:border-charcoal outline-none transition-all"
                  placeholder="Minimum 8 characters"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {password.length > 0 && password.length < 8 && (
                <p className="mt-1 text-xs text-charcoal/60">Password must be at least 8 characters</p>
              )}
            </div>

            {/* Password Confirm */}
            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-charcoal mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="passwordConfirm"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-charcoal placeholder-gray-400 focus:ring-2 focus:ring-charcoal focus:border-charcoal outline-none transition-all"
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal transition-colors"
                  tabIndex={-1}
                >
                  {showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordConfirm.length > 0 && password !== passwordConfirm && (
                <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
              )}
            </div>

            {/* Birthdate */}
            <div>
              <label htmlFor="birthdate" className="block text-sm font-medium text-charcoal mb-2">
                Date of Birth
              </label>
              <input
                id="birthdate"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-charcoal placeholder-gray-400 focus:ring-2 focus:ring-charcoal focus:border-charcoal outline-none transition-all"
                disabled={isLoading}
              />
              <p className="mt-1 text-xs text-charcoal/60">You must be at least 13 years old</p>
            </div>

            {/* Nationality */}
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-charcoal mb-2">
                Nationality
              </label>
              <input
                id="nationality"
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-charcoal placeholder-gray-400 focus:ring-2 focus:ring-charcoal focus:border-charcoal outline-none transition-all"
                placeholder="Enter your nationality"
                disabled={isLoading}
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start pt-2">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
                className="mt-1 w-4 h-4 bg-white border-gray-300 rounded text-charcoal focus:ring-charcoal focus:ring-2"
                disabled={isLoading}
              />
              <label htmlFor="terms" className="ml-3 text-sm text-charcoal/70">
                I agree to the{' '}
                <Link href="/terms" className="text-charcoal hover:text-charcoal/70 transition-colors font-medium underline">
                  Terms & Conditions
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-charcoal hover:bg-charcoal/90 text-white py-3.5 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? 'Creating Account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-sm text-charcoal/60 text-center">
            After registration, you can add categories and location to your profile
          </p>
        </div>
      </div>
    </div>
  );
}
