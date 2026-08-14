import { useState, FormEvent } from "react";
import { CheckCircle2, Loader2, ArrowRight, User, Phone, Mail, MapPin, Users, Sparkles } from "lucide-react";

interface FormProps {
  lang: "en" | "kn";
}

// Google Form action endpoint linked to the sheet:
// https://docs.google.com/spreadsheets/d/10JNsQMcc-SO4ip1L5P_vWUawcMlfT-n807Kw4vulC3I
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfXeJkWMg9VyVYTB_GZVLQDozDc2MHbFlX6YpJvGOGNKYzrCg/formResponse";

const ENTRY = {
  fullName: "entry.2005620554",
  email: "entry.1045781291",
  phone: "entry.1166974658",
  city: "entry.839337160",
  guests: "entry.1719280610",
  packageType: "entry.1065046570",
};

export default function Form({ lang }: FormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState("1");
  const [packageType, setPackageType] = useState("Individual");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError(
        lang === "en"
          ? "Please fill in your Name, Email, and Phone Number."
          : "ದಯವಿಟ್ಟು ಹೆಸರು, ಇಮೇಲ್ ಮತ್ತು ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ."
      );
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append(ENTRY.fullName, fullName.trim());
      formData.append(ENTRY.email, email.trim());
      formData.append(ENTRY.phone, phone.trim());
      formData.append(ENTRY.city, city.trim());
      formData.append(ENTRY.guests, guests);
      formData.append(ENTRY.packageType, packageType);

      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      setSubmitted(true);
    } catch {
      // no-cors always throws but form still submits
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // ── Shared style tokens ──
  const inputBase =
    "w-full bg-[#0c0804]/90 border border-[#3a2808]/80 rounded-xl px-4 py-3.5 text-sm text-white/90 placeholder-white/20 focus:outline-none focus:border-[#d4af37]/50 focus:bg-[#0c0804] focus:ring-1 focus:ring-[#d4af37]/15 transition-all duration-200 font-sans";

  const labelBase =
    "block text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/65 font-bold mb-1.5 font-mono";

  const iconWrap =
    "absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d4af37]/35 pointer-events-none";

  return (
    <section
      id="request-invite"
      className="py-24 sm:py-32 scroll-mt-28 bg-brand-black-deep relative overflow-hidden border-t border-white/5"
    >
      {/* Background glows */}
      <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-[#9b1b1b]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35rem] h-[35rem] bg-[#d4af37]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/20 border border-brand-red/40 text-brand-yellow text-xs tracking-widest font-bold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "EXCLUSIVE ACCESS" : "ವಿಶೇಷ ಪ್ರವೇಶಾವಕಾಶ"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase">
            {lang === "en" ? (
              <>REGISTER <span className="text-gradient-gold">INTEREST</span></>
            ) : (
              <>ಆಸಕ್ತಿ <span className="text-gradient-gold">ನೋಂದಾಯಿಸಿ</span></>
            )}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm font-light leading-relaxed">
            {lang === "en"
              ? "Registrations are limited and subject to confirmation. Fill the form below to register your interest."
              : "ನೋಂದಣಿಗಳು ಸೀಮಿತವಾಗಿವೆ. ನಿಮ್ಮ ಆಸಕ್ತಿಯನ್ನು ನೋಂದಾಯಿಸಲು ಕೆಳಗಿನ ಫಾರ್ಮ್ ಭರ್ತಿ ಮಾಡಿ."}
          </p>
        </div>

        {/* ── Form Card ── */}
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            background: "linear-gradient(145deg, rgba(14,10,4,0.97) 0%, rgba(18,10,2,0.95) 100%)",
            border: "1px solid rgba(212,175,55,0.15)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.05), inset 0 1px 0 rgba(212,175,55,0.07)",
          }}
        >
          {/* Top gradient bar */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[#9b1b1b] via-[#d4af37] to-[#9b1b1b]" />

          {/* Subtle inner texture */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 10px)",
            }}
          />

          {submitted ? (
            /* ── Success State ── */
            <div className="relative z-10 flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#d4af37]/70 block mb-2">
                {lang === "en" ? "Registration Received" : "ನೋಂದಣಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ"}
              </span>
              <h3 className="text-2xl font-display font-bold text-white mb-3">
                {lang === "en" ? "See You In Thailand! 🇹🇭" : "ಥೈಲ್ಯಾಂಡ್ನಲ್ಲಿ ಭೇಟಿಯಾಗೋಣ! 🇹🇭"}
              </h3>
              <p className="text-white/50 text-sm font-light max-w-md leading-relaxed">
                {lang === "en"
                  ? "Thank you for registering! Our team will review your details and reach out to confirm your spot."
                  : "ನೋಂದಣಿಗಾಗಿ ಧನ್ಯವಾದ! ನಮ್ಮ ತಂಡವು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಸಂಪರ್ಕಿಸುತ್ತದೆ."}
              </p>
              <div className="mt-6 px-5 py-2.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[11px] font-mono text-[#d4af37]/60 tracking-widest uppercase">
                29 Oct – 2 Nov 2026 · Bangkok, Thailand
              </div>
            </div>
          ) : (
            /* ── Form ── */
            <div className="relative z-10 p-7 sm:p-10">
              {/* Card Header */}
              <div className="mb-7">
                <span className="text-[10px] font-mono font-black tracking-[0.25em] text-[#d4af37]/55 uppercase block mb-1">
                  {lang === "en" ? "Karnataka | Habba Registration Request" : "ಕರ್ನಾಟಕ | ಹಬ್ಬ ನೋಂದಣಿ ವಿನಂತಿ"}
                </span>
                <p className="text-white/40 text-sm font-light">
                  {lang === "en"
                    ? "All data is saved securely. Required fields marked *"
                    : "ಎಲ್ಲಾ ಡೇಟಾ ಸುರಕ್ಷಿತವಾಗಿ ಉಳಿಸಲಾಗುತ್ತದೆ. * ಕಡ್ಡಾಯ ಕ್ಷೇತ್ರಗಳು"}
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/12 to-transparent mb-7" />

              {error && (
                <div className="mb-5 px-4 py-3 rounded-xl bg-red-900/20 border border-red-500/25 text-red-300 text-xs leading-relaxed">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className={labelBase}>
                    {lang === "en" ? "Full Name *" : "ಪೂರ್ಣ ಹೆಸರು *"}
                  </label>
                  <div className="relative">
                    <span className={iconWrap}><User className="w-4 h-4" /></span>
                    <input
                      id="form-full-name"
                      type="text"
                      required
                      placeholder={lang === "en" ? "e.g. Ramesh Kumar" : "ಉದಾ. ರಮೇಶ್ ಕುಮಾರ್"}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={inputBase + " pl-10"}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelBase}>
                    {lang === "en" ? "Email Address *" : "ಇಮೇಲ್ ವಿಳಾಸ *"}
                  </label>
                  <div className="relative">
                    <span className={iconWrap}><Mail className="w-4 h-4" /></span>
                    <input
                      id="form-email"
                      type="email"
                      required
                      placeholder="ramesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputBase + " pl-10"}
                    />
                  </div>
                </div>

                {/* Phone + City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelBase}>
                      {lang === "en" ? "Phone Number *" : "ಫೋನ್ ಸಂಖ್ಯೆ *"}
                    </label>
                    <div className="relative">
                      <span className={iconWrap}><Phone className="w-4 h-4" /></span>
                      <input
                        id="form-phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={inputBase + " pl-10"}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelBase}>
                      {lang === "en" ? "City / Country" : "ನಗರ / ದೇಶ"}
                    </label>
                    <div className="relative">
                      <span className={iconWrap}><MapPin className="w-4 h-4" /></span>
                      <input
                        id="form-city"
                        type="text"
                        placeholder={lang === "en" ? "Bengaluru, India" : "ಬೆಂಗಳೂರು, ಭಾರತ"}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={inputBase + " pl-10"}
                      />
                    </div>
                  </div>
                </div>

                {/* Guests + Package */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelBase}>
                      {lang === "en" ? "Number of Guests" : "ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ"}
                    </label>
                    <div className="relative">
                      <span className={iconWrap}><Users className="w-4 h-4" /></span>
                      <select
                        id="form-guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className={inputBase + " pl-10 appearance-none cursor-pointer"}
                        style={{ background: "rgba(12,8,4,0.95)" }}
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                        <option value="5+">5+ Persons</option>
                      </select>
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#d4af37]/35">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 4.5l4 3 4-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className={labelBase}>
                      {lang === "en" ? "Package Type" : "ಪ್ಯಾಕೇಜ್ ವಿಧ"}
                    </label>
                    <div className="relative">
                      <select
                        id="form-package"
                        value={packageType}
                        onChange={(e) => setPackageType(e.target.value)}
                        className={inputBase + " appearance-none cursor-pointer"}
                        style={{ background: "rgba(12,8,4,0.95)" }}
                      >
                        <option value="Individual">Solo / Individual</option>
                        <option value="Couple">2 Friends / Couple</option>
                        <option value="Group">3+ Group / Family</option>
                      </select>
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#d4af37]/35">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 4.5l4 3 4-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-3 py-4 px-6 rounded-xl font-extrabold text-sm uppercase tracking-[0.15em] text-black flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #d4af37 0%, #f5d98a 50%, #c49a27 100%)",
                    boxShadow: "0 6px 30px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                    style={{ background: "linear-gradient(135deg, #c49a27 0%, #e8c96a 50%, #b8891e 100%)" }}
                  />
                  <span className="relative flex items-center gap-2.5">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {lang === "en" ? "Submitting..." : "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ..."}
                      </>
                    ) : (
                      <>
                        {lang === "en" ? "REGISTER MY INTEREST" : "ಆಸಕ್ತಿ ನೋಂದಾಯಿಸಿ"}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Footer note */}
              <p className="mt-5 text-center text-[11px] text-white/20 font-light leading-relaxed">
                {lang === "en"
                  ? "Your data is saved to our secure registration sheet. We do not spam."
                  : "ನಿಮ್ಮ ಡೇಟಾ ನಮ್ಮ ಸುರಕ್ಷಿತ ನೋಂದಣಿ ಶೀಟ್‌ಗೆ ಉಳಿಸಲಾಗುತ್ತದೆ."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
