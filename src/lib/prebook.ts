import { apiFetch } from './api';

export interface PrebookProduct {
  id: string;
  name: string;
  category: string;
  packSize: string | null;
  description: string | null;
  price: number;
  unit: string;
  unitName: string;
  imageUrl: string | null;
}

export interface PrebookCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
  /** Honeypot — must stay empty. */
  website: string;
}

export interface PrebookReceipt {
  bookingNo: string;
  createdAt: string;
  status: string;
  name: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string | null;
  paymentMode: string;
  paymentReceived: boolean;
  items: { productName: string; packSize: string | null; qty: number; rate: number; lineTotal: number }[];
  subtotal: number;
  total: number;
}

/** Shown when the ERP is unreachable so visitors still see the price list (booking disabled). */
export const FALLBACK_PREBOOK_PRODUCTS: PrebookProduct[] = [
  {
    "id": "wheat-aata-5kg",
    "name": "Wheat Aata (5 kg)",
    "category": "Flour",
    "packSize": "5 kg",
    "price": 200,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "Fresh stone-ground pure whole wheat atta. Soft rotis, rich flavour, 100% natural with no preservatives. 5% tax included."
  },
  {
    "id": "wheat-aata-10kg",
    "name": "Wheat Aata (10 kg)",
    "category": "Flour",
    "packSize": "10 kg",
    "price": 380,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "Fresh stone-ground pure whole wheat atta in standard 10 kg family pack. Soft rotis every day. 5% tax included."
  },
  {
    "id": "wheat-aata-25kg",
    "name": "Wheat Aata (25 kg)",
    "category": "Flour",
    "packSize": "25 kg",
    "price": 900,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "Wholesale value 25 kg bag of premium stone-ground whole wheat atta. 5% tax included."
  },
  {
    "id": "multigrain-aata-5kg",
    "name": "Multigrain Aata (5 kg)",
    "category": "Flour",
    "packSize": "5 kg",
    "price": 260,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "Healthy wholesome blend of wheat, chana, jowar, bajra, ragi and methi. High fibre, diabetic-friendly. 5% tax included."
  },
  {
    "id": "multigrain-aata-10kg",
    "name": "Multigrain Aata (10 kg)",
    "category": "Flour",
    "packSize": "10 kg",
    "price": 520,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "Nutrient-dense multigrain atta for daily family wellness in economical 10 kg pack. 5% tax included."
  },
  {
    "id": "multigrain-aata-15kg",
    "name": "Multigrain Aata (15 kg)",
    "category": "Flour",
    "packSize": "15 kg",
    "price": 780,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "15 kg monthly pack of wholesome farm-fresh multigrain atta. 5% tax included."
  },
  {
    "id": "wheat-25kg",
    "name": "Wheat (25 kg)",
    "category": "Grains",
    "packSize": "25 kg",
    "price": 550,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "Cleaned, sun-dried bold premium wheat grain. Specially graded for home flour milling and yearly storage. 5% tax included."
  },
  {
    "id": "bajra-aata-1kg",
    "name": "Bajra Aata (1 kg)",
    "category": "Flour",
    "packSize": "1 kg",
    "price": 45,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "Freshly milled pearl millet flour, gluten-free and packed with natural minerals and iron. 5% tax included."
  },
  {
    "id": "bajra-aata-5kg",
    "name": "Bajra Aata (5 kg)",
    "category": "Flour",
    "packSize": "5 kg",
    "price": 220,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "Stone-ground 5 kg bajra atta for winter rotlas and nutritious wholesome meals. 5% tax included."
  },
  {
    "id": "chanaa-besan-1kg",
    "name": "Chanaa Besan (1 kg)",
    "category": "Flour",
    "packSize": "1 kg",
    "price": 90,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "100% pure chana dal besan, finely milled, aromatic and unadulterated. Perfect for sweets, pakodas and dhokla. 5% tax included."
  },
  {
    "id": "chanaa-besan-2kg",
    "name": "Chanaa Besan (2 kg)",
    "category": "Flour",
    "packSize": "2 kg",
    "price": 180,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "2 kg pure chana dal besan. Freshly packed, rich natural golden colour and aroma. 5% tax included."
  },
  {
    "id": "chanaa-besan-5kg",
    "name": "Chanaa Besan (5 kg)",
    "category": "Flour",
    "packSize": "5 kg",
    "price": 450,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "5 kg kitchen pack of pure unadulterated chana dal besan. 5% tax included."
  },
  {
    "id": "chanaa-besan-10kg",
    "name": "Chanaa Besan (10 kg)",
    "category": "Flour",
    "packSize": "10 kg",
    "price": 890,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "10 kg wholesale pack of premium pure gram flour (besan). 5% tax included."
  },
  {
    "id": "chana-dal-2-5kg",
    "name": "Chana Dal (2.5 kg)",
    "category": "Pulses",
    "packSize": "2.5 kg",
    "price": 200,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "Unpolished premium split chana dal. High protein, naturally sweet flavour, quick cooking. 5% tax included."
  },
  {
    "id": "chana-dal-5kg",
    "name": "Chana Dal (5 kg)",
    "category": "Pulses",
    "packSize": "5 kg",
    "price": 400,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "5 kg pack of carefully sorted and cleaned split chana dal. 5% tax included."
  },
  {
    "id": "chana-dal-10kg",
    "name": "Chana Dal (10 kg)",
    "category": "Pulses",
    "packSize": "10 kg",
    "price": 800,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "10 kg family pack of premium unpolished chana dal. 5% tax included."
  },
  {
    "id": "chana-dal-20kg",
    "name": "Chana Dal (20 kg)",
    "category": "Pulses",
    "packSize": "20 kg",
    "price": 1600,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "20 kg wholesale sack of highest grade chana dal directly from Gujarat farms. 5% tax included."
  },
  {
    "id": "maiz-aata-5kg",
    "name": "Maiz Aata (5 kg)",
    "category": "Flour",
    "packSize": "5 kg",
    "price": 200,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "Traditional stone-ground yellow maize (corn) flour for authentic makki ki roti. Pure, fragrant and wholesome. 5% tax included."
  },
  {
    "id": "maiz-aata-10kg",
    "name": "Maiz Aata (10 kg)",
    "category": "Flour",
    "packSize": "10 kg",
    "price": 400,
    "unit": "bag",
    "unitName": "Bag",
    "imageUrl": null,
    "description": "10 kg pack of pure stone-ground maize atta for authentic traditional taste. 5% tax included."
  }
];

