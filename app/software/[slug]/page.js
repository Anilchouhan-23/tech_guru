import { notFound } from 'next/navigation';
import { getSoftwareBySlug, softwareList } from '@/data/software';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';
import PricingTable from '@/components/PricingTable';
import SchemaMarkup from '@/components/SchemaMarkup';
import DemoRequestModal from '@/components/DemoRequestModal';

const categoryLabels = {
  crm: 'CRM Software',
  'project-management': 'Project Management',
  accounting: 'Accounting Software',
  marketing: 'Marketing Automation',
  hr: 'HR & Recruitment',
  collaboration: 'Collaboration Tools',
  erp: 'ERP Systems',
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const software = getSoftwareBySlug(slug);

  if (!software) {
    return { title: 'Software Not Found' };
  }

  return {
    title: `${software.name} - Reviews, Pricing & Features`,
    description: software.shortDescription || software.description,
    openGraph: {
      title: `${software.name} - Reviews, Pricing & Features`,
      description: software.shortDescription || software.description,
      url: `https://techguru.com/software/${software.slug}`,
      siteName: 'TechGuru',
      type: 'article',
    },
  };
}

export function generateStaticParams() {
  return softwareList.map((sw) => ({
    slug: sw.slug,
  }));
}

export default async function SoftwareDetailPage({ params }) {
  const { slug } = await params;
  const software = getSoftwareBySlug(slug);

  if (!software) {
    notFound();
  }

  const {
    name,
    category,
    rating,
    reviewCount,
    vendor,
    founded,
    headquarters,
    description,
    deploymentType,
    platforms,
    companySize,
    features,
    pricing,
    pros,
    cons,
    reviews,
  } = software;

  const categoryLabel = categoryLabels[category] || category;

  return (
    <>
      <SchemaMarkup software={software} />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* ───────────────── Header ───────────────── */}
          <section className="card p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  {name}
                </h1>

                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 mb-4">
                  {categoryLabel}
                </span>

                <div className="flex items-center gap-3 mb-3">
                  <StarRating rating={rating} size="lg" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {rating}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  by <span className="font-medium text-gray-900 dark:text-white">{vendor}</span>
                </p>
              </div>

              <DemoRequestModal softwareName={name} />
            </div>
          </section>

          {/* ───────────────── Overview ───────────────── */}
          <section className="card p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Overview
            </h2>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {description}
              </p>
            </div>
          </section>

          {/* ───────────────── Key Information ───────────────── */}
          <section className="card p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Key Information
            </h2>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Vendor
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">{vendor}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Founded
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">{founded}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Headquarters
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">{headquarters}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Deployment
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {deploymentType.map((d) => (
                      <span
                        key={d}
                        className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Platforms
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {platforms.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Company Size
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {companySize.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────── Features ───────────────── */}
          <section className="card p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Features
            </h2>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ───────────────── Pricing ───────────────── */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Pricing
            </h2>
            <PricingTable pricing={pricing} />
          </section>

          {/* ───────────────── Pros & Cons ───────────────── */}
          <section className="card p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Pros & Cons
            </h2>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pros */}
                <div>
                  <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">
                    Pros
                  </h3>
                  <ul className="space-y-2">
                    {pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {pro}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div>
                  <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
                    Cons
                  </h3>
                  <ul className="space-y-2">
                    {cons.map((con) => (
                      <li key={con} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {con}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ───────────────── Reviews ───────────────── */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          </section>

          {/* ───────────────── CTA ───────────────── */}
          <section className="card p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Interested in {name}?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
              Get a personalized demo and see how {name} can help your business grow.
            </p>
            <DemoRequestModal softwareName={name} />
          </section>

        </div>
      </div>
    </>
  );
}
