import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../../data/products'

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

function ProductDetails() {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-content-center text-center px-6 pt-40">
        <h2 className="mb-3">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="btn btn-primary">Back to Products</Link>
      </div>
    )
  }

  const waMsg = `Hi! I'm interested in ordering:\n\n*${product.name}*\nPrice: ₹${product.price.toLocaleString()}\n\nPlease share more details.`
  const waLink = `https://wa.me/917799296786?text=${encodeURIComponent(waMsg)}`

  return (
    <div className="pt-[calc(80px+2rem)] pb-24">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="hidden md:flex items-center gap-2 text-sm text-[#999] mb-8">
          <Link to="/" className="text-[#666] hover:text-[#7A1E2D] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="text-[#666] hover:text-[#7A1E2D] transition-colors">Sarees</Link>
          <span>/</span>
          <span className="text-[#1C1C1C] font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Gallery */}
          <div className="md:sticky md:top-[100px]">
            <div className="relative rounded-xl overflow-hidden bg-white">
              <img src={product.image} alt={product.name} className="w-full object-cover" style={{ aspectRatio: '3/4' }} />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <span className="badge badge-accent">New</span>}
                {product.discount && <span className="badge badge-primary">{product.discount}% Off</span>}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="py-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A24D] mb-2 block">{product.occasion}</span>
            <h1 className="text-[2rem] leading-snug mb-6">{product.name}</h1>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-4 mb-6 pb-6 border-b border-[#E5E2DE]">
              <span className="text-3xl font-bold text-[#7A1E2D]">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-[#999] line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm font-semibold text-[#2E7D32] bg-[#2E7D32]/10 px-2 py-0.5 rounded">
                    You save ₹{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <p className="text-base leading-[1.8] mb-8">{product.description}</p>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-4 mb-8 p-5 bg-[#F5F3F0] rounded-xl">
              {[
                ['Fabric', product.fabric],
                ['Color', product.color],
                ['Occasion', product.occasion],
                ['Care', product.care],
              ].map(([label, value]) => (
                <div key={label}>
                  <span className="block text-[0.7rem] font-semibold uppercase tracking-widest text-[#999] mb-0.5">{label}</span>
                  <span className="text-sm font-medium text-[#1C1C1C]">{value}</span>
                </div>
              ))}
            </div>

            {/* Stock */}
            <div className={`flex items-center gap-2 font-medium mb-8 ${product.inStock ? 'text-[#2E7D32]' : 'text-[#D32F2F]'}`}>
              {product.inStock ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  In Stock - Ready to Ship
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  Currently Out of Stock
                </>
              )}
            </div>

            {/* Order notice */}
            <div className="flex gap-4 p-5 bg-orange-50 border border-orange-200 rounded-xl mb-8">
              <span className="text-2xl">⚠️</span>
              <div>
                <strong className="block text-[#ED6C02] mb-1">Online payment coming soon</strong>
                <p className="text-sm text-[#666]">Please take a screenshot and send it to us on WhatsApp to place your order.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-8">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-large justify-center">
                <WaIcon /> Order via WhatsApp
              </a>
              <Link to="/products" className="btn btn-secondary btn-large justify-center">Continue Shopping</Link>
            </div>

            {/* Store Banner */}
            <div className="flex items-start gap-4 p-5 rounded-xl text-white" style={{ background: 'linear-gradient(135deg,#7A1E2D,#5A0E1D)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A24D" strokeWidth="2" width="24" height="24" className="flex-shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <strong className="block mb-1">Visit Our Store</strong>
                <p className="text-sm text-white/80">In-store purchases get special pricing and personalized styling</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
