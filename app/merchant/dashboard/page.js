'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const mockOrders = [
  { id: 'ORD-1042', customer: 'Sarah Chen', plan: 'Professional', amount: 79, status: 'completed', date: '2026-03-27' },
  { id: 'ORD-1041', customer: 'James Rivera', plan: 'Enterprise', amount: 149, status: 'completed', date: '2026-03-26' },
  { id: 'ORD-1040', customer: 'Priya Sharma', plan: 'Starter', amount: 29, status: 'pending', date: '2026-03-26' },
  { id: 'ORD-1039', customer: 'Mike Johnson', plan: 'Professional', amount: 79, status: 'completed', date: '2026-03-25' },
  { id: 'ORD-1038', customer: 'Emily Brown', plan: 'Enterprise', amount: 149, status: 'refunded', date: '2026-03-25' },
  { id: 'ORD-1037', customer: 'David Kim', plan: 'Starter', amount: 29, status: 'completed', date: '2026-03-24' },
  { id: 'ORD-1036', customer: 'Lisa Wang', plan: 'Professional', amount: 79, status: 'completed', date: '2026-03-24' },
  { id: 'ORD-1035', customer: 'Tom Wilson', plan: 'Enterprise', amount: 149, status: 'pending', date: '2026-03-23' },
];

const mockPayments = [
  { gateway: 'Stripe', transactions: 142, revenue: 8540, percentage: 45 },
  { gateway: 'PayPal', transactions: 87, revenue: 5230, percentage: 27 },
  { gateway: 'Razorpay', transactions: 64, revenue: 3840, percentage: 20 },
  { gateway: 'UPI', transactions: 23, revenue: 1380, percentage: 8 },
];

