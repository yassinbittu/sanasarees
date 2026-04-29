import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const {
    id,
    name,
    price,
    original_price,
    image_url,
    occasion,
    in_stock,
    is_new,
    discount
  } = product

  return (
    <article className="w-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition duration-300">

      <Link to={`/products/${id}`} className="block">

        {/* IMAGE */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <img
            src={image_url}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />

          {/* BADGES */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {is_new && <span className="badge badge-accent">New</span>}
            {discount && <span className="badge badge-primary">{discount}% Off</span>}
          </div>
        </div>


        {/* CONTENT */}
        <div className="p-2 sm:p-3">

          {/* CATEGORY */}
          <p className="text-[9px] uppercase tracking-wide text-gray-400 mb-1">
            {occasion}
          </p>

          {/* NAME */}
          <h3 className="text-[13px] sm:text-sm font-medium text-gray-800 line-clamp-2 leading-tight mb-1">
            {name}
          </h3>

          {/* PRICE */}
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-[#7A1E2D]">
              ₹{price.toLocaleString()}
            </span>

            {original_price && (
              <span className="text-[11px] text-gray-400 line-through">
                ₹{original_price.toLocaleString()}
              </span>
            )}
          </div>

          {/* STOCK */}
          <p className={`text-[10px] mt-1 ${in_stock ? 'text-green-600' : 'text-red-500'}`}>
            {in_stock ? 'In stock' : 'Out of stock'}
          </p>

        </div>
      </Link>
    </article>
  )
}

export default ProductCard  