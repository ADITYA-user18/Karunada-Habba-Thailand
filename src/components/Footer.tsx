import { Instagram, Facebook } from "lucide-react";
import { trackGAEvent } from "../lib/analytics";

interface FooterProps {
  onOpenAdmin: () => void;
  lang: "en" | "kn";
}

export default function Footer({ onOpenAdmin, lang }: FooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <footer className="bg-brand-black-deep pt-16 pb-28 md:pb-32 border-t border-white/5 relative overflow-hidden">
      {/* Decorative subtle border light flares */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start mb-12">
          {/* Left Column: Brand Marks & Core Statement */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-display font-black tracking-tighter text-white">
                KARUNADA HABBA
              </span>
              <span className="text-[10px] text-brand-yellow font-medium mt-0.5 tracking-[0.2em] uppercase">
                {lang === "en" ? "THAILAND 2026" : "ಥೈಲ್ಯಾಂಡ್ ೨೦೨೬"}
              </span>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
              {lang === "en" 
                ? "An international celebration of Karnataka's art, music, cinema, cuisine, and global community. Karnataka. Beyond Borders."
                : "ಕರ್ನಾಟಕದ ಕಲೆ, ಸಂಗೀತ, ಸಿನಿಮಾ, ಪಾಕಪದ್ಧತಿ ಮತ್ತು ಜಾಗತಿಕ ಸಮುದಾಯದ ಅಂತರರಾಷ್ಟ್ರೀಯ ಆಚರಣೆ. ಕರ್ನಾಟಕ. ಗಡಿ ಮೀರಿ."}
            </p>
          </div>

          {/* Middle Column: Event Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-brand-yellow font-bold uppercase block">
              {lang === "en" ? "NAVIGATION" : "ನ್ಯಾವಿಗೇಷನ್"}
            </span>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => scrollToSection("experience")}
                  className="text-xs font-medium text-gray-400 hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  {lang === "en" ? "Experience" : "ಅನುಭವಗಳು"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("destination")}
                  className="text-xs font-medium text-gray-400 hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  {lang === "en" ? "Thailand" : "ಥೈಲ್ಯಾಂಡ್"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("intro")}
                  className="text-xs font-medium text-gray-400 hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  {lang === "en" ? "About" : "ನಮ್ಮ ಬಗ್ಗೆ"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("request-invite")}
                  className="text-xs font-medium text-gray-400 hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  {lang === "en" ? "Register Interest" : "ಆಸಕ್ತಿ ನೋಂದಾಯಿಸಿ"}
                </button>
              </li>
              <li>
                <a
                  href="/itinerary"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGAEvent("click_footer_itinerary_pdf", "engagement", "Footer")}
                  className="text-xs font-bold text-brand-yellow hover:text-white hover:underline transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>{lang === "en" ? "Download PDF Itinerary" : "ಪ್ರವಾಸ ಪಟ್ಟಿ (PDF)"}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: Social Channels */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-brand-yellow font-bold uppercase block">
              {lang === "en" ? "OFFICIAL PLATFORMS" : "ಅಧಿಕೃತ ಜಾಲತಾಣಗಳು"}
            </span>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/rajyotsava.ka/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackGAEvent("click_instagram", "engagement", "Footer Section");
                }}
                className="w-10 h-10 rounded-full bg-brand-charcoal hover:bg-brand-red border border-white/5 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label="Instagram Channel"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://www.facebook.com/rajyotsava.ka"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackGAEvent("click_facebook", "engagement", "Footer Section");
                }}
                className="w-10 h-10 rounded-full bg-brand-charcoal hover:bg-brand-red border border-white/5 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
            </div>
            <p className="text-[11px] text-gray-500 font-light leading-normal">
              {lang === "en" 
                ? "Stay tuned on social handles for the live artist reveals, schedule bulletins, and exclusive behind-the-scenes content."
                : "ಲೈವ್ ಕಲಾವಿದರ ಪರಿಚಯ, ವೇಳಾಪಟ್ಟಿ ಪ್ರಕಟಣೆಗಳು ಮತ್ತು ವಿಶೇಷ ಮಾಹಿತಿಗಾಗಿ ನಮ್ಮ ಸಾಮಾಜಿಕ ಜಾಲತಾಣಗಳನ್ನು ಅನುಸರಿಸಿ."}
            </p>
          </div>
        </div>

        {/* Bottom Metadata & Legal Terms */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-[11px] text-gray-500 font-light tracking-wide text-center sm:text-left">
            &copy; 2026 Karunada Habba. All Rights Reserved. Hosted under rajyotsava.com.
          </div>

          <div className="flex items-center space-x-6 text-[11px] text-gray-500 font-light">
            <a href="#privacy" className="hover:text-white hover:underline transition-colors">
              {lang === "en" ? "Privacy Policy" : "ಗೌಪ್ಯತಾ ನೀತಿ"}
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-white hover:underline transition-colors">
              {lang === "en" ? "Terms & Conditions" : "ನಿಯಮಗಳು ಮತ್ತು ನಿಬಂಧನೆಗಳು"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
