'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glassmorphism shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-charcoal">
            GAN7Club
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#talent"
              className="text-charcoal hover:text-charcoal/70 transition-colors font-medium"
            >
              For Talent
            </Link>
            <Link
              href="#admins"
              className="text-charcoal hover:text-charcoal/70 transition-colors font-medium"
            >
              For Admins
            </Link>
            <Link
              href="#pricing"
              className="text-charcoal hover:text-charcoal/70 transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-charcoal hover:text-charcoal/70 transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href="/register"
            className="bg-charcoal text-white px-6 py-2.5 rounded-full font-medium hover:bg-charcoal/90 transition-colors text-sm"
          >
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

