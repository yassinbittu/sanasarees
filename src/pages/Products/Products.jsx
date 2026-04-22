import React, { useState, useEffect, useMemo } from 'react'
import ProductCard from '../../components/common/ProductCard'
import { getProducts, getProductFilters } from '../../admin/api/products'

function Products() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ colors: [], fabrics: [], occasions: [] })

  const [selectedOccasion, setSelectedOccasion] = useState('All')
  const [selectedFabric, setSelectedFabric] = useState('All')

  const [pagination, setPagination] = useState({})
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts(1)
    fetchFilters()
  }, [])

  const fetchProducts = async (pageNum = 1) => {
    try {
      setLoading(true)

      const res = await getProducts(pageNum)

      const productsData =
        res.products ||
        res.data?.products ||
        res.data ||
        []

      const paginationData =
        res.pagination ||
        res.data?.pagination ||
        {}

      setProducts(productsData)
      setPagination(paginationData)
      setPage(pageNum)

    } catch (err) {
      console.error(err)
    } finally {
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

          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-medium text-gray-600">
                Wait… admin is adding offer sarees 🛍️
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

              {/* PAGINATION INFO */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-500">
                  Page {pagination.page || page} of {pagination.pages || 1}
                </p>

                <div className="flex gap-2">
                  <button
                    disabled={!pagination.has_prev}
                    onClick={() => fetchProducts(page - 1)}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
                  >
                    Prev
                  </button>

                  <button
                    disabled={!pagination.has_next}
                    onClick={() => fetchProducts(page + 1)}
                    className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* 🔥 SMART PAGE NUMBERS */}
              <div className="flex gap-2 mt-4 flex-wrap items-center">

                {/* FIRST */}
                <button
                  onClick={() => fetchProducts(1)}
                  className={`px-3 py-1 border rounded ${
                    page === 1 ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  1
                </button>

                {/* LEFT DOT */}
                {page > 3 && <span>...</span>}

                {/* MIDDLE */}
                {Array.from({ length: 3 }, (_, i) => {
                  const pageNum = page - 1 + i

                  if (pageNum > 1 && pageNum < (pagination.pages || 1)) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => fetchProducts(pageNum)}
                        className={`px-3 py-1 border rounded ${
                          page === pageNum
                            ? "bg-black text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  }

                  return null
                })}

                {/* RIGHT DOT */}
                {page < (pagination.pages - 2) && <span>...</span>}

                {/* LAST */}
                {pagination.pages > 1 && (
                  <button
                    onClick={() => fetchProducts(pagination.pages)}
                    className={`px-3 py-1 border rounded ${
                      page === pagination.pages
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {pagination.pages}
                  </button>
                )}

              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Products