import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const { id, name, price, originalPrice, image, occasion, inStock, isNew, discount } = product

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-250 group hover:-translate-y-2 hover:shadow-xl">
      <Link to={`/products/${id}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {isNew && <span className="badge badge-accent">New</span>}
            {discount && <span className="badge badge-primary">{discount}% Off</span>}
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,28,28,0.7)] to-transparent flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
            <span className="inline-block px-6 py-2 bg-white text-[#1C1C1C] text-xs font-semibold uppercase tracking-wide rounded-full translate-y-5 group-hover:translate-y-0 transition-transform duration-250">
              View Details
            </span>
          </div>
        </div>
        {/* Info */}
        <div className="p-5">
          <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#C9A24D] mb-1 block">{occasion}</span>
          <h3 className="font-heading text-[1.05rem] font-medium text-[#1C1C1C] mb-2 leading-snug line-clamp-2">{name}</h3>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base font-bold text-[#7A1E2D]">₹{price.toLocaleString()}</span>
            {originalPrice && <span className="text-sm text-[#999] line-through">₹{originalPrice.toLocaleString()}</span>}
          </div>
          <span className={`text-xs font-medium ${inStock ? 'text-[#2E7D32]' : 'text-[#D32F2F]'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
