import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './auth/ProtectedRoute'

import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Boutique from './pages/Boutique/Boutique'
import Order from './pages/Order/Order'
import Login from './pages/Login/Login'
import Signup from './pages/Login/Signup'
import VerifyOtp from './pages/Login/VerifyOtp'

import Dashboard from './admin/Dashboard'
import ManageProducts from './admin/ManageProducts'
import ManageOrders from './admin/ManageOrders'

function LayoutWrapper() {
  const location = useLocation()
  const hideLayout =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute role="admin">
                <ManageProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute role="admin">
                <ManageOrders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <LayoutWrapper />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App