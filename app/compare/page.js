'use client';

import { useState } from 'react';
import { softwareList } from '@/data/software';
import ComparisonTable from '@/components/ComparisonTable';

export default function ComparePage() {
  const [selectors, setSelectors] = useState([{ id: 1, value: '' }, { id: 2, value: '' }]);

  const selectedSoftware = selectors
    .map((s) => softwareList.find((sw) => sw.slug === s.value))
    .filter(Boolean);

  function handleSelect(id, value) {
    setSelectors((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)));
  }

  function addSelector() {
    if (selectors.length >= 3) return;
    const nextId = Math.max(...selectors.map((s) => s.id)) + 1;
    setSelectors((prev) => [...prev, { id: nextId, value: '' }]);
  }

  function removeSelector(id) {
    if (selectors.length <= 2) return;
    setSelectors((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Compare Software Side by Side
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Select up to 3 software products to compare features, pricing, and ratings side by side.
        </p>
      </div>

      {/* Selectors */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectors.map((selector, index) => (
            <div key={selector.id} className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Software {index + 1}
              </label>
              <div className="flex gap-2">
                <select
                  value={selector.value}
                  onChange={(e) => handleSelect(selector.id, e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                >
                  <option value="">Select software...</option>
                  {softwareList.map((sw) => (
                    <option key={sw.slug} value={sw.slug}>
                      {sw.name}
                    </option>
                  ))}
                </select>
                {selectors.length > 2 && (
                  <button
                    onClick={() => removeSelector(selector.id)}
                    className="px-2.5 py-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    aria-label="Remove"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectors.length < 3 && (
          <button
            onClick={addSelector}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Software
          </button>
        )}
      </div>

      {/* Comparison Result */}
      {selectedSoftware.length >= 2 ? (
        <ComparisonTable software={selectedSoftware} />
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
            Select at least 2 software products to compare
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Use the dropdowns above to pick the software you want to compare.
          </p>
        </div>
      )}
    </div>
  );
}
