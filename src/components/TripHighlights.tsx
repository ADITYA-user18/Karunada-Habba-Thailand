import React, { useState } from "react";
import { 
  Plane, 
  Hotel, 
  Coffee, 
  Bus, 
  Compass, 
  Ticket, 
  Music, 
  Award, 
  Sparkles,
  ChevronRight,
  Info,
  BadgeAlert,
  ArrowRight,
  FileText,
  Download
} from "lucide-react";
import { trackGAEvent } from "../lib/analytics";

interface ItineraryDay {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  bullets?: string[];
  image: string;
  imageAlt: string;
}

interface TripHighlightsProps {
  lang: "en" | "kn";
}

export default function TripHighlights({ lang }: TripHighlightsProps) {
  const [activeDay, setActiveDay] = useState<number>(3); // Default open to Nov 1 (index 3) since it is the climax!

  const itineraryEn: ItineraryDay[] = [
    {
      date: "29 OCT",
      title: "Departure",
      subtitle: "From Bengaluru",
      description: "Begin your luxury experience with direct flight departures from Kempegowda International Airport (BLR), Bengaluru to Bangkok (BKK). Upon arrival, check into your curated 3-star accommodation with smooth group transition protocols.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
      imageAlt: "Departure from Bengaluru"
    },
    {
      date: "30 OCT",
      title: "Pattaya",
      subtitle: "Sightseeing & Leisure",
      description: "Transfer to Pattaya for scenic coastal drives, breathtaking beach visits, and cultural tours. Experience the serene beauty, crystal-clear water, and leisure beach activities of Thailand's finest seaside getaway.",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800",
      imageAlt: "Pattaya Sightseeing"
    },
    {
      date: "31 OCT",
      title: "Bangkok",
      subtitle: "City Experience & Networking",
      description: "A comprehensive tour of Bangkok's historic landmarks, pristine Buddhist temples, and majestic royal sites. Interact and network with other prominent business leaders, professionals, and artists in our elite delegation.",
      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=800",
      imageAlt: "Bangkok City"
    },
    {
      date: "1 NOV",
      title: "Grand Karnataka",
      subtitle: "Rajyotsava Celebration",
      description: "The crown jewel of the trip. An immersive, star-studded showcase of Kannada heritage, music, and art. Experience premium cultural programs, live singing, and state-of-the-art cinematic excellence in Bangkok.",
      bullets: [
        "Live Musical Concert by legendary singers",
        "Karnataka Excellence Awards recognizing global achievements",
        "Captivating Classical & Modern Cultural Performances",
        "Grand Gala Dinner with customized multi-cuisine spreads"
      ],
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
      imageAlt: "Grand Rajyotsava Celebration"
    },
    {
      date: "2 NOV",
      title: "Return Journey",
      subtitle: "Back to Bengaluru",
      description: "Savor a warm breakfast, finish last-minute souvenir shopping in Bangkok's world-class markets, and prepare for your return direct flight to Bengaluru. Head home with timeless memories of Karnataka beyond borders.",
      image: "https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&q=80&w=800",
      imageAlt: "Return Journey"
    }
  ];

  const itineraryKn: ItineraryDay[] = [
    {
      date: "29 OCT",
      title: "ಪ್ರಯಾಣ ಪ್ರಾರಂಭ",
      subtitle: "ಬೆಂಗಳೂರಿನಿಂದ",
      description: "ಬೆಂಗಳೂರಿನ ಕೆಂಪೇಗೌಡ ಅಂತರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣದಿಂದ (BLR) ಬ್ಯಾಂಕಾಕ್‌ಗೆ (BKK) ನೇರ ವಿಮಾನದ ಮೂಲಕ ನಿಮ್ಮ ರಜಾದಿನದ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ. ತಲುಪಿದ ನಂತರ, ನಮ್ಮ ತಂಡದ ನೆರವಿನೊಂದಿಗೆ ಆಯ್ದ ೩-ಸ್ಟಾರ್ ಹೋಟೆಲ್‌ಗೆ ಯಶಸ್ವಿಯಾಗಿ ಪ್ರವೇಶಿಸಿ.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800",
      imageAlt: "ಬೆಂಗಳೂರಿನಿಂದ ಪ್ರಯಾಣ"
    },
    {
      date: "30 OCT",
      title: "ಪಟ್ಟಾಯ",
      subtitle: "ಪ್ರೇಕ್ಷಣೀಯ ಸ್ಥಳಗಳು ಮತ್ತು ವಿಶ್ರಾಂತಿ",
      description: "ಪಟ್ಟಾಯದ ಸುಂದರ ಕರಾವಳಿ ತೀರಗಳು ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಪ್ರವಾಸಗಳ ಭೇಟಿ. ಥೈಲ್ಯಾಂಡ್‌ನ ಅತ್ಯುತ್ತಮ ಕಡಲತೀರದ ಪ್ರಶಾಂತ ಸೌಂದರ್ಯ, ರಮಣೀಯ ನೋಟಗಳು ಮತ್ತು ಅತ್ಯಾಕರ್ಷಕ ಚಟುವಟಿಕೆಗಳನ್ನು ಅನುಭವಿಸಿ.",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800",
      imageAlt: "ಪಟ್ಟಾಯ ಪ್ರೇಕ್ಷಣೀಯ ಸ್ಥಳಗಳು"
    },
    {
      date: "31 OCT",
      title: "ಬ್ಯಾಂಕಾಕ್",
      subtitle: "ನಗರಿ ವೀಕ್ಷಣೆ ಮತ್ತು ನೆಟ್‌ವರ್ಕಿಂಗ್",
      description: "ಬ್ಯಾಂಕಾಕ್‌ನ ಐತಿಹಾಸಿಕ ಸ್ಥಳಗಳು, ಬೌದ್ಧ ದೇವಾಲಯಗಳು ಮತ್ತು ಭವ್ಯವಾದ ರಾಜಮನೆತನದ ತಾಣಗಳ ಭೇಟಿ. ನಮ್ಮ ನಿಯೋಗದೊಂದಿಗೆ ಪ್ರಮುಖ ವ್ಯಾಪಾರ ಮುಖಂಡರು, ವೃತ್ತಿಪರರು ಮತ್ತು ಕಲಾವಿದರ ಜೊತೆ ಸಂವಾದ ಮತ್ತು ನೆಟ್‌ವರ್ಕಿಂಗ್‌ನಲ್ಲಿ ಭಾಗವಹಿಸಿ.",
      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800",
      imageAlt: "ಬ್ಯಾಂಕಾಕ್ ನಗರ"
    },
    {
      date: "1 NOV",
      title: "ಭವ್ಯ ಕರ್ನಾಟಕ",
      subtitle: "ರಾಜ್ಯೋತ್ಸವ ಆಚರಣೆ",
      description: "ಈ ಪ್ರವಾಸದ ಅತ್ಯಂತ ಪ್ರಮುಖ ಘಟ್ಟ. ಬ್ಯಾಂಕಾಕ್‌ನಲ್ಲಿ ಕನ್ನಡ ಪರಂಪರೆ, ಸಂಗೀತ ಮತ್ತು ಕಲೆಯ ನಕ್ಷತ್ರ ಖಚಿತ ಪ್ರದರ್ಶನ. ಭವ್ಯ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು, ಪ್ರಸಿದ್ಧ ಗಾಯಕರ ನೇರ ಸಂಗೀತ ಗಾಯನ ಮತ್ತು ಸಿನಿಮಾ ತಾರೆಯರ ಗಾಲಾ ನೈಟ್ ಅನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ.",
      bullets: [
        "ಲೆಜೆಂಡರಿ ಗಾಯಕರಿಂದ ನೇರ ಸಂಗೀತ ಕಚೇರಿ",
        "ಜಾಗತಿಕ ಸಾಧನೆಗಳನ್ನು ಗುರುತಿಸುವ ಕರ್ನಾಟಕ ಎಕ್ಸಲೆನ್ಸ್ ಪ್ರಶಸ್ತಿಗಳು",
        "ನಯನಮನೋಹರ ಶಾಸ್ತ್ರೀಯ ಮತ್ತು ಆಧುನಿಕ ಸಾಂಸ್ಕೃತಿಕ ಪ್ರದರ್ಶನಗಳು",
        "ಭವ್ಯವಾದ ಗಾಲಾ ಭೋಜನದ ವಿಶೇಷ ಹಬ್ಬ"
      ],
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800",
      imageAlt: "ಭವ್ಯ ರಾಜ್ಯೋತ್ಸವ ಆಚರಣೆ"
    },
    {
      date: "2 NOV",
      title: "ಮರಳಿ ಪ್ರಯಾಣ",
      subtitle: "ಬೆಂಗಳೂರಿಗೆ ಪ್ರಸ್ಥಾನ",
      description: "ರುಚಿಕರವಾದ ಬೆಳಗಿನ ಉಪಾಹಾರದ ನಂತರ, ಬ್ಯಾಂಕಾಕ್‌ನ ವಿಶ್ವದರ್ಜೆಯ ಮಾರುಕಟ್ಟೆಗಳಲ್ಲಿ ನೆನಪಿನ ಸ್ಮರಣಿಕೆಗಳ ಖರೀದಿಯನ್ನು ಮುಗಿಸಿ, ಬೆಂಗಳೂರಿಗೆ ಮರಳುವ ನೇರ ವಿಮಾನಕ್ಕಾಗಿ ಸಿದ್ಧರಾಗಿ. ಗಡಿ ದಾಟಿದ ಕರುನಾಡಿನ ಮಧುರ ನೆನಪುಗಳೊಂದಿಗೆ ಮನೆಗೆ ಮರಳಿ.",
      image: "https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=800",
      imageAlt: "ಮರಳಿ ಪ್ರಯಾಣ"
    }
  ];

  const itinerary = lang === "en" ? itineraryEn : itineraryKn;

  const packageInclusionsEn = [
    { icon: Plane, label: "Flights", desc: "Roundtrip Airfare included" },
    { icon: Hotel, label: "Hotel Accommodation", desc: "Premium 3-Star Stay" },
    { icon: Coffee, label: "Breakfast", desc: "Daily morning meals" },
    { icon: Bus, label: "Local Transportation", desc: "Air-conditioned luxury coaches" },
    { icon: Compass, label: "Sightseeing", desc: "Pattaya & Bangkok guided tours" },
    { icon: Ticket, label: "Event Entry", desc: "Exclusive pass to Rajyotsava" },
    { icon: Music, label: "Musical Evening", desc: "Live high-energy concert" },
    { icon: Award, label: "Awards Ceremony", desc: "Global recognition gala" }
  ];

  const packageInclusionsKn = [
    { icon: Plane, label: "ವಿಮಾನ ಪ್ರಯಾಣ", desc: "ಹೋಗಿಬರುವ ವಿಮಾನ ಟಿಕೆಟ್‌ಗಳು" },
    { icon: Hotel, label: "ಹೋಟೆಲ್ ವಸತಿ", desc: "ಪ್ರೀಮಿಯಂ ೩-ಸ್ಟಾರ್ ವಸತಿ" },
    { icon: Coffee, label: "ಬೆಳಗಿನ ಉಪಾಹಾರ", desc: "ಪ್ರತಿದಿನದ ರುಚಿಕರ ಉಪಾಹಾರ" },
    { icon: Bus, label: "ಸ್ಥಳೀಯ ಸಾರಿಗೆ", desc: "ಹವಾನಿಯಂತ್ರಿತ ಪ್ರವಾಸಿ ಬಸ್‌ಗಳು" },
    { icon: Compass, label: "ಪ್ರೇಕ್ಷಣೀಯ ಸ್ಥಳಗಳು", desc: "ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ ಪ್ರವಾಸ" },
    { icon: Ticket, label: "ಕಾರ್ಯಕ್ರಮ ಪ್ರವೇಶ", desc: "ರಾಜ್ಯೋತ್ಸವದ ವಿಶೇಷ ಪಾಸ್" },
    { icon: Music, label: "ಸಂಗೀತ ಸಂಜೆ", desc: "ಲೈವ್ ಸಂಗೀತ ಕಚೇರಿ" },
    { icon: Award, label: "ಪ್ರಶಸ್ತಿ ಪ್ರದಾನ", desc: "ಜಾಗತಿಕ ಸಾಧಕರ ಸನ್ಮಾನ" }
  ];

  const packageInclusions = lang === "en" ? packageInclusionsEn : packageInclusionsKn;

  const handleDaySelect = (index: number) => {
    setActiveDay(index);
    trackGAEvent(`view_itinerary_day_${itinerary[index].date}`, "engagement", "Itinerary Interaction");
  };

  return (
    <section id="itinerary" className="relative py-20 sm:py-28 scroll-mt-28 bg-brand-black-deep overflow-hidden border-t border-white/5">
      {/* Background radial gold glow for ambient premium contrast */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[45rem] h-[45rem] bg-brand-yellow/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-red/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section with elegant typography and pricing tag */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-burgundy/80 border border-brand-red/30 mb-4 shadow-[0_0_15px_rgba(155,27,27,0.2)]">
            <Sparkles className="w-4 h-4 text-brand-yellow animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-brand-yellow uppercase">
              {lang === "en" ? "Limited Delegation Packages" : "ಸೀಮಿತ ನಿಯೋಗ ಪ್ಯಾಕೇಜುಗಳು"}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white uppercase leading-tight mb-4">
            {lang === "en" ? (
              <>PREMIUM ALL-INCLUSIVE <span className="text-gradient-red-yellow">EXPERIENCE</span></>
            ) : (
              <>ಪ್ರೀಮಿಯಂ ಆಲ್-ಇನ್‌ಕ್ಲೂಸಿವ್ <span className="text-gradient-red-yellow">ಅನುಭವ</span></>
            )}
          </h2>
          
          <p className="text-base sm:text-lg text-gray-400 font-medium mb-6">
            {lang === "en" 
              ? "Join the elite delegation representing Karnataka’s pride on the global stage in Bangkok."
              : "ಬ್ಯಾಂಕಾಕ್‌ನ ಜಾಗತಿಕ ವೇದಿಕೆಯಲ್ಲಿ ಕರ್ನಾಟಕದ ಹೆಮ್ಮೆಯನ್ನು ಪ್ರತಿನಿಧಿಸುವ ಗಣ್ಯ ನಿಯೋಗಕ್ಕೆ ಸೇರಿಕೊಳ್ಳಿ."}
          </p>

          {/* Pricing Highlight Badge with customized styling */}
          <div className="inline-block relative p-0.5 rounded-3xl bg-gradient-to-r from-brand-red via-brand-yellow to-brand-red overflow-hidden shadow-2xl glow-yellow max-w-sm w-full">
            <div className="bg-brand-black/95 rounded-[22px] px-6 py-4 text-center">
              <span className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase block mb-1">
                {lang === "en" ? "ALL-INCLUSIVE INVESTMENT" : "ಒಟ್ಟು ಆಲ್-ಇನ್‌ಕ್ಲೂಸಿವ್ ಹೂಡಿಕೆ"}
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl sm:text-4xl font-display font-black text-[#d4af37]">₹1,00,000</span>
                <span className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wider">
                  {lang === "en" ? "INR / Person" : "ರೂಪಾಯಿ / ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Main Highlight pillars requested explicitly by user */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          {/* Card 1: Stay */}
          <div className="p-6 sm:p-8 rounded-2xl glass-card border border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-yellow to-transparent" />
            <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center mb-6 border border-brand-yellow/20">
              <Hotel className="w-6 h-6 text-brand-yellow" />
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-white uppercase mb-2 group-hover:text-brand-yellow transition-colors">
              {lang === "en" ? "Premium 3-Star Stay" : "ಪ್ರೀಮಿಯಂ ೩-ಸ್ಟಾರ್ ವಾಸ್ತವ್ಯ"}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {lang === "en" 
                ? "Carefully vetted, highly comfortable standard 3-star hotel rooms situated at pristine, accessible locations in Pattaya and Bangkok. Includes seamless room logistics and dedicated support desks."
                : "ಪಟ್ಟಿ ಮತ್ತು ಬ್ಯಾಂಕಾಕ್‌ನಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಮತ್ತು ಸುಲಭವಾಗಿ ತಲುಪಬಹುದಾದ ಸ್ಥಳಗಳಲ್ಲಿರುವ ಆಯ್ದ, ಹೆಚ್ಚು ಆರಾಮದಾಯಕವಾದ ೩-ಸ್ಟಾರ್ ಹೋಟೆಲ್ ಕೊಠಡಿಗಳು."}
            </p>
          </div>

          {/* Card 2: Gala Night */}
          <div className="p-6 sm:p-8 rounded-2xl glass-card border border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-transparent" />
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-6 border border-brand-red/20">
              <Music className="w-6 h-6 text-brand-red" />
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-white uppercase mb-2 group-hover:text-brand-red transition-colors">
              {lang === "en" ? "Star-Studded Gala Night" : "ಸ್ಟಾರ್-ಸ್ಟಡ್ಡೆಡ್ ಗಾಲಾ ನೈಟ್"}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {lang === "en" 
                ? "Your exclusive gatepass to the Grand Karnataka Rajyotsava Celebration. Witness majestic cultural displays, a live celebrity music concert, excellence awards, followed by a premium multi-cuisine dinner."
                : "ಭವ್ಯ ಕರ್ನಾಟಕ ರಾಜ್ಯೋತ್ಸವ ಆಚರಣೆಗೆ ನಿಮ್ಮ ವಿಶೇಷ ಪ್ರವೇಶ ಪಾಸ್. ಗಣ್ಯ ಸಾಂಸ್ಕೃತಿಕ ಪ್ರದರ್ಶನಗಳು, ಸೆಲೆಬ್ರಿಟಿ ಸಂಗೀತ ಕಚೇರಿ ಮತ್ತು ವಿಶೇಷ ಔತಣಕೂಟ."}
            </p>
          </div>

          {/* Card 3: Breakfast */}
          <div className="p-6 sm:p-8 rounded-2xl glass-card border border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-yellow to-transparent" />
            <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center mb-6 border border-brand-yellow/20">
              <Coffee className="w-6 h-6 text-brand-yellow" />
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-white uppercase mb-2 group-hover:text-brand-yellow transition-colors">
              {lang === "en" ? "Daily Breakfast" : "ಪ್ರತಿದಿನದ ಉಪಾಹಾರ"}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {lang === "en" 
                ? "Start each morning of your international journey with satisfying, fresh breakfast spreads. Specially curated options combining standard continental cuisine with familiar regional preferences."
                : "ನಿಮ್ಮ ಅಂತರರಾಷ್ಟ್ರೀಯ ಪ್ರಯಾಣದ ಪ್ರತಿ ಬೆಳಿಗ್ಗೆ ರುಚಿಕರವಾದ ಮತ್ತು ಹೊಸದಾದ ಉಪಾಹಾರದೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ. ಕಾಂಟಿನೆಂಟಲ್ ಮತ್ತು ನಮ್ಮ ದೇಶಿ ಶೈಲಿಯ ವೈವಿಧ್ಯಗಳು."}
            </p>
          </div>

        </div>

        {/* Interactive Itinerary Timeline Section */}
        <div className="mb-24">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white uppercase tracking-wide">
                {lang === "en" ? (
                  <>YOUR CHRONOLOGICAL <span className="text-gradient-gold">ITINERARY</span></>
                ) : (
                  <>ನಿಮ್ಮ ದಿನಚರಿ <span className="text-gradient-gold">ವಿವರಗಳು</span></>
                )}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {lang === "en" 
                  ? "5 Days / 4 Nights Complete Package Breakdown (Bangkok & Pattaya)"
                  : "೫ ದಿನಗಳು / ೪ ರಾತ್ರಿಗಳ ಸಂಪೂರ್ಣ ಪ್ರವಾಸದ ಮಾಹಿತಿ (ಬ್ಯಾಂಕಾಕ್ & ಪಟ್ಟಾಯ)"}
              </p>
            </div>

            <a
              href="/Karunaada_Habba_Complete_Package.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGAEvent("download_full_itinerary_pdf", "engagement", "Itinerary Section")}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-yellow text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
            >
              <FileText className="w-4 h-4 text-white group-hover:animate-bounce" />
              <span>{lang === "en" ? "DOWNLOAD COMPLETE ITINERARY (PDF)" : "ಸಂಪೂರ್ಣ ಪ್ರವಾಸ ಪಟ್ಟಿ ಡೌನ್‌ಲೋಡ್ (PDF)"}</span>
              <Download className="w-3.5 h-3.5 text-white/80" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Vertical Timeline Steps */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              {itinerary.map((day, idx) => {
                const isActive = activeDay === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleDaySelect(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer group
                      ${isActive 
                        ? 'bg-brand-burgundy/60 border-brand-yellow shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
                        : 'bg-brand-charcoal/40 border-white/5 hover:border-white/10 hover:bg-brand-charcoal/60'}`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Date Indicator Badge */}
                      <div className={`px-3 py-2 rounded-lg font-mono font-black text-xs sm:text-sm tracking-wider text-center shrink-0 w-20 sm:w-24
                        ${isActive 
                          ? 'bg-brand-yellow text-brand-black' 
                          : 'bg-brand-charcoal border border-white/10 text-brand-yellow'}`}
                      >
                        {day.date}
                      </div>

                      {/* Title & Subtitle */}
                      <div className="truncate">
                        <p className={`text-sm sm:text-base font-extrabold uppercase tracking-wide
                          ${isActive ? 'text-[#d4af37]' : 'text-white'}`}
                        >
                          {day.title}
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide">
                          {day.subtitle}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className={`w-5 h-5 shrink-0 transition-transform duration-300
                      ${isActive ? 'text-[#d4af37] translate-x-1' : 'text-gray-600 group-hover:text-white'}`} 
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Day Detail Display Card */}
            <div className="lg:col-span-7">
              <div className="h-full bg-gradient-to-br from-brand-charcoal/90 to-brand-black border border-[#d4af37]/20 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl relative">
                
                {/* Visual Image Header */}
                <div className="relative h-48 sm:h-64 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent z-10" />
                  <img 
                    src={itinerary[activeDay].image} 
                    alt={itinerary[activeDay].imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center animate-[slow-zoom_15s_infinite_alternate]"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-brand-red/90 border border-brand-yellow/30 px-3.5 py-1.5 rounded-full shadow-lg">
                    <span className="text-[10px] font-mono font-black tracking-[0.2em] text-white">
                      {lang === "en" ? "DAY" : "ದಿನ"} {activeDay + 1} • {itinerary[activeDay].date}
                    </span>
                  </div>
                </div>

                {/* Day Details Content */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-display font-black text-[#d4af37] uppercase tracking-wide mb-1">
                      {itinerary[activeDay].title}
                    </h4>
                    <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/5 pb-3">
                      {itinerary[activeDay].subtitle}
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed mb-6">
                      {itinerary[activeDay].description}
                    </p>

                    {/* Conditional list for Day 4 (November 1st) details */}
                    {itinerary[activeDay].bullets && (
                      <div className="bg-brand-black/40 border border-brand-red/20 rounded-xl p-4 sm:p-5 mb-4">
                        <p className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase font-bold mb-3">
                          {lang === "en" ? "Rajyotsava Highlights:" : "ರಾಜ್ಯೋತ್ಸವದ ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು:"}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {itinerary[activeDay].bullets?.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2 text-xs text-gray-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Call to Action Inside Day Detail */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6 shrink-0">
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                      {lang === "en" ? "Karnataka Beyond Borders • 2026" : "ಗಡಿ ದಾಟಿದ ಕರುನಾಡು • ೨೦೨೬"}
                    </p>
                    <button 
                      onClick={() => {
                        trackGAEvent(`cta_itinerary_day_${itinerary[activeDay].date}`, "engagement", "Itinerary CTAs");
                        const formElem = document.getElementById("request-invite");
                        if (formElem) formElem.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1 text-xs text-brand-yellow hover:text-white font-bold uppercase tracking-wider cursor-pointer group/btn"
                    >
                      {lang === "en" ? "Request Spot" : "ಸೀಟು ಕಾಯ್ದಿರಿಸಿ"}
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* PACKAGE INCLUDES Grid (as shown in the provided image) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-brand-charcoal/80 to-brand-black border border-white/10 shadow-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-red via-brand-yellow to-brand-red" />
          
          <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-[0.2em] mb-10">
            {lang === "en" ? (
              <>PACKAGE <span className="text-brand-yellow">INCLUDES</span></>
            ) : (
              <>ಪ್ಯಾಕೇಜ್ <span className="text-brand-yellow">ಒಳಗೊಂಡಿದೆ</span></>
            )}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 justify-center">
            {packageInclusions.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center group text-center">
                <div className="w-14 h-14 rounded-full bg-brand-black border border-white/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-brand-yellow group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:scale-105">
                  <item.icon className="w-6 h-6 text-brand-yellow transition-transform duration-300 group-hover:scale-110" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-[10px] text-gray-400 font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex justify-center items-center">
            <button
              onClick={() => {
                trackGAEvent("package_grid_rsvp_click", "engagement", "Trip Highlights Section");
                const formElem = document.getElementById("request-invite");
                if (formElem) formElem.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 bg-[#d4af37] text-brand-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-lg shadow-brand-yellow/10 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              {lang === "en" ? "Register Interest Now" : "ಈಗಲೇ ಆಸಕ್ತಿ ನೋಂದಾಯಿಸಿ"}
            </button>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
      `}</style>
    </section>
  );
}
