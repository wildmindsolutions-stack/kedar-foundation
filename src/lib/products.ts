import { apiFetch } from './api';
import type { StoreProduct } from './types';

/** Matches ERP seed data — used when the API is unavailable. */
export const FALLBACK_PRODUCTS: StoreProduct[] = [
  { id: 'seed-wheat', slug: 'wheat', name: 'Wheat', category: 'Grains', unit: 'qtl', unitName: 'Quintal', price: 2200, hsnCode: '1001', gstRate: 0, imageUrl: null, inStock: true, stock: 100 },
  { id: 'seed-bajra', slug: 'bajra', name: 'Bajra', category: 'Grains', unit: 'qtl', unitName: 'Quintal', price: 1800, hsnCode: '1008', gstRate: 0, imageUrl: null, inStock: true, stock: 80 },
  { id: 'seed-chana', slug: 'chana', name: 'Chana', category: 'Pulses', unit: 'qtl', unitName: 'Quintal', price: 5500, hsnCode: '0713', gstRate: 0, imageUrl: null, inStock: true, stock: 60 },
  { id: 'seed-moong', slug: 'moong', name: 'Moong', category: 'Pulses', unit: 'qtl', unitName: 'Quintal', price: 8500, hsnCode: '0713', gstRate: 0, imageUrl: null, inStock: true, stock: 45 },
  { id: 'seed-toor', slug: 'toor-dal', name: 'Toor Dal', category: 'Pulses', unit: 'qtl', unitName: 'Quintal', price: 12000, hsnCode: '0713', gstRate: 0, imageUrl: null, inStock: true, stock: 40 },
  { id: 'seed-flour', slug: 'wheat-flour', name: 'Wheat Flour', category: 'Flour', unit: 'bag', unitName: 'Bag', price: 450, hsnCode: '1101', gstRate: 5, imageUrl: null, inStock: true, stock: 200 },
  { id: 'seed-wafers', slug: 'potato-wafers', name: 'Potato Wafers', category: 'Snacks', unit: 'pkt', unitName: 'Packet', price: 20, hsnCode: '1905', gstRate: 12, imageUrl: null, inStock: true, stock: 500 },
  { id: 'seed-chips', slug: 'potato-chips', name: 'Potato Chips', category: 'Snacks', unit: 'pkt', unitName: 'Packet', price: 25, hsnCode: '1905', gstRate: 12, imageUrl: null, inStock: true, stock: 500 },
  { id: 'seed-mustard', slug: 'mustard', name: 'Mustard', category: 'Spices', unit: 'kg', unitName: 'Kilogram', price: 120, hsnCode: '1207', gstRate: 5, imageUrl: null, inStock: true, stock: 150 },
  { id: 'seed-cumin', slug: 'cumin', name: 'Cumin', category: 'Spices', unit: 'kg', unitName: 'Kilogram', price: 450, hsnCode: '0909', gstRate: 5, imageUrl: null, inStock: true, stock: 100 },
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Grains: 'Premium grains sourced from trusted farmers with consistent quality and hygienic handling.',
  Pulses: 'Nutritious pulses processed and packed to retain freshness and natural goodness.',
  Flour: 'Finely milled wheat flour ideal for households, bakeries, and food businesses.',
  Snacks: 'Crisp, flavourful snacks made from quality ingredients for everyday enjoyment.',
  Spices: 'Aromatic spices selected for purity, flavour, and culinary excellence.',
  'Other Agricultural Products': 'Value-added agricultural products supporting farmers and communities.',
};

export function getProductDescription(product: StoreProduct): string {
  return CATEGORY_DESCRIPTIONS[product.category]
    ?? 'Quality agricultural product from Kedar Foundation — trusted sourcing and careful processing.';
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function fetchStoreProducts(): Promise<StoreProduct[]> {
  try {
    const products = await apiFetch<StoreProduct[]>('/store/products');
    return products.length > 0 ? products : FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function fetchStoreProduct(id: string): Promise<StoreProduct | null> {
  try {
    const product = await apiFetch<StoreProduct>(`/store/products/${id}`);
    return product;
  } catch {
    return FALLBACK_PRODUCTS.find((p) => p.id === id || p.slug === id) ?? null;
  }
}
