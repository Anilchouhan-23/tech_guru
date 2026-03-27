'use client';

import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import SoftwareCard from '@/components/SoftwareCard';
import StarRating from '@/components/StarRating';
import { categories } from '@/data/categories';
import { getFeaturedSoftware } from '@/data/software';
import { testimonials } from '@/data/testimonials';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const featuredSoftware = getFeaturedSoftware();

  const handleSearch = (query) => {
    if (query.trim()) {
      router.push(`/software?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find the Perfect Software for Your Business
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Discover, compare, and choose the right software tools. Read honest reviews,
            compare features side-by-side, and find the perfect solution for your needs.
          </p>
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar onSearch={handleSearch} size="large" />
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div>
              <p className="text-3xl md:text-4xl font-bold">15+</p>
              <p className="text-white/80 text-sm md:text-base">Software</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">7</p>
              <p className="text-white/80 text-sm md:text-base">Categories</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold">1000+</p>
              <p className="text-white/80 text-sm md:text-base">Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse software by category to find the tools that fit your business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Software Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Software
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Top-rated software trusted by thousands of businesses worldwide.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSoftware.map((software) => (
              <SoftwareCard key={software.slug} software={software} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/software"
              className="inline-block px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              View All Software
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from businesses that found their perfect software through TechGuru.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.author}
                </div>
                {testimonial.role && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Software?
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of businesses that use TechGuru to discover and compare
            the best software solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/software"
              className="px-8 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Software
            </Link>
            <Link
              href="/compare"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Compare Software
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
