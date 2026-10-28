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

export function getMatchedPackSlug(name: string): string | null {
  const n = name.toLowerCase();
  if (n.includes('multigrain')) return 'wheat-flour';
  if (n.includes('wheat') && (n.includes('aata') || n.includes('atta') || n.includes('flour'))) return 'wheat-flour';
  if (n.includes('bajra') && (n.includes('aata') || n.includes('atta') || n.includes('flour'))) return 'bajra-atta';
  if (n.includes('besan')) return 'chana-besan';
  if (n.includes('chana') && n.includes('dal')) return 'chana-dal';
  if (n.includes('maiz') || n.includes('corn') || n.includes('makki')) return 'wheat-flour';
  if (n.includes('wheat') || n.includes('gehu')) return 'wheat';
  if (n.includes('bajra')) return 'bajra';
  if (n.includes('toor')) return 'toor-dal';
  if (n.includes('moong')) return 'moong';
  if (n.includes('mustard')) return 'mustard';
  if (n.includes('cumin')) return 'cumin';
  if (n.includes('wafer')) return 'potato-wafers';
  if (n.includes('chip')) return 'potato-chips';
  return null;
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
  const slug = getProductSlug(product);
  if (PACK_SLUGS.has(slug)) return true;
  const matched = getMatchedPackSlug(product.name || slug);
  return Boolean(matched && PACK_SLUGS.has(matched));
}

/** Presentation view used on catalogue cards so the full pack is shown. */
export function getProductPresentationPath(product: { slug?: string; name: string }): string | null {
  const slug = getProductSlug(product);
  if (PACK_SLUGS.has(slug)) {
    return `/images/products/${slug}-presentation.avif`;
  }
  const matched = getMatchedPackSlug(product.name || slug);
  if (matched && PACK_SLUGS.has(matched)) {
    return `/images/products/${matched}-presentation.avif`;
  }
  return null;
}

/** Front pack shot used as the catalogue thumbnail. */
export function getProductImagePath(product: { slug?: string; name: string }): string | null {
  const slug = getProductSlug(product);
  if (PACK_SLUGS.has(slug)) {
    return `/images/products/${slug}.avif`;
  }
  const matched = getMatchedPackSlug(product.name || slug);
  if (matched && PACK_SLUGS.has(matched)) {
    return `/images/products/${matched}.avif`;
  }
  return null;
}

/** Front, back, presentation, and raw views. Front is always first. */
export function getProductGallery(product: { slug?: string; name: string }): ProductGalleryImage[] {
  let slug = getProductSlug(product);
  if (!PACK_SLUGS.has(slug)) {
    const matched = getMatchedPackSlug(product.name || slug);
    if (matched && PACK_SLUGS.has(matched)) {
      slug = matched;
    } else {
      return [];
    }
  }
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
