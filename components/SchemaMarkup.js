export default function SchemaMarkup({ software }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: software.name,
    description: software.description || software.shortDescription,
    applicationCategory: software.category,
    operatingSystem: Array.isArray(software.platforms)
      ? software.platforms.join(', ')
      : software.platforms,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: software.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: software.reviewCount,
    },
    review: software.reviews
      ? software.reviews.map((review) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: review.author,
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.rating,
            bestRating: 5,
            worstRating: 1,
          },
          reviewBody: review.text,
          datePublished: review.date,
        }))
      : undefined,
    offers: {
      '@type': 'Offer',
      price: software.startingPrice || '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  // Remove undefined values
  const cleanSchema = JSON.parse(JSON.stringify(schema));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  );
}
