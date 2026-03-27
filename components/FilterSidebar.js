'use client';

import { useState } from 'react';

const ratingOptions = [
  { label: '4+ Stars', value: 4 },
  { label: '3+ Stars', value: 3 },
  { label: '2+ Stars', value: 2 },
  { label: '1+ Stars', value: 1 },
  { label: 'All', value: 0 },
];

export default function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedRating,
  onRatingChange,
}) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);

  function handleClearFilters() {
    onCategoryChange(null);
    onRatingChange(0);
  }

  const hasActiveFilters = selectedCategory || selectedRating > 0;

  return (
    <aside className="w-full">
      {/* Categories Section */}
      <div className="mb-6">
        <button
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
            Categories
          </h3>
          <svg
            className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform md:hidden ${
              isCategoriesOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`space-y-1 ${isCategoriesOpen ? 'block' : 'hidden md:block'}`}>
          <button
            onClick={() => onCategoryChange(null)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !selectedCategory
                ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onCategoryChange(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating Section */}
      <div className="mb-6">
        <button
          onClick={() => setIsRatingOpen(!isRatingOpen)}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
            Minimum Rating
          </h3>
          <svg
            className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform md:hidden ${
              isRatingOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`space-y-1 ${isRatingOpen ? 'block' : 'hidden md:block'}`}>
          {ratingOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onRatingChange(option.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                selectedRating === option.value
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {option.value > 0 && (
                <span className="flex items-center">
                  {[...Array(option.value)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </span>
              )}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Clear Filters
        </button>
      )}
    </aside>
  );
}
