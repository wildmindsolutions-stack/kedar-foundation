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
  stock: number;
}

export interface CartItem {
  product: StoreProduct;
  quantity: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}
