import { Heart } from "lucide-react";

interface BrandMomentProps {
  lang: "en" | "kn";
}

export default function BrandMoment({ lang }: BrandMomentProps) {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black-deep py-24 border-t border-white/5">
      {/* Parallax Celebration Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920"
          alt="Emotional Kannada Pride Background"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover opacity-35 filter brightness-[0.5] contrast-[1.1]"
        />
        {/* Soft, warm sunset stage lamps */}
        <div className="absolute top-[30%] right-[15%] w-96 h-96 bg-brand-yellow/10 rounded-full blur-[100px] mix-blend-screen animate-pulse pointer-events-none" />
        <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-brand-red/10 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" />
        
        {/* Dark Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black-deep via-brand-black-deep/80 to-brand-black-deep/90 z-1" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black-deep/90 via-transparent to-brand-black-deep/90 z-1" />
      </div>

      {/* Main Quote Content Wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-16 py-8">
        {/* Heart Sparkle Symbol */}
        <div className="w-12 h-12 rounded-full bg-brand-red-dark border border-brand-red/40 flex items-center justify-center glow-red animate-pulse">
          <Heart className="w-5 h-5 text-brand-yellow fill-brand-yellow animate-bounce" />
        </div>

        {/* Kannada Prominent Statement Stack */}
        <div className="space-y-6 md:space-y-8 max-w-4xl">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-kannada font-black text-white tracking-wide leading-tight drop-shadow-lg transition-transform hover:scale-105 duration-500">
            ಕರ್ನಾಟಕ ನಮ್ಮ ಹೆಮ್ಮೆ.
          </h2>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-kannada font-black text-brand-yellow tracking-wide leading-tight drop-shadow-lg transition-transform hover:scale-105 duration-500">
            ಕನ್ನಡ ನಮ್ಮ ಗುರುತು.
          </h2>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-kannada font-black text-white tracking-wide leading-tight drop-shadow-lg transition-transform hover:scale-105 duration-500">
            ಜಗತ್ತೇ ನಮ್ಮ ವೇದಿಕೆ.
          </h2>
        </div>

        {/* Separator Line */}
        <div className="w-24 h-0.5 bg-gradient-to-r from-brand-red via-brand-yellow to-brand-gold rounded-full" />

        {/* English Statement Stack */}
        <div className="space-y-2 max-w-2xl font-display">
          <p className="text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] text-gray-200 uppercase">
            Karnataka is our pride.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] text-brand-yellow uppercase">
            Kannada is our identity.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] text-gray-200 uppercase">
            The world is our stage.
          </p>
        </div>

        {/* Final Brand Statement Block */}
        <div className="pt-8">
          <span className="block text-[11px] font-mono tracking-[0.4em] text-gray-500 uppercase font-semibold mb-2">
            THE ANTHEM
          </span>
          <h3 className="text-xl sm:text-3xl font-display font-black tracking-[0.3em] text-white uppercase bg-gradient-to-r from-brand-red via-brand-yellow to-brand-gold bg-clip-text text-transparent">
            KARNATAKA. BEYOND BORDERS.
          </h3>
        </div>
      </div>
    </section>
  );
}
