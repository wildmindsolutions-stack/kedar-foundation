import Image from 'next/image';
import { Wheat } from 'lucide-react';
import { resolveProductImageUrl } from '@/lib/product-images';
import type { StoreProduct } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductImageProps {
  product: Pick<StoreProduct, 'slug' | 'name' | 'imageUrl' | 'category'>;
  className?: string;
  sizes?: string;
  priority?: boolean;
  iconClassName?: string;
}

export function ProductImage({
  product,
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  iconClassName = 'h-10 w-10',
}: ProductImageProps) {
  const src = resolveProductImageUrl(product);
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
        className="object-cover object-center"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
