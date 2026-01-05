'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation for headline
      gsap.fromTo(
        headlineRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );

      // Fade in subtext
      gsap.fromTo(
        subtextRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
        }
      );

      // Fade in CTAs
      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: 'power3.out',
        }
      );

      // Fade in image
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.4,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <h1
              ref={headlineRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-tight"
            >
              Your Digital Talent Agency Platform.
            </h1>
            <p
              ref={subtextRef}
              className="text-xl md:text-2xl text-charcoal/70 leading-relaxed"
            >
              Connect Talents with Opportunities. Build Professional Portfolios.
              Find the Perfect Match.
            </p>
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <button className="bg-charcoal text-white px-8 py-4 rounded-full font-medium hover:bg-charcoal/90 transition-colors text-lg">
                Join as Talent
              </button>
              <button className="border-2 border-charcoal text-charcoal px-8 py-4 rounded-full font-medium hover:bg-charcoal hover:text-white transition-colors text-lg">
                Explore Casting
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div ref={imageRef} className="relative w-full h-[500px] lg:h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Professional talent portfolio interface"
              fill
              className="object-cover rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

