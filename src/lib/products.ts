import { apiFetch } from './api';
import { resolveProductImageUrl } from './product-images';
import type { StoreProduct } from './types';

/** Storefront catalogue. Pack names match the branded 25 kg bags. */
export const FALLBACK_PRODUCTS: StoreProduct[] = [
  { id: 'seed-wheat', slug: 'wheat', name: 'Gehu Whole Wheat', category: 'Grains', unit: 'qtl', unitName: 'Quintal', price: 2200, hsnCode: '1001', gstRate: 0, imageUrl: null, inStock: true, stock: 100 },
  { id: 'seed-bajra', slug: 'bajra', name: 'Bajra Pearl', category: 'Grains', unit: 'qtl', unitName: 'Quintal', price: 1800, hsnCode: '1008', gstRate: 0, imageUrl: null, inStock: true, stock: 80 },
  { id: 'seed-bajra-atta', slug: 'bajra-atta', name: 'Bajra Atta', category: 'Flour', unit: 'bag', unitName: 'Bag', price: 450, hsnCode: '1102', gstRate: 5, imageUrl: null, inStock: true, stock: 200 },
  { id: 'seed-chana-besan', slug: 'chana-besan', name: 'Chana Besan', category: 'Flour', unit: 'bag', unitName: 'Bag', price: 450, hsnCode: '1106', gstRate: 5, imageUrl: null, inStock: true, stock: 200 },
  { id: 'seed-chana-dal', slug: 'chana-dal', name: 'Chana Dal', category: 'Pulses', unit: 'qtl', unitName: 'Quintal', price: 5500, hsnCode: '0713', gstRate: 0, imageUrl: null, inStock: true, stock: 60 },
  { id: 'seed-moong', slug: 'moong', name: 'Moong Whole', category: 'Pulses', unit: 'qtl', unitName: 'Quintal', price: 8500, hsnCode: '0713', gstRate: 0, imageUrl: null, inStock: true, stock: 45 },
  { id: 'seed-toor', slug: 'toor-dal', name: 'Toor Dal', category: 'Pulses', unit: 'qtl', unitName: 'Quintal', price: 12000, hsnCode: '0713', gstRate: 0, imageUrl: null, inStock: true, stock: 40 },
  { id: 'seed-flour', slug: 'wheat-flour', name: 'Gehu Atta', category: 'Flour', unit: 'bag', unitName: 'Bag', price: 450, hsnCode: '1101', gstRate: 5, imageUrl: null, inStock: true, stock: 200 },
  { id: 'seed-wafers', slug: 'potato-wafers', name: 'Potato Wafers', category: 'Snacks', unit: 'pkt', unitName: 'Packet', price: 20, hsnCode: '1905', gstRate: 12, imageUrl: null, inStock: true, stock: 500 },
  { id: 'seed-chips', slug: 'potato-chips', name: 'Potato Chips', category: 'Snacks', unit: 'pkt', unitName: 'Packet', price: 25, hsnCode: '1905', gstRate: 12, imageUrl: null, inStock: true, stock: 500 },
  { id: 'seed-mustard', slug: 'mustard', name: 'Rai Mustard', category: 'Spices', unit: 'kg', unitName: 'Kilogram', price: 120, hsnCode: '1207', gstRate: 5, imageUrl: null, inStock: true, stock: 150 },
  { id: 'seed-cumin', slug: 'cumin', name: 'Jeera Cumin', category: 'Spices', unit: 'kg', unitName: 'Kilogram', price: 450, hsnCode: '0909', gstRate: 5, imageUrl: null, inStock: true, stock: 100 },
];

/** Branded names from the pack artwork, keyed by catalogue slug. */
const DISPLAY_NAMES: Record<string, string> = {
  wheat: 'Gehu Whole Wheat',
  bajra: 'Bajra Pearl',
  'bajra-atta': 'Bajra Atta',
  'chana-besan': 'Chana Besan',
  'chana-dal': 'Chana Dal',
  moong: 'Moong Whole',
  'toor-dal': 'Toor Dal',
  'wheat-flour': 'Gehu Atta',
  mustard: 'Rai Mustard',
  cumin: 'Jeera Cumin',
};

