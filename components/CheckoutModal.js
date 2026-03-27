'use client';

import { useState } from 'react';

const paymentMethods = [
  {
    id: 'stripe',
    name: 'Stripe',
    icon: (
      <svg className="w-8 h-6" viewBox="0 0 60 25" fill="none">
        <path d="M60 12.5C60 19.4036 54.4036 25 47.5 25H12.5C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0H47.5C54.4036 0 60 5.59644 60 12.5Z" fill="#635BFF" />
        <path d="M28.5 8.5C27.1 8.5 26 9 25.3 9.8L25.1 8.7H22.5V21H25.3V14.5C25.3 12.5 26.3 11.3 28 11.3C28.4 11.3 28.9 11.4 29.2 11.5L29.6 8.7C29.3 8.6 28.9 8.5 28.5 8.5ZM32.8 5.5C31.8 5.5 31 6.3 31 7.3C31 8.3 31.8 9.1 32.8 9.1C33.8 9.1 34.6 8.3 34.6 7.3C34.6 6.3 33.8 5.5 32.8 5.5ZM31.4 21H34.2V8.7H31.4V21ZM43.5 8.5C42 8.5 40.9 9.2 40.3 10L40.1 8.7H37.5V25H40.3V19.5C40.9 20.2 42 20.8 43.4 20.8C46.2 20.8 48.5 18.3 48.5 14.6C48.5 10.9 46.3 8.5 43.5 8.5ZM42.8 18.2C41.3 18.2 40.3 17 40.3 14.6C40.3 12.3 41.3 11.1 42.8 11.1C44.3 11.1 45.3 12.3 45.3 14.6C45.3 17 44.3 18.2 42.8 18.2ZM19.5 14.6C19.5 11.2 17.3 8.5 13.5 8.5C9.7 8.5 7 11.2 7 14.6C7 18.5 9.9 20.8 13.8 20.8C15.7 20.8 17.3 20.3 18.5 19.4L17.3 17.4C16.4 18 15.3 18.4 14 18.4C12.5 18.4 11.2 17.7 10.8 16.1H19.4C19.5 15.7 19.5 15.1 19.5 14.6ZM10.7 13.8C11 12.2 12 11.1 13.5 11.1C15 11.1 15.9 12.2 16.2 13.8H10.7Z" fill="white" />
      </svg>
    ),
    description: 'Credit/Debit Card',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z" fill="#253B80" />
        <path d="M20.16 7.035c-.01.065-.02.133-.035.2-1.09 5.598-4.804 7.534-9.555 7.534H8.69a1.172 1.172 0 00-1.157.99l-.947 6.02a.587.587 0 00.58.68h4.072c.508 0 .94-.368 1.017-.87l.042-.216.806-5.115.052-.282a1.023 1.023 0 011.016-.87h.638c4.143 0 7.386-1.684 8.332-6.555.395-2.034.19-3.732-.856-4.924a4.097 4.097 0 00-1.17-.852 7.63 7.63 0 01.056 1.26z" fill="#179BD7" />
        <path d="M19.064 6.59a8.581 8.581 0 00-1.058-.235 13.433 13.433 0 00-2.14-.155h-6.49a1.023 1.023 0 00-1.017.87L7.076 14.99l-.035.222a1.172 1.172 0 011.157-.99h1.88c4.75 0 8.464-1.936 9.554-7.534.032-.166.06-.328.083-.487a5.442 5.442 0 00-.65-.31v-.302z" fill="#222D65" />
      </svg>
    ),
    description: 'PayPal Account',
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#072654" />
        <path d="M9.5 6L7 18H9.5L10.5 13L14 18H17L12.5 11.5L15 6H12.5L10.8 10.5L9.5 6Z" fill="white" />
      </svg>
    ),
    description: 'Cards, UPI, Netbanking',
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#4CAF50" />
        <path d="M6 7L10 17H12L16 7H14L11 14.5L8 7H6Z" fill="white" />
        <path d="M14 7L18 17H16L12 7H14Z" fill="white" opacity="0.7" />
      </svg>
    ),
    description: 'Google Pay, PhonePe, Paytm',
  },
];

