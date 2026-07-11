'use client';

import Link from 'next/link';
import { CheckCircle, ShoppingCart, Wheat } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice, getProductDescription } from '@/lib/products';
import type { StoreProduct } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: StoreProduct;
  compact?: boolean;
  className?: string;
}

export function ProductCard({ product, compact = false, className }: ProductCardProps) {
  const { addItem } = useCart();
  const description = getProductDescription(product);

  return (
    <article className={cn('card flex flex-col !p-0 overflow-hidden', className)}>
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative flex aspect-[4/3] items-center justify-center bg-hero-gradient">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-center text-white">
              <Wheat className="mx-auto mb-2 h-10 w-10 text-kedar-gold" />
              <p className="text-xs uppercase tracking-widest text-kedar-gold/80">{product.category}</p>
            </div>
          )}
          {!product.inStock && (
            <span className="absolute right-3 top-3 rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
              Out of stock
            </span>
          )}
        </div>
      </Link>

      <div className={cn('flex flex-1 flex-col', compact ? 'p-4' : 'p-5')}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-kedar-gold-dark">
          {product.category}
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
        </div>
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
            onClick={() => addItem(product)}
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

  return (
    <button
      type="button"
      disabled={!product.inStock}
      onClick={() => addItem(product)}
      className={cn(
        'btn-primary',
        !product.inStock && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
    </button>
  );
}

export function ProductDetailList({ product }: { product: StoreProduct }) {
  const details = [
    { label: 'Category', value: product.category },
    { label: 'Unit', value: `${product.unitName} (${product.unit})` },
    { label: 'HSN Code', value: product.hsnCode },
    { label: 'GST Rate', value: `${product.gstRate}%` },
    { label: 'Availability', value: product.inStock ? `In stock (${product.stock} ${product.unit})` : 'Out of stock' },
  ];

  return (
    <ul className="space-y-3">
      {details.map(({ label, value }) => (
        <li key={label} className="flex items-start gap-2 text-sm">
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-kedar-gold" />
          <span>
            <strong className="text-kedar-navy">{label}:</strong>{' '}
            <span className="text-kedar-navy/75">{value}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
