import Hero from '@/components/hero';
import FeaturedProducts from '@/components/featured-products';
import CategoryGrid from '@/components/category-grid';
import Testimonials from '@/components/testimonials';
import Newsletter from '@/components/newsletter';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <FeaturedProducts />
      <CategoryGrid />
      <Testimonials />
      <Newsletter />
    </div>
  );
}