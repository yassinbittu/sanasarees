import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './auth/AuthContext.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)

window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader')
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = '0'
      setTimeout(() => loader.remove(), 600)
    }
  }, 300)
})