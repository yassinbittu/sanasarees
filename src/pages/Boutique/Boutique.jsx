import React from 'react'

import maggamImg from '../../assets/home_images/maggam.jpeg'
import computerImg from '../../assets/home_images/computer_work.jpeg'
import blouseImg from '../../assets/home_images/blouse.jpeg'
import bridalImg from '../../assets/home_images/bridal.png' // optional for bridal

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const services = [
  {
    id: 1,
    name: 'Maggam Work',
    description: 'Traditional hand embroidery with intricate zardosi, kundan, and thread work.',
    features: ['Zardosi Work', 'Kundan Stone Setting', 'Thread Embroidery', 'Custom Patterns'],
    price: 'Starting ₹499',
    image: maggamImg,
  },
  {
    id: 2,
    name: 'Computer Embroidery',
    description: 'Precision machine embroidery for consistent, detailed designs.',
    features: ['High Precision', 'Complex Patterns', 'Fast Turnaround', 'Bulk Orders'],
    price: 'Starting ₹499',
    image: computerImg,
  },
  {
    id: 3,
    name: 'Custom Blouse Design',
    description: 'Tailored blouse designs to complement your sarees.',
    features: ['Perfect Fit', 'Designer Cuts', 'Matching Work', 'Quick Delivery'],
    price: 'Starting ₹249',
    image: blouseImg,
  },
  {
    id: 4,
    name: 'Bridal Boutique Services',
    description: 'Complete bridal ensemble creation.',
    features: ['Full Bridal Package', 'Lehenga Work', 'Accessory Matching', 'Trial Sessions'],
    price: 'Starting ₹2999',
    image: bridalImg, // or any bridal image
  },
]

const steps = [
  { num: '01', title: 'Share Your Design', desc: 'Send us your design reference or inspiration via WhatsApp' },
  { num: '02', title: 'Get a Quote', desc: 'We\'ll discuss your requirements and provide detailed pricing' },
  { num: '03', title: 'Crafting Begins', desc: 'Our skilled artisans bring your vision to life' },
  { num: '04', title: 'Delivery', desc: 'Collect your masterpiece in-store or get it delivered' },
]

function Boutique() {
  const waLink = (name) => `https://wa.me/917799296786?text=${encodeURIComponent('Hi! I\'m interested in your ' + name + ' service. Please share more details and pricing.')}`

  return (
    <div className="pt-[80px]">
      {/* Hero */}
      <section className="py-20 text-center" style={{ background: 'linear-gradient(135deg,#C9A24D 0%,#B8923D 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#1C1C1C]/70 mb-3">Craftsmanship</span>
          <h1 className="text-[#1C1C1C] mb-3">Boutique Services</h1>
          <p className="text-[#1C1C1C]/75 max-w-xl mx-auto">Expert craftsmanship for your perfect ensemble. From traditional handwork to modern designs.</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-[#FAF9F7]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <article key={service.id} className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-250 hover:-translate-y-2 hover:shadow-xl group animate-fade-in flex flex-col" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="h-[220px] overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-xl mb-3">{service.name}</h3>
                  <p className="text-sm leading-relaxed mb-5">{service.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-7">
                    {service.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-xs text-[#666]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" width="14" height="14" className="flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-5 border-t border-[#E5E2DE]">
                    <span className="text-lg font-bold text-[#7A1E2D]">{service.price}</span>
                    <a href={waLink(service.name)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-small">Enquire Now</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag">How It Works</span>
            <h2 className="mb-3">Our Process</h2>
            <p>Simple steps to get your custom design</p>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-0">
            {steps.map((step, i) => (
              <React.Fragment key={step.num}>
                <div className="flex-1 min-w-[180px] max-w-[220px] text-center px-6 py-8">
                  <div className="font-heading text-4xl font-bold text-[#C9A24D] mb-4">{step.num}</div>
                  <h4 className="font-body text-base font-semibold mb-2 text-[#1C1C1C]">{step.title}</h4>
                  <p className="text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block w-14 h-0.5 mt-14 flex-shrink-0" style={{ background: 'linear-gradient(to right,#C9A24D,transparent)' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FAF9F7]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center px-8 py-16 rounded-2xl text-white" style={{ background: 'linear-gradient(135deg,#7A1E2D,#5A0E1D)' }}>
            <h2 className="text-white mb-4">Ready to Create Something Special?</h2>
            <p className="text-white/80 max-w-md mx-auto mb-8">Share your design ideas with us and let our experts bring your vision to life.</p>
            <a
              href="https://wa.me/917799296786?text=Hi!%20I%20have%20a%20custom%20design%20request.%20Can%20you%20help?"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-whatsapp btn-large inline-flex"
            >
              <WaIcon /> Send Your Design Reference
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Boutique
