import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";

import {
  addToCart,
  getCartItemQuantity,
  decreaseCartItem
} from "../../utils/cart";

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

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {

    setQuantity(getCartItemQuantity(id));

    const updateCart = () => {
      setQuantity(getCartItemQuantity(id));
    };

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };

  }, [id]);

  const handleAdd = (e) => {

    e.preventDefault();

    addToCart(product, 1);

    setQuantity(prev => prev + 1);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDecrease = (e) => {

    e.preventDefault();

    decreaseCartItem(id);

    setQuantity(prev => Math.max(prev - 1, 0));

    window.dispatchEvent(new Event("cartUpdated"));
  };

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

          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {is_new && <span className="badge badge-accent">New</span>}
            {discount && <span className="badge badge-primary">{discount}% Off</span>}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-2 sm:p-3">

          <p className="text-[9px] uppercase tracking-wide text-gray-400 mb-1">
            {occasion}
          </p>

          <h3 className="text-[13px] sm:text-sm font-medium text-gray-800 line-clamp-2 leading-tight mb-1">
            {name}
          </h3>

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

          <p className={`text-[10px] mt-1 ${in_stock ? 'text-green-600' : 'text-red-500'}`}>
            {in_stock ? 'In stock' : 'Out of stock'}
          </p>

          {/* CART BUTTON */}
          {quantity === 0 ? (

            <button
              onClick={handleAdd}
              disabled={!in_stock}
              className="mt-3 w-full bg-[#7A1E2D] hover:bg-[#5e1622] text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <FaShoppingCart />
              Add To Cart
            </button>

          ) : (

            <div
              onClick={(e) => e.preventDefault()}
              className="mt-3 flex items-center justify-between bg-[#7A1E2D] text-white rounded-lg overflow-hidden"
            >

              <button
                onClick={handleDecrease}
                className="w-12 py-2 text-xl hover:bg-[#5e1622]"
              >
                -
              </button>

              <span className="font-semibold">
                {quantity}
              </span>

              <button
                onClick={handleAdd}
                className="w-12 py-2 text-xl hover:bg-[#5e1622]"
              >
                +
              </button>

            </div>

          )}

        </div>

      </Link>

    </article>
  )
}

export default ProductCard