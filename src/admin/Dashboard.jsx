import React from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const stats = [
  { label: 'Total Products', value: '48', icon: '📦' },
  { label: 'Pending Orders', value: '12', icon: '🛒' },
  { label: 'Active Services', value: '4', icon: '✨' },
  { label: 'This Month', value: '₹85,400', icon: '💰' },
]

function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-[#FAF9F7]">
        <h1 className="mb-8">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
              <span className="text-4xl">{stat.icon}</span>
              <div>
                <p className="text-2xl font-bold text-[#7A1E2D]">{stat.value}</p>
                <p className="text-sm text-[#666]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl mb-5">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/admin/products" className="btn btn-primary">Add New Product</Link>
            <Link to="/admin/orders" className="btn btn-secondary">View Orders</Link>
            <Link to="/" className="btn btn-accent">View Store</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
