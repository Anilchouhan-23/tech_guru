import StarRating from '@/components/StarRating';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ReviewCard({ review }) {
  const { author, role, company, rating, date, text } = review;

  return (
    <div className="card h-full flex flex-col">
      <div className="mb-3">
        <StarRating rating={rating} />
      </div>

      <blockquote className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
        &ldquo;{text}&rdquo;
      </blockquote>

      <div className="mt-auto border-t border-gray-100 dark:border-gray-700 pt-4">
        <p className="font-semibold text-gray-900 dark:text-white text-sm">
          {author}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {role} at {company}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {formatDate(date)}
        </p>
      </div>
    </div>
  );
}
