'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: [
        'Basic portfolio',
        'Limited visibility',
        'Standard Z-Cards',
        'Community access',
      ],
      cta: 'Get Started',
      highlight: false,
    },
    {
      name: 'Silver',
      price: '$29',
      period: '/month',
      features: [
        'Enhanced portfolio',
        'Increased visibility',
        'Premium Z-Cards',
        'Priority support',
        'Advanced analytics',
      ],
      cta: 'Upgrade Now',
      highlight: true,
    },
    {
      name: 'Platinum',
      price: '$99',
      period: '/month',
      features: [
        'Unlimited portfolio',
        'Maximum visibility',
        'Custom Z-Cards',
        '24/7 priority support',
        'Advanced analytics',
        'Exclusive opportunities',
        'Dedicated account manager',
      ],
      cta: 'Go Platinum',
      highlight: false,
      premium: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-charcoal/70">
            Select the perfect tier for your needs
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`p-8 rounded-2xl ${
                tier.highlight
                  ? 'border-2 border-charcoal'
                  : tier.premium
                  ? 'border-2 border-charcoal/20 shadow-xl relative'
                  : 'border-2 border-charcoal/10'
              } bg-white hover:shadow-lg transition-all duration-300`}
            >
              {tier.premium && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-charcoal text-white px-4 py-1 rounded-full text-sm font-medium">
                  Premium
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-charcoal mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-charcoal">
                    {tier.price}
                  </span>
                  <span className="text-charcoal/60">{tier.period}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-charcoal mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-full font-medium transition-colors ${
                  tier.highlight
                    ? 'bg-charcoal text-white hover:bg-charcoal/90'
                    : tier.premium
                    ? 'bg-charcoal text-white hover:bg-charcoal/90'
                    : 'border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

