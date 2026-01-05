'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useQuery } from '@apollo/client';
import { GET_TALENT_CATEGORIES, mockTalentCategories } from '@/lib/graphql/queries';
import { Theater, Camera, Film, Sparkles } from 'lucide-react';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  theater: Theater,
  camera: Camera,
  film: Film,
  sparkles: Sparkles,
};

function CategoryCard({ category, index }: { category: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const categoryCardRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[category.icon] || iconMap.sparkles;

  useEffect(() => {
    const card = cardRef.current;
    const categoryCard = categoryCardRef.current;
    const imageCard = imageCardRef.current;
    const info = infoRef.current;

    if (!card || !categoryCard || !imageCard || !info) return;

      const handleMouseEnter = () => {
      setIsHovered(true);
      
      // Animate category card to move up and fade (infuse effect)
      gsap.to(categoryCard, {
        y: -30,
        opacity: 0.2,
        scale: 0.9,
        duration: 0.5,
        ease: 'power2.out',
      });

      // Animate image card to expand and move up (infuse effect)
      gsap.to(imageCard, {
        y: -50,
        scale: 1.08,
        duration: 0.5,
        ease: 'power2.out',
      });

      // Reveal information overlay with smooth fade
      gsap.fromTo(
        info,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.15,
          ease: 'power2.out',
        }
      );
    };

    const handleMouseLeave = () => {
      setIsHovered(false);

      // Reset category card
      gsap.to(categoryCard, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });

      // Reset image card
      gsap.to(imageCard, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });

      // Hide information overlay
      gsap.to(info, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer"
    >
      {/* Category Card */}
      <div
        ref={categoryCardRef}
        className="p-6 rounded-2xl bg-gray-100 mb-6 transition-all duration-300"
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-charcoal stroke-[1.5]" />
          </div>
          <h3 className="text-base font-bold text-charcoal">
            {category.name}
          </h3>
        </div>
      </div>

      {/* Image Card */}
      <div
        ref={imageCardRef}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200"
      >
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-all duration-400"
            style={{ 
              filter: isHovered ? 'grayscale(0%) brightness(1.1)' : 'grayscale(100%)',
              transition: 'filter 0.5s ease-out'
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-charcoal/50">No Image</span>
          </div>
        )}

        {/* Information Overlay */}
        <div
          ref={infoRef}
          className="absolute inset-0 bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-8 opacity-0 rounded-2xl"
        >
          <div className="text-center text-white space-y-4 max-w-xs">
            <div className="flex justify-center mb-2">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold">{category.name}</h4>
            <p className="text-white/90 text-sm leading-relaxed">
              {category.description}
            </p>
            <button className="mt-6 px-8 py-3 bg-white text-charcoal rounded-full font-medium hover:bg-white/90 transition-colors text-sm shadow-lg">
              Explore {category.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CategoryGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Use Apollo query (will fallback to mock data if API is unavailable)
  const { data, loading, error } = useQuery(GET_TALENT_CATEGORIES, {
    errorPolicy: 'all', // Continue even if query fails
  });

  // Use mock data if query fails or is loading
  const categories = data?.talentCategories || mockTalentCategories;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Talent Categories
          </h2>
          <p className="text-xl text-charcoal/70">
            Explore diverse talent across multiple categories
          </p>
        </div>

        {/* Combined Category and Image Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category: any, index: number) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

