import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from "../../api/apiClient";

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
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
      const response = await api.post("/auth/register", {
  email: formData.email,
  password: formData.password,
  phone: formData.phone,
  username: formData.name,
});

const data = response.data;

      const data = await response.json()

      if (data.success) {
  navigate('/verify-otp', {
    state: {
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      username: formData.name
    }
  })
} else {
        setMessage('Registration failed')
      }

    } catch (error) {
      console.error(error)
      setMessage('Server error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-2xl mb-5">Sign Up</h2>

        {message && <p className="mb-3 text-green-600">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" className="border p-2 w-full mb-3" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" className="border p-2 w-full mb-3" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" className="border p-2 w-full mb-3" onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" className="border p-2 w-full mb-3" onChange={handleChange} />

          <button className="bg-[#7A1E2D] text-white w-full py-2 rounded">
            Create Account
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-[#7A1E2D]">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup