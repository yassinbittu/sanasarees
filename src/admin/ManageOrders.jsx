import React from 'react'
import AdminSidebar from './AdminSidebar'

const orders = [
  { id: 1, product: 'Royal Maroon Kanjivaram Silk Saree', customer: 'Priya Sharma', phone: '9876543210', status: 'Pending', date: '2024-01-15' },
  { id: 2, product: 'Golden Banarasi Silk Saree', customer: 'Anita Reddy', phone: '9876543211', status: 'Confirmed', date: '2024-01-14' },
  { id: 3, product: 'Maggam Work Service', customer: 'Lakshmi Devi', phone: '9876543212', status: 'In Progress', date: '2024-01-13' },
]

const statusStyles = {
  'Pending':     'bg-[#ED6C02]/10 text-[#ED6C02]',
  'Confirmed':   'bg-[#2E7D32]/10 text-[#2E7D32]',
  'In Progress': 'bg-blue-100 text-blue-700',
}

function ManageOrders() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-[#FAF9F7]">
        <h1 className="mb-8">Orders (WhatsApp)</h1>
        <div className="flex flex-col gap-4">
          {orders.map(order => (
            <div key={order.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
              <div>
                <h3 className="font-body text-base font-semibold mb-1 text-[#1C1C1C]">{order.product}</h3>
                <p className="text-sm text-[#666]">Customer: {order.customer}</p>
                <p className="text-sm text-[#666]">Date: {order.date}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status] || ''}`}>
                  {order.status}
                </span>
              </div>
              <a
                href={`https://wa.me/91${order.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-small flex-shrink-0"
              >
                Contact on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ManageOrders
