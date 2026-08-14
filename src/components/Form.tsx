import { useState, useEffect } from "react";
import { FileSpreadsheet, ExternalLink } from "lucide-react";

interface FormProps {
  lang: "en" | "kn";
}

export default function Form({ lang }: FormProps) {
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(null);

  useEffect(() => {
    // Check if sheet config is present
    fetch("/api/admin/sheet-config")
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (data && data.spreadsheetId) {
          setSpreadsheetId(data.spreadsheetId);
        } else {
          // Set to default spreadsheet ID from local_db if fallback is desired
          setSpreadsheetId("1pPeNFym0LBPHVydV9Cwh92RH8FSF7FCl_6uP5tvLuN4");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch sheet config in Form:", err);
        setSpreadsheetId("1pPeNFym0LBPHVydV9Cwh92RH8FSF7FCl_6uP5tvLuN4");
      });
  }, []);

  return (
    <section
      id="request-invite"
      className="py-24 sm:py-32 scroll-mt-28 bg-brand-black-deep relative overflow-hidden border-t border-white/5"
    >
      {/* Background Ornaments */}
      <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-[#9b1b1b]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35rem] h-[35rem] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header Block */}
        <div className="text-center mb-12 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37] block font-bold">
            {lang === "en" ? "EXCLUSIVE ACCESS" : "ವಿಶೇಷ ಪ್ರವೇಶಾವಕಾಶ"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase">
            {lang === "en" ? (
              <>REGISTER <span className="text-gradient-gold">INTEREST</span></>
            ) : (
              <>ಆಸಕ್ತಿ <span className="text-gradient-gold">ನೋಂದಾಯಿಸಿ</span></>
            )}
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm font-light leading-relaxed">
            {lang === "en" 
              ? "Registrations are limited and subject to confirmation. Please submit the form below to register your interest."
              : "ನೋಂದಣಿಗಳು ಸೀಮಿತವಾಗಿವೆ ಮತ್ತು ದೃಢೀಕರಣಕ್ಕೆ ಒಳಪಟ್ಟಿರುತ್ತವೆ. ನಿಮ್ಮ ಆಸಕ್ತಿಯನ್ನು ನೋಂದಾಯಿಸಲು ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಫಾರ್ಮ್ ಅನ್ನು ಭರ್ತಿ ಮಾಡಿ."}
          </p>
        </div>

        {/* Dynamic Card Container: Google Form Embed */}
        <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl p-0.5 sm:p-1 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#9b1b1b] to-[#d4af37]" />

          {/* Embedded Google Form Iframe with high visual premium wrapping */}
          <div className="relative w-full rounded-lg bg-black/40 overflow-hidden shadow-inner" style={{ height: "1510px" }}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfXeJkWMg9VyVYTB_GZVLQDozDc2MHbFlX6YpJvGOGNKYzrCg/viewform?embedded=true"
              className="absolute top-0 left-0 w-full h-full border-0"
              title="Karunada Habba Thailand RSVP Form"
            >
              {lang === "en" ? "Loading…" : "ಲೋಡ್ ಆಗುತ್ತಿದೆ…"}
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
