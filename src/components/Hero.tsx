import React, { useState } from "react";
import { ArrowDown, Sparkles, Phone } from "lucide-react";
import PowerTVLogo from "./PowerTVLogo";
import { trackGAEvent } from "../lib/analytics";

interface Particle {
  id: number;
  percentX?: number;
  percentY?: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}

interface HeroProps {
  lang: "en" | "kn";
}

export default function Hero({ lang }: HeroProps) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [cardFireworks, setCardFireworks] = useState<Particle[]>([]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const triggerCardFireworks = () => {
    setIsCardHovered(true);
    const particles = Array.from({ length: 30 }).map((_, i) => {
      const colors = ["#d4af37", "#ff3333", "#ff00ff", "#33ccff", "#39ff14", "#ff9900", "#ffffff"];
      const angle = (i / 30) * 2 * Math.PI + (Math.random() - 0.5) * 0.2;
      const velocity = 80 + Math.random() * 120;
      return {
        id: Date.now() + i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 5 + 3,
        delay: Math.random() * 0.1,
      };
    });
    setCardFireworks(particles);
  };

  const englishTags = [
    "Music",
    "Awards",
    "Business Networking",
    "Cinema",
    "Culture",
    "Food Festival"
  ];

  const kannadaTags = [
    "ಸಂಗೀತ",
    "ಪ್ರಶಸ್ತಿಗಳು",
    "ವ್ಯಾಪಾರ ನೆಟ್‌ವರ್ಕಿಂಗ್",
    "ಸಿನಿಮಾ",
    "ಸಂಸ್ಕೃತಿ",
    "ಆಹಾರ ಹಬ್ಬ"
  ];

  const tagsToRender = lang === "en" ? englishTags : kannadaTags;

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col overflow-hidden bg-brand-black-deep pt-[120px] md:pt-[140px] pb-20">
      {/* Cinematic Background Image with fallbacks */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1920"
          alt="Karunada Habba Thailand Festival Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105 animate-[slow-zoom_40s_infinite_alternate]"
        />
        {/* Soft atmospheric glowing stage filters */}
        <div className="absolute top-[20%] left-[10%] w-[35rem] h-[35rem] bg-brand-red/10 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[40rem] h-[40rem] bg-brand-yellow/10 rounded-full blur-[140px] mix-blend-screen animate-pulse pointer-events-none" />
        
        {/* Cinematic dark/gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black-deep via-brand-black-deep/60 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black-deep/70 via-transparent to-brand-black-deep/80 z-1" />
        <div className="absolute inset-0 bg-brand-black-deep/40 backdrop-brightness-[0.7] z-1" />
      </div>

      {/* Embedded Ambient Floating Particles (pure CSS) */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-30">
        <div className="absolute w-1 h-1 bg-white rounded-full top-[15%] left-[20%] animate-[float-particle_8s_infinite]" />
        <div className="absolute w-2 h-2 bg-brand-yellow rounded-full top-[40%] left-[8%] animate-[float-particle_12s_infinite]" />
        <div className="absolute w-1.5 h-1.5 bg-brand-red rounded-full top-[25%] right-[25%] animate-[float-particle_10s_infinite]" />
        <div className="absolute w-1 h-1 bg-white rounded-full top-[60%] right-[10%] animate-[float-particle_14s_infinite]" />
        <div className="absolute w-2.5 h-2.5 bg-brand-yellow rounded-full bottom-[20%] left-[30%] animate-[float-particle_9s_infinite]" />
        <div className="absolute w-1.5 h-1.5 bg-brand-red rounded-full bottom-[35%] right-[40%] animate-[float-particle_11s_infinite]" />
      </div>

      {/* Hero Content Panel */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 flex flex-col items-center justify-center my-auto">
        {/* World's Biggest Karnataka Rajyotsava Celebration Badge */}
        <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-brand-burgundy/80 border border-brand-red/30 mb-6 shadow-[0_0_20px_rgba(155,27,27,0.35)] animate-[fade-in-up_1s_ease-out_0.2s_both]">
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
          <span className="text-[10px] sm:text-xs font-mono font-black tracking-[0.2em] text-[#d4af37] uppercase">
            {lang === "en" 
              ? "World's Biggest Karnataka Rajyotsava Celebration Outside India" 
              : "ಭಾರತದ ಹೊರಗೆ ವಿಶ್ವದ ಅತಿ ದೊಡ್ಡ ಕರ್ನಾಟಕ ರಾಜ್ಯೋತ್ಸವ ಆಚರಣೆ"}
          </span>
        </div>

        {/* Large Statement Kannada Title */}
        <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.3] sm:leading-normal md:leading-normal mb-4 tracking-normal text-white animate-[fade-in-up_1s_ease-out_0.4s_both] py-2 overflow-visible">
          <span className="block mb-2 sm:mb-1 px-4">ಥೈಲ್ಯಾಂಡ್ನಲ್ಲಿ</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-amber-200 py-3 px-6 -my-2 overflow-visible">
            ಕರುನಾಡ ಹಬ್ಬ
          </span>
        </h1>

        {/* English Core Title */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8 animate-[fade-in-up_1s_ease-out_0.6s_both]">
          <h2 className="text-xl sm:text-2xl font-light text-white/80 tracking-widest uppercase">
            {lang === "en" ? "KARUNADA HABBA — THAILAND WITH" : "ಕರುನಾಡ ಹಬ್ಬ - ಥೈಲ್ಯಾಂಡ್"}
          </h2>
          <PowerTVLogo className="h-9 sm:h-10 md:h-11 shrink-0 -mt-1 sm:-mt-1.5" />
        </div>

        {/* Horizontal Tagline Grid */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-3 mb-10 max-w-4xl animate-[fade-in-up_1s_ease-out_0.8s_both] text-center px-4">
          {tagsToRender.map((tag, idx) => (
            <span 
              key={idx} 
              className="px-3.5 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] text-white bg-white/5 border border-white/10 rounded-full hover:border-[#d4af37]/40 hover:bg-[#d4af37]/5 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Delegate Social Proof */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 animate-[fade-in-up_1s_ease-out_1.0s_both] bg-brand-black/45 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5 max-w-lg shadow-xl shadow-black/40">
          <div className="flex -space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-full border-2 border-brand-black-deep bg-[#9b1b1b] flex items-center justify-center text-white text-[10px] font-black">500+</div>
            <div className="w-10 h-10 rounded-full border-2 border-brand-black-deep bg-[#d4af37] flex items-center justify-center text-brand-black font-black text-[11px]">BL</div>
            <div className="w-10 h-10 rounded-full border-2 border-brand-black-deep bg-amber-800 flex items-center justify-center text-white text-[11px] font-bold">AR</div>
            <div className="w-10 h-10 rounded-full border-2 border-brand-black-deep bg-[#d4af37] flex items-center justify-center text-[10px] text-brand-black font-black">FM</div>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm font-black text-[#d4af37] tracking-wider uppercase">
              {lang === "en" ? "500+ Delegates" : "500+ ಪ್ರತಿನಿಧಿಗಳು"}
            </p>
            <p className="text-xs text-white/70 font-medium">
              {lang === "en" 
                ? "Including prominent business leaders, artists, entrepreneurs, and families." 
                : "ಪ್ರಮುಖ ವ್ಯಾಪಾರ ಮುಖಂಡರು, ಕಲಾವಿದರು, ಉದ್ಯಮಿಗಳು ಮತ್ತು ಕುಟುಂಬಸ್ಥರು ಸೇರಿದಂತೆ."}
            </p>
          </div>
        </div>

        {/* Hero CTA Controls */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 sm:gap-6 w-full max-w-2xl justify-center animate-[fade-in-up_1s_ease-out_1.2s_both]">
          {/* Primary Submit Trigger */}
          <button
            onClick={() => {
              trackGAEvent("click_request_invite", "engagement", "Hero Section");
              handleScrollTo("request-invite");
            }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#9b1b1b] to-[#d4af37] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-red-900/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {lang === "en" ? "REGISTER INTEREST" : "ಆಸಕ್ತಿ ನೋಂದಾಯಿಸಿ"}
          </button>

          {/* Secondary Discover Trigger */}
          <button
            onClick={() => {
              trackGAEvent("click_discover_experience", "engagement", "Hero Section");
              handleScrollTo("intro");
            }}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white hover:text-[#d4af37] font-display font-bold text-xs tracking-[0.2em] rounded-full border border-white/10 hover:border-[#d4af37]/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            {lang === "en" ? "DISCOVER THE EXPERIENCE" : "ಅನುಭವವನ್ನು ಅನ್ವೇಷಿಸಿ"} <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Pure CSS Embedded Animations */}
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.08); }
        }
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-40px) translateX(20px) rotate(180deg); opacity: 0.8; }
          100% { transform: translateY(0) translateX(0) rotate(360deg); opacity: 0.3; }
        }
        @keyframes scroll-dot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes card-pulse-glow {
          0% {
            border-color: rgba(212, 175, 55, 0.4);
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
          }
          100% {
            border-color: rgba(155, 27, 27, 1);
            box-shadow: 0 0 35px rgba(155, 27, 27, 0.6);
          }
        }
        @keyframes laser-crawl {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(100px); opacity: 0; }
        }
        @keyframes text-pulse-flash {
          0%, 100% { opacity: 1; color: #d4af37; }
          50% { opacity: 0.5; color: #ff3333; }
        }
      `}</style>
    </section>
  );
}
