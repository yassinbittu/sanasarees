import React, { useState, useMemo } from 'react'
import ProductCard from '../../components/common/ProductCard'
import { products, occasions, fabrics, priceRanges } from '../../data/products'

function Products() {
  const [selectedOccasion, setSelectedOccasion] = useState('All')
  const [selectedFabric, setSelectedFabric] = useState('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [sortBy, setSortBy] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = [...products]
    if (selectedOccasion !== 'All') filtered = filtered.filter(p => p.occasion === selectedOccasion)
    if (selectedFabric !== 'All') filtered = filtered.filter(p => p.fabric === selectedFabric)
    filtered = filtered.filter(p => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max)
    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price)
    else if (sortBy === 'newest') filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    return filtered
  }, [selectedOccasion, selectedFabric, selectedPriceRange, sortBy])

  const clearFilters = () => {
    setSelectedOccasion('All')
    setSelectedFabric('All')
    setSelectedPriceRange(priceRanges[0])
    setSortBy('featured')
  }

  const FilterGroup = ({ title, options, selected, onSelect }) => (
    <div className="mb-7">
      <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-[#1C1C1C] mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const val = typeof opt === 'string' ? opt : opt.label
          const isActive = typeof opt === 'string' ? selected === opt : selected.label === opt.label
          return (
            <button
              key={val}
              onClick={() => onSelect(opt)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-150
                ${isActive
                  ? 'bg-[#7A1E2D] text-white border-[#7A1E2D]'
                  : 'bg-[#F5F3F0] text-[#666] border-transparent hover:border-[#7A1E2D] hover:text-[#7A1E2D]'
                }`}
            >
              {val}
            </button>
          )
        })}
      </div>
    </div>
  )

  const SidebarContent = () => (
    <>
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E5E2DE]">
        <h3 className="font-body text-base font-semibold">Filters</h3>
        <button onClick={clearFilters} className="text-sm text-[#7A1E2D] font-medium hover:underline bg-transparent border-none">Clear All</button>
      </div>
      <FilterGroup title="Occasion" options={occasions} selected={selectedOccasion} onSelect={setSelectedOccasion} />
      <FilterGroup title="Fabric" options={fabrics} selected={selectedFabric} onSelect={setSelectedFabric} />
      <FilterGroup title="Price Range" options={priceRanges} selected={selectedPriceRange} onSelect={setSelectedPriceRange} />
    </>
  )

  return (
    <div className="pt-[80px]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#7A1E2D] to-[#5A0E1D] py-16 text-center text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <span className="page-tag text-[#C9A24D]">Our Collection</span>
          <h1 className="text-white mb-2">Sarees &amp; Ladies Collections</h1>
          <p className="text-white/80 max-w-md mx-auto">Discover our exquisite range of handpicked sarees for every occasion</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-10 flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-[260px] flex-shrink-0">
          <div className="sticky top-[100px] bg-white rounded-xl p-6 shadow-sm">
            <SidebarContent />
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E5E2DE] flex-wrap gap-3">
            <p className="text-sm text-[#666]">
              Showing <strong className="text-[#1C1C1C]">{filteredProducts.length}</strong> products
            </p>
            <div className="flex items-center gap-6">
              {/* Mobile filter toggle */}
              <button
                className="lg:hidden flex items-center gap-1.5 text-sm font-medium text-[#7A1E2D] border border-[#7A1E2D] rounded-lg px-3 py-1.5"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>
                Filters
              </button>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-[#666]">Sort:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-3 py-1.5 text-sm border border-[#E5E2DE] rounded-lg bg-white cursor-pointer focus:outline-none focus:border-[#7A1E2D]"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {filtersOpen && (
            <div className="lg:hidden bg-white rounded-xl p-5 mb-6 shadow-sm border border-[#E5E2DE]">
              <SidebarContent />
            </div>
          )}

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <h3 className="mb-2">No products found</h3>
              <p className="mb-6">Try adjusting your filters to find what you're looking for</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Products
