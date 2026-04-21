import React from 'react'
import { Link } from 'react-router-dom'
// import { getImageUrl } from '../../utils/getImageUrl'

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

  console.log("ProductCard image_url:", image_url);

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-250 group hover:-translate-y-2 hover:shadow-xl">
      <Link to={`/products/${id}`} className="block">
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />

          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {is_new && <span className="badge badge-accent">New</span>}
            {discount && <span className="badge badge-primary">{discount}% Off</span>}
          </div>
        </div>

        <div className="p-5">
          <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#C9A24D] mb-1 block">
            {occasion}
          </span>

          <h3 className="font-heading text-[1.05rem] font-medium text-[#1C1C1C] mb-2 line-clamp-2">
            {name}
          </h3>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base font-bold text-[#7A1E2D]">
              ₹{price.toLocaleString()}
            </span>

            {original_price && (
              <span className="text-sm text-[#999] line-through">
                ₹{original_price.toLocaleString()}
              </span>
            )}
          </div>

          <span className={`text-xs font-medium ${in_stock ? 'text-[#2E7D32]' : 'text-[#D32F2F]'}`}>
            {in_stock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
