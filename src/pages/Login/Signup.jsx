import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from "../../api/apiClient"
import Toast from "../../components/common/Toast" // ✅ import toast

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })

  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState({ show: false, message: "", type: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name required'
    if (!formData.email) newErrors.email = 'Email required'
    if (!formData.password) newErrors.password = 'Password required'
    if (!formData.phone) newErrors.phone = 'Phone required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true) // 🔥 start loading

      const res = await api.post("/auth/register", {
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        username: formData.name,
      })

      const data = res.data

      if (data.success) {
        setToast({
          show: true,
          message: "OTP sent to your email ✅",
          type: "success"
        })

        setTimeout(() => {
          navigate('/verify-otp', { state: { email: formData.email } })
        }, 1500)

      } else {
        setToast({
          show: true,
          message: data.message || "Registration failed",
          type: "error"
        })
      }

    } catch (error) {
      setToast({
        show: true,
        message: error.response?.data?.message || "Server error",
        type: "error"
      })
    } finally {
      setLoading(false) // 🔥 stop loading
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      {/* ✅ TOAST */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-2xl mb-5">Sign Up</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border p-2 w-full mb-3"
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 w-full mb-3"
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 w-full mb-3"
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="border p-2 w-full mb-3"
            onChange={handleChange}
          />
          {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone}</p>}

          <button
            disabled={loading}
            className={`w-full py-2 rounded text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#7A1E2D]"
              }`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="mt-4 text-sm">
          Already have an account?
          <Link to="/login" className="text-[#7A1E2D] ml-1">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup