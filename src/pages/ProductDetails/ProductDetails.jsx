import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../../admin/api/products'

import {
  addToCart,
  getCartItemQuantity,
  decreaseCartItem
} from "../../utils/cart";

function ProductDetails() {

  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {

    const res = await getProductById(id);

    setProduct(res);

    setQuantity(getCartItemQuantity(res.id));
  }

  const handleAdd = () => {

    addToCart(product, 1);

    setQuantity(prev => prev + 1);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDecrease = () => {

    decreaseCartItem(product.id);

    setQuantity(prev => Math.max(prev - 1, 0));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleShare = async () => {

    if (!product) return

    const shareData = {
      title: product.name,
      text: `Check out this saree 🛍️

${product.name}
₹${product.price}
${product.fabric} | ${product.color}`,
      url: window.location.href
    }

    try {

      if (navigator.share) {

        await navigator.share(shareData)

      } else {

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          shareData.text + "\n" + shareData.url
        )}`

        window.open(whatsappUrl, "_blank")
      }

    } catch (err) {
      console.error("Share failed:", err)
    }
  }

  if (!product) {
    return (
      <div className="text-center pt-40">
        Loading...
      </div>
    )
  }

  return (
    <div className="pt-[90px] pb-20">

      <div className="max-w-[1200px] mx-auto px-4">

        {/* BREADCRUMB */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-400 mb-6">

          <Link to="/" className="hover:text-black">
            Home
          </Link>

          <span>/</span>

          <Link to="/products" className="hover:text-black">
            Sarees
          </Link>

          <span>/</span>

          <span className="text-black font-medium">
            {product.name}
          </span>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

          {/* IMAGE */}
          <div className="md:sticky md:top-[100px]">

            <div className="relative rounded-xl overflow-hidden">

              <img
                src={product.image_url}
                alt={product.name}
                className="w-full object-cover"
                style={{ aspectRatio: "3/4" }}
              />

              {/* BADGES */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">

                {product.is_new && (
                  <span className="badge badge-accent">
                    NEW
                  </span>
                )}

                {product.discount && (
                  <span className="badge badge-primary">
                    {product.discount}% OFF
                  </span>
                )}

              </div>

            </div>

          </div>

          {/* DETAILS */}
          <div>

            {/* OCCASION */}
            <p className="text-xs uppercase tracking-widest text-[#C9A24D] mb-2">
              {product.occasion}
            </p>

            {/* TITLE */}
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">
              {product.name}
            </h1>

            {/* PRICE */}
            <div className="flex items-center gap-3 mb-6 border-b pb-4">

              <span className="text-2xl font-bold text-[#7A1E2D]">
                ₹{product.price.toLocaleString()}
              </span>

              {product.original_price && (
                <>
                  <span className="text-gray-400 line-through">
                    ₹{product.original_price.toLocaleString()}
                  </span>

                  <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded">
                    Save ₹{(product.original_price - product.price).toLocaleString()}
                  </span>
                </>
              )}

            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* META */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mb-6 text-sm">

              <div>
                <p className="text-gray-400 text-xs">
                  Fabric
                </p>

                <p className="font-medium">
                  {product.fabric}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">
                  Color
                </p>

                <p className="font-medium">
                  {product.color}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">
                  Occasion
                </p>

                <p className="font-medium">
                  {product.occasion}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">
                  Care
                </p>

                <p className="font-medium">
                  {product.care}
                </p>
              </div>

            </div>

            {/* STOCK */}
            <div className={`mb-6 font-medium flex items-center gap-2 ${product.in_stock ? 'text-green-600' : 'text-red-500'}`}>
              {product.in_stock
                ? "✔ In Stock - Ready to Ship"
                : "✖ Out of Stock"}
            </div>

            {/* SHARE */}
            <div className="flex items-center gap-3 mb-6">

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition text-sm font-medium"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C9.353 12.925 10.146 12.5 11 12.5c.854 0 1.647.425 2.316.842m-4.632 0a2.5 2.5 0 11-2.368-4.342m6.999 4.342a2.5 2.5 0 102.368-4.342M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                Share

              </button>

            </div>

            {/* NOTICE */}
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">

              <p className="font-semibold text-orange-600 text-sm">
                ⚠️ Online payment coming soon
              </p>

              <p className="text-sm text-gray-600 mt-1">
                Add products to cart and order easily via WhatsApp.
              </p>

            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">

              {/* CART BUTTON */}
              {quantity === 0 ? (

                <button
                  onClick={handleAdd}
                  disabled={!product.in_stock}
                  className="flex-1 bg-[#7A1E2D] text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-[#5c1521] transition disabled:opacity-50"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h12M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                    />
                  </svg>

                  Add To Cart

                </button>

              ) : (

                <div className="flex-1 flex items-center justify-between bg-[#7A1E2D] text-white rounded-lg overflow-hidden">

                  <button
                    onClick={handleDecrease}
                    className="w-16 py-3 text-2xl hover:bg-[#5c1521]"
                  >
                    -
                  </button>

                  <span className="font-semibold text-lg">
                    {quantity}
                  </span>

                  <button
                    onClick={handleAdd}
                    className="w-16 py-3 text-2xl hover:bg-[#5c1521]"
                  >
                    +
                  </button>

                </div>

              )}

              {/* CONTINUE SHOPPING */}
              <Link
                to="/products"
                className="flex-1 border border-gray-300 py-3 rounded-lg text-center hover:bg-gray-100 transition"
              >
                Continue Shopping
              </Link>

            </div>

            {/* STORE BANNER */}
            <div className="bg-gradient-to-r from-[#7A1E2D] to-[#5c1521] text-white p-5 rounded-xl shadow-md">

              <a
                href="https://www.google.com/maps/place/Sana+sarees+centre/@18.0050132,79.5359586,17z/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 mt-1 text-white"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                </svg>

                <div>

                  <p className="text-white/90 font-semibold mb-1">
                    Visit Our Store
                  </p>

                  <p className="text-sm text-white/90 leading-relaxed">
                    Get better pricing & personalized styling assistance in-store.
                  </p>

                </div>

              </a>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
