import { useState, FormEvent } from "react";
import { CreditCard, CheckCircle2, AlertCircle, ShieldCheck, Sparkles, Loader2, ArrowRight } from "lucide-react";

interface RazorpayCheckoutProps {
  lang: "en" | "kn";
}

interface PassOption {
  id: string;
  titleEn: string;
  titleKn: string;
  descEn: string;
  descKn: string;
  totalPriceTextEn: string;
  totalPriceTextKn: string;
  advancePrice: number;
  accommodationEn: string;
  accommodationKn: string;
  popular?: boolean;
  featuresEn: string[];
  featuresKn: string[];
}

const PASS_OPTIONS: PassOption[] = [
  {
    id: "single_occupancy",
    titleEn: "Solo / Single Package",
    titleKn: "ಸೊಲೊ / ಸಿಂಗಲ್ ಪ್ಯಾಕೇಜ್",
    descEn: "Designed for individual travelers seeking comfort and privacy.",
    descKn: "ಏಕವ್ಯಕ್ತಿ ಪ್ರಯಾಣಿಕರಿಗಾಗಿ ಖಾಸಗಿ ವ್ಯವಸ್ಥೆ.",
    totalPriceTextEn: "₹99,999 Total Package",
    totalPriceTextKn: "₹99,999 ಒಟ್ಟು ಪ್ಯಾಕೇಜ್",
    advancePrice: 999,
    accommodationEn: "Single Occupancy",
    accommodationKn: "ಸಿಂಗಲ್ ಆಕ್ಯುಪೆನ್ಸಿ (ಖಾಸಗಿ ರೂಮ್)",
    featuresEn: [
      "Total Package Price: ₹99,999",
      "Single Occupancy Luxury Hotel Stay",
      "Includes Raghu Dixit Concert Tickets",
    ],
    featuresKn: [
      "ಒಟ್ಟು ಪ್ಯಾಕೇಜ್ ಮೊತ್ತ: ₹99,999",
      "ಸಿಂಗಲ್ ಆಕ್ಯುಪೆನ್ಸಿ ಹೋಟೆಲ್ ರೂಮ್",
      "ರಘು ದೀಕ್ಷಿತ್ ಲೈವ್ ಕನ್ಸರ್ಟ್ ಟಿಕೆಟ್‌ಗಳು ಸೇರಿವೆ",
    ],
  },
  {
    id: "double_shared",
    titleEn: "2 Friends / Couple Package",
    titleKn: "2 ಸ್ನೇಹಿತರು / ದಂಪತಿಗಳ ಪ್ಯಾಕೇಜ್",
    descEn: "Ideal for couples or 2 friends traveling together.",
    descKn: "ಇಬ್ಬರು ಸ್ನೇಹಿತರು ಅಥವಾ ದಂಪತಿಗಳಿಗೆ ಅನುಕೂಲಕರ.",
    totalPriceTextEn: "₹1,49,999 Total Package (For 2)",
    totalPriceTextKn: "₹1,49,999 ಒಟ್ಟು ಪ್ಯಾಕೇಜ್ (ಇಬ್ಬರಿಗೆ)",
    advancePrice: 999,
    accommodationEn: "2 Shared Occupancy",
    accommodationKn: "2 ಶೇರ್ಡ್ ಆಕ್ಯುಪೆನ್ಸಿ (ಇಬ್ಬರ ಹಂಚಿಕೆ)",
    popular: true,
    featuresEn: [
      "Total Package Price: ₹1,49,999 for 2 Persons",
      "2-Shared Occupancy Hotel Accommodation",
      "Includes Raghu Dixit Concert Tickets",
    ],
    featuresKn: [
      "ಇಬ್ಬರಿಗೆ ಒಟ್ಟು ಪ್ಯಾಕೇಜ್ ಮೊತ್ತ: ₹1,49,999",
      "ಇಬ್ಬರ ಹಂಚಿಕೆಯ ಹೋಟೆಲ್ ವಸತಿ",
      "ರಘು ದೀಕ್ಷಿತ್ ಲೈವ್ ಕನ್ಸರ್ಟ್ ಟಿಕೆಟ್‌ಗಳು ಸೇರಿವೆ",
    ],
  },
  {
    id: "family_group",
    titleEn: "3+ Friends / Family Group",
    titleKn: "3+ ಸ್ನೇಹಿತರು / ಕುಟುಂಬದ ಗ್ರೂಪ್",
    descEn: "Special discounted group rate directly from Power TV.",
    descKn: "ಪವರ್ ಟಿವಿಯಿಂದ ವಿಶೇಷ ರಿಯಾಯಿತಿ ಗ್ರೂಪ್ ದರ.",
    totalPriceTextEn: "Special Power TV Price",
    totalPriceTextKn: "ಪವರ್ ಟಿವಿ ವಿಶೇಷ ರಿಯಾಯಿತಿ ದರ",
    advancePrice: 999,
    accommodationEn: "Shared Accommodation",
    accommodationKn: "ಹಂಚಿಕೆಯ ಗ್ರೂಪ್ ವಸತಿ",
    featuresEn: [
      "Special Discounted Price from Power TV",
      "Shared Accommodation Arrangement",
      "Includes Raghu Dixit Concert Tickets",
    ],
    featuresKn: [
      "ಪವರ್ ಟಿವಿಯಿಂದ ಬಂಪರ್ ರಿಯಾಯಿತಿ ದರ",
      "ಗ್ರೂಪ್ ಹಂಚಿಕೆಯ ವಸತಿ ವ್ಯವಸ್ಥೆ",
      "ರಘು ದೀಕ್ಷಿತ್ ಲೈವ್ ಕನ್ಸರ್ಟ್ ಟಿಕೆಟ್‌ಗಳು ಸೇರಿವೆ",
    ],
  },
];

