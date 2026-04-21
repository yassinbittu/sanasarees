import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../../assets/hero-saree.jpg'
import maggamImg from '../../assets/home_images/maggam.jpeg'
import accessoryImg from '../../assets/home_images/accessories.jpeg'
import blouseImg from '../../assets/home_images/blouse.jpeg'
import computerImg from '../../assets/home_images/computer_work.jpeg'
import festivalImg from '../../assets/home_images/festival.jpeg'
import giftImg from '../../assets/home_images/gifts.jpeg'
import trendingImg from '../../assets/home_images/trending.jpeg' 
const categories = [
  {
    id: 1,
    name: 'Trending Sarees',
    description: 'Most loved styles this season',
    image: trendingImg,
    link: '/products?category=trending'
  },
  {
    id: 2,
    name: 'Festival Collection',
    description: 'Celebrate in elegance',
    image: festivalImg,
    link: '/products?category=festival'
  },
  {
    id: 3,
    name: 'Gift Collections',
    description: 'Perfect presents for loved ones',
    image: giftImg,
    link: '/products?category=gifts'
  },
  {
    id: 4,
    name: 'Ladies Accessories',
    description: 'Complete your look',
    image: accessoryImg,
    link: '/products?category=accessories'
  },

  // 🔥 NEW SERVICE CATEGORIES

  {
    id: 5,
    name: 'Maggam Work',
    description: 'Traditional hand embroidery designs',
    image: maggamImg,
    link: '/boutique?service=maggam'
  },
  {
    id: 6,
    name: 'Computer Work',
    description: 'Modern machine embroidery services',
    image: computerImg,
    link: '/boutique?service=computer'
  },
  {
    id: 7,
    name: 'Custom Blouse',
    description: 'Design your own blouse with perfect fit',
    image: blouseImg,
    link: '/boutique?service=blouse'
  }
]

const whyChooseUs = [
  { icon: '✦', title: 'Handpicked Quality', description: 'Every saree is carefully selected for premium fabric and craftsmanship' },
  { icon: '✎', title: 'Custom Boutique Designs', description: 'Personalized embroidery and blouse designs tailored to your vision' },
  { icon: '♥', title: 'Trusted Local Store', description: 'Visit our store for personal attention and exclusive in-store discounts' },
  { icon: '★', title: 'Festival Offers', description: 'Special collections and pricing for every celebration' },
]

function Home() {
  const sliderRef = useRef(null)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    let scrollAmount = 0

    const interval = setInterval(() => {
      if (slider.scrollWidth - slider.clientWidth <= scrollAmount) {
        scrollAmount = 0
        slider.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        scrollAmount += 300
        slider.scrollTo({ left: scrollAmount, behavior: "smooth" })
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [])
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Elegant Saree Collection" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(28,28,28,0.75) 0%, rgba(28,28,28,0.4) 50%, rgba(122,30,45,0.3) 100%)' }} />
        </div>

        <div className="relative z-10 text-center max-w-[900px] px-6 pt-20">
          <span className="inline-block text-xs font-medium uppercase tracking-[3px] text-[#C9A24D] mb-6 animate-fade-in">
            Est. with Love &amp; Tradition
          </span>
          <h1 className="font-heading text-white leading-[1.1] mb-6 animate-fade-in" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)', animationDelay: '0.1s' }}>
            Elegance Woven<br />with Tradition
          </h1>
          <p className="text-white/85 mb-10 tracking-wide animate-fade-in" style={{ fontSize: 'clamp(1rem,2vw,1.25rem)', animationDelay: '0.2s' }}>
            Trendy Sarees • Boutique Craftsmanship • Festival Collections
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/boutique" className="btn btn-secondary btn-large text-white border-white hover:bg-white hover:text-[#7A1E2D]">
              Book Boutique Service
            </Link>
            <Link to="/products" className="btn btn-accent btn-large">
              Shop Sarees
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/60 text-[0.7rem] uppercase tracking-[2px]">
          <span>Scroll to explore</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#C9A24D] to-transparent" style={{ animation: 'scrollPulse 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── Featured Categories ── */}
      <section className="py-24 bg-[#FAF9F7]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-tag">Curated Collections</span>
            <h2 className="mb-4">Discover Your Style</h2>
            <p className="max-w-xl mx-auto">Explore our handpicked categories for every occasion</p>
          </div>
          <div className="relative">
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-1"
            >

              {categories.map((cat, i) => (
                <Link
                  key={cat.id}
                  to={cat.link}
                  className="min-w-[260px] sm:min-w-[280px] lg:min-w-[300px] relative rounded-xl overflow-hidden group animate-fade-in block flex-shrink-0"
                  style={{ aspectRatio: '3/4', animationDelay: `${i * 0.1}s` }}
                >
                  <div className="absolute inset-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
                    />

                    {/* Improved overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="bg-black/60 backdrop-blur-md rounded-lg p-4 border border-white/10">

                        <h3 className="text-lg font-semibold text-white mb-1">
                          {cat.name}
                        </h3>

                        <p className="text-sm text-white/90 mb-3">
                          {cat.description}
                        </p>

                        <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#C9A24D] opacity-0 translate-y-2.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-250">
                          View Collection →
                        </span>

                      </div>
                    </div>
                  </div>
                </Link>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 bg-[#F5F3F0]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-tag">Why SANA</span>
            <h2 className="mb-4">Crafted with Care</h2>
            <p className="max-w-xl mx-auto">What makes us the preferred choice for discerning customers</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <div
                key={i}
                className="text-center p-8 bg-white rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F5F3F0] text-[#7A1E2D] text-2xl mb-5">{item.icon}</span>
                <h3 className="font-body text-base font-semibold mb-2 text-[#1C1C1C]">{item.title}</h3>
                <p className="text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Store CTA ── */}
      <section className="py-24 bg-[#FAF9F7]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-tag">Visit Us</span>
              <h2 className="mb-4">Experience In-Store Magic</h2>
              <p className="leading-relaxed mb-8">
                Get exclusive discounts and personalized styling advice when you visit our store.
                Our experts will help you find the perfect saree for any occasion.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                {[
                  { icon: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />, circle: <circle cx="12" cy="7" r="4" />, label: 'Personal Stylist' },
                  { icon: <><circle cx="12" cy="12" r="10" /><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" /></>, label: 'Exclusive Discounts' },
                  { icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>, label: 'Easy Location' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-medium text-[#1C1C1C]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#C9A24D" strokeWidth="2" width="22" height="22">{f.icon}{f.circle}</svg>
                    {f.label}
                  </div>
                ))}
              </div>
              <a href="https://www.google.com/maps/place/Sana+sarees+centre/@18.0050132,79.5359586,17z/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large">
                Get Directions
              </a>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: '4/3' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.4767327887876!2d79.533769!3d18.0050132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334f004fdf3cb9%3A0x9d2a82c5d798bbc8!2sSana%20Sarees%20Centre!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="SANA Sarees Centre Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
