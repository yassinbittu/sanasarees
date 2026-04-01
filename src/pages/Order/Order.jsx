import React from 'react'
import { Link } from 'react-router-dom'

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const steps = [
  { num: 1, title: 'Browse & Select', desc: 'Explore our collection and find your perfect saree or service' },
  { num: 2, title: 'Take a Screenshot', desc: 'Capture the product details you want to order' },
  { num: 3, title: 'Send on WhatsApp', desc: 'Share the screenshot with your details to our WhatsApp number' },
  { num: 4, title: 'Confirmation', desc: "We'll confirm your order and share delivery details" },
]

function Order() {
  const waLink = `https://wa.me/917799296786?text=${encodeURIComponent('Hi! I want to place an order. Here are the details:')}`

  return (
    <div className="min-h-screen flex items-center bg-[#FAF9F7] pt-[80px] pb-16">
      <div className="max-w-[700px] mx-auto px-6 w-full text-center">
        <div className="text-6xl mb-6">📱</div>
        <h1 className="mb-3">How to Order</h1>
        <p className="text-lg mb-12">We're working on online payments. For now, ordering is simple via WhatsApp!</p>

        {/* Steps */}
        <div className="flex flex-col gap-4 mb-10 text-left">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex items-start gap-5 p-5 bg-white rounded-xl shadow-sm transition-all duration-200 hover:translate-x-2 hover:shadow-md"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#7A1E2D] text-white flex items-center justify-center text-lg font-bold">
                {step.num}
              </div>
              <div>
                <h3 className="font-body text-base font-semibold mb-1 text-[#1C1C1C]">{step.title}</h3>
                <p className="text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div className="text-left p-6 bg-[#C9A24D]/10 border border-[#C9A24D] rounded-xl mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">⚠️</span>
            <h3 className="font-body text-base font-semibold text-[#C9A24D]">Important Notice</h3>
          </div>
          <ul className="flex flex-col gap-2">
            {[
              'Online payment integration coming soon',
              'Currently accepting orders via WhatsApp only',
              'Cash on delivery available for local orders',
              'Visit our store for instant purchases with exclusive discounts',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#666]">
                <span className="text-[#C9A24D] font-bold mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-large justify-center">
            <WaIcon /> Order via WhatsApp: 7799296786
          </a>
          <Link to="/products" className="btn btn-secondary btn-large justify-center">Browse Products</Link>
        </div>
      </div>
    </div>
  )
}

export default Order
