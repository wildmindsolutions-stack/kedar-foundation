import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { SITE } from '@/lib/content';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz'],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Empowering Communities, Enriching Lives`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Kedar Foundation empowers youth, farmers, women, and rural communities through education, sustainable agriculture, entrepreneurship, and premium wheat products rooted in tradition and excellence.',
  keywords: [
    'Kedar Foundation',
    'premium wheat',
    'organic farming',
    'rural development',
    'women empowerment',
    'Ahmedabad',
    'social welfare',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} font-sans`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
