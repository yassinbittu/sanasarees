import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../../admin/api/products'
import { getImageUrl } from '../../utils/getImageUrl'

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
  // ✅ ADD HERE (below state, before return)
  const phoneNumber = "917799296786";

  const getWhatsAppLink = () => {
    if (!product) return "#";

    const message = `
Hi, I want to order this saree 🛍️

Name: ${product.name}
Price: ₹${product.price}
Fabric: ${product.fabric}
Color: ${product.color}

Image: ${product.image_url}

Please share more details.
  `;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };


  if (!product) return <div className="text-center pt-40">Loading...</div>

  return (
    <div className="pt-[80px] pb-24">
      <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <img
          src={product.image_url}
          className="rounded-xl"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-2xl mb-4">{product.name}</h1>

          <p className="mb-4">{product.description}</p>

          <div className="mb-4">
            ₹{product.price}
            {product.original_price && (
              <span className="line-through ml-2">
                ₹{product.original_price}
              </span>
            )}
          </div>

          <p>Fabric: {product.fabric}</p>
          <p>Color: {product.color}</p>
          <p>Care: {product.care}</p>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
