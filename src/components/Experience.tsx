import { useState, useRef } from "react";
import { Music, Eye, Sparkles, Utensils, Users, ChevronLeft, ChevronRight, ExternalLink, Play, Disc } from "lucide-react";
import { ExperienceCard } from "../types";
import raghuNewPhoto from "../assets/images/raghu_new.png";

const RAGHU_DIXIT_PHOTO_URL = raghuNewPhoto;

interface ExperienceProps {
  lang: "en" | "kn";
}

export default function Experience({ lang }: ExperienceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number>(0);

  const experiencesEn: ExperienceCard[] = [
    {
      id: "live-music",
      title: "RAGHU DIXIT LIVE",
      description: "Experience India's premier folk-rock icon Raghu Dixit & The Raghu Dixit Project live in Thailand. High-energy rhythm, soul-stirring Kannada melodies, and signature ghungroo beats.",
      image: RAGHU_DIXIT_PHOTO_URL,
      visualDirection: "Raghu Dixit Concert • Folk-Rock Fusion • High-Energy Stage • Iconic Kannada Hits",
    },
    {
      id: "culture",
      title: "CULTURE",
      description: "Experience the colours, rhythms, and traditions that have defined Karnataka for generations — reimagined elegantly for an international global stage.",
      image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800",
      visualDirection: "Dollu Kunitha drums • Yakshagana folk-theater • Dramatic traditional custom dress",
    },
    {
      id: "community",
      title: "COMMUNITY",
      description: "Wherever we go, Karnataka comes with us. A global gathering bringing Kannadigas and friends of Karnataka together for one unforgettable celebration.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800",
      visualDirection: "Warm hugs & smiles • Creative global reunions • Generational ties • Heartfelt memories",
    },
  ];

  const experiencesKn: ExperienceCard[] = [
    {
      id: "live-music",
      title: "ರಘು ದೀಕ್ಷಿತ್ ಲೈವ್",
      description: "ಭಾರತದ ಖ್ಯಾತ ಫೋಕ್-ರಾಕ್ ಗಾಯಕ ರಘು ದೀಕ್ಷಿತ್ ಅವರ ಅದ್ಭುತ ಲೈವ್ ಸಂಗೀತ ರಸಸಂಜೆ! ಜಾನಪದ ಧ್ವನಿ, ಜಟಿಲವಾದ ಲಯಗಳು ಮತ್ತು ಕನ್ನಡಿಗರ ನೆಚ್ಚಿನ ಹಿಟ್ ಗೀತೆಗಳು.",
      image: RAGHU_DIXIT_PHOTO_URL,
      visualDirection: "ರಘು ದೀಕ್ಷಿತ್ ಲೈವ್ ಕನ್ಸರ್ಟ್ • ಫೋಕ್-ರಾಕ್ ಸಂಗೀತ • ಉತ್ಸಾಹಭರಿತ ವೇದಿಕೆ • ಸೂಪರ್ ಹಿಟ್ ಗೀತೆಗಳು",
    },
    {
      id: "culture",
      title: "ಸಂಸ್ಕೃತಿ",
      description: "ಕರ್ನಾಟಕವನ್ನು ತಲೆಮಾರುಗಳಿಂದ ವ್ಯಾಖ್ಯಾನಿಸಿದ ಬಣ್ಣಗಳು, ಲಯಗಳು ಮತ್ತು ಸಂಪ್ರದಾಯಗಳನ್ನು ಅನುಭವಿಸಿ - ಅಂತರರಾಷ್ಟ್ರೀಯ ಜಾಗತಿಕ ವೇದಿಕೆಗಾಗಿ ಸುಂದರವಾಗಿ ಮರುರೂಪಿಸಲಾಗಿದೆ.",
      image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800",
      visualDirection: "ಡೊಳ್ಳು ಕುಣಿತ • ಯಕ್ಷಗಾನ ಜನಪದ ನೃತ್ಯ • ಭವ್ಯ ಸಾಂಸ್ಕೃತಿಕ ವೇಷಭೂಷಣಗಳು",
    },
    {
      id: "community",
      title: "ಸಮುದಾಯ",
      description: "ನಾವು ಎಲ್ಲೇ ಹೋದರೂ ಕರ್ನಾಟಕ ನಮ್ಮೊಂದಿಗೆ ಬರುತ್ತದೆ. ಕನ್ನಡಿಗರು ಮತ್ತು ಕರ್ನಾಟಕದ ಹಿತೈಷಿಗಳನ್ನು ಒಂದು ಮರೆಯಲಾಗದ ಸಂಭ್ರಮಕ್ಕಾಗಿ ಒಟ್ಟುಗೂಡಿಸುವ ಜಾಗತಿಕ ಸಮಾಗಮ.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800",
      visualDirection: "ಆತ್ಮೀಯ ಆಲಿಂಗನಗಳು ಮತ್ತು ನಗುಮುಖ • ಸೃಜನಶೀಲ ಜಾಗತಿಕ ಪುನರ್ಮಿಲನಗಳು • ಮಧುರ ನೆನಪುಗಳು",
    },
  ];

  const experiences = lang === "en" ? experiencesEn : experiencesKn;

  const getIcon = (id: string) => {
    switch (id) {
      case "live-music":
        return <Music className="w-5 h-5 text-brand-yellow" />;
      case "culture":
        return <Sparkles className="w-5 h-5 text-brand-red" />;
      case "cinema-stars":
        return <Eye className="w-5 h-5 text-brand-gold" />;
      case "taste-of-karnataka":
        return <Utensils className="w-5 h-5 text-brand-yellow" />;
      case "community":
        return <Users className="w-5 h-5 text-brand-red" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="experience"
      className="py-24 sm:py-32 scroll-mt-28 bg-brand-black-deep relative overflow-hidden border-t border-white/5"
    >
      {/* Background Ornaments */}
      <div className="absolute top-[10%] right-[5%] w-[25rem] h-[25rem] bg-brand-red/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[30rem] h-[30rem] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-brand-red block mb-3 uppercase">
              {lang === "en" ? "DISCOVER" : "ಅನ್ವೇಷಿಸಿ"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase mb-4">
              {lang === "en" ? (
                <>EXPERIENCE <span className="text-gradient-red-yellow">KARUNADA HABBA</span></>
              ) : (
                <>ಅನುಭವಿಸಿ <span className="text-gradient-red-yellow">ಕರುನಾಡ ಹಬ್ಬ</span></>
              )}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base font-light tracking-wide max-w-xl">
              {lang === "en" 
                ? "One destination. Endless experiences. Discover the vibrant threads that bind our festival together."
                : "ಒಂದೇ ತಾಣ. ಅನಂತ ಅನುಭವಗಳು. ನಮ್ಮ ಹಬ್ಬವನ್ನು ಒಂದುಗೂಡಿಸುವ ರೋಮಾಂಚಕ ನೆನಪುಗಳನ್ನು ಅನ್ವೇಷಿಸಿ."}
            </p>
          </div>

          {/* Desktop Slide Controllers */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              className="p-3 rounded-full bg-brand-charcoal hover:bg-brand-red border border-white/5 hover:border-brand-red/20 text-white transition-all duration-300 shadow-lg cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-3 rounded-full bg-brand-charcoal hover:bg-brand-red border border-white/5 hover:border-brand-red/20 text-white transition-all duration-300 shadow-lg cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Swipeable Container for Mobile & Tablet / Horizontal Row */}
        <div
          ref={scrollRef}
          onScroll={(e) => {
            const index = Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth);
            setActiveCard(index);
          }}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-none scroll-smooth md:grid md:grid-cols-3 md:overflow-x-visible md:snap-none md:pb-0"
        >
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="min-w-[85vw] sm:min-w-[55vw] md:min-w-0 snap-center snap-always flex flex-col h-[520px] rounded-3xl overflow-hidden glass-card relative group cursor-pointer"
            >
              {/* Full Bleed Image with Lazy Loading & Referrer Policy */}
              <div className="absolute inset-0 z-0 select-none overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className={`w-full h-full transition-transform duration-[1.5s] ease-out group-hover:scale-110 filter brightness-[0.6] group-hover:brightness-[0.5] ${
                    exp.id === "live-music" ? "object-cover object-right md:object-[80%_50%]" : "object-cover object-center"
                  }`}
                />
                {/* Visual Card Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black-deep via-brand-black-deep/50 to-transparent z-1" />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-black-deep/30 via-transparent to-brand-black-deep/40 z-1" />
                {/* Karnataka Red-Gold hovering glow on cards */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-brand-red via-transparent to-brand-yellow transition-opacity duration-700 z-1" />
              </div>

              {/* Card Content Overlays */}
              <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full">
                {/* Card Icon Header */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-brand-black-deep/80 backdrop-blur-md flex items-center justify-center border border-white/5">
                    {getIcon(exp.id)}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-brand-yellow uppercase">
                    0{idx + 1}
                  </span>
                </div>

                {/* Card Main Text */}
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold tracking-wider text-white">
                    {exp.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light line-clamp-4">
                    {exp.description}
                  </p>

                  {/* Visual Direction Divider */}
                  <div className="pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-[9px] font-mono font-bold text-brand-yellow tracking-widest uppercase block mb-1">
                      VISUAL SPECS:
                    </span>
                    <span className="text-[10px] text-gray-400 font-light block">
                      {exp.visualDirection}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Indicator Dots */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {experiences.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCard === idx ? "w-6 bg-brand-yellow" : "w-1.5 bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Star Performer Spotlight Showcase Block */}
        <div className="mt-16 rounded-3xl overflow-hidden relative border border-white/10 bg-gradient-to-r from-black via-zinc-900 to-black p-6 sm:p-10 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img
              src={RAGHU_DIXIT_PHOTO_URL}
              alt="Raghu Dixit Live Concert"
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover opacity-25 filter blur-[2px] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Photo Spotlight Frame */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden border-2 border-brand-yellow/30 shadow-2xl aspect-[4/3] sm:aspect-[16/10]">
                <img
                  src={RAGHU_DIXIT_PHOTO_URL}
                  alt="Raghu Dixit Concert Performance"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-yellow bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-brand-yellow/30">
                    ⭐ STAR PERFORMER
                  </span>
                  <span className="text-[10px] font-mono text-white/80 bg-black/80 backdrop-blur-md px-2 py-1 rounded">
                    THAILAND 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Spotify CTA */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-ping" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#1DB954] uppercase">
                  {lang === "en" ? "HEADLINING MUSIC FESTIVAL" : "ಪ್ರಮುಖ ಸಂಗೀತ ಆಕರ್ಷಣೆ"}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-wide uppercase">
                {lang === "en" ? (
                  <>RAGHU DIXIT & <span className="text-brand-yellow">THE RAGHU DIXIT PROJECT</span></>
                ) : (
                  <>ರಘು ದೀಕ್ಷಿತ್ <span className="text-brand-yellow">ಲೈವ್ ಕನ್ಸರ್ಟ್</span></>
                )}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {lang === "en"
                  ? "Get ready for an electric, foot-tapping experience as Raghu Dixit takes the stage in Thailand! Known for his earth-shattering vocals, iconic lungi and brass ghungroos, and timeless Kannada folk-rock anthems like Gudugudiya, Hey Bhagwan, Lokada Kalaji, and Mysore Se Ayega."
                  : "ಥೈಲ್ಯಾಂಡ್‌ನ ಕರುನಾಡ ಹಬ್ಬದ ವೇದಿಕೆಯಲ್ಲಿ ರಘು ದೀಕ್ಷಿತ್ ಅವರ ಶಕ್ತಿಯುತ ಜಾನಪದ ರಾಕ್ ಗೀತೆಗಳ ರಸದೌತಣ! 'ಗುಡುಗುಡಿಯ ಸೇದಿ ನೋಡು', 'ಲೋಕದ ಕಾಳಜಿ', 'ಹೇ ಭಗವಾನ್' ಸೇರಿದಂತೆ ನಿಮ್ಮ ನೆಚ್ಚಿನ ಸೂಪರ್ ಹಿಟ್ ಹಾಡುಗಳನ್ನು ಲೈವ್ ಆಗಿ ಅನುಭವಿಸಿ."}
              </p>

              {/* Spotify Playlist Button */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <a
                  href="https://open.spotify.com/playlist/2vaXSf0RAi0RWPJEODduHM?si=WBBaOk6ISQmlA6TMNZWOvg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-[#1DB954]/25 cursor-pointer group"
                >
                  <Disc className="w-5 h-5 text-black animate-spin-slow" />
                  <span>{lang === "en" ? "LISTEN ON SPOTIFY" : "ಸ್ಪಾಟಿಫೈನಲ್ಲಿ ಆಲಿಸಿ (LISTEN ON SPOTIFY)"}</span>
                  <ExternalLink className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
                </a>

                <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                  <Music className="w-4 h-4 text-brand-yellow" />
                  <span>{lang === "en" ? "Official Event Playlist" : "ಅಧಿಕೃತ ಆಲ್ಬಂ ಪ್ಲೇಲಿಸ್ಟ್"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
