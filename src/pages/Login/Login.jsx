import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await login(formData.email, formData.password)

    setLoading(false)

    if (res.success) {
      if (res.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }
    } else {
      setError(res.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3 rounded"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-3 rounded"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading ? 'bg-gray-400' : 'bg-[#7A1E2D]'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* ✅ Signup Redirect */}
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer font-medium"
            onClick={() => navigate('/signup')}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login