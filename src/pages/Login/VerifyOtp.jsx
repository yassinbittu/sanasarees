import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from "../../api/apiClient"
import Toast from "../../components/common/Toast"

function VerifyOtp() {
  const [otp, setOtp] = useState('')
  const [toast, setToast] = useState({ show: false, message: "", type: "" })
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const { email } = location.state || {}

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!otp) {
      setToast({
        show: true,
        message: "Please enter OTP",
        type: "error"
      })
      return
    }

    try {
      setLoading(true)

      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
      })

      const data = res.data

      if (data.success) {
        localStorage.setItem("accessToken", data.data.access_token)
        localStorage.setItem("refreshToken", data.data.refresh_token)

        setToast({
          show: true,
          message: "Account verified successfully 🎉",
          type: "success"
        })

        setTimeout(() => navigate('/'), 1500)

      } else {
        setToast({
          show: true,
          message: data.message || "Invalid OTP",
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
      setLoading(false)
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
        <h2 className="text-2xl mb-5">Verify OTP</h2>

        <p className="text-sm mb-4">
          Enter OTP sent to <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 w-full mb-3 text-center tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            disabled={loading}
            className={`w-full py-2 rounded text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#7A1E2D]"
              }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default VerifyOtp