export const metadata = {
  title: 'About TechGuru',
  description: 'Learn about TechGuru and our mission to help businesses make informed software decisions.',
};

const values = [
  {
    title: 'Software Discovery',
    description: 'We curate and review hundreds of software products across every major business category, making it easy to find the right tool.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: 'Detailed Comparisons',
    description: 'Our side-by-side comparisons make it simple to evaluate features, pricing, and user ratings across competing products.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
      </svg>
    ),
  },
  {
    title: 'Honest Reviews',
    description: 'Every review on TechGuru is written by real users and verified by our team. No pay-to-play, no bias -- just honest feedback.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const stats = [
  { label: 'Software Reviewed', value: '500+' },
  { label: 'Users', value: '50,000+' },
  { label: 'Comparisons Made', value: '10,000+' },
];

const team = [
  { name: 'Sarah Chen', role: 'Founder & CEO', initials: 'SC', color: 'bg-blue-500' },
  { name: 'Marcus Rivera', role: 'Head of Research', initials: 'MR', color: 'bg-purple-500' },
  { name: 'Nina Patel', role: 'Lead Analyst', initials: 'NP', color: 'bg-emerald-500' },
  { name: 'James Cooper', role: 'Engineering Lead', initials: 'JC', color: 'bg-orange-500' },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          About TechGuru
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your trusted partner in finding the perfect software for your business.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            We help businesses make informed software decisions by providing comprehensive reviews,
            detailed comparisons, and unbiased recommendations. Choosing the right software should
            not be a guessing game -- it should be a confident, data-driven decision.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
          What We Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {values.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Story
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            TechGuru was founded with a simple observation: businesses spend too much time and
            money choosing the wrong software. After years of watching teams struggle with
            confusing feature lists, misleading marketing, and biased review platforms, we set out
            to build something better. Our platform combines in-depth research, real user feedback,
            and transparent comparison tools to help organizations of every size find the software
            that truly fits their needs. Since our launch, we have helped tens of thousands of
            businesses make confident software decisions.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
          Meet the Team
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="text-center"
            >
              <div
                className={`${member.color} w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl sm:text-2xl font-bold`}
              >
                {member.initials}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
