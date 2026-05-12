import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

import { getCartCount } from "../utils/cart";

function Navbar() {

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();

  const isLoggedIn = false;

  // SCROLL EFFECT
  useEffect(() => {

    const onScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);

  }, []);

  // CLOSE MOBILE MENU
  useEffect(() => {

    setMenuOpen(false);

  }, [location]);

  // CLOSE DROPDOWN
  useEffect(() => {

    const handleClickOutside = (e) => {

      if (!e.target.closest(".profile-dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () =>
      document.removeEventListener("click", handleClickOutside);

  }, []);

  // FETCH CART COUNT
  // FETCH CART COUNT
const fetchCartCount = () => {
  setCartCount(getCartCount());
};

useEffect(() => {

  fetchCartCount();

  window.addEventListener(
    "cartUpdated",
    fetchCartCount
  );

  return () => {
    window.removeEventListener(
      "cartUpdated",
      fetchCartCount
    );
  };

}, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Sarees" },
    { path: "/boutique", label: "Boutique Services" },
    { path: "/products?offers=true", label: "Offers" },
  ];

  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/login";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-250 ${isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
        }`}
    >

      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex flex-col no-underline">

          <span className="font-heading text-[1.75rem] font-bold text-[#7A1E2D] tracking-[3px] leading-none">
            SANA
          </span>

          <span className="text-[0.65rem] text-[#666] uppercase tracking-wider -mt-0.5">
            Sarees & Ladies Collections
          </span>

        </Link>

        {/* DESKTOP NAV */}
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
                      ? "text-[#7A1E2D] after:w-full"
                      : "text-[#1C1C1C] after:w-0 hover:text-[#7A1E2D] hover:after:w-full"
                    }`}
                >
                  {link.label}
                </Link>

              </li>
            ))}

          </ul>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-5">

            {/* CART ICON */}
            <Link
              to="/cart"
              className="relative text-[#7A1E2D] hover:text-[#C9A24D]"
            >

              <FaShoppingCart size={22} />

              {/* CART COUNT */}
              {cartCount > 0 && (

                <span className="absolute -top-2 -right-2 bg-[#7A1E2D] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>

              )}

            </Link>

            {!isLoggedIn ? (

              <Link
                to="/login"
                className={`px-5 py-2 rounded-full font-medium transition border
  ${isScrolled
                    ? "bg-[#7A1E2D] text-white border-[#7A1E2D]"
                    : "bg-white text-[#7A1E2D] border-white"
                  }`}
              >
                Login
              </Link>

            ) : (

              <div className="relative profile-dropdown">

                <button
                  onClick={() =>
                    setDropdownOpen(!dropdownOpen)
                  }
                  className="text-[#7A1E2D] hover:text-[#C9A24D]"
                >
                  <FaUserCircle size={28} />
                </button>

                {dropdownOpen && (

                  <div className="absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-xl overflow-hidden z-[2000]">

                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 text-red-500"
                    >
                      Logout
                    </button>

                  </div>
                )}

              </div>
            )}

          </div>

        </nav>

        {/* MOBILE RIGHT */}
        <div className="flex items-center gap-4 md:hidden">

          {/* MOBILE CART */}
          <Link
            to="/cart"
            className="relative text-[#7A1E2D]"
          >

            <FaShoppingCart size={22} />

            {cartCount > 0 && (

              <span className="absolute -top-2 -right-2 bg-[#7A1E2D] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>

            )}

          </Link>

          {/* HAMBURGER */}
          <button
            className="flex flex-col justify-center gap-[5px] w-8 h-8 bg-transparent border-none p-0"
            onClick={() => setMenuOpen(!menuOpen)}
          >

            <span
              className={`block w-full h-0.5 bg-[#7A1E2D] ${menuOpen
                  ? "rotate-45 translate-y-[7px]"
                  : ""
                }`}
            />

            <span
              className={`block w-full h-0.5 bg-[#7A1E2D] ${menuOpen ? "opacity-0" : ""
                }`}
            />

            <span
              className={`block w-full h-0.5 bg-[#7A1E2D] ${menuOpen
                  ? "-rotate-45 -translate-y-[7px]"
                  : ""
                }`}
            />

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden fixed top-[68px] left-0 right-0 bottom-0 bg-white flex flex-col p-8 gap-8 transition-all duration-300 ${menuOpen
            ? "translate-x-0"
            : "translate-x-full"
          }`}
      >

        <ul className="flex flex-col gap-5">

          {navLinks.map((link) => (

            <li key={link.path}>

              <Link to={link.path}>
                {link.label}
              </Link>

            </li>
          ))}

        </ul>

        <div className="flex flex-col gap-4">

          {!isLoggedIn ? (

            <Link
              to="/login"
              className="btn btn-secondary"
            >
              Login
            </Link>

          ) : (

            <>

              <Link
                to="/profile"
                className="text-lg"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 text-left"
              >
                Logout
              </button>

            </>

          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;
