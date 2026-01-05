'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Search, Briefcase, FileText, Eye, Layers } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const talentsCardRef = useRef<HTMLDivElement>(null);
  const adminsCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards as they enter viewport
      gsap.fromTo(
        talentsCardRef.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: talentsCardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        adminsCardRef.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: adminsCardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Talents Card */}
          <div
            ref={talentsCardRef}
            className="p-10 rounded-2xl border-2 border-charcoal/10 hover:border-charcoal/30 transition-all duration-300 bg-white"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-charcoal rounded-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-charcoal">For Talents</h3>
              </div>
              <p className="text-lg text-charcoal/70">
                Everything you need to showcase your talent and connect with
                opportunities.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-charcoal mt-1 flex-shrink-0" />
                  <span className="text-charcoal/80">Professional Portfolio</span>
                </li>
                <li className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-charcoal mt-1 flex-shrink-0" />
                  <span className="text-charcoal/80">Enhanced Visibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-charcoal mt-1 flex-shrink-0" />
                  <span className="text-charcoal/80">Digital Z-Cards</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Admins Card */}
          <div
            ref={adminsCardRef}
            className="p-10 rounded-2xl border-2 border-charcoal/10 hover:border-charcoal/30 transition-all duration-300 bg-white"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-charcoal rounded-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-charcoal">For Admins</h3>
              </div>
              <p className="text-lg text-charcoal/70">
                Powerful tools to discover, manage, and collaborate with top
                talent.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Search className="w-5 h-5 text-charcoal mt-1 flex-shrink-0" />
                  <span className="text-charcoal/80">Advanced Search</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-charcoal mt-1 flex-shrink-0" />
                  <span className="text-charcoal/80">Digital Lookbooks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-charcoal mt-1 flex-shrink-0" />
                  <span className="text-charcoal/80">Project Management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