const statusColors = {
  completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  refunded: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

function StatCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

const defaultProducts = [
  { id: 'prod-1', name: 'CloudFlow CRM', category: 'CRM', price: 79, status: 'active', stock: 'Unlimited', createdAt: '2026-01-15' },
  { id: 'prod-2', name: 'TaskPilot Pro', category: 'Project Management', price: 35, status: 'active', stock: 'Unlimited', createdAt: '2026-02-10' },
  { id: 'prod-3', name: 'LedgerEase', category: 'Accounting', price: 49, status: 'active', stock: 'Unlimited', createdAt: '2026-02-20' },
  { id: 'prod-4', name: 'MarketPulse', category: 'Marketing', price: 99, status: 'draft', stock: 'Unlimited', createdAt: '2026-03-05' },
];

const categoryOptions = ['CRM', 'Project Management', 'Accounting', 'Marketing', 'HR', 'Collaboration', 'ERP', 'Other'];

export default function MerchantDashboard() {
  const router = useRouter();
  const [merchant, setMerchant] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '', category: 'CRM', price: '', description: '', status: 'active',
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    setMounted(true);
    const auth = localStorage.getItem('techguru-merchant-auth');
    const data = localStorage.getItem('techguru-merchant');
    if (!auth || auth !== 'true') {
      router.push('/merchant/login');
      return;
    }
    if (data) {
      setMerchant(JSON.parse(data));
    }
    // Load products
    const storedProducts = localStorage.getItem('techguru-merchant-products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem('techguru-merchant-products', JSON.stringify(defaultProducts));
    }
  }, [router]);

  function saveProducts(updated) {
    setProducts(updated);
    localStorage.setItem('techguru-merchant-products', JSON.stringify(updated));
  }

  function openAddProduct() {
    setEditingProduct(null);
    setProductForm({ name: '', category: 'CRM', price: '', description: '', status: 'active' });
    setShowProductForm(true);
  }

  function openEditProduct(product) {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description || '',
      status: product.status,
    });
    setShowProductForm(true);
  }

  function handleProductSubmit(e) {
    e.preventDefault();
    if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? { ...p, name: productForm.name, category: productForm.category, price: Number(productForm.price), description: productForm.description, status: productForm.status }
          : p
      );
      saveProducts(updated);
    } else {
      const newProduct = {
        id: `prod-${Date.now()}`,
        name: productForm.name,
        category: productForm.category,
        price: Number(productForm.price),
        description: productForm.description,
        status: productForm.status,
        stock: 'Unlimited',
        createdAt: new Date().toISOString().split('T')[0],
      };
      saveProducts([...products, newProduct]);
    }
    setShowProductForm(false);
    setEditingProduct(null);
  }

  function handleDeleteProduct(id) {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
    setDeleteConfirm(null);
  }

  function toggleProductStatus(id) {
    const updated = products.map((p) =>
      p.id === id ? { ...p, status: p.status === 'active' ? 'draft' : 'active' } : p
    );
    saveProducts(updated);
  }

  function handleLogout() {
    localStorage.removeItem('techguru-merchant-auth');
    router.push('/merchant/login');
  }

  if (!mounted || !merchant) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-700 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'products', label: 'Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'payments', label: 'Payments' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome, {merchant.name}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {merchant.company} &mdash; Merchant Dashboard
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="self-start sm:self-auto px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex gap-1 -mb-px overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Revenue"
              value="$18,990"
              subtitle="This month"
              color="bg-green-100 dark:bg-green-900/30"
              icon={<svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
            <StatCard
              title="Total Orders"
              value="316"
              subtitle="This month"
              color="bg-blue-100 dark:bg-blue-900/30"
              icon={<svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
            />
            <StatCard
              title="Active Subscribers"
              value="248"
              subtitle="+12 this week"
              color="bg-purple-100 dark:bg-purple-900/30"
              icon={<svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />
            <StatCard
              title="Conversion Rate"
              value="4.8%"
              subtitle="+0.3% vs last month"
              color="bg-orange-100 dark:bg-orange-900/30"
              icon={<svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            />
          </div>

          {/* Revenue by Gateway */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue by Payment Gateway</h2>
            <div className="space-y-4">
              {mockPayments.map((gw) => (
                <div key={gw.gateway}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{gw.gateway}</span>
                    <span className="text-gray-500 dark:text-gray-400">${gw.revenue.toLocaleString()} ({gw.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-600 rounded-full transition-all"
                      style={{ width: `${gw.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-sm text-primary-600 dark:text-primary-400 font-medium"
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                    <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">Customer</th>
                    <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">Plan</th>
                    <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                    <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2.5 px-3 font-medium text-gray-900 dark:text-white">{order.id}</td>
                      <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400">{order.customer}</td>
                      <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400">{order.plan}</td>
                      <td className="py-2.5 px-3 text-gray-900 dark:text-white font-medium">${order.amount}</td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Products</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{products.length} product{products.length !== 1 ? 's' : ''} total</p>
            </div>
            <button
              onClick={openAddProduct}
              className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white font-medium text-sm rounded-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </button>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <svg className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 font-medium">No products yet</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Click &quot;Add Product&quot; to get started.</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Created</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 px-4">
                          <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                          {product.description && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate max-w-[200px]">{product.description}</p>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">${product.price}/mo</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleProductStatus(product.id)}
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer ${
                              product.status === 'active'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                            }`}
                          >
                            {product.status}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{product.createdAt}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            {/* Edit */}
                            <button
                              onClick={() => openEditProduct(product)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:text-primary-400 dark:hover:bg-primary-900/20 transition-colors"
                              title="Edit"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            {/* Delete */}
                            <button
                              onClick={() => setDeleteConfirm(product.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Add/Edit Product Modal */}
          {showProductForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowProductForm(false)} />
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md z-10">
                <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <button
                    onClick={() => setShowProductForm(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleProductSubmit} className="p-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm((p) => ({ ...p, name: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. CloudFlow CRM"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm((p) => ({ ...p, category: e.target.value }))}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        {categoryOptions.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($/mo) *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={productForm.price}
                        onChange={(e) => setProductForm((p) => ({ ...p, price: e.target.value }))}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="49"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm((p) => ({ ...p, description: e.target.value }))}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-y"
                      placeholder="Short description of your product..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                    <select
                      value={productForm.status}
                      onChange={(e) => setProductForm((p) => ({ ...p, status: e.target.value }))}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowProductForm(false)}
                      className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm bg-primary-600 text-white"
                    >
                      {editingProduct ? 'Save Changes' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {deleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm z-10 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Product?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  This action cannot be undone. The product will be permanently removed.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(deleteConfirm)}
                    className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                  <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">Customer</th>
                  <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">Plan</th>
                  <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="text-left py-2.5 px-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2.5 px-3 font-medium text-gray-900 dark:text-white">{order.id}</td>
                    <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400">{order.customer}</td>
                    <td className="py-2.5 px-3 text-gray-600 dark:text-gray-400">{order.plan}</td>
                    <td className="py-2.5 px-3 text-gray-900 dark:text-white font-medium">${order.amount}</td>
                    <td className="py-2.5 px-3 text-gray-500 dark:text-gray-400">{order.date}</td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {mockPayments.map((gw) => (
              <div key={gw.gateway} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{gw.gateway}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">${gw.revenue.toLocaleString()}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{gw.transactions} transactions</p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Gateway Breakdown</h2>
            <div className="space-y-5">
              {mockPayments.map((gw) => (
                <div key={gw.gateway} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 flex-shrink-0">{gw.gateway}</div>
                  <div className="flex-grow">
                    <div className="w-full h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-600 rounded-full transition-all"
                        style={{ width: `${gw.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right text-sm font-medium text-gray-900 dark:text-white flex-shrink-0">
                    {gw.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Account Settings</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updated = { ...merchant, name: e.target.name.value, company: e.target.company.value, email: e.target.email.value };
                localStorage.setItem('techguru-merchant', JSON.stringify(updated));
                setMerchant(updated);
                alert('Settings saved!');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={merchant.name}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  defaultValue={merchant.company}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={merchant.email}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors text-sm"
              >
                Save Changes
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-900/50 p-6 mt-6">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Permanently delete your merchant account and all associated data.
            </p>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
                  localStorage.removeItem('techguru-merchant');
                  localStorage.removeItem('techguru-merchant-auth');
                  router.push('/merchant/login');
                }
              }}
              className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
