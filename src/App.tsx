import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TripHighlights from "./components/TripHighlights";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import Destination from "./components/Destination";
import BrandMoment from "./components/BrandMoment";

import RazorpayCheckout from "./components/RazorpayCheckout";
import Footer from "./components/Footer";
import AdminConsole from "./components/AdminConsole";
import StickyFooter from "./components/StickyFooter";
import { initGA } from "./lib/analytics";

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "kn">("en");

  useEffect(() => {
    // Dynamically initialize Google Analytics if VITE_GA_MEASUREMENT_ID is defined
    const measurementId = (import.meta as any).env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
      initGA(measurementId);
    }

    const handleOpenConsole = () => setIsAdminOpen(true);
    window.addEventListener("open-organizer-console", handleOpenConsole);
    return () => window.removeEventListener("open-organizer-console", handleOpenConsole);
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-black-deep text-white antialiased selection:bg-brand-red selection:text-white">
      {/* Premium Translucent Header */}
      <Navbar lang={lang} setLang={setLang} />

      <main>
        {/* Full Screen Cinematic Hero Stage */}
        <Hero lang={lang} />

        {/* Premium Trip Highlights and Chronological Itinerary */}
        <TripHighlights lang={lang} />

        {/* Editorial Brand Narrative */}
        <Intro lang={lang} />

        {/* Bento Grid Experiences List */}
        <Experience lang={lang} />

        {/* Global Meets Home Destination Section */}
        <Destination lang={lang} />

        {/* Emotional Heritage Anthem Highlight */}
        <BrandMoment lang={lang} />

      </main>

      {/* Standard Footers */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} lang={lang} />

      {/* Organizer Administration Console for Google Sheets Synchronization */}
      <AdminConsole isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Global Interactive Sticky Footer with Call and WhatsApp actions */}
      <StickyFooter lang={lang} />
    </div>
  );
}

