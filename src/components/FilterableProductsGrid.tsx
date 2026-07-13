'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { getProductCategoryName } from '@/lib/products';
import type { StoreProduct } from '@/lib/types';
import { cn } from '@/lib/utils';

const CATEGORY_ORDER = ['Grains', 'Pulses', 'Spices', 'Snacks', 'Flour'];

interface FilterableProductsGridProps {
  products: StoreProduct[];
}

export function FilterableProductsGrid({ products }: FilterableProductsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const names: string[] = [];

    for (const product of products) {
      const name = getProductCategoryName(product.category);
      const key = name.toLowerCase();
      if (name && !seen.has(key)) {
        seen.add(key);
        names.push(name);
      }
    }

    const ordered = CATEGORY_ORDER.filter((c) =>
      names.some((name) => name.toLowerCase() === c.toLowerCase()),
    );
    const rest = names.filter(
      (name) => !CATEGORY_ORDER.some((c) => c.toLowerCase() === name.toLowerCase()),
    );
    return [...ordered, ...rest];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    const selected = selectedCategory.toLowerCase();
    return products.filter(
      (p) => getProductCategoryName(p.category).toLowerCase() === selected,
    );
  }, [products, selectedCategory]);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory(null)}
          className={cn(
            'rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors',
            selectedCategory === null
              ? 'border-kedar-gold bg-kedar-gold text-kedar-navy'
              : 'border-kedar-gold/30 bg-kedar-gold/10 text-kedar-navy hover:border-kedar-gold/50',
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors',
              selectedCategory === category
                ? 'border-kedar-gold bg-kedar-gold text-kedar-navy'
                : 'border-kedar-gold/30 bg-kedar-gold/10 text-kedar-navy hover:border-kedar-gold/50',
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="py-12 text-center text-kedar-navy/60">
          No products found in this category.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