export async function fetchPrebookProducts(): Promise<{ products: PrebookProduct[]; live: boolean }> {
  try {
    const products = await apiFetch<PrebookProduct[]>('/prebook/products');
    if (products.length) return { products, live: true };
  } catch {
    // fall through to placeholder list
  }
  return { products: FALLBACK_PREBOOK_PRODUCTS, live: false };
}

/** Browser-side retry for when the server render could not reach the ERP (e.g. API waking up). */
export async function retryPrebookProducts(signal: AbortSignal): Promise<PrebookProduct[] | null> {
  for (let attempt = 0; attempt < 4 && !signal.aborted; attempt += 1) {
    try {
      const products = await apiFetch<PrebookProduct[]>('/prebook/products', {
        signal: AbortSignal.any([signal, AbortSignal.timeout(45000)]),
        cache: 'no-store',
      });
      if (products.length) return products;
      return null;
    } catch {
      // keep trying until the attempts run out
    }
  }
  return null;
}

export interface PrebookTracking extends PrebookReceipt {
  confirmedAt: string | null;
  assignedAt: string | null;
  outForDeliveryAt: string | null;
  deliveredAt: string | null;
  failedAttempts: number;
  lastFailReason: string | null;
  executiveName: string | null;
}

export function trackPrebooking(bookingNo: string, phone: string): Promise<PrebookTracking> {
  const query = new URLSearchParams({ bookingNo, phone });
  return apiFetch<PrebookTracking>(`/prebook/receipt?${query}`, { cache: 'no-store', timeoutMs: 45000 });
}

export function checkPincode(pincode: string, signal: AbortSignal) {
  return apiFetch<{ serviceable: boolean; area: string | null }>(`/prebook/pincode?pincode=${pincode}`, {
    cache: 'no-store',
    signal,
  });
}

export function cancelMyPrebooking(bookingNo: string, token: string) {
  return apiFetch('/prebook/mine/cancel', {
    method: 'POST',
    token,
    body: JSON.stringify({ bookingNo }),
    timeoutMs: 45000,
  });
}

/** Must match the server list so GST is always worked out from a real state name. */
export const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh',
  'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal',
];

export function fetchMyPrebookings(token: string): Promise<PrebookTracking[]> {
  return apiFetch<PrebookTracking[]>('/prebook/mine', { token, cache: 'no-store', timeoutMs: 45000 });
}

export function submitPrebooking(
  customer: PrebookCustomer,
  items: { productId: string; qty: number }[],
  token: string,
): Promise<PrebookReceipt> {
  return apiFetch<PrebookReceipt>('/prebook', {
    method: 'POST',
    token,
    body: JSON.stringify({ ...customer, items }),
    timeoutMs: 60000,
  });
}
