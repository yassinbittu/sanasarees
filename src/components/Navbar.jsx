import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Sarees' },
    { path: '/boutique', label: 'Boutique Services' },
    { path: '/products?offers=true', label: 'Offers' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-250 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col no-underline">
          <span className="font-heading text-[1.75rem] font-bold text-[#7A1E2D] tracking-[3px] leading-none">
            SANA
          </span>
          <span className="text-[0.65rem] text-[#666] uppercase tracking-wider -mt-0.5">
            Sarees &amp; Ladies Collections
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`relative text-sm font-medium uppercase tracking-wide py-2 transition-colors duration-150
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5
                    after:bg-[#C9A24D] after:transition-all after:duration-250
                    ${location.pathname === link.path
                      ? 'text-[#7A1E2D] after:w-full'
                      : 'text-[#1C1C1C] after:w-0 hover:text-[#7A1E2D] hover:after:w-full'
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/login" className="btn btn-secondary btn-small">Login</Link>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 bg-transparent border-none p-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-full h-0.5 bg-[#7A1E2D] transition-all duration-250 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-full h-0.5 bg-[#7A1E2D] transition-all duration-250 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-full h-0.5 bg-[#7A1E2D] transition-all duration-250 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[68px] left-0 right-0 bottom-0 bg-white flex flex-col p-8 gap-8 transition-transform duration-250 z-[999] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col gap-5 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-lg font-medium uppercase tracking-wide transition-colors ${
                  location.pathname === link.path ? 'text-[#7A1E2D]' : 'text-[#1C1C1C] hover:text-[#7A1E2D]'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/login" className="btn btn-primary btn-large w-full text-center">Login</Link>
      </div>
    </header>
  )
}

export default Navbar
