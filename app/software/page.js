'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { softwareList } from '@/data/software';
import { categories } from '@/data/categories';
import SoftwareCard from '@/components/SoftwareCard';
import FilterSidebar from '@/components/FilterSidebar';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';

const ITEMS_PER_PAGE = 6;

function SoftwareListingContent() {
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || null
  );
  const [selectedRating, setSelectedRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedRating, searchQuery]);

  const filteredSoftware = useMemo(() => {
    return softwareList.filter((sw) => {
      // Category filter
      if (selectedCategory && sw.category !== selectedCategory) return false;

      // Rating filter
      if (selectedRating > 0 && sw.rating < selectedRating) return false;

      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = sw.name.toLowerCase().includes(q);
        const matchesDesc = sw.shortDescription.toLowerCase().includes(q);
        const matchesCategory = sw.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedRating, searchQuery]);

  const totalPages = Math.ceil(filteredSoftware.length / ITEMS_PER_PAGE);
  const paginatedSoftware = filteredSoftware.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Browse Software
        </h1>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={setSearchQuery} placeholder="Search software..." />
        </div>

        {/* Result Count */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Showing {filteredSoftware.length} of {softwareList.length} software
        </p>

        {/* Main Layout: Sidebar + Grid */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar - 1/4 width */}
          <div className="w-full md:w-1/4">
            <div className="card p-5 sticky top-24">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
              />
            </div>
          </div>

          {/* Software Grid - 3/4 width */}
          <div className="w-full md:w-3/4">
            {paginatedSoftware.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedSoftware.map((sw) => (
                    <SoftwareCard key={sw.id} software={sw} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No software found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your filters or search query.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SoftwarePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
          <div className="animate-pulse text-gray-500 dark:text-gray-400">
            Loading software...
          </div>
        </div>
      }
    >
      <SoftwareListingContent />
    </Suspense>
  );
}
