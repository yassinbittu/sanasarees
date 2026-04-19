import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from "../api/apiClient"; //  ADD THIS
function VerifyOtp() {
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const { email, password, phone, username } = location.state || {}

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post("/auth/verify-otp", {
        email,
        otp,
        password,
        phone,
        username,
      });

      const data = response.data;

      const data = await response.json()

      if (data.success) {
        setMessage('Account created successfully!')
        setTimeout(() => navigate('/login'), 2000)
      } else {
        setMessage('Invalid OTP')
      }

    } catch (error) {
      console.error(error)
      setMessage('Server error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-2xl mb-5">Verify OTP</h2>

        <p className="text-sm mb-4">Enter OTP sent to your email</p>

        {message && <p className="mb-3 text-green-600">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 w-full mb-3"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button className="bg-[#7A1E2D] text-white w-full py-2 rounded">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerifyOtp