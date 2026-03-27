import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl md:text-9xl font-bold text-primary-600 dark:text-primary-400">
          404
        </p>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
