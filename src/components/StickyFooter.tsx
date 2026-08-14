import React, { useState, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";
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

interface StickyFooterProps {
  lang: "en" | "kn";
}

export default function StickyFooter({ lang }: StickyFooterProps) {
  const [isStickyHovered, setIsStickyHovered] = useState(false);
  const [stickyFireworks, setStickyFireworks] = useState<Particle[]>([]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackGAEvent("click_sticky_whatsapp", "engagement", "Sticky Footer");
    const url = "https://api.whatsapp.com/send?phone=917996120120&text=Hi!%20%F0%9F%91%8B%20I%27m%20interested%20in%20Karnataka%20Habba%20and%20would%20like%20to%20know%20more%20about%20the%20event.%20Please%20share%20the%20details%20with%20me.%20Thank%20you!%0A";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const triggerStickyFireworks = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsStickyHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const hoverX = ((e.clientX - rect.left) / rect.width) * 100;
    const hoverY = ((e.clientY - rect.top) / rect.height) * 100;

    const particles = Array.from({ length: 25 }).map((_, i) => {
      const colors = ["#d4af37", "#ff3333", "#ff00ff", "#33ccff", "#39ff14", "#ff9900", "#ffffff"];
      const angle = (i / 25) * 2 * Math.PI + (Math.random() - 0.5) * 0.2;
      const velocity = 50 + Math.random() * 90;
      return {
        id: Date.now() + 100 + i,
        percentX: hoverX,
        percentY: hoverY,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 2,
        delay: Math.random() * 0.08,
      };
    });
    setStickyFireworks(particles);
  };

  return (
    <>
      <div
        onMouseEnter={triggerStickyFireworks}
        onMouseLeave={() => setIsStickyHovered(false)}
        onClick={() => {
          trackGAEvent("click_sticky_footer", "engagement", "Sticky Footer");
          handleScrollTo("request-invite");
        }}
        className="fixed bottom-4 md:bottom-6 left-0 right-0 mx-auto z-[999] w-[92%] max-w-4xl bg-brand-black-deep/95 backdrop-blur-xl border border-[#d4af37]/40 hover:border-[#d4af37] rounded-full py-2 px-4 sm:py-2.5 sm:px-6 flex items-center justify-between shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 animate-[slide-up-bounce_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_both] group cursor-pointer overflow-hidden"
      >
        {/* Sticky fireworks sparkles burst relative to mouse client position */}
        {isStickyHovered && stickyFireworks.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full pointer-events-none animate-[particle_0.8s_ease-out_forwards]"
            style={{
              left: `${p.percentX}%`,
              top: `${p.percentY}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 10px ${p.color}, 0 0 4px #ffffff`,
              animationDelay: `${p.delay}s`,
              "--tw-translate-x": `${p.x}px`,
              "--tw-translate-y": `${p.y}px`,
              transform: `translate(-50%, -50%) translate(0, 0) scale(1.5)`,
            } as React.CSSProperties}
          />
        ))}

        {/* Left info: live indicator and details */}
        <div className="flex items-center gap-2 min-w-0 pr-1.5 sm:pr-4">
          <span className="relative flex h-2 w-2 shrink-0 animate-pulse">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
          </span>
          <p className="text-[9px] sm:text-xs font-bold text-white uppercase tracking-wider truncate">
            {lang === "en" ? "29 Oct - 2 Nov 2026 • Thailand" : "೨೯ ಅಕ್ಟೋಬರ್ - ೨ ನವೆಂಬರ್ ೨೦೨೬ • ಥೈಲ್ಯಾಂಡ್"}
          </p>
        </div>

        {/* Right action group (WhatsApp Chat + Call Now) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0f7569] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 shadow-md shadow-green-950/40 cursor-pointer shrink-0"
            title={lang === "en" ? "Chat on WhatsApp" : "ವಾಟ್ಸಾಪ್ ಚಾಟ್"}
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white/10" />
            <span className="hidden sm:inline">{lang === "en" ? "CHAT WITH TEAM" : "ವಾಟ್ಸಾಪ್ ಚಾಟ್"}</span>
            <span className="inline sm:hidden text-[8px] sm:text-[9px]">{lang === "en" ? "CHAT" : "ಚಾಟ್"}</span>
          </button>
          <a
            href="tel:+917996120120"
            onClick={(e) => {
              e.stopPropagation();
              trackGAEvent("click_sticky_call", "engagement", "Sticky Footer");
            }}
            className="flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#9b1b1b] to-[#d4af37] hover:from-[#b52222] hover:to-[#e6c148] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 shadow-md shadow-red-950/40 cursor-pointer shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === "en" ? "CALL NOW" : "ಕರೆ ಮಾಡಿ"}</span>
            <span className="inline sm:hidden text-[8px] sm:text-[9px]">{lang === "en" ? "CALL" : "ಕರೆ"}</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes particle {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1.5);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--tw-translate-x), var(--tw-translate-y)) scale(0.1);
            opacity: 0;
          }
        }
        @keyframes slide-up-bounce {
          0% {
            transform: translateY(100px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
