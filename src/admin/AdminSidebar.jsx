import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/products', label: 'Manage Products' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/', label: 'View Store' },
]

function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    navigate('/login')
  }

  return (
    <aside className="w-[240px] flex-shrink-0 bg-[#1C1C1C] text-white flex flex-col p-6 min-h-screen">
      <div className="mb-10">
        <span className="font-heading text-2xl font-bold text-[#C9A24D] block tracking-widest">SANA</span>
        <small className="text-xs text-white/60">Admin Panel</small>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150
              ${location.pathname === item.to
                ? 'bg-white/15 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all duration-150 text-left"
      >
        Logout
      </button>
    </aside>
  )
}

export default AdminSidebar