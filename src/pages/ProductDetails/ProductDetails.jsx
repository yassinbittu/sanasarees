import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../../admin/api/products'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    const res = await getProductById(id)
    setProduct(res)
  }

  const phoneNumber = "917799296786"

  const getWhatsAppLink = () => {
    if (!product) return "#"

    const message = `Hi, I want to order this saree 🛍️

Name: ${product.name}
Price: ₹${product.price}
Fabric: ${product.fabric}
Color: ${product.color}

Image: ${product.image_url}

Please share more details.`

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  }
  const handleShare = async () => {
    if (!product) return

    const shareData = {
      title: product.name,
      text: `Check out this saree 🛍️

${product.name}
₹${product.price}
${product.fabric} | ${product.color}`,
      url: window.location.href // IMPORTANT
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // fallback
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          shareData.text + "\n" + shareData.url
        )}`
        window.open(whatsappUrl, "_blank")
      }
    } catch (err) {
      console.error("Share failed:", err)
    }
  }
  if (!product) return <div className="text-center pt-40">Loading...</div>

  return (
    <div className="pt-[90px] pb-20">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* BREADCRUMB */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-black">Sarees</Link>
          <span>/</span>
          <span className="text-black font-medium">{product.name}</span>
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
                <p className="text-gray-400 text-xs">Fabric</p>
                <p className="font-medium">{product.fabric}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Color</p>
                <p className="font-medium">{product.color}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Occasion</p>
                <p className="font-medium">{product.occasion}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Care</p>
                <p className="font-medium">{product.care}</p>
              </div>
            </div>

            {/* STOCK */}
            <div className={`mb-6 font-medium flex items-center gap-2 ${product.in_stock ? 'text-green-600' : 'text-red-500'}`}>
              {product.in_stock ? "✔ In Stock - Ready to Ship" : "✖ Out of Stock"}
            </div>
            <div className="flex items-center gap-3 mb-6">

              {/* SHARE BUTTON */}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition text-sm font-medium"
              >
                {/* Share Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C9.353 12.925 10.146 12.5 11 12.5c.854 0 1.647.425 2.316.842m-4.632 0a2.5 2.5 0 11-2.368-4.342m6.999 4.342a2.5 2.5 0 102.368-4.342M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

                Share
              </button>

              {/* OPTIONAL: COPY LINK BUTTON
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  alert("Link copied!")
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition text-sm"
              >
                📋 Copy Link
              </button> */}

            </div>

            {/* NOTICE */}
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
              <p className="font-semibold text-orange-600 text-sm">
                ⚠️ Online payment coming soon
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-green-500"
                >
                  <path d="M16.001 2.667c-7.36 0-13.333 5.973-13.333 13.333 0 2.352.613 4.566 1.68 6.5L2.667 29.333l6.933-1.653A13.25 13.25 0 0016 29.333c7.36 0 13.333-5.973 13.333-13.333S23.36 2.667 16.001 2.667zm0 24c-2.08 0-4.053-.56-5.76-1.547l-.413-.24-4.107.987.987-4.013-.267-.427A10.64 10.64 0 015.334 16c0-5.88 4.787-10.667 10.667-10.667S26.668 10.12 26.668 16 21.881 26.667 16.001 26.667zm5.867-7.96c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.347-.496-2.56-1.58-.947-.84-1.587-1.88-1.773-2.2-.187-.32-.02-.493.14-.653.14-.14.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.627-.52-.54-.72-.547-.187-.007-.4-.007-.613-.007-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.467 4.827.767.333 1.367.533 1.833.68.773.247 1.48.213 2.04.133.627-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
                </svg>

                <span>Place Order via WhatsApp</span>
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-green-700 transition"
              >
                {/* WhatsApp Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-white"
                >
                  <path d="M16.001 2.667c-7.36 0-13.333 5.973-13.333 13.333 0 2.352.613 4.566 1.68 6.5L2.667 29.333l6.933-1.653A13.25 13.25 0 0016 29.333c7.36 0 13.333-5.973 13.333-13.333S23.36 2.667 16.001 2.667zm0 24c-2.08 0-4.053-.56-5.76-1.547l-.413-.24-4.107.987.987-4.013-.267-.427A10.64 10.64 0 015.334 16c0-5.88 4.787-10.667 10.667-10.667S26.668 10.12 26.668 16 21.881 26.667 16.001 26.667zm5.867-7.96c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.347-.496-2.56-1.58-.947-.84-1.587-1.88-1.773-2.2-.187-.32-.02-.493.14-.653.14-.14.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.627-.52-.54-.72-.547-.187-.007-.4-.007-.613-.007-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.467 4.827.767.333 1.367.533 1.833.68.773.247 1.48.213 2.04.133.627-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
                </svg>

                Order via WhatsApp
              </a>

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
                className="flex items-start gap-3 bg-gradient-to-r from-[#7A1E2D] to-[#5c1521] text-white p-5 rounded-xl shadow-md hover:opacity-95 transition"
              >

                {/* Location Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 mt-1 text-white"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                </svg>

                {/* TEXT */}
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