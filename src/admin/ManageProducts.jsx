import React, { useState } from 'react'
import { products } from '../data/products'
import AdminSidebar from './AdminSidebar'
import Modal from '../components/common/Modal'

function ManageProducts() {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', price: '', originalPrice: '', occasion: 'Wedding', fabric: 'Silk', color: '', care: '', inStock: true, isNew: false })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const inputCls = "w-full px-3 py-2.5 border border-[#E5E2DE] rounded-lg text-sm outline-none focus:border-[#7A1E2D] transition-colors"

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-[#FAF9F7]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1>Manage Products</h1>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Product</button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F5F3F0]">
                  {['Product', 'Price', 'Occasion', 'Stock', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#666] border-b border-[#E5E2DE]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-[#E5E2DE] hover:bg-[#FAF9F7] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                        <span className="text-sm font-medium text-[#1C1C1C]">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#666]">₹{p.price.toLocaleString()}</td>
                    <td className="px-5 py-4 text-sm text-[#666]">{p.occasion}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${p.inStock ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'bg-[#D32F2F]/10 text-[#D32F2F]'}`}>
                        {p.inStock ? 'In Stock' : 'Out'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button className="btn btn-secondary btn-small">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Product"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={() => setShowModal(false)}>Save Product</button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#444] mb-1.5">Product Name</label>
            <input name="name" value={form.name} onChange={handleChange} className={inputCls} placeholder="e.g. Kanchipuram Silk Saree" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#444] mb-1.5">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className={inputCls} rows={3} placeholder="Short product description" style={{ resize: 'none' }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#444] mb-1.5">Price (₹)</label>
              <input name="price" value={form.price} onChange={handleChange} type="number" className={inputCls} placeholder="2499" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#444] mb-1.5">Original Price (optional)</label>
              <input name="originalPrice" value={form.originalPrice} onChange={handleChange} type="number" className={inputCls} placeholder="2999" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#444] mb-1.5">Occasion</label>
              <select name="occasion" value={form.occasion} onChange={handleChange} className={inputCls}>
                {['Wedding', 'Festival', 'Party', 'Casual'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#444] mb-1.5">Fabric</label>
              <select name="fabric" value={form.fabric} onChange={handleChange} className={inputCls}>
                {['Silk', 'Cotton', 'Chiffon', 'Georgette'].map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#444] mb-1.5">Color</label>
              <input name="color" value={form.color} onChange={handleChange} className={inputCls} placeholder="Red" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#444] mb-1.5">Care Instructions</label>
              <input name="care" value={form.care} onChange={handleChange} className={inputCls} placeholder="Dry Clean Only" />
            </div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm font-medium text-[#444] cursor-pointer">
              <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} className="accent-[#7A1E2D] w-4 h-4" />
              In Stock
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-[#444] cursor-pointer">
              <input type="checkbox" name="isNew" checked={form.isNew} onChange={handleChange} className="accent-[#7A1E2D] w-4 h-4" />
              Mark as New
            </label>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#444] mb-1.5">Product Image</label>
            <input type="file" className="w-full px-3 py-2 border border-dashed border-[#ccc] rounded-lg text-sm cursor-pointer" />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ManageProducts
