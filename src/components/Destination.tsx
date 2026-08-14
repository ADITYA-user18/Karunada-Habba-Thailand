import { Compass, Sparkles, MapPin } from "lucide-react";

interface DestinationProps {
  lang: "en" | "kn";
}

export default function Destination({ lang }: DestinationProps) {
  const handleScrollToForm = () => {
    const element = document.getElementById("request-invite");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="destination"
      className="py-24 sm:py-32 scroll-mt-28 bg-brand-black relative overflow-hidden border-t border-white/5"
    >
      {/* Background Glows */}
      <div className="absolute top-[30%] left-[-15%] w-[35rem] h-[35rem] bg-brand-red/5 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] right-[-15%] w-[40rem] h-[40rem] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Side: Editorial Context & Story */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-charcoal border border-white/5 shadow-md">
                <Compass className="w-3.5 h-3.5 text-brand-yellow animate-spin" />
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-brand-gold">
                  {lang === "en" ? "THE DESTINATION" : "ಪ್ರವಾಸಿ ತಾಣ"}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase leading-tight">
                {lang === "en" ? (
                  <>KARNATAKA MEETS <span className="text-gradient-gold">THAILAND</span></>
                ) : (
                  <>ಕರ್ನಾಟಕ ಮತ್ತು <span className="text-gradient-gold">ಥೈಲ್ಯಾಂಡ್ ಸಮಾಗಮ</span></>
                )}
              </h2>
              <h3 className="text-lg sm:text-xl font-medium text-brand-yellow/90 tracking-wide font-kannada">
                ಕರ್ನಾಟಕದ ಹೃದಯ, ಥೈಲ್ಯಾಂಡ್‌ನ ಸುಂದರ ತೀರದಲ್ಲಿ.
              </h3>
            </div>

            <p className="text-lg text-gray-200 font-medium leading-relaxed">
              {lang === "en" 
                ? "A celebration of home. In one of the world's most exciting, spectacular destinations."
                : "ನಮ್ಮ ನೆಲದ ಭವ್ಯ ಸಂಭ್ರಮ. ವಿಶ್ವದ ಅತ್ಯಂತ ಸುಂದರ ಮತ್ತು ರಮಣೀಯ ಪ್ರವಾಸಿ ತಾಣದಲ್ಲಿ."}
            </p>

            <div className="space-y-4 text-gray-400 font-light text-sm sm:text-base leading-relaxed">
              <p>
                {lang === "en" 
                  ? "Karunada Habba is taking Karnataka beyond borders, bringing our incredible spirit, sound, and culture directly into the energetic heart of Thailand. This is where tradition merges seamlessly with ultra-modern global luxury."
                  : "ಕರುನಾಡ ಹಬ್ಬವು ಕರ್ನಾಟಕವನ್ನು ಗಡಿ ದಾಟಿಸಿ, ನಮ್ಮ ಅದ್ಭುತ ಚೈತನ್ಯ, ಸಂಗೀತ ಮತ್ತು ಸಂಸ್ಕೃತಿಯನ್ನು ನೇರವಾಗಿ ಥೈಲ್ಯಾಂಡ್‌ನ ರೋಮಾಂಚಕ ಹೃದಯಕ್ಕೆ ತರುತ್ತಿದೆ. ಇದು ಸಂಪ್ರದಾಯ ಮತ್ತು ಜಾಗತಿಕ ಐಷಾರಾಮಿ ಸೌಕರ್ಯಗಳ ಅಪೂರ್ವ ಸಂಗಮವಾಗಿದೆ."}
              </p>
              <p>
                {lang === "en" 
                  ? "Whether you are a global Kannadiga or a friend of Karnataka seeking an extraordinary adventure, look forward to an unforgettable weekend defined by curated gourmet, high-end production music concert stages, and deep community connections."
                  : "ನೀವು ಜಾಗತಿಕ ಕನ್ನಡಿಗರಾಗಿರಲಿ ಅಥವಾ ಕರ್ನಾಟಕದ ಹಿತೈಷಿಯಾಗಿರಲಿ, ಅದ್ಭುತ ಸಾಹಸವನ್ನು ಬಯಸುವ ನಿಮಗಾಗಿ ಇದು ಸಿದ್ಧವಾಗಿದೆ. ಅತ್ಯುತ್ತಮ ಆಹಾರೋಪಚಾರ, ವಿಶ್ವದರ್ಜೆಯ ಸಂಗೀತ ಕನ್ಸರ್ಟ್‌ ವೇದಿಕೆಗಳು ಮತ್ತು ಆಳವಾದ ಸಮುದಾಯ ಸಂಬಂಧಗಳಿಂದ ಕೂಡಿದ ಮರೆಯಲಾಗದ ರಜಾದಿನಗಳನ್ನು ಎದುರುನೋಡಿ."}
              </p>
            </div>

            {/* Quick Destination Bulletins */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-brand-charcoal/50 border border-white/5 flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-display font-bold text-white text-xs tracking-wider block">
                    {lang === "en" ? "BANGKOK, THAILAND" : "ಬ್ಯಾಂಕಾಕ್, ಥೈಲ್ಯಾಂಡ್"}
                  </span>
                  <span className="text-[11px] text-gray-500 block mt-0.5">
                    {lang === "en" ? "Premium international connectivity" : "ಅಂತರರಾಷ್ಟ್ರೀಯ ಸಂಪರ್ಕ ಸೌಲಭ್ಯ"}
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-brand-charcoal/50 border border-white/5 flex gap-3 items-start">
                <Sparkles className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-display font-bold text-white text-xs tracking-wider block">
                    {lang === "en" ? "EXCLUSIVE ENTRY" : "ವಿಶೇಷ ಪ್ರವೇಶಾವಕಾಶ"}
                  </span>
                  <span className="text-[11px] text-gray-500 block mt-0.5">
                    {lang === "en" ? "Strictly pre-approved guest invitations" : "ಪೂರ್ವ ಅನುಮೋದಿತ ಆಹ್ವಾನಗಳು ಮಾತ್ರ"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleScrollToForm}
              className="px-8 py-4 bg-gradient-to-r from-[#9b1b1b] to-[#d4af37] text-white font-display font-bold text-xs tracking-[0.25em] rounded-full shadow-lg shadow-red-900/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              {lang === "en" ? "BE PART OF THE JOURNEY" : "ಪ್ರವಾಸದ ಭಾಗವಾಗಿರಿ"}
            </button>
          </div>

          {/* Right Side: Immersive Destination Media Block */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden glass-card p-2 border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 to-brand-yellow/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500 rounded-2xl" />
              
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200"
                  alt="Thailand Destination Bangkok Sunset"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 filter brightness-95"
                />
                
                {/* Visual Location Tag */}
                <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-brand-black-deep/80 backdrop-blur-md border border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-brand-yellow uppercase block">
                      {lang === "en" ? "LOCATION TARGET" : "ಮುಖ್ಯ ಸ್ಥಳ"}
                    </span>
                    <span className="text-xs font-display font-bold text-white block">
                      {lang === "en" ? "BANGKOK FESTIVAL ARENA" : "ಬ್ಯಾಂಕಾಕ್ ಉತ್ಸವ ಮೈದಾನ"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Float Element: Exotic Destination Card */}
            <div className="absolute -top-6 -right-6 hidden sm:flex flex-col p-5 rounded-2xl glass-panel border border-brand-yellow/20 shadow-2xl max-w-[200px] animate-pulse">
              <span className="text-3xl font-display font-extrabold text-brand-yellow mb-1">
                25°C
              </span>
              <span className="text-[10px] font-mono tracking-widest text-gray-400 font-semibold uppercase">
                {lang === "en" ? "TROPICAL SUNSET WEATHER" : "ಟ್ರಾಪಿಕಲ್ ಸೂರ್ಯಾಸ್ತ ಹವಾಮಾನ"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
