'use client';

import { ProductImage } from '@/components/ProductImage';
import { ProductViewCarousel } from '@/components/ProductViewCarousel';
import { getProductGallery } from '@/lib/product-images';
import type { StoreProduct } from '@/lib/types';

interface ProductGalleryProps {
  product: Pick<StoreProduct, 'slug' | 'name' | 'imageUrl' | 'category'>;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = getProductGallery(product);

  if (images.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-hero-gradient shadow-card">
        <ProductImage
          product={product}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          iconClassName="h-16 w-16"
        />
      </div>
    );
  }

  return <ProductViewCarousel product={product} variant="detail" priority />;
}
