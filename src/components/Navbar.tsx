import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, FileText } from "lucide-react";
import PowerTVLogo from "./PowerTVLogo";
import { trackGAEvent } from "../lib/analytics";

interface NavbarProps {
  lang: "en" | "kn";
  setLang: (lang: "en" | "kn") => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Sticky Crawling Flash Ticker Banner */}
      <div className="fixed top-0 left-0 w-full h-9 z-50 bg-[#9b1b1b] border-b border-white/10 flex items-center overflow-hidden">
        <div className="flex items-center px-3.5 sm:px-4 bg-[#d4af37] text-black text-[10px] font-black tracking-widest uppercase h-full shrink-0 relative overflow-hidden animate-[pulse-yellow-glow_1.5s_infinite_alternate]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9b1b1b] animate-ping mr-1.5" />
          <span className="relative z-10 text-[9px] text-black font-extrabold">
            {lang === "en" ? "LIVE FLASH" : "ನೇರ ಪ್ರಸಾರ"}
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden h-full flex items-center bg-[#220505]/40">
          <div className="absolute flex whitespace-nowrap animate-[marquee-ticker_20s_linear_infinite] text-[11px] font-semibold tracking-wider text-white uppercase">
            {lang === "en" ? (
              <>
                <span className="mx-12">🔥 REGISTRATIONS OPEN FOR KARUNADA HABBA THAILAND 2026! DATES CONFIRMED: 29TH OCT TO 2ND NOV 2026 IN BANGKOK • MUSIC • CINEMA • CULTURE • FOOD • REGISTER NOW</span>
                <span className="mx-12">🔥 REGISTRATIONS OPEN FOR KARUNADA HABBA THAILAND 2026! DATES CONFIRMED: 29TH OCT TO 2ND NOV 2026 IN BANGKOK • MUSIC • CINEMA • CULTURE • FOOD • REGISTER NOW</span>
              </>
            ) : (
              <>
                <span className="mx-12">🔥 ಕರುನಾಡ ಹಬ್ಬ ಥೈಲ್ಯಾಂಡ್ 2026 ಕ್ಕೆ ನೋಂದಣಿ ಪ್ರಾರಂಭವಾಗಿದೆ! ದಿನಾಂಕಗಳು: 29 ಅಕ್ಟೋಬರ್ ನಿಂದ 2 ನವೆಂಬರ್ 2026 ಬ್ಯಾಂಕಾಕ್‌ನಲ್ಲಿ • ಸಂಗೀತ • ಸಿನಿಮಾ • ಸಂಸ್ಕೃತಿ • ಆಹಾರ • ಈಗಲೇ ನೋಂದಾಯಿಸಿ</span>
                <span className="mx-12">🔥 ಕರುನಾಡ ಹಬ್ಬ ಥೈಲ್ಯಾಂಡ್ 2026 ಕ್ಕೆ ನೋಂದಣಿ ಪ್ರಾರಂಭವಾಗಿದೆ! ದಿನಾಂಕಗಳು: 29 ಅಕ್ಟೋಬರ್ ನಿಂದ 2 ನವೆಂಬರ್ 2026 ಬ್ಯಾಂಕಾಕ್‌ನಲ್ಲಿ • ಸಂಗೀತ • ಸಿನಿಮಾ • ಸಂಸ್ಕೃತಿ • ಆಹಾರ • ಈಗಲೇ ನೋಂದಾಯಿಸಿ</span>
              </>
            )}
          </div>
        </div>

        {/* Premium Language Toggle on the Right of Top Scroll */}
        <div className="h-full shrink-0 flex items-center bg-brand-black-deep px-3 border-l border-white/10 relative z-10">
          <button
            onClick={() => {
              const nextLang = lang === "en" ? "kn" : "en";
              setLang(nextLang);
              trackGAEvent(`toggle_language_to_${nextLang}`, "engagement", "Top Scroll Ticker");
            }}
            className="px-3.5 py-1 bg-[#d4af37] text-brand-black font-mono hover:bg-white text-[9px] sm:text-[10px] font-black uppercase rounded-full transition-all duration-300 active:scale-95 cursor-pointer whitespace-nowrap shadow-md flex items-center gap-1 hover:shadow-brand-yellow/20"
          >
            <span>{lang === "en" ? "ಕನ್ನಡ" : "ENGLISH"}</span>
          </button>
        </div>
      </div>

      <nav
        className={`fixed top-9 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? "py-3 glass-panel-heavy border-b border-white/5 shadow-2xl"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left Side: Brand Wordmarks */}
          <div
            className="cursor-pointer group flex flex-col items-start gap-1"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-display font-black tracking-tighter text-white group-hover:text-brand-yellow transition-colors duration-300">
                {lang === "en" ? "KARUNADA HABBA" : "ಕರುನಾಡ ಹಬ್ಬ"}
              </span>
              <span className="text-[9px] text-brand-yellow tracking-[0.18em] font-medium uppercase mt-0.5 group-hover:text-white transition-colors duration-300">
                {lang === "en" ? "THAILAND 2026 WITH" : "ಥೈಲ್ಯಾಂಡ್ 2026"}
              </span>
            </div>
            <PowerTVLogo className="h-5.5 sm:h-6 md:h-6.5 shrink-0 mt-0.5" />
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("experience")}
              className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity cursor-pointer text-white"
            >
              {lang === "en" ? "Experience" : "ಅನುಭವಗಳು"}
            </button>
            <button
              onClick={() => scrollToSection("destination")}
              className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity cursor-pointer text-white"
            >
              {lang === "en" ? "Thailand" : "ಥೈಲ್ಯಾಂಡ್"}
            </button>
            <button
              onClick={() => scrollToSection("intro")}
              className="text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity cursor-pointer text-white"
            >
              {lang === "en" ? "About" : "ಪರಿಚಯ"}
            </button>
            <button
              onClick={() => scrollToSection("passes")}
              className="text-xs uppercase tracking-widest font-bold text-brand-yellow hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              {lang === "en" ? "Buy Passes" : "ಪಾಸ್‌ಗಳನ್ನು ಖರೀದಿಸಿ"}
            </button>

            <a
              href="/itinerary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGAEvent("click_nav_itinerary_pdf", "engagement", "Navbar")}
              className="text-xs uppercase tracking-widest text-gray-300 hover:text-brand-yellow transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
            >
              <FileText className="w-3.5 h-3.5 text-brand-yellow" />
              {lang === "en" ? "Itinerary PDF" : "ಪ್ರವಾಸ ಪಟ್ಟಿ PDF"}
            </a>

            <button
              onClick={() => scrollToSection("request-invite")}
              className="relative px-6 py-2.5 bg-gradient-to-r from-brand-red to-brand-yellow text-white text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-red-900/20 active:scale-95 group overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {lang === "en" ? "Register Interest" : "ಆಸಕ್ತಿ ನೋಂದಾಯಿಸಿ"} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-brand-yellow p-1.5 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Overlay */}
        <div
          className={`fixed inset-0 top-[96px] w-full bg-brand-black-deep/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-between py-12 px-8 ${
            mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          <div className="flex flex-col space-y-6 text-center">
            <button
              onClick={() => scrollToSection("experience")}
              className="text-2xl font-display font-medium tracking-widest text-gray-300 hover:text-brand-yellow py-2 cursor-pointer"
            >
              {lang === "en" ? "EXPERIENCE" : "ಅನುಭವಗಳು"}
            </button>
            <button
              onClick={() => scrollToSection("destination")}
              className="text-2xl font-display font-medium tracking-widest text-gray-300 hover:text-brand-yellow py-2 cursor-pointer"
            >
              {lang === "en" ? "THAILAND" : "ಥೈಲ್ಯಾಂಡ್"}
            </button>
            <button
              onClick={() => scrollToSection("intro")}
              className="text-2xl font-display font-medium tracking-widest text-gray-300 hover:text-brand-yellow py-2 cursor-pointer"
            >
              {lang === "en" ? "ABOUT" : "ಪರಿಚಯ"}
            </button>
            <button
              onClick={() => scrollToSection("passes")}
              className="text-2xl font-display font-bold tracking-widest text-brand-yellow hover:text-white py-2 cursor-pointer"
            >
              {lang === "en" ? "BUY PASSES" : "ಪಾಸ್‌ಗಳನ್ನು ಖರೀದಿಸಿ"}
            </button>
            <a
              href="/itinerary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setMobileMenuOpen(false);
                trackGAEvent("click_mobile_itinerary_pdf", "engagement", "Navbar Mobile");
              }}
              className="text-xl font-display font-medium tracking-widest text-brand-yellow hover:text-white py-2 cursor-pointer flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              {lang === "en" ? "ITINERARY PDF" : "ಪ್ರವಾಸ ಪಟ್ಟಿ PDF"}
            </a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => scrollToSection("request-invite")}
              className="w-full py-4 bg-gradient-to-r from-brand-red to-brand-yellow text-white font-display font-bold tracking-widest rounded-full text-sm flex items-center justify-center gap-2 glow-red active:scale-95 cursor-pointer"
            >
              {lang === "en" ? "REGISTER INTEREST" : "ಆಸಕ್ತಿ ನೋಂದಾಯಿಸಿ"} <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-gray-500 font-medium tracking-wider text-center">
              {lang === "en" ? "INVITATIONS ARE STRICTLY CONFIRMED & LIMITED" : "ನೋಂದಣಿಗಳು ಸೀಮಿತವಾಗಿವೆ ಮತ್ತು ದೃಢೀಕರಣಕ್ಕೆ ಒಳಪಟ್ಟಿವೆ"}
            </p>
          </div>
        </div>
      </nav>

      {/* Embedded Navigation Styles */}
      <style>{`
        @keyframes marquee-ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes pulse-yellow-glow {
          0% {
            background-color: #d4af37;
            box-shadow: 0 0 5px rgba(212, 175, 55, 0.4);
          }
          100% {
            background-color: #fde047;
            box-shadow: 0 0 15px rgba(253, 224, 71, 0.9);
          }
        }
      `}</style>
    </>
  );
}
