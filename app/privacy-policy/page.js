export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">TechGuru Privacy Policy</h1>
      <div className="prose prose-primary dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6">
        <p className="font-semibold">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">About This Policy</h2>
        <p>
          This Privacy Policy describes the policies and procedures of TechGuru (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;) regarding the collection, use, and disclosure of information when you use our website (TechGuru) and our services. This policy is drafted to comply with the California Consumer Privacy Act (CCPA), as well as international standards such as GDPR (EU).
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">Important Notice: Embedded Partner Forms</h2>
        <p>
          We do NOT collect your lead information when you submit forms embedded from our partner websites (e.g., Software Advice/Gartners) on TechGuru.
        </p>
        <p>
          When utilizing these forms, all lead data is processed directly by the partner website, acting as an independent Third Party Controller. We do not have access to, nor do we control, the data submitted via these specific forms. We recommend reading the privacy policies of our partners before submitting any personal information.
        </p>
        <p>
          <strong>Important Notice:</strong> Some sections of our website utilize embedded forms or widgets provided by our affiliate partners (e.g., Software Advice/Gartner). When you interact with these forms, these third parties may collect your data directly and may set their own cookies or tracking technologies on your device.
        </p>
        <p>
          We do not control these third-party cookies and they are governed by the respective privacy policies of those partners, not this policy.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">Information We Collect</h2>
        <p>
          We collect information only when you interact directly with TechGuru&apos;s own systems:
        </p>
        <ul className="list-disc pl-5">
          <li><strong>Voluntary Information:</strong> Contact forms submitted directly to us and email communication.</li>
          <li><strong>Usage Data:</strong> Automatically collected by analytics tools (e.g., IP address, browser type).</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">Data Retention</h2>
        <p>
          We retain personal information only as long as necessary. For registered users, we retain data for the duration of your active account plus a reasonable period to comply with legal obligations. For non-registered users/inquiries, data is typically retained no longer than 3 years, unless a longer period is required by applicable law.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">Cookies and Tracking Technologies</h2>
        <p>
          We use cookies to enhance functionality and analyze traffic. Please note that embedded partner forms may set their own cookies which are governed by the partner&apos;s privacy policy, not ours. For more details, please view our Cookie Policy.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">Data Transfer (International)</h2>
        <p>
          We may process data on servers located outside of your state or country. Any transfer of data is conducted in compliance with applicable data protection laws.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">Your Legal Rights</h2>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6">Under California Law (CCPA) and General Data Protection</h3>
        <ul className="list-disc pl-5">
          <li><strong>Right to Inspect:</strong> You are entitled to inspect the information about you kept in our database.</li>
          <li><strong>Right to Correct:</strong> You may ask us to correct or delete inaccurate information.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-8">Contact Us / Database Owner Details</h2>
        <ul className="list-none p-0">
          <li><strong>Database Owner:</strong> TechGuru</li>
          <li><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</li>
          <li><strong>Email:</strong> contact@techguru.today</li>
        </ul>
      </div>
    </div>
  );
}
