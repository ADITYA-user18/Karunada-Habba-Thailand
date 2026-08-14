export interface ExperienceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  visualDirection: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface InviteFormInputs {
  fullName: string;
  phone: string;
  countryCode: string;
  email: string;
  cityCountry: string;
  numberOfGuests: number;
  marketingConsent: boolean;
  profession: "Salary" | "Business";
}

export interface SubmitResponse {
  success: boolean;
  error?: string;
  data?: {
    id: string;
    full_name: string;
    created_at: string;
  };
}

export interface RazorpayOrderResponse {
  success: boolean;
  order_id: string;
  amount: number;
  currency: string;
  key_id?: string;
  error?: string;
}

export interface RazorpayPaymentSuccess {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayVerifyResponse {
  success: boolean;
  message?: string;
  order_id?: string;
  payment_id?: string;
  error?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}
