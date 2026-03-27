import StarRating from '@/components/StarRating';

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function ComparisonTable({ software }) {
  if (!software || software.length === 0) return null;

  // Collect all unique features across all software
  const allFeatures = [];
  const featureSet = new Set();
  software.forEach((sw) => {
    if (sw.features) {
      sw.features.forEach((f) => {
        const name = typeof f === 'string' ? f : f.name;
        if (!featureSet.has(name)) {
          featureSet.add(name);
          allFeatures.push(name);
        }
      });
    }
  });

  function hasFeature(sw, featureName) {
    if (!sw.features) return false;
    return sw.features.some((f) => {
      const name = typeof f === 'string' ? f : f.name;
      return name === featureName;
    });
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="sticky left-0 bg-white dark:bg-gray-900 z-10 text-left py-4 px-4 font-semibold text-gray-900 dark:text-white min-w-[160px]">
              Feature
            </th>
            {software.map((sw) => (
              <th
                key={sw.slug || sw.name}
                className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white min-w-[180px]"
              >
                {sw.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Rating */}
          <tr className="border-b border-gray-100 dark:border-gray-800">
            <td className="sticky left-0 bg-white dark:bg-gray-900 z-10 py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
              Rating
            </td>
            {software.map((sw) => (
              <td key={sw.slug || sw.name} className="text-center py-3 px-4">
                <div className="flex items-center justify-center gap-1.5">
                  <StarRating rating={sw.rating} />
                  <span className="text-gray-600 dark:text-gray-400">{sw.rating}</span>
                </div>
              </td>
            ))}
          </tr>

          {/* Category */}
          <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
            <td className="sticky left-0 bg-gray-50 dark:bg-gray-800/50 z-10 py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
              Category
            </td>
            {software.map((sw) => (
              <td key={sw.slug || sw.name} className="text-center py-3 px-4 text-gray-600 dark:text-gray-400">
                {sw.category || '-'}
              </td>
            ))}
          </tr>

          {/* Deployment */}
          <tr className="border-b border-gray-100 dark:border-gray-800">
            <td className="sticky left-0 bg-white dark:bg-gray-900 z-10 py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
              Deployment
            </td>
            {software.map((sw) => (
              <td key={sw.slug || sw.name} className="text-center py-3 px-4 text-gray-600 dark:text-gray-400">
                {sw.deployment || '-'}
              </td>
            ))}
          </tr>

          {/* Platforms */}
          <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
            <td className="sticky left-0 bg-gray-50 dark:bg-gray-800/50 z-10 py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
              Platforms
            </td>
            {software.map((sw) => (
              <td key={sw.slug || sw.name} className="text-center py-3 px-4 text-gray-600 dark:text-gray-400">
                {Array.isArray(sw.platforms) ? sw.platforms.join(', ') : sw.platforms || '-'}
              </td>
            ))}
          </tr>

          {/* Company Size */}
          <tr className="border-b border-gray-100 dark:border-gray-800">
            <td className="sticky left-0 bg-white dark:bg-gray-900 z-10 py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
              Company Size
            </td>
            {software.map((sw) => (
              <td key={sw.slug || sw.name} className="text-center py-3 px-4 text-gray-600 dark:text-gray-400">
                {sw.companySize || '-'}
              </td>
            ))}
          </tr>

          {/* Features */}
          {allFeatures.map((feature, index) => (
            <tr
              key={feature}
              className={`border-b border-gray-100 dark:border-gray-800 ${
                index % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/30' : ''
              }`}
            >
              <td
                className={`sticky left-0 z-10 py-3 px-4 font-medium text-gray-700 dark:text-gray-300 ${
                  index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900'
                }`}
              >
                {feature}
              </td>
              {software.map((sw) => (
                <td key={sw.slug || sw.name} className="text-center py-3 px-4">
                  {hasFeature(sw, feature) ? <CheckIcon /> : <XIcon />}
                </td>
              ))}
            </tr>
          ))}

          {/* Pricing */}
          <tr className="border-b border-gray-100 dark:border-gray-800">
            <td className="sticky left-0 bg-white dark:bg-gray-900 z-10 py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
              Starting Price
            </td>
            {software.map((sw) => (
              <td key={sw.slug || sw.name} className="text-center py-3 px-4">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {sw.startingPrice
                    ? sw.startingPrice
                    : Array.isArray(sw.pricing) && sw.pricing.length > 0
                      ? `$${sw.pricing[0].price}/${sw.pricing[0].period}`
                      : 'Contact for pricing'}
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