export default function RazorpayCheckout({ lang }: RazorpayCheckoutProps) {
  const [selectedPassId, setSelectedPassId] = useState<string>("double_shared");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successPayment, setSuccessPayment] = useState<{
    orderId: string;
    paymentId: string;
    amountPaid: number;
  } | null>(null);

  const selectedPass = PASS_OPTIONS.find((p) => p.id === selectedPassId) || PASS_OPTIONS[0];

  const getAmountInRupees = (): number => {
    return selectedPass ? selectedPass.advancePrice : 999;
  };

  const handlePay = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg(
        lang === "en"
          ? "Please fill in your Name, Email, and Phone Number before proceeding to payment."
          : "ದಯವಿಟ್ಟು ಪಾವತಿಗೆ ಮುಂದುವರಿಯುವ ಮೊದಲು ನಿಮ್ಮ ಹೆಸರು, ಇಮೇಲ್ ಮತ್ತು ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ಭರ್ತಿ ಮಾಡಿ."
      );
      return;
    }

    const amountInRupees = getAmountInRupees();
    const amountInPaise = Math.round(amountInRupees * 100);

    if (amountInPaise < 100) {
      setErrorMsg(
        lang === "en"
          ? "Minimum payment amount is ₹1 (100 paise)."
          : "ಕನಿಷ್ಠ ಪಾವತಿ ಮೊತ್ತ ₹1 ಆಗಿದೆ."
      );
      return;
    }

    setLoading(true);

    try {
      // Step 1: Request Backend Order Creation
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `rcpt_kh_${Date.now()}`,
        }),
      });

      const orderData = await res.json();

      if (!res.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to initialize payment order on server.");
      }

      const { order_id, amount, currency, key_id } = orderData;
      const razorpayKey = key_id || (import.meta as any).env.VITE_RAZORPAY_KEY_ID || "rzp_test_TMpXXHiYPfn1LQ";

      // Verify Razorpay Checkout SDK is available
      if (typeof window.Razorpay === "undefined") {
        throw new Error("Razorpay Checkout SDK is not loaded. Please refresh the page and try again.");
      }

      // Step 2: Configure Razorpay Standard Checkout Options
      const options = {
        key: razorpayKey,
        amount: amount,
        currency: currency || "INR",
        name: "Karunada Habba Thailand 2026",
        description: selectedPass?.titleEn || "Karunada Habba Festival Pass",
        image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=200",
        order_id: order_id,
        prefill: {
          name: fullName.trim(),
          email: email.trim(),
          contact: phone.trim(),
        },
        notes: {
          pass_type: selectedPassId,
          buyer_name: fullName.trim(),
        },
        theme: {
          color: "#9b1b1b",
        },
        // Step 3: Handle Success & Send for Verification
        handler: async function (response: any) {
          setLoading(true);
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setSuccessPayment({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amountPaid: amountInRupees,
              });
            } else {
              setErrorMsg(
                verifyData.error || "Payment signature verification failed. Please contact support if money was debited."
              );
            }
          } catch (verifyErr: any) {
            console.error("Verification error:", verifyErr);
            setErrorMsg("Payment completed, but verification request failed. Please check with support.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            console.log("Razorpay checkout modal closed by user.");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        setLoading(false);
        console.error("Payment failed:", response.error);
        setErrorMsg(
          `Payment failed: ${response.error?.description || response.error?.reason || "Transaction was declined."}`
        );
      });

      rzp.open();
    } catch (err: any) {
      console.error("Error launching Razorpay:", err);
      setErrorMsg(err.message || "An unexpected error occurred while launching payment modal.");
      setLoading(false);
    }
  };

  return (
    <section id="passes" className="py-24 sm:py-32 scroll-mt-28 bg-brand-black-deep relative overflow-hidden border-t border-white/10">
      {/* Glow Ornaments */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] bg-brand-red/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/20 border border-brand-red/40 text-brand-yellow text-xs tracking-widest font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
            <span>{lang === "en" ? "RAZORPAY INTEGRATED CHECKOUT" : "ರೇಜರ್‌ಪೇ ಸುರಕ್ಷಿತ ಪಾವತಿ"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white uppercase">
            {lang === "en" ? (
              <>OFFICIAL FESTIVAL <span className="text-gradient-gold">PASSES & TICKETS</span></>
            ) : (
              <>ಅಧಿಕೃತ ಹಬ್ಬದ <span className="text-gradient-gold">ಪಾಸ್‌ಗಳು & ಟಿಕೆಟ್‌ಗಳು</span></>
            )}
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
            {lang === "en"
              ? "Secure your instant festival passes via Razorpay Standard Web Checkout using UPI, Credit/Debit Cards, Net Banking, or Wallets."
              : "ಯುಪಿಐ, ಕಾರ್ಡ್‌ಗಳು ಮತ್ತು ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಬಳಸಿ ರೇಜರ್‌ಪೇ ಮೂಲಕ ತಕ್ಷಣ ಹಬ್ಬದ ಪಾಸ್‌ಗಳನ್ನು ಕಾಯ್ದಿರಿಸಿ."}
          </p>
        </div>

        {/* Tier Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PASS_OPTIONS.map((pass) => {
            const isSelected = selectedPassId === pass.id;
            return (
              <div
                key={pass.id}
                onClick={() => {
                  setSelectedPassId(pass.id);
                  setErrorMsg(null);
                }}
                className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? "bg-gradient-to-b from-brand-red/30 via-white/10 to-brand-black border-brand-yellow shadow-[0_0_30px_rgba(212,175,55,0.25)] scale-[1.02]"
                    : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20"
                }`}
              >
                {pass.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-red to-brand-yellow text-black font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-lg">
                    {lang === "en" ? "MOST POPULAR" : "ಅತ್ಯಂತ ಜನಪ್ರಿಯ"}
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-white font-display">
                      {lang === "en" ? pass.titleEn : pass.titleKn}
                    </h3>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? "border-brand-yellow bg-brand-yellow" : "border-white/40"
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                    </div>
                  </div>

                  <p className="text-xs text-white/60 mb-4 font-light">
                    {lang === "en" ? pass.descEn : pass.descKn}
                  </p>

                  {/* Accommodation Tag */}
                  <div className="mb-4 inline-block px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-[11px] font-semibold text-brand-yellow">
                    🏨 {lang === "en" ? pass.accommodationEn : pass.accommodationKn}
                  </div>

                  {/* Total Package Value Header */}
                  <div className="mb-4 text-xs font-bold text-white/80 tracking-wide uppercase">
                    <span className="text-white/50 block text-[10px]">
                      {lang === "en" ? "Total Package Value:" : "ಒಟ್ಟು ಪ್ಯಾಕೇಜ್ ಮೌಲ್ಯ:"}
                    </span>
                    <span className="text-base font-extrabold text-brand-yellow">
                      {lang === "en" ? pass.totalPriceTextEn : pass.totalPriceTextKn}
                    </span>
                  </div>

                  {/* Advance Booking Charge Display */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="p-3 rounded-xl bg-brand-red/20 border border-brand-red/40 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-white/70 block">
                          {lang === "en" ? "ADVANCE BOOKING" : "ಅಡ್ವಾನ್ಸ್ ಬುಕಿಂಗ್"}
                        </span>
                        <span className="text-2xl font-black text-white font-display">
                          ₹{pass.advancePrice}
                        </span>
                      </div>
                      <span className="text-[10px] bg-brand-yellow text-black font-extrabold px-2 py-1 rounded tracking-wider uppercase">
                        {lang === "en" ? "PAY NOW" : "ಈಗ ಪಾವತಿಸಿ"}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-xs text-white/80">
                    {(lang === "en" ? pass.featuresEn : pass.featuresKn).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-yellow shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* User Details & Checkout Action Box */}
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold block">
                {lang === "en" ? "SELECTED PACKAGE SUMMARY" : "ಆಯ್ದ ಪ್ಯಾಕೇಜ್ ಸಾರಾಂಶ"}
              </span>
              <h3 className="text-lg font-bold text-white">
                {lang === "en" ? selectedPass?.titleEn : selectedPass?.titleKn}
              </h3>
              {selectedPass && (
                <p className="text-xs text-white/60 mt-0.5">
                  {lang === "en" ? selectedPass.totalPriceTextEn : selectedPass.totalPriceTextKn} • 🏨 {lang === "en" ? selectedPass.accommodationEn : selectedPass.accommodationKn}
                </p>
              )}
            </div>
            <div className="text-right">
              <span className="text-xs uppercase tracking-wider text-white/60 block">
                {lang === "en" ? "ADVANCE PAYABLE NOW" : "ಅಡ್ವಾನ್ಸ್ ಪಾವತಿ"}
              </span>
              <span className="text-2xl font-extrabold text-brand-yellow font-display">
                ₹{getAmountInRupees().toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] text-white/50 block">INR (Razorpay)</span>
            </div>
          </div>

          {/* Error Message Box */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/40 flex items-start gap-3 text-red-200 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMsg}</div>
            </div>
          )}

          {/* Guest Information Inputs */}
          <form onSubmit={handlePay} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">
                  {lang === "en" ? "Full Name *" : "ಪೂರ್ಣ ಹೆಸರು *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-yellow transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">
                  {lang === "en" ? "Phone Number *" : "ಫೋನ್ ಸಂಖ್ಯೆ *"}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-yellow transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1">
                {lang === "en" ? "Email Address *" : "ಇಮೇಲ್ ವಿಳಾಸ *"}
              </label>
              <input
                type="email"
                required
                placeholder="e.g. ramesh@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-yellow transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-4 px-6 rounded-xl bg-gradient-to-r from-brand-red via-red-600 to-brand-yellow text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>{lang === "en" ? "Opening Razorpay..." : "ಪಾವತಿ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ..."}</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>
                    {lang === "en"
                      ? `PAY ₹${getAmountInRupees().toLocaleString("en-IN")} ADVANCE VIA RAZORPAY`
                      : `ರೇಜರ್‌ಪೇ ಮೂಲಕ ₹${getAmountInRupees().toLocaleString("en-IN")} ಅಡ್ವಾನ್ಸ್ ಪಾವತಿಸಿ`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Razorpay Trust Badges */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              256-Bit SSL Encrypted & Verifiable
            </span>
            <span>Razorpay Standard Checkout</span>
          </div>
        </div>
      </div>

      {/* Payment Success Confirmation Modal */}
      {successPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-brand-black-deep border border-brand-yellow/50 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-center">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow block mb-1">
              {lang === "en" ? "PAYMENT VERIFIED & CONFIRMED" : "ಪಾವತಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ"}
            </span>
            <h3 className="text-2xl font-bold font-display text-white mb-2">
              {lang === "en" ? "See You In Thailand!" : "ಥೈಲ್ಯಾಂಡ್ನಲ್ಲಿ ಭೇಟಿಯಾಗೋಣ!"}
            </h3>
            <p className="text-xs text-white/70 mb-6">
              {lang === "en"
                ? "Your Razorpay transaction was verified successfully by our server."
                : "ನಿಮ್ಮ ರೇಜರ್‌ಪೇ ಪಾವತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ."}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/50">Amount Paid:</span>
                <span className="text-white font-bold">₹{successPayment.amountPaid.toLocaleString("en-IN")} INR</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/50">Payment ID:</span>
                <span className="text-emerald-400 font-mono font-semibold">{successPayment.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Order ID:</span>
                <span className="text-white font-mono">{successPayment.orderId}</span>
              </div>
            </div>

            <button
              onClick={() => setSuccessPayment(null)}
              className="w-full py-3 px-6 rounded-xl bg-brand-yellow text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition"
            >
              {lang === "en" ? "Done / Close" : "ಮುಚ್ಚಿ"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
