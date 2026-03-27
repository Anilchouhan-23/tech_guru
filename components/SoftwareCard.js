import Link from 'next/link';
import StarRating from '@/components/StarRating';

const letterColors = {
  A: 'bg-red-500',
  B: 'bg-orange-500',
  C: 'bg-amber-500',
  D: 'bg-yellow-500',
  E: 'bg-lime-500',
  F: 'bg-green-500',
  G: 'bg-emerald-500',
  H: 'bg-teal-500',
  I: 'bg-cyan-500',
  J: 'bg-sky-500',
  K: 'bg-blue-500',
  L: 'bg-indigo-500',
  M: 'bg-violet-500',
  N: 'bg-purple-500',
  O: 'bg-fuchsia-500',
  P: 'bg-pink-500',
  Q: 'bg-rose-500',
  R: 'bg-red-600',
  S: 'bg-orange-600',
  T: 'bg-amber-600',
  U: 'bg-yellow-600',
  V: 'bg-lime-600',
  W: 'bg-green-600',
  X: 'bg-teal-600',
  Y: 'bg-blue-600',
  Z: 'bg-purple-600',
};

export default function SoftwareCard({ software }) {
  const { name, slug, category, shortDescription, rating, reviewCount } = software;
  const firstLetter = name.charAt(0).toUpperCase();
  const colorClass = letterColors[firstLetter] || 'bg-primary-600';

  return (
    <Link href={`/software/${slug}`}>
      <div className="card p-6 hover:shadow-lg dark:hover:shadow-gray-900/40 transition-shadow duration-300 h-full">
        <div className="flex items-start gap-4 mb-3">
          <div
            className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}
          >
            {firstLetter}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight truncate">
              {name}
            </h3>
            <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              {category}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {shortDescription}
        </p>

        <div className="flex items-center gap-2 mt-auto">
          <StarRating rating={rating} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {rating}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      </div>
    </Link>
  );
}
