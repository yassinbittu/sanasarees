import React, { useState, useEffect, useMemo } from 'react'
import ProductCard from '../../components/common/ProductCard'
import { getProducts, getProductFilters } from '../../admin/api/products'

function Products() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ colors: [], fabrics: [], occasions: [] })

  const [selectedOccasion, setSelectedOccasion] = useState('All')
  const [selectedFabric, setSelectedFabric] = useState('All')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
    fetchFilters()
  }, [])

  const fetchProducts = async () => {
  try {
    // console.log("Fetching products...")

    setLoading(true)

    const res = await getProducts()

    // console.log("API response:", res)

    let productsData = []

    if (Array.isArray(res)) {
      productsData = res
    } else if (Array.isArray(res?.products)) {
      productsData = res.products
    } else if (Array.isArray(res?.data?.products)) {
      productsData = res.data.products
    } else if (Array.isArray(res?.data)) {
      productsData = res.data
    }

    setProducts(productsData)

  } catch (err) {
    console.error("API ERROR:", err)
  } finally {
    // console.log("FINALLY CALLED")
    setLoading(false)
  }
}

  const fetchFilters = async () => {
    const res = await getProductFilters()
    setFilters(res)
  }

  const occasions = ['All', ...filters.occasions]
  const fabrics = ['All', ...filters.fabrics]

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    if (selectedOccasion !== 'All')
      filtered = filtered.filter(p => p.occasion === selectedOccasion)

    if (selectedFabric !== 'All')
      filtered = filtered.filter(p => p.fabric === selectedFabric)

    return filtered
  }, [products, selectedOccasion, selectedFabric])

  return (
    <div className="pt-[80px]">
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 py-6 lg:flex gap-8">

        {/* FILTERS */}
        <aside className="hidden lg:block w-[260px]">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="mb-4 font-semibold">Filters</h3>

            <select
              onChange={e => setSelectedOccasion(e.target.value)}
              className="w-full mb-4 border p-2 rounded"
            >
              {occasions.map(o => <option key={o}>{o}</option>)}
            </select>

            <select
              onChange={e => setSelectedFabric(e.target.value)}
              className="w-full border p-2 rounded"
            >
              {fabrics.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
        </aside>

        {/* PRODUCTS */}
        <main className="flex-1">

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-medium text-gray-600">
                Wait… sana is adding offer sarees 🛍️
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Please check back in a moment
              </p>
            </div>
          ) : (
            <>
              {/* GRID */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Products