import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AddToCartButton, ProductDetailList } from '@/components/ProductCard';
import { ProductImage } from '@/components/ProductImage';
import { PageHero } from '@/components/InitiativeCard';
import {
  fetchStoreProduct, fetchStoreProducts, formatPrice, getProductDescription,
} from '@/lib/products';

export async function generateStaticParams() {
  const products = await fetchStoreProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await fetchStoreProduct(params.id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: getProductDescription(product),
  };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await fetchStoreProduct(params.id);
  if (!product) notFound();

  const description = getProductDescription(product);

  return (
    <>
      <PageHero
        eyebrow={product.category}
        title={product.name}
        subtitle={description}
      />

      <section className="section-padding">
        <div className="section-container">
          <Link
            href="/products"
            className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-kedar-gold-dark hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-hero-gradient shadow-card">
              <ProductImage
                product={product}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                iconClassName="h-16 w-16"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-kedar-gold-dark">
                {product.category}
              </p>
              <h1 className="mt-2 font-serif text-3xl font-bold text-kedar-navy sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-kedar-navy/75">{description}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-kedar-navy">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-kedar-navy/55">per {product.unit}</span>
              </div>

              <div className="mt-8">
                <AddToCartButton product={product} />
              </div>

              <div className="mt-10 rounded-2xl border border-kedar-gold/20 bg-kedar-gold/5 p-6">
                <h2 className="font-serif text-lg font-semibold text-kedar-navy">Product Details</h2>
                <div className="mt-4">
                  <ProductDetailList product={product} />
                </div>
              </div>

              <p className="mt-6 text-sm text-kedar-navy/55">
                For bulk orders, institutional supply, or export enquiries, please{' '}
                <Link href="/contact" className="font-medium text-kedar-gold-dark hover:underline">
                  contact our team
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
