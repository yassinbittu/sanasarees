import React from 'react'
import { Link } from 'react-router-dom'

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const YtIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-white pt-16 pb-6">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex flex-col mb-5">
              <span className="font-heading text-2xl font-bold text-[#C9A24D] tracking-[3px]">SANA</span>
              <span className="text-[0.6rem] text-white/70 uppercase tracking-wider">Sarees &amp; Ladies Collections</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Crafting elegance for every woman. Premium sarees and boutique services for festivals, weddings, and everyday grace.
            </p>
            <div className="flex gap-3">
              {[
                { href: 'https://wa.me/917799296786', icon: <WaIcon /> },
                { href: 'https://www.instagram.com/sanasareecenter_hnk', icon: <IgIcon /> },
                { href: 'https://youtube.com/@smartfamilyvlogs3524', icon: <YtIcon /> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-[#C9A24D] hover:text-[#1C1C1C] hover:-translate-y-0.5">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest mb-5 text-white">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                ['/products', 'Shop Sarees'],
                ['/boutique', 'Boutique Services'],
                ['/products?offers=true', 'Festival Offers'],
                ['/login', 'My Account'],
              ].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-white/70 text-sm hover:text-[#C9A24D] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest mb-5 text-white">Boutique Services</h4>
            <ul className="flex flex-col gap-2.5">
              {['Maggam Work', 'Computer Embroidery', 'Custom Blouse Design', 'Bridal Collections'].map((item) => (
                <li key={item}><Link to="/boutique" className="text-white/70 text-sm hover:text-[#C9A24D] transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest mb-5 text-white">Visit Our Store</h4>
            <address className="not-italic flex flex-col gap-3">
              {[
                {
                  icon: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>,
                  circle: <circle cx="12" cy="10" r="3"/>,
                  text: 'Ngos Colony, Wadepally, Hanamkonda, Telangana - 506370',
                },
                {
                  icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
                  text: '+91 7799296786',
                },
                {
                  icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
                  text: 'Mon - Sun: 10:00 AM – 9:00 PM',
                },
              ].map((item, i) => (
                <p key={i} className="flex items-start gap-2 text-white/70 text-sm leading-relaxed">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A24D" strokeWidth="2" width="16" height="16" className="flex-shrink-0 mt-0.5">
                    {item.icon}{item.circle}
                  </svg>
                  {item.text}
                </p>
              ))}
            </address>
            <div className="mt-4 p-3 bg-[#C9A24D]/15 rounded-md border-l-4 border-[#C9A24D]">
              <span className="block text-[0.7rem] font-semibold uppercase tracking-widest text-[#C9A24D]">Store Special</span>
              <span className="text-white/70 text-xs">Visit in-store for exclusive discounts!</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 text-center">
          <p className="text-white/50 text-sm">© 2018 SANA Sarees &amp; Ladies Collections. All rights reserved.</p>
          <p className="font-heading italic text-[#C9A24D] text-sm mt-1">Elegance woven with tradition</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
