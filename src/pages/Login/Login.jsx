import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (isSignUp && !formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (isSignUp && !formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (isSignUp && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Please enter a valid 10-digit phone number'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) alert(isSignUp ? 'Sign up functionality coming soon!' : 'Login functionality coming soon!')
  }

  const Field = ({ id, label, type, placeholder, error }) => (
    <div className="form-group">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        className={`form-input${error ? ' error' : ''}`}
        placeholder={placeholder}
        value={formData[id]}
        onChange={handleChange}
      />
      {error && <span className="block text-xs text-[#D32F2F] mt-1">{error}</span>}
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10" style={{ background: 'linear-gradient(135deg,#FAF9F7 0%,#F5F3F0 100%)' }}>
      <div className="w-full max-w-[440px]">
        {/* Brand */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex flex-col items-center">
            <span className="font-heading text-[2.5rem] font-bold text-[#7A1E2D] tracking-[3px]">SANA</span>
            <span className="text-xs text-[#666] uppercase tracking-wider">Sarees &amp; Ladies Collections</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* Tabs */}
          <div className="flex gap-1 mb-7 p-1 bg-[#F5F3F0] rounded-xl">
            {['Login', 'Sign Up'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setIsSignUp(i === 1)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-150
                  ${(i === 1) === isSignUp
                    ? 'bg-white text-[#7A1E2D] shadow-sm'
                    : 'text-[#666] hover:text-[#1C1C1C]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            {isSignUp && <Field id="name" label="Full Name" type="text" placeholder="Enter your full name" error={errors.name} />}
            <Field id="email" label="Email Address" type="email" placeholder="Enter your email" error={errors.email} />
            <Field id="password" label="Password" type="password" placeholder="Enter your password" error={errors.password} />
            {isSignUp && <Field id="phone" label="Phone Number" type="tel" placeholder="Enter your phone number" error={errors.phone} />}

            {!isSignUp && (
              <div className="text-right -mt-2 mb-5">
                <a href="#" className="text-sm text-[#7A1E2D] hover:underline">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-large w-full justify-center mt-2">
              {isSignUp ? 'Create Account' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-[#E5E2DE]" />
            <span className="px-4 text-sm text-[#999]">or</span>
            <div className="flex-1 h-px bg-[#E5E2DE]" />
          </div>

          <div className="text-center">
            <Link to="/admin" className="text-sm font-medium text-[#7A1E2D] hover:text-[#5A0E1D] transition-colors">
              Login as Admin →
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-[#999] mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default Login