export default function CheckoutModal({ plan, price, period, onClose }) {
  const [step, setStep] = useState('select'); // select, form, processing, success
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
  });
  const [upiId, setUpiId] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleCardChange(e) {
    const { name, value } = e.target;
    if (name === 'number') {
      const cleaned = value.replace(/\D/g, '').slice(0, 16);
      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
      setCardData((prev) => ({ ...prev, number: formatted }));
    } else if (name === 'expiry') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      const formatted = cleaned.length > 2 ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` : cleaned;
      setCardData((prev) => ({ ...prev, expiry: formatted }));
    } else if (name === 'cvc') {
      setCardData((prev) => ({ ...prev, cvc: value.replace(/\D/g, '').slice(0, 4) }));
    }
  }

  function handleProceed(e) {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  }

  const displayPrice = typeof price === 'number' ? `$${price}` : price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {step === 'success' ? 'Payment Successful' : 'Checkout'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {plan} &mdash; {displayPrice}{period ? `/${period}` : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          {/* Step: Select Payment Method */}
          {step === 'select' && (
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Choose a payment method
              </p>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setSelectedMethod(method.id);
                      setStep('form');
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      selectedMethod === method.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex-shrink-0">{method.icon}</div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {method.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {method.description}
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step: Payment Form */}
          {step === 'form' && (
            <form onSubmit={handleProceed} className="space-y-4">
              <button
                type="button"
                onClick={() => setStep('select')}
                className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Change payment method
              </button>

              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex-shrink-0">
                  {paymentMethods.find((m) => m.id === selectedMethod)?.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {paymentMethods.find((m) => m.id === selectedMethod)?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {paymentMethods.find((m) => m.id === selectedMethod)?.description}
                  </p>
                </div>
              </div>

              {/* Billing Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Acme Inc."
                />
              </div>

              {/* Card Fields for Stripe */}
              {selectedMethod === 'stripe' && (
                <div className="space-y-3 pt-1">
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Card Details</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="number"
                      required
                      value={cardData.number}
                      onChange={handleCardChange}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        required
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        required
                        value={cardData.cvc}
                        onChange={handleCardChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI ID Field */}
              {(selectedMethod === 'upi' || selectedMethod === 'razorpay') && (
                <div className="pt-1">
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      UPI ID {selectedMethod === 'upi' ? '*' : '(optional)'}
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      required={selectedMethod === 'upi'}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="yourname@upi"
                    />
                  </div>
                </div>
              )}

              {/* PayPal note */}
              {selectedMethod === 'paypal' && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    You will be redirected to PayPal to complete the payment securely.
                  </p>
                </div>
              )}

              {/* Order Summary */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{plan} Plan</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{displayPrice}{period ? `/${period}` : ''}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{displayPrice}<span className="text-sm font-normal text-gray-500">/{period || 'mo'}</span></span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm mt-2"
              >
                Pay {displayPrice}{period ? `/${period}` : ''}
              </button>

              <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">
                Secured with 256-bit SSL encryption
              </p>
            </form>
          )}

          {/* Step: Processing */}
          {step === 'processing' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-primary-600 rounded-full animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Processing Payment...
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please wait while we process your payment securely.
              </p>
            </div>
          )}

          {/* Step: Success */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Payment Successful!
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Your {plan} plan is now active.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                A confirmation email has been sent to <span className="font-medium text-gray-700 dark:text-gray-300">{formData.email}</span>
              </p>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6 text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Order Summary</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">{plan} Plan</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{displayPrice}{period ? `/${period}` : ''}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-700 dark:text-gray-300">Payment via</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {paymentMethods.find((m) => m.id === selectedMethod)?.name}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
