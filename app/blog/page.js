import Link from 'next/link';
import { blogPosts } from '@/data/blog';

export const metadata = {
  title: 'Blog',
  description: 'Read the latest insights, guides, and analysis on business software from the TechGuru team.',
};

const gradients = [
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-pink-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-cyan-500 to-blue-600',
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          TechGuru Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Insights, guides, and analysis to help you make smarter software decisions.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {blogPosts.map((post, index) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col"
          >
            {/* Gradient Top */}
            <div className={`h-40 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center`}>
              <span className="text-white/90 text-5xl font-bold">
                {post.title.charAt(0)}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              {/* Category Badge */}
              <span className="inline-block self-start px-2.5 py-0.5 text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full mb-3">
                {post.category}
              </span>

              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {post.title}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                {post.readTime}
              </div>

              {/* Read More */}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors mt-auto"
              >
                Read More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
