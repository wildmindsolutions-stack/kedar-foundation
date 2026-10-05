import Image from 'next/image';
import { Wheat } from 'lucide-react';
import { getProductPresentationPath, resolveProductImageUrl } from '@/lib/product-images';
import type { StoreProduct } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  product: Pick<StoreProduct, 'slug' | 'name' | 'imageUrl' | 'category'>;
  className?: string;
  sizes?: string;
  priority?: boolean;
  iconClassName?: string;
  /** Catalogue cards use the presentation shot, fitted so the whole pack shows. */
  presentation?: boolean;
}

export function ProductImage({
  product,
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  iconClassName = 'h-10 w-10',
  presentation = false,
}: ProductImageProps) {
  const src = presentation
    ? getProductPresentationPath(product) ?? resolveProductImageUrl(product)
    : resolveProductImageUrl(product);
  const category =
    typeof product.category === 'string' ? product.category : 'Product';

  if (!src) {
    return (
      <div className={cn('flex h-full w-full items-center justify-center bg-hero-gradient text-white', className)}>
        <div className="text-center">
          <Wheat className={cn('mx-auto mb-2 text-kedar-gold', iconClassName)} />
          <p className="text-xs uppercase tracking-widest text-kedar-gold/80">{category}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      <Image
        src={src}
        alt={product.name}
        fill
        className={presentation ? 'object-contain object-center p-2' : 'object-cover object-center'}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
