/** Local AVIF product images under /public/images/products/ */
const PRODUCT_IMAGE_SLUGS = new Set([
  'wheat',
  'bajra',
  'chana',
  'moong',
  'toor-dal',
  'wheat-flour',
  'potato-wafers',
  'potato-chips',
  'mustard',
  'cumin',
]);

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Resolve storefront image path for a product (AVIF in /public/images/products). */
export function getProductImagePath(product: { slug?: string; name: string }): string | null {
  const slug = product.slug?.trim() || slugify(product.name);
  if (PRODUCT_IMAGE_SLUGS.has(slug)) {
    return `/images/products/${slug}.avif`;
  }
  return null;
}

/** Prefer API imageUrl, then local AVIF asset. */
export function resolveProductImageUrl(product: {
  slug?: string;
  name: string;
  imageUrl?: string | null;
}): string | null {
  if (product.imageUrl?.trim()) return product.imageUrl.trim();
  return getProductImagePath(product);
}
