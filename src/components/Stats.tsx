import { useEffect, useRef, useState } from "react";
import { StatItem } from "../types";

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Easily editable stats configuration
  const initialStats: StatItem[] = [
    { id: "artists", label: "ARTISTS & PERFORMERS", value: 25, suffix: "+" },
    { id: "guests", label: "GUESTS", value: 1500, suffix: "+" },
    { id: "experiences", label: "EXPERIENCES", value: 12, suffix: "+" },
    { id: "flagship", label: "UNFORGETTABLE KARUNADA HABBA", value: 1, suffix: "" },
  ];

  const [displayStats, setDisplayStats] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500; // Total count up animation duration
    const steps = 40; // Number of animation steps
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      
      const newValues = initialStats.map((stat) => {
        const increment = stat.value / steps;
        const value = Math.min(Math.round(increment * currentStep), stat.value);
        return value;
      });

      setDisplayStats(newValues);

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-24 bg-brand-black-deep relative overflow-hidden border-t border-white/5"
    >
      {/* Decorative vertical lines and glow overlays to look like an international dashboard */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white" />
        <div className="absolute top-0 bottom-0 left-2/4 w-px bg-white" />
        <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {initialStats.map((stat, idx) => (
            <div
              key={stat.id}
              className="flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl glass-card relative group hover:border-brand-red/30"
            >
              {/* Subtle light flares */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-brand-red/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Dynamic Animated Core Numbers */}
              <div className="flex items-baseline mb-3">
                <span className="text-4xl sm:text-5xl md:text-6xl font-mono font-extrabold text-white tracking-tight group-hover:text-brand-yellow transition-colors duration-300">
                  {displayStats[idx].toLocaleString()}
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-brand-yellow ml-0.5">
                  {stat.suffix}
                </span>
              </div>

              {/* Statistical Text Description */}
              <div className="text-[10px] sm:text-xs font-display font-bold tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
