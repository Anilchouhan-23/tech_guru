'use client';

import { useState } from 'react';
import CheckoutModal from '@/components/CheckoutModal';

export default function PricingTable({ pricing }) {
  const [checkoutTier, setCheckoutTier] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {pricing.map((tier) => {
          return (
            <div
              key={tier.plan}
              className="card relative flex flex-col p-6 h-full"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tier.plan}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      /{tier.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2">
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
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <button
                  onClick={() => setCheckoutTier(tier)}
                  className="w-full py-2.5 px-4 rounded-lg font-medium text-sm bg-primary-600 text-white"
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {checkoutTier && (
        <CheckoutModal
          plan={checkoutTier.plan}
          price={checkoutTier.price}
          period={checkoutTier.period}
          onClose={() => setCheckoutTier(null)}
        />
      )}
    </>
  );
}
