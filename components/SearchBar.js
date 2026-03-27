'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function SearchBar({
  onSearch,
  placeholder = 'Search software...',
  size = 'lg',
}) {
  const [query, setQuery] = useState('');
  const timerRef = useRef(null);

  const debouncedSearch = useCallback(
    (value) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        if (onSearch) onSearch(value);
      }, 300);
    },
    [onSearch]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const isLg = size === 'lg';

  return (
    <div className="relative w-full">
      {/* Magnifying glass icon */}
      <div
        className={`absolute inset-y-0 left-0 flex items-center pointer-events-none ${
          isLg ? 'pl-4' : 'pl-3'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`text-gray-400 dark:text-gray-500 ${
            isLg ? 'h-5 w-5' : 'h-4 w-4'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
          isLg
            ? 'pl-12 pr-4 py-3 text-base sm:text-lg'
            : 'pl-9 pr-3 py-1.5 text-sm'
        }`}
      />
    </div>
  );
}
