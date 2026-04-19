import React, { useState, useEffect, useMemo } from 'react'
import ProductCard from '../../components/common/ProductCard'
import { getProducts, getProductFilters } from '../../admin/api/products'

function Products() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ colors: [], fabrics: [], occasions: [] })

  const [selectedOccasion, setSelectedOccasion] = useState('All')
  const [selectedFabric, setSelectedFabric] = useState('All')

  useEffect(() => {
    fetchProducts()
    fetchFilters()
  }, [])

  const fetchProducts = async () => {
    const res = await getProducts()
    setProducts(res.data || [])
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
      <div className="max-w-[1280px] mx-auto px-6 py-10 flex gap-8">

        {/* FILTERS */}
        <aside className="hidden lg:block w-[260px]">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="mb-4 font-semibold">Filters</h3>

            <select onChange={e => setSelectedOccasion(e.target.value)} className="w-full mb-4">
              {occasions.map(o => <option key={o}>{o}</option>)}
            </select>

            <select onChange={e => setSelectedFabric(e.target.value)} className="w-full">
              {fabrics.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
        </aside>

        {/* PRODUCTS */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Products