import { useEffect, useRef, useState } from "react";
import { Sparkles, Globe } from "lucide-react";

interface IntroProps {
  lang: "en" | "kn";
}

export default function Intro({ lang }: IntroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
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

  return (
    <section
      id="intro"
      ref={containerRef}
      className="relative py-24 sm:py-32 scroll-mt-28 overflow-hidden bg-brand-black-deep"
    >
      {/* Background Graphic Accents */}
      <div className="absolute top-[30%] left-[-10%] w-[30rem] h-[30rem] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35rem] h-[35rem] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Top Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-charcoal border border-white/5 mb-4 shadow-md">
            <Globe className="w-3.5 h-3.5 text-brand-yellow" />
            <span className="text-[10px] sm:text-xs font-display font-bold tracking-[0.25em] text-gray-400">
              {lang === "en" ? "KARNATAKA. BEYOND BORDERS." : "ಕರ್ನಾಟಕ. ಗಡಿ ಮೀರಿ."}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white uppercase leading-tight">
            {lang === "en" ? (
              <>A NEW CHAPTER BEGINS <span className="text-gradient-red-yellow">IN THAILAND</span></>
            ) : (
              <>ಥೈಲ್ಯಾಂಡ್‌ನಲ್ಲಿ ಹೊಸ <span className="text-gradient-red-yellow">ಅಧ್ಯಾಯ ಪ್ರಾರಂಭ</span></>
            )}
          </h2>
        </div>

        {/* Core Body Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center mb-24">
          <div className="md:col-span-7 space-y-6">
            <p className="text-lg sm:text-xl font-medium text-gray-200 leading-relaxed">
              {lang === "en" 
                ? "For the first time, experience the pure, untamed spirit of Karnataka come alive in Thailand."
                : "ಮೊದಲ ಬಾರಿಗೆ, ಕರ್ನಾಟಕದ ಅಪ್ಪಟ ಸಾಂಸ್ಕೃತಿಕ ಚೈತನ್ಯವು ಥೈಲ್ಯಾಂಡ್‌ನಲ್ಲಿ ಜೀವಂತವಾಗುವುದನ್ನು ಅನುಭವಿಸಿ."}
            </p>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              {lang === "en" ? (
                <>
                  <span className="font-kannada font-bold text-brand-yellow">ಕರುನಾಡ ಹಬ್ಬ</span> — Karunada Habba Thailand brings together Kannadigas, friends of Karnataka, artists, cultural icons, and communities from all over the globe for an extraordinary celebration of our rich language, music, heritage, and identity.
                </>
              ) : (
                <>
                  <span className="font-kannada font-bold text-brand-yellow">ಕರುನಾಡ ಹಬ್ಬ</span> — ಥೈಲ್ಯಾಂಡ್ ಕನ್ನಡಿಗರು, ಕರ್ನಾಟಕದ ಹಿತೈಷಿಗಳು, ಕಲಾವಿದರು, ಸಾಂಸ್ಕೃತಿಕ ತಾರೆಗಳು ಮತ್ತು ಜಗತ್ತಿನಾದ್ಯಂತ ಇರುವ ನಮ್ಮ ಸಮುದಾಯಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸಿ ನಮ್ಮ ಶ್ರೀಮಂತ ಭಾಷೆ, ಸಂಗೀತ, ಪರಂಪರೆ ಮತ್ತು ಹೆಮ್ಮೆಯ ಅಸಾಧಾರಣ ಆಚರಣೆಯಾಗಿದೆ.
                </>
              )}
            </p>
          </div>
          
          <div className="md:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-2xl glass-card border border-white/5 flex flex-col justify-between overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/10 rounded-full blur-2xl group-hover:bg-brand-red/20 transition-all duration-500" />
              <Sparkles className="w-8 h-8 text-brand-yellow mb-4" />
              <p className="font-kannada text-lg text-white font-medium leading-relaxed mb-4">
                "ಜಗತ್ತಿನ ಯಾವುದೇ ಮೂಲೆಗೆ ಹೋದರೂ, ಕನ್ನಡದ ಹಿರಿಮೆ ನಮ್ಮ ಜೊತೆಯಿರುತ್ತದೆ. ಇದು ಕೇವಲ ಒಂದು ಉತ್ಸವವಲ್ಲ, ಇದು ನಮ್ಮ ಹೆಮ್ಮೆಯ ಧ್ವನಿ."
              </p>
              <span className="text-[10px] font-mono tracking-[0.2em] text-brand-yellow uppercase font-semibold">
                {lang === "en" ? "GLOBAL KANNADA VOICE" : "ಜಾಗತಿಕ ಕನ್ನಡ ಧ್ವನಿ"}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Individual Statement Reveals */}
        <div className="space-y-12 sm:space-y-16 border-t border-white/5 pt-16">
          <div
            className={`transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block text-[10px] font-mono tracking-[0.3em] text-brand-red uppercase mb-2 font-bold">
              {lang === "en" ? "THE VENUE" : "ಸ್ಥಳ"}
            </span>
            <p className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white hover:text-brand-yellow transition-colors duration-300">
              {lang === "en" ? "One destination." : "ಒಂದೇ ತಾಣ."}
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block text-[10px] font-mono tracking-[0.3em] text-brand-yellow uppercase mb-2 font-bold">
              {lang === "en" ? "THE ENERGY" : "ಉತ್ಸಾಹ"}
            </span>
            <p className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white hover:text-brand-red transition-colors duration-300">
              {lang === "en" ? "One unforgettable celebration." : "ಒಂದು ಮರೆಯಲಾಗದ ಸಂಭ್ರಮ."}
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block text-[10px] font-mono tracking-[0.3em] text-brand-gold uppercase mb-2 font-bold">
              {lang === "en" ? "THE SOUL" : "ಆತ್ಮ"}
            </span>
            <p className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white hover:text-brand-yellow transition-colors duration-300">
              {lang === "en" ? "One Karnataka." : "ಒಂದೇ ಕರ್ನಾಟಕ."}
            </p>
          </div>

          {/* End Statement Highlight */}
          <div
            className={`pt-12 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="p-8 sm:p-12 rounded-3xl glass-panel-heavy border border-brand-red/20 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-red-dark/20 to-brand-yellow/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
              
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-[0.1em] text-white uppercase leading-tight relative z-10">
                {lang === "en" ? (
                  <>THIS IS KARNATAKA, <span className="text-brand-yellow">BEYOND BORDERS.</span></>
                ) : (
                  <>ಇದು ಕರ್ನಾಟಕ, <span className="text-brand-yellow">ಗಡಿ ದಾಟಿದ ಹೆಮ್ಮೆ.</span></>
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
