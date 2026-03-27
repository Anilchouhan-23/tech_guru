import Link from 'next/link';

export default function CategoryCard({ category }) {
  const { name, slug, description, icon, count } = category;

  return (
    <Link href={`/software?category=${slug}`}>
      <div className="card p-6 hover:shadow-lg hover:scale-[1.02] dark:hover:shadow-gray-900/40 transition-all duration-300 h-full group">
        <div className="text-4xl mb-3">{icon}</div>

        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {description}
        </p>

        <div className="mt-auto">
          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
            {count} {count === 1 ? 'software' : 'software options'}
          </span>
        </div>
      </div>
    </Link>
  );
}
