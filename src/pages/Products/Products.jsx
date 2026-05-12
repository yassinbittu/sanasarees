import React, { useState, useEffect, useMemo, useRef } from 'react'
import ProductCard from '../../components/common/ProductCard'
import { getProducts, getProductFilters } from '../../admin/api/products'

function Products() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ colors: [], fabrics: [], occasions: [] })

  const [selectedOccasion, setSelectedOccasion] = useState('All')
  const [selectedFabric, setSelectedFabric] = useState('All')
  const [search, setSearch] = useState("")

  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)

  const [showFilters, setShowFilters] = useState(false)

  const loaderRef = useRef(null)
  
  // Refs to track current filter values for useEffect
  const filtersRef = useRef({ selectedOccasion, selectedFabric, search })

  useEffect(() => {
    filtersRef.current = { selectedOccasion, selectedFabric, search }
  }, [selectedOccasion, selectedFabric, search])

  useEffect(() => {
    fetchProducts(1)
    fetchFilters()
  }, [])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
    setHasNext(true)
    setProducts([])
    fetchProducts(1)
  }, [selectedOccasion, selectedFabric, search])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          fetchProducts(page + 1)
        }
      },
      { rootMargin: "200px" }
    )

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => loaderRef.current && observer.unobserve(loaderRef.current)
  }, [page, hasNext, loading])

  const fetchProducts = async (pageNum = 1) => {
    try {
      setLoading(true)

      // Build query params for server-side filtering
      const params = new URLSearchParams()
      params.append('page', pageNum)
      params.append('per_page', 12)
      
      if (selectedOccasion !== 'All') params.append('occasion', selectedOccasion)
      if (selectedFabric !== 'All') params.append('fabric', selectedFabric)
      if (debouncedSearch.trim()) params.append('search', debouncedSearch.trim())

      const res = await getProducts(pageNum, params.toString())

      const productsData =
        res.products || res.data?.products || res.data || []

      const next =
        res.pagination?.has_next ||
        res.data?.pagination?.has_next ||
        false

      if (pageNum === 1) setProducts(productsData)
      else setProducts(prev => [...prev, ...productsData])

      setHasNext(next)
      setPage(pageNum)

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

 const fetchFilters = async () => {
  try {
    const res = await getProductFilters()

    setFilters({
      occasions: res?.occasions || res?.data?.occasions || [],
      fabrics: res?.fabrics || res?.data?.fabrics || [],
      colors: res?.colors || res?.data?.colors || [],
    })
  } catch (err) {
    console.error(err)

    setFilters({
      occasions: [],
      fabrics: [],
      colors: [],
    })
  }
}

  const occasions = ['All', ...filters.occasions]
  const fabrics = ['All', ...filters.fabrics]

  // Debounce search input
  const [debouncedSearch, setDebouncedSearch] = useState("")
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  // Update search in fetch when debounced search changes
  useEffect(() => {
    setPage(1)
    setHasNext(true)
    setProducts([])
    fetchProducts(1)
  }, [debouncedSearch])

  return (
    <div className="pt-[80px]">

      {/* 🔥 HEADER */}
      <div className="max-w-[1280px] mx-auto px-4 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <h2 className="text-lg font-semibold">Products</h2>

        <div className="flex gap-2 w-full sm:w-auto">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search sarees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 sm:w-[250px] border px-3 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1E2D]"
          />

          {/* MOBILE FILTER BUTTON */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden border px-4 py-2 rounded-full text-sm"
          >
            Filters
          </button>

        </div>
      </div>

      {/* 🔥 MAIN */}
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 py-6 lg:flex gap-8">

        {/* DESKTOP FILTER */}
        <aside className="hidden lg:block w-[260px]">
          <div className="bg-white p-6 rounded-xl shadow-sm">

            <h3 className="mb-4 font-semibold">Filters</h3>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Occasion
              </label>
              <select
                value={selectedOccasion}
                onChange={e => setSelectedOccasion(e.target.value)}
                className="w-full border p-2 rounded"
              >
                {occasions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            {/* FABRIC */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Fabric
              </label>
              <select
                value={selectedFabric}
                onChange={e => setSelectedFabric(e.target.value)}
                className="w-full border p-2 rounded"
              >
                {fabrics.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>


          </div>
        </aside>

        {/* PRODUCTS */}
        <main className="flex-1">

          {products.length === 0 && !loading ? (
            <div className="text-center py-20 text-gray-500">
              {search
                ? `No sarees found for "${search}"`
                : "Wait… sana is adding offer sarees 🛍️"}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3">
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

        </main>
      </div>

      {/* INFINITE SCROLL */}
      <div ref={loaderRef} className="h-10 flex justify-center items-center">
        {loading && <p className="text-gray-400 text-sm">Loading...</p>}
      </div>

      {/* 🔥 MOBILE FILTER BOTTOM SHEET */}
      {/* 🔥 MOBILE FILTER BOTTOM SHEET */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/40 flex items-end z-50">

          <div className="w-full bg-white rounded-t-2xl p-5">

            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)}>✖</button>
            </div>

            {/* OCCASION */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Occasion
              </label>
              <select
                value={selectedOccasion}
                onChange={e => setSelectedOccasion(e.target.value)}
                className="w-full border p-2 rounded"
              >
                {occasions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            {/* FABRIC */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-600 mb-1 block">
                Fabric
              </label>
              <select
                value={selectedFabric}
                onChange={e => setSelectedFabric(e.target.value)}
                className="w-full border p-2 rounded"
              >
                {fabrics.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setSelectedOccasion("All")
                  setSelectedFabric("All")
                }}
                className="flex-1 border py-2 rounded"
              >
                Clear
              </button>

              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-[#7A1E2D] text-white py-2 rounded"
              >
                Apply
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Products