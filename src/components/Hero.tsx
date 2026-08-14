import React from "react";
import { ArrowDown } from "lucide-react";
import PowerTVLogo from "./PowerTVLogo";
import { trackGAEvent } from "../lib/analytics";
import HeroRegistrationForm from "./HeroRegistrationForm";

interface HeroProps {
  lang: "en" | "kn";
}

export default function Hero({ lang }: HeroProps) {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const englishTags = ["Music", "Awards", "Business Networking", "Cinema", "Culture", "Food Festival"];
  const kannadaTags = ["ಸಂಗೀತ", "ಪ್ರಶಸ್ತಿಗಳು", "ವ್ಯಾಪಾರ ನೆಟ್‌ವರ್ಕಿಂಗ್", "ಸಿನಿಮಾ", "ಸಂಸ್ಕೃತಿ", "ಆಹಾರ ಹಬ್ಬ"];
  const tagsToRender = lang === "en" ? englishTags : kannadaTags;

  return (
    <section id="hero" className="relative min-h-[100svh] w-full overflow-hidden bg-brand-black-deep pt-[105px] sm:pt-[120px] lg:pt-[130px] pb-12 sm:pb-16 lg:pb-20">
      {/* ── Cinematic Background ── */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1920"
          alt="Karunada Habba Thailand Festival Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105 animate-[slow-zoom_40s_infinite_alternate]"
        />
        <div className="absolute top-[20%] left-[10%] w-[35rem] h-[35rem] bg-brand-red/10 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[40rem] h-[40rem] bg-brand-yellow/10 rounded-full blur-[140px] mix-blend-screen animate-pulse pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black-deep via-brand-black-deep/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black-deep/70 via-transparent to-brand-black-deep/80" />
        <div className="absolute inset-0 bg-brand-black-deep/35" />
      </div>

      {/* ── Floating Particles ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-30">
        <div className="absolute w-1 h-1 bg-white rounded-full top-[15%] left-[20%] animate-[float-particle_8s_infinite]" />
        <div className="absolute w-2 h-2 bg-brand-yellow rounded-full top-[40%] left-[8%] animate-[float-particle_12s_infinite]" />
        <div className="absolute w-1.5 h-1.5 bg-brand-red rounded-full top-[25%] right-[25%] animate-[float-particle_10s_infinite]" />
        <div className="absolute w-1 h-1 bg-white rounded-full top-[60%] right-[10%] animate-[float-particle_14s_infinite]" />
        <div className="absolute w-2.5 h-2.5 bg-brand-yellow rounded-full bottom-[20%] left-[30%] animate-[float-particle_9s_infinite]" />
        <div className="absolute w-1.5 h-1.5 bg-brand-red rounded-full bottom-[35%] right-[40%] animate-[float-particle_11s_infinite]" />
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 min-h-[calc(100svh-140px)]">

        {/* ── LEFT: Hero Content ── */}
        <div className="flex-1 flex flex-col items-start justify-center text-left w-full max-w-2xl lg:max-w-none">

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-burgundy/80 border border-brand-red/30 mb-6 shadow-[0_0_20px_rgba(155,27,27,0.35)] animate-[fade-in-up_1s_ease-out_0.2s_both]">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono font-black tracking-[0.18em] text-[#d4af37] uppercase">
              {lang === "en"
                ? "World's Biggest Karnataka Rajyotsava Celebration Outside India"
                : "ಭಾರತದ ಹೊರಗೆ ವಿಶ್ವದ ಅತಿ ದೊಡ್ಡ ಕರ್ನಾಟಕ ರಾಜ್ಯೋತ್ಸವ ಆಚರಣೆ"}
            </span>
          </div>

          {/* Kannada Title */}
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.25] mb-4 tracking-normal text-white animate-[fade-in-up_1s_ease-out_0.4s_both] overflow-visible">
            <span className="block mb-1">ಥೈಲ್ಯಾಂಡ್ನಲ್ಲಿ</span>
            <span
              className="block overflow-visible py-1"
              style={{
                background: "linear-gradient(90deg, #dc2626 0%, #eab308 50%, #fde047 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ಕರುನಾಡ ಹಬ್ಬ
            </span>
          </h1>

          {/* English subtitle */}
          <div className="flex flex-wrap items-center gap-3 mb-7 animate-[fade-in-up_1s_ease-out_0.6s_both]">
            <h2 className="text-base sm:text-lg font-light text-white/75 tracking-widest uppercase">
              {lang === "en" ? "KARUNADA HABBA — THAILAND WITH" : "ಕರುನಾಡ ಹಬ್ಬ - ಥೈಲ್ಯಾಂಡ್"}
            </h2>
            <PowerTVLogo className="h-8 sm:h-9 shrink-0" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-x-2.5 gap-y-2.5 mb-8 animate-[fade-in-up_1s_ease-out_0.8s_both]">
            {tagsToRender.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white bg-white/5 border border-white/10 rounded-full hover:border-[#d4af37]/40 hover:bg-[#d4af37]/5 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10 animate-[fade-in-up_1s_ease-out_1.0s_both] bg-brand-black/45 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/5 max-w-sm shadow-xl shadow-black/40">
            <div className="flex -space-x-3 shrink-0">
              <div className="w-9 h-9 rounded-full border-2 border-brand-black-deep bg-[#9b1b1b] flex items-center justify-center text-white text-[9px] font-black">500+</div>
              <div className="w-9 h-9 rounded-full border-2 border-brand-black-deep bg-[#d4af37] flex items-center justify-center text-brand-black font-black text-[10px]">BL</div>
              <div className="w-9 h-9 rounded-full border-2 border-brand-black-deep bg-amber-800 flex items-center justify-center text-white text-[10px] font-bold">AR</div>
              <div className="w-9 h-9 rounded-full border-2 border-brand-black-deep bg-[#d4af37] flex items-center justify-center text-[9px] text-brand-black font-black">FM</div>
            </div>
            <div>
              <p className="text-xs font-black text-[#d4af37] tracking-wider uppercase">
                {lang === "en" ? "500+ Delegates" : "500+ ಪ್ರತಿನಿಧಿಗಳು"}
              </p>
              <p className="text-[11px] text-white/60 font-medium leading-snug">
                {lang === "en"
                  ? "Business leaders, artists, entrepreneurs & families."
                  : "ವ್ಯಾಪಾರ ಮುಖಂಡರು, ಕಲಾವಿದರು ಮತ್ತು ಕುಟುಂಬಸ್ಥರು."}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap items-start gap-3 animate-[fade-in-up_1s_ease-out_1.2s_both]">
            <button
              onClick={() => {
                trackGAEvent("click_request_invite", "engagement", "Hero Section");
                handleScrollTo("request-invite");
              }}
              className="px-7 py-3.5 bg-gradient-to-r from-[#9b1b1b] to-[#d4af37] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-red-900/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              {lang === "en" ? "REGISTER INTEREST" : "ಆಸಕ್ತಿ ನೋಂದಾಯಿಸಿ"}
            </button>

            <button
              onClick={() => {
                trackGAEvent("click_discover_experience", "engagement", "Hero Section");
                handleScrollTo("intro");
              }}
              className="px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white hover:text-[#d4af37] font-bold text-xs tracking-[0.2em] rounded-full border border-white/10 hover:border-[#d4af37]/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              {lang === "en" ? "DISCOVER THE EXPERIENCE" : "ಅನುಭವವನ್ನು ಅನ್ವೇಷಿಸಿ"}
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>

          {/* Date pill */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/50 font-mono tracking-widest animate-[fade-in-up_1s_ease-out_1.4s_both]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            29 OCT – 2 NOV 2026 · BANGKOK, THAILAND
          </div>
        </div>

        {/* ── RIGHT: Registration Form ── */}
        <div id="request-invite" className="w-full lg:w-[420px] xl:w-[460px] shrink-0 flex items-center justify-center lg:justify-end animate-[fade-in-up_1s_ease-out_0.5s_both] scroll-mt-28">
          <div className="w-full max-w-[460px]">
            <HeroRegistrationForm lang={lang} />
          </div>
        </div>
      </div>

      {/* Embedded Animations */}
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
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
