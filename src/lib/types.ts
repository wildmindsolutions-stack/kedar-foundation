export interface StoreProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  unit: string;
  unitName: string;
  price: number;
  hsnCode: string;
  gstRate: number;
  imageUrl: string | null;
  inStock: boolean;
}

export interface CartItem {
  product: StoreProduct;
  quantity: number;
}

export interface FoundationCustomer {
  id: string;
  customerId: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  state: string;
  type: 'foundation';
}

export interface AuthResponse {
  accessToken: string;
  user: FoundationCustomer;
  linkedExistingCustomer?: boolean;
  profileFromErp?: boolean;
}

export interface PlacedOrder {
  id: string;
  status: string;
  customer: { name: string };
}
