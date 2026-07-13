'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, ShoppingCart } from 'lucide-react';
import { ProductImage } from '@/components/ProductImage';
import { useCart } from '@/contexts/CartContext';import { formatPrice, getProductCategoryName, getProductDescription } from '@/lib/products';
import type { StoreProduct } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: StoreProduct;
  compact?: boolean;
  className?: string;
}

export function ProductCard({ product, compact = false, className }: ProductCardProps) {
  const { addItem } = useCart();
  const [toast, setToast] = useState('');
  const categoryName = getProductCategoryName(product.category);
  const description = getProductDescription(product);

  function handleAdd() {
    const result = addItem(product);
    if (result.message) {
      setToast(result.message);
      setTimeout(() => setToast(''), 4000);
    }
  }

  return (
    <article className={cn('card flex flex-col !p-0 overflow-hidden', className)}>
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-hero-gradient">
          <ProductImage product={product} sizes="(max-width: 640px) 100vw, 33vw" className="absolute inset-0" />
          {!product.inStock && (            <span className="absolute right-3 top-3 rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
              Out of stock
            </span>
          )}
        </div>
      </Link>

      <div className={cn('flex flex-1 flex-col', compact ? 'p-4' : 'p-5')}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-kedar-gold-dark">
          {categoryName}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="mt-1 font-serif text-lg font-semibold text-kedar-navy hover:text-kedar-gold-dark">
            {product.name}
          </h3>
        </Link>
        {!compact && (
          <p className="mt-2 line-clamp-2 text-sm text-kedar-navy/65">{description}</p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-kedar-navy/55">
          <span>HSN {product.hsnCode}</span>
          <span>·</span>
          <span>GST {product.gstRate}%</span>
          <span>·</span>
          <span>Per {product.unitName}</span>
          {product.inStock && (
            <>
              <span>·</span>
              <span className="font-medium text-emerald-700">{Math.floor(product.stock)} {product.unit} in stock</span>
            </>
          )}
        </div>
        {toast && (
          <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-amber-50 px-2 py-1.5 text-[11px] text-amber-800">
            <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
            {toast}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div>
            <p className="font-serif text-xl font-bold text-kedar-navy">
              {formatPrice(product.price)}
            </p>
            <p className="text-[10px] text-kedar-navy/50">/{product.unit}</p>
          </div>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={handleAdd}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all',
              product.inStock
                ? 'bg-kedar-gold text-kedar-navy hover:bg-kedar-gold-light'
                : 'cursor-not-allowed bg-kedar-navy/10 text-kedar-navy/40',
            )}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

interface AddToCartButtonProps {
  product: StoreProduct;
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [toast, setToast] = useState('');

  function handleAdd() {
    const result = addItem(product);
    if (result.message) {
      setToast(result.message);
      setTimeout(() => setToast(''), 4000);
    }
  }

  return (
    <div>
      {toast && (
        <p className="mb-3 flex items-start gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {toast}
        </p>
      )}
      <button
        type="button"
        disabled={!product.inStock}
        onClick={handleAdd}
        className={cn(
          'btn-primary',
          !product.inStock && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}

export function ProductDetailList({ product }: { product: StoreProduct }) {
  const details = [
    { label: 'Category', value: getProductCategoryName(product.category) },
    { label: 'Unit', value: `${product.unitName} (${product.unit})` },
    { label: 'HSN Code', value: product.hsnCode },
    { label: 'GST Rate', value: `${product.gstRate}%` },
    { label: 'Availability', value: product.inStock ? `In stock (${Math.floor(product.stock)} ${product.unit})` : 'Out of stock' },
  ];

  return (
    <ul className="space-y-3">
      {details.map(({ label, value }) => (
        <li key={label} className="flex items-start gap-2 text-sm">
          <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-kedar-gold/20" />
          <span>
            <strong className="text-kedar-navy">{label}:</strong>{' '}
            <span className="text-kedar-navy/75">{value}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