const PRODUCT_DESCRIPTIONS: Record<string, string> = {
  wheat: 'Premium whole wheat, 100% natural and carefully cleaned. Packed in 25 kg bags.',
  bajra: 'Pearl millet grain, pure and carefully cleaned. Packed in 25 kg bags.',
  'bajra-atta': 'Pearl millet flour, 100% natural and high in nutrition. Packed in 25 kg bags.',
  'chana-besan': 'Gram flour, 100% natural and finely milled. Packed in 25 kg bags.',
  'chana-dal': 'Split chickpeas, carefully cleaned and naturally pure. Packed in 25 kg bags.',
  'potato-wafers': 'Crisp potato wafers made from quality potatoes.',
  'potato-chips': 'Crisp potato chips made from quality potatoes.',
  moong: 'Whole green gram, carefully cleaned and naturally pure. Packed in 25 kg bags.',
  'toor-dal': 'Toor dal, carefully cleaned and naturally pure. Packed in 25 kg bags.',
  'wheat-flour': 'Wheat flour, 100% natural and finely milled. Packed in 25 kg bags.',
  mustard: 'Mustard seed, aromatic and carefully cleaned. Packed in 25 kg bags.',
  cumin: 'Cumin seed, aromatic and carefully cleaned. Packed in 25 kg bags.',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Grains: 'Premium grains sourced from trusted farmers with consistent quality and hygienic handling.',
  Pulses: 'Nutritious pulses processed and packed to retain freshness and natural goodness.',
  Flour: 'Finely milled wheat flour ideal for households, bakeries, and food businesses.',
  Snacks: 'Crisp, flavourful snacks made from quality ingredients for everyday enjoyment.',
  Spices: 'Aromatic spices selected for purity, flavour, and culinary excellence.',
  'Other Agricultural Products': 'Value-added agricultural products supporting farmers and communities.',
};

export function getProductDescription(product: StoreProduct): string {
  return PRODUCT_DESCRIPTIONS[product.slug]
    ?? CATEGORY_DESCRIPTIONS[product.category]
    ?? 'Quality agricultural product from Kedar Foundation — trusted sourcing and careful processing.';
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

type RawCategory = string | { name?: string } | null | undefined;
type RawUnit = string | { name?: string; symbol?: string } | null | undefined;

type RawStoreProduct = Omit<Partial<StoreProduct>, 'category' | 'unit'> & {
  category?: RawCategory;
  categoryName?: string;
  unit?: RawUnit;
};

export function getProductCategoryName(category: RawCategory): string {
  if (typeof category === 'string') return category.trim();
  if (category && typeof category === 'object' && category.name) {
    return category.name.trim();
  }
  return '';
}

function normalizeStoreProduct(raw: RawStoreProduct): StoreProduct | null {
  if (!raw.id || !raw.name) return null;

  const category =
    getProductCategoryName(raw.category) ||
    (typeof raw.categoryName === 'string' ? raw.categoryName.trim() : '');

  const unit =
    typeof raw.unit === 'string'
      ? raw.unit
      : raw.unit?.symbol?.trim() || '';

  const unitName =
    raw.unitName?.trim() ||
    (typeof raw.unit === 'object' && raw.unit?.name ? raw.unit.name.trim() : '') ||
    unit;

  const slug = raw.slug?.trim() || raw.id;

  return {
    id: raw.id,
    slug,
    name: DISPLAY_NAMES[slug] || raw.name,
    category: category || 'Other',
    unit,
    unitName,
    price: Number(raw.price ?? 0),
    hsnCode: raw.hsnCode ?? '',
    gstRate: Number(raw.gstRate ?? 0),
    imageUrl: resolveProductImageUrl({
      slug,
      name: DISPLAY_NAMES[slug] || raw.name,
      imageUrl: raw.imageUrl ?? null,
    }),
    inStock: Boolean(raw.inStock),
    stock: Number(raw.stock ?? 0),
  };
}

function normalizeStoreProducts(rawProducts: RawStoreProduct[]): StoreProduct[] {
  return rawProducts
    .map((product) => normalizeStoreProduct(product))
    .filter((product): product is StoreProduct => product !== null);
}

const RETIRED_SLUGS = new Set(['chana']);

function withLocalCatalogue(products: StoreProduct[]): StoreProduct[] {
  const current = products.filter((product) => !RETIRED_SLUGS.has(product.slug));
  const slugs = new Set(current.map((product) => product.slug));
  const missing = FALLBACK_PRODUCTS.filter((product) => !slugs.has(product.slug));
  return missing.length > 0 ? [...current, ...missing] : current;
}

export async function fetchStoreProducts(): Promise<StoreProduct[]> {
  try {
    const products = normalizeStoreProducts(
      await apiFetch<RawStoreProduct[]>('/store/products'),
    );
    return products.length > 0 ? withLocalCatalogue(products) : FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function fetchStoreProduct(id: string): Promise<StoreProduct | null> {
  try {
    const product = normalizeStoreProduct(
      await apiFetch<RawStoreProduct>(`/store/products/${id}`),
    );
    if (product && RETIRED_SLUGS.has(product.slug)) return null;
    return product;
  } catch {
    return FALLBACK_PRODUCTS.find((p) => p.id === id || p.slug === id) ?? null;
  }
}
