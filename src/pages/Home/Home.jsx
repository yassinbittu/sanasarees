import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../../assets/hero.png'
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
      {/* ───────── PREMIUM HERO ───────── */}
      <section className="relative min-h-screen overflow-hidden bg-[#F8F6F2]">

        {/* Background Image */}
        <div className="absolute inset-0">

          <img
            src={heroImage}
            alt="SANA Sarees"
            className="
        w-full h-full object-cover
        object-[72%_center]
        md:object-center
      "
          />

          {/* Premium Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(15,15,15,0.62) 0%, rgba(15,15,15,0.32) 32%, rgba(15,15,15,0.08) 60%, rgba(15,15,15,0.02) 100%)'
            }}
          />

        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8">

          <div className="min-h-screen flex items-center">

            <div className="max-w-[620px] pt-36 md:pt-20 pb-16">

              {/* Badge */}
              <div className="
          inline-flex items-center gap-2
          px-5 py-2 mb-6
          rounded-full
          bg-white/10
          border border-white/20
          backdrop-blur-xl
        ">

                <span className="w-2 h-2 rounded-full bg-[#C9A24D]" />

                <span className="
            text-white/90
            uppercase
            tracking-[3px]
            text-[11px]
            font-medium
          ">
                  Timeless Elegance
                </span>

              </div>

              {/* Heading */}
              <h1
                className="
            text-white
            leading-[0.95]
            mb-6
            font-semibold
          "
                style={{
                  fontSize: 'clamp(2.7rem,7vw,6.5rem)',
                  textShadow: '0 10px 40px rgba(0,0,0,0.35)'
                }}
              >
                Elegance <br />
                Woven Into <br />
                Every Saree
              </h1>

              {/* Subtitle */}
              <p
                className="
            text-white/85
            leading-relaxed
            mb-10
            max-w-[520px]
          "
                style={{
                  fontSize: 'clamp(1rem,2vw,1.15rem)'
                }}
              >
                Discover timeless sarees, handcrafted boutique
                collections and elegant styles curated for
                every celebration.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">

                {/* Primary */}
                <Link
                  to="/products"
                  className="
              px-6 md:px-8 py-3.5 md:py-4 rounded-full
              bg-[#7A1E2D]
              hover:bg-[#631826]
              text-white
              font-medium
              tracking-wide
              transition-all duration-300
              shadow-[0_12px_40px_rgba(122,30,45,0.45)]
              hover:scale-105
            "
                >
                  Explore Collection
                </Link>

                {/* Secondary */}
                <Link
                  to="/boutique"
                  className="
              px-8 py-4 rounded-full
              border border-white/30
              bg-white/10
              backdrop-blur-xl
              text-white
              font-medium
              tracking-wide
              hover:bg-white
              hover:text-[#7A1E2D]
              transition-all duration-300
            "
                >
                  Visit Boutique
                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Fade */}
        <div className="
    absolute bottom-0 left-0 right-0
    h-32
    bg-gradient-to-t
    from-[#F8F6F2]
    to-transparent
  " />

      </section>


      {/* ── Featured Categories ── */}
      {/* ───────── STATS SECTION ───────── */}
      <section className="bg-white border-y border-[#EFE7DD]">

        <div className="
    max-w-[1280px] mx-auto
    grid grid-cols-2 md:grid-cols-4
  ">

          {[
            {
              title: 'Premium Sarees',
              desc: 'Handpicked elegant collections'
            },
            {
              title: '5000+ Customers',
              desc: 'Trusted by women across town'
            },
            {
              title: 'Boutique Services',
              desc: 'Maggam & custom blouse work'
            },
            {
              title: 'Exclusive Designs',
              desc: 'Curated for every occasion'
            }
          ].map((item, i) => (

            <div
              key={i}
              className="
          p-6 md:p-10
          border-b md:border-b-0
          border-[#EFE7DD]
          md:border-r last:border-r-0
          text-center
        "
            >

              <h3 className="
          text-[#1C1C1C]
          text-lg md:text-2xl
          font-semibold
          mb-2
        ">
                {item.title}
              </h3>

              <p className="
          text-sm
          text-[#6F5A61]
          leading-relaxed
        ">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* ───────── COLLECTIONS ───────── */}
<section className="py-20 bg-[#F8F6F2]">

  <div className="max-w-[1280px] mx-auto px-5 sm:px-6">

    {/* Heading */}
    <div className="text-center mb-14">

      <span className="section-tag">
        Curated Collections
      </span>

      <h2 className="mb-4">
        Discover Your Style
      </h2>

      <p className="max-w-2xl mx-auto">
        Explore timeless sarees, boutique services
        and handcrafted collections curated for
        every occasion.
      </p>

    </div>

    {/* Cards */}
    <div
      ref={sliderRef}
      className="
        flex gap-5 overflow-x-auto
        no-scrollbar scroll-smooth
        px-1
      "
    >

      {categories.map((cat, i) => (

        <Link
          key={cat.id}
          to={cat.link}
          className="
            min-w-[240px]
            sm:min-w-[280px]
            lg:min-w-[300px]
            rounded-[28px]
            overflow-hidden
            bg-white
            shadow-[0_10px_30px_rgba(0,0,0,0.06)]
            hover:-translate-y-2
            hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]
            transition-all duration-500
            flex-shrink-0
            group
          "
          style={{
            animationDelay: `${i * 0.1}s`
          }}
        >

          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">

            <img
              src={cat.image}
              alt={cat.name}
              className="
                w-full h-full object-cover
                transition-transform duration-700
                group-hover:scale-110
              "
            />

            <div className="
              absolute inset-0
              bg-gradient-to-t
              from-black/70
              via-black/10
              to-transparent
            " />

          </div>

          {/* Content */}
          <div className="p-5">

            <h3 className="
              text-[#1C1C1C]
              text-lg font-semibold mb-2
            ">
              {cat.name}
            </h3>

            <p className="
              text-sm text-[#6F5A61]
              leading-relaxed mb-4
            ">
              {cat.description}
            </p>

            <span className="
              text-[#7A1E2D]
              text-sm font-semibold
              tracking-wide
            ">
              Explore Collection →
            </span>

          </div>

        </Link>

      ))}

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
