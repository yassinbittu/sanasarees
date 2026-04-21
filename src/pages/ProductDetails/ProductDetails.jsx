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

  if (!product) return <div className="text-center pt-40">Loading...</div>

  return (
    <div className="pt-[80px] pb-24">
      <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <img
          src={`${import.meta.env.VITE_BASE_URL}${product.image_url}`}
          className="rounded-xl"
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

          <Link to="/products" className="btn btn-primary mt-6">
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails