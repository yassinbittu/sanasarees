import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      navigate('/admin/dashboard')
    } else {
      setError('Invalid credentials. Try admin / admin123')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'linear-gradient(135deg,#7A1E2D 0%,#5A0E1D 100%)' }}>
      <div className="bg-white rounded-2xl p-10 w-full max-w-[400px] shadow-2xl">
        <h1 className="text-center mb-1">Admin Login</h1>
        <p className="text-center text-sm text-[#666] mb-8">Access the store management dashboard</p>

        {error && (
          <div className="bg-[#D32F2F]/10 text-[#D32F2F] px-4 py-3 rounded-lg mb-6 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="form-group mb-0">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={credentials.username}
              onChange={e => setCredentials({ ...credentials, username: e.target.value })}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group mb-0">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={credentials.password}
              onChange={e => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-large w-full justify-center mt-2">Login</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
