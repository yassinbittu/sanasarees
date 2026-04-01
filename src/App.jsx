import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Boutique from './pages/Boutique/Boutique'
import Order from './pages/Order/Order'
import Login from './pages/Login/Login'

import AdminLogin from './admin/AdminLogin'
import Dashboard from './admin/Dashboard'
import ManageProducts from './admin/ManageProducts'
import ManageOrders from './admin/ManageOrders'

function LayoutWrapper() {
  const location = useLocation()
  const hideLayout =
    location.pathname === '/login' ||
    location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper />
    </BrowserRouter>
  )
}

export default App
