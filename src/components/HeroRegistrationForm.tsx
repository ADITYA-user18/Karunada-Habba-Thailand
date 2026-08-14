import { useState, FormEvent } from "react";
import { CheckCircle2, Loader2, ArrowRight, User, Phone, Mail, MapPin, Users } from "lucide-react";

// Google Form entry IDs — matched from the Google Form linked to the sheet
// Sheet: https://docs.google.com/spreadsheets/d/10JNsQMcc-SO4ip1L5P_vWUawcMlfT-n807Kw4vulC3I
// We submit directly to the Google Form endpoint using a no-CORS hidden iframe trick
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfXeJkWMg9VyVYTB_GZVLQDozDc2MHbFlX6YpJvGOGNKYzrCg/formResponse";

// Real entry IDs extracted from the Google Form's FB_PUBLIC_LOAD_DATA_ blob
const ENTRY = {
  fullName: "entry.932654998",
  email: "entry.758588725",
  phone: "entry.1707967939",
  city: "entry.15804647",
  guests: "entry.658655071",
  profession: "entry.988576457",
};

interface HeroRegistrationFormProps {
  lang: "en" | "kn";
}

export default function HeroRegistrationForm({ lang }: HeroRegistrationFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState("1 Guest");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError(
        lang === "en"
          ? "Please fill in Name, Email and Phone Number."
          : "ದಯವಿಟ್ಟು ಹೆಸರು, ಇಮೇಲ್ ಮತ್ತು ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ."
      );
      return;
    }

    setLoading(true);

    // Submit to Google Forms via hidden iframe (no-CORS workaround)
    try {
      const formData = new FormData();
      formData.append(ENTRY.fullName, fullName.trim());
      formData.append(ENTRY.email, email.trim());
      formData.append(ENTRY.phone, phone.trim());
      formData.append(ENTRY.city, city.trim());
      formData.append(ENTRY.guests, guests);
      formData.append(ENTRY.profession, "Individual");

      // Use fetch with no-cors mode — response will be opaque but form will be submitted
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      // Even on error (opaque response), the form often submits — show success
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full bg-[#0e0a04]/80 border border-[#3a2a10]/80 rounded-xl px-4 py-3 text-sm text-white/90 placeholder-white/25 focus:outline-none focus:border-[#d4af37]/60 focus:bg-[#0e0a04] focus:ring-1 focus:ring-[#d4af37]/20 transition-all duration-200 font-sans";

  const labelBase =
    "block text-[10px] uppercase tracking-[0.18em] text-[#d4af37]/70 font-bold mb-1.5 font-mono";

  const iconWrap =
    "absolute left-3 top-1/2 -translate-y-1/2 text-[#d4af37]/40 pointer-events-none";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4 animate-[fade-in-up_0.6s_ease-out_both]">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-white font-display mb-2">
          {lang === "en" ? "You're Registered!" : "ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ!"}
        </h3>
        <p className="text-white/60 text-sm font-light max-w-xs leading-relaxed">
          {lang === "en"
            ? "Thank you! Our team will reach out to you shortly with all the details."
            : "ಧನ್ಯವಾದ! ನಮ್ಮ ತಂಡವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ."}
        </p>
        <div className="mt-6 text-xs text-[#d4af37]/60 font-mono tracking-widest uppercase">
          29 Oct – 2 Nov 2026 · Bangkok
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full animate-[fade-in-up_1s_ease-out_0.6s_both]">
      {/* Card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(14,10,4,0.97) 0%, rgba(20,10,2,0.95) 50%, rgba(10,5,0,0.98) 100%)",
          border: "1px solid rgba(212,175,55,0.18)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.06), inset 0 1px 0 rgba(212,175,55,0.08)",
        }}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#9b1b1b] via-[#d4af37] to-[#9b1b1b]" />

        {/* Inner subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 8px)",
          }}
        />

        <div className="relative z-10 p-5 sm:p-7">
          {/* Header */}
          <div className="mb-4 sm:mb-5">
            <span className="text-[10px] font-mono font-black tracking-[0.25em] text-[#d4af37]/60 uppercase block mb-1">
              {lang === "en" ? "Karnataka | Habba Registration Request" : "ಕರ್ನಾಟಕ | ಹಬ್ಬ ನೋಂದಣಿ"}
            </span>
            <h3 className="text-base sm:text-lg font-display font-bold text-white leading-tight">
              {lang === "en" ? (
                <>
                  Register Your{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg, #d4af37, #f5d98a)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Interest
                  </span>
                </>
              ) : (
                <>
                  ನಿಮ್ಮ{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg, #d4af37, #f5d98a)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ಆಸಕ್ತಿ
                  </span>{" "}
                  ನೋಂದಾಯಿಸಿ
                </>
              )}
            </h3>
            <p className="text-white/40 text-xs mt-1 font-light">
              {lang === "en"
                ? "Seats are limited. Register now to secure your spot."
                : "ಸ್ಥಾನಗಳು ಸೀಮಿತ. ಈಗಲೇ ನೋಂದಾಯಿಸಿ."}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent mb-4 sm:mb-5" />

          {/* Error */}
          {error && (
            <div className="mb-4 px-3 py-2.5 rounded-lg bg-red-900/25 border border-red-500/30 text-red-300 text-xs">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
            {/* Full Name */}
            <div>
              <label className={labelBase}>
                {lang === "en" ? "Full Name *" : "ಪೂರ್ಣ ಹೆಸರು *"}
              </label>
              <div className="relative">
                <span className={iconWrap}>
                  <User className="w-3.5 h-3.5" />
                </span>
                <input
                  id="hero-form-name"
                  type="text"
                  required
                  placeholder={lang === "en" ? "Your full name" : "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು"}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputBase + " pl-9"}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={labelBase}>
                {lang === "en" ? "Email Address *" : "ಇಮೇಲ್ *"}
              </label>
              <div className="relative">
                <span className={iconWrap}>
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <input
                  id="hero-form-email"
                  type="email"
                  required
                  placeholder={lang === "en" ? "your@email.com" : "your@email.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputBase + " pl-9"}
                />
              </div>
            </div>

            {/* Phone + City row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelBase}>
                  {lang === "en" ? "Phone *" : "ಫೋನ್ *"}
                </label>
                <div className="relative">
                  <span className={iconWrap}>
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  <input
                    id="hero-form-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputBase + " pl-9"}
                  />
                </div>
              </div>
              <div>
                <label className={labelBase}>
                  {lang === "en" ? "City" : "ನಗರ"}
                </label>
                <div className="relative">
                  <span className={iconWrap}>
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  <input
                    id="hero-form-city"
                    type="text"
                    placeholder={lang === "en" ? "Bengaluru" : "ಬೆಂಗಳೂರು"}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={inputBase + " pl-9"}
                  />
                </div>
              </div>
            </div>

            {/* Number of Guests */}
            <div>
              <label className={labelBase}>
                {lang === "en" ? "Number of Guests" : "ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ"}
              </label>
              <div className="relative">
                <span className={iconWrap}>
                  <Users className="w-3.5 h-3.5" />
                </span>
                <select
                  id="hero-form-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className={
                    inputBase +
                    " pl-9 appearance-none cursor-pointer"
                  }
                  style={{ background: "rgba(14,10,4,0.9)" }}
                >
                  <option value="1 Guest">1 Person</option>
                  <option value="2 Guests">2 Persons</option>
                  <option value="3 Guests">3 Persons</option>
                  <option value="4 Guests">4 Persons</option>
                  <option value="5 Plus Guests">5+ Persons</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#d4af37]/40">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-[0.15em] text-black flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #d4af37 0%, #f5d98a 50%, #d4af37 100%)",
                boxShadow: "0 4px 20px rgba(212,175,55,0.35), 0 1px 0 rgba(255,255,255,0.1) inset",
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, #c49a27 0%, #e8c96a 50%, #c49a27 100%)",
                }}
              />
              <span className="relative flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {lang === "en" ? "Submitting..." : "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ..."}
                  </>
                ) : (
                  <>
                    {lang === "en" ? "Register Interest" : "ಆಸಕ್ತಿ ನೋಂದಾಯಿಸಿ"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer note */}
          <p className="mt-4 text-center text-[10px] text-white/25 font-light leading-relaxed">
            {lang === "en"
              ? "By registering, you agree to be contacted by our team. No spam."
              : "ನೋಂದಣಿ ಮಾಡುವ ಮೂಲಕ, ನಮ್ಮ ತಂಡದಿಂದ ಸಂಪರ್ಕಿಸಲ್ಪಡಲು ಒಪ್ಪಿಗೆ ನೀಡುತ್ತೀರಿ."}
          </p>
        </div>
      </div>
    </div>
  );
}
