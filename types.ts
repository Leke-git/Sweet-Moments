
export interface CakeType {
  id: string;
  name: string;
  base_price: number;
  emoji: string;
}

export interface Size {
  id: string;
  label: string;
  servings: number;
  multiplier: number;
}

export interface Surcharges {
  delivery_fee: number;
  dietary_per_item: number;
  fondant_premium: number;
}

export interface SiteConfig {
  cake_types: CakeType[];
  sizes: Size[];
  cake_flavours: string[];
  fillings: string[];
  frosting_types: string[];
  colour_options: string[];
  dietary_options: string[];
  surcharges: Surcharges;
  delivery_enabled: boolean;
  min_days_notice: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
}

export interface OrderFormData {
  selectedCakeType: string | null;
  selectedSize: string | null;
  cakeFlavor: string;
  filling: string;
  frosting: string;
  selectedColors: string[];
  customMessage: string;
  inspirationImage: string | null; // Base64 data
  inspirationMimeType: string | null;
  inspirationUrl: string;
  dietaryReqs: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryMethod: 'pickup' | 'delivery' | '';
  deliveryDate: string;
  deliveryAddress: string;
}

export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
