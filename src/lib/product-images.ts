/** Local product images under /public/images/products/ */
const PACK_SLUGS = new Set([
  'wheat',
  'bajra',
  'bajra-atta',
  'chana-besan',
  'chana-dal',
  'moong',
  'toor-dal',
  'wheat-flour',
  'potato-wafers',
  'potato-chips',
  'mustard',
  'cumin',
]);

const PACK_VIEWS = [
  { suffix: '', label: 'Front' },
  { suffix: '-back', label: 'Back' },
  { suffix: '-presentation', label: 'Presentation' },
  { suffix: '-raw', label: 'Raw' },
] as const;

export interface ProductGalleryImage {
  src: string;
  label: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getProductSlug(product: { slug?: string; name: string }): string {
  return product.slug?.trim() || slugify(product.name);
}

export function isPackShot(product: { slug?: string; name: string }): boolean {
  return PACK_SLUGS.has(getProductSlug(product));
}

/** Presentation view used on catalogue cards so the full pack is shown. */
export function getProductPresentationPath(product: { slug?: string; name: string }): string | null {
  const slug = getProductSlug(product);
  if (PACK_SLUGS.has(slug)) {
    return `/images/products/${slug}-presentation.avif`;
  }
  return null;
}

/** Front pack shot used as the catalogue thumbnail. */
export function getProductImagePath(product: { slug?: string; name: string }): string | null {
  const slug = getProductSlug(product);
  if (PACK_SLUGS.has(slug)) {
    return `/images/products/${slug}.avif`;
  }
  return null;
}

/** Front, back, presentation, and raw views. Front is always first. */
export function getProductGallery(product: { slug?: string; name: string }): ProductGalleryImage[] {
  const slug = getProductSlug(product);
  if (!PACK_SLUGS.has(slug)) return [];
  return PACK_VIEWS.map((view) => ({
    src: `/images/products/${slug}${view.suffix}.avif`,
    label: view.label,
  }));
}

/** Prefer the local pack shot so the storefront shows the branded bags. */
export function resolveProductImageUrl(product: {
  slug?: string;
  name: string;
  imageUrl?: string | null;
}): string | null {
  const local = getProductImagePath(product);
  if (local) return local;
  if (product.imageUrl?.trim()) return product.imageUrl.trim();
  return null;
}
