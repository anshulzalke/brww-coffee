import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Calendar, Menu as MenuIcon, X } from 'lucide-react'
import { brandConfig } from '../config/brand'
import { useCart } from '../context/CartContext'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Menu', href: '#menu' },
  { name: 'Our Craft', href: '#craft' },
  { name: 'Reservations', href: '#reservations' },
  { name: 'Reviews', href: '#reviews' },
]

export default function Navbar() {
  const [active, setActive] = useState('Home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItemsCount, setIsCartOpen, currency, setCurrency } = useCart()

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'INR' : 'USD'))
  }

  const scrollTo = (href, label) => {
    setActive(label)
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px clamp(20px, 4vw, 48px)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* ── Logo & Crest ── */}
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault()
          scrollTo('#home', 'Home')
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2D5A47 0%, #1e3d30 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(45, 90, 71, 0.3)',
            border: '1px solid rgba(45, 90, 71, 0.3)',
          }}
        >
          <span
            style={{
              fontFamily: 'Cinzel, serif',
              fontWeight: 800,
              fontSize: brandConfig.monogram.length > 2 ? '10.5px' : '15px',
              color: '#FFFFFF',
              letterSpacing: brandConfig.monogram.length > 2 ? '0.04em' : '0.05em',
            }}
          >
            {brandConfig.monogram}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Custom SVG Brand Logo: "BR" + minimal coffee cup icon + "W" */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              lineHeight: 1,
            }}
            aria-label="BRWW"
            role="img"
          >
            <span
              style={{
                fontFamily: 'Cinzel, serif',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#F7F4EE',
                letterSpacing: '0.08em',
                lineHeight: 1,
              }}
            >
              BR
            </span>
            {/* Sleek minimal coffee cup SVG icon in teal */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                filter: 'drop-shadow(0 0 4px rgba(88, 167, 155, 0.3))',
                margin: '0 1px',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              {/* Rising Steam */}
              <path
                d="M6.5 2C6.5 2.8 5.8 3.3 5.8 4.2"
                stroke="#58A79B"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M9.5 1.2C9.5 2.3 8.8 2.8 8.8 3.8"
                stroke="#58A79B"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M12.5 2C12.5 2.8 11.8 3.3 11.8 4.2"
                stroke="#58A79B"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Cup Body */}
              <path
                d="M3 6.5H14.5V11.2C14.5 13.3 12.8 15 10.7 15H6.8C4.7 15 3 13.3 3 11.2V6.5Z"
                fill="rgba(88, 167, 155, 0.18)"
                stroke="#58A79B"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              {/* Cup Handle */}
              <path
                d="M14.5 8H16C17.1 8 18 8.9 18 10C18 11.1 17.1 12 16 12H14.5"
                stroke="#58A79B"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              {/* Saucer */}
              <path
                d="M1.5 17H16"
                stroke="#58A79B"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
            {/* "W" text */}
            <span
              style={{
                fontFamily: 'Cinzel, serif',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#F7F4EE',
                letterSpacing: '0.08em',
                lineHeight: 1,
              }}
            >
              W
            </span>
          </div>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.22em',
              color: '#8A9B94',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Artisanal Roastery
          </span>
        </div>
      </a>

      {/* ── Center Frosted Pill Nav ── */}
      <nav
        style={{
          display: 'none',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          borderRadius: '999px',
          background: 'rgba(22, 29, 27, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(88, 167, 155, 0.15)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
        className="nav-pill"
      >
        {navLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => {
              e.preventDefault()
              scrollTo(item.href, item.name)
            }}
            style={{
              padding: '8px 20px',
              borderRadius: '999px',
              fontSize: '13.5px',
              fontWeight: active === item.name ? 600 : 400,
              color: active === item.name ? '#F7F4EE' : '#8A9B94',
              background:
                active === item.name
                  ? 'rgba(88, 167, 155, 0.15)'
                  : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
              whiteSpace: 'nowrap',
              border:
                active === item.name
                  ? '1px solid rgba(88, 167, 155, 0.25)'
                  : '1px solid transparent',
            }}
            onMouseEnter={(e) => {
              if (item.name !== active) {
                e.currentTarget.style.color = '#F7F4EE'
                e.currentTarget.style.background = 'rgba(88, 167, 155, 0.08)'
              }
            }}
            onMouseLeave={(e) => {
              if (item.name !== active) {
                e.currentTarget.style.color = '#8A9B94'
                e.currentTarget.style.background = 'transparent'
              }
            }}
          >
            {item.name}
          </a>
        ))}
      </nav>

      {/* ── Right Actions ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}
        className="nav-actions"
      >
        {/* Currency Switcher */}
        <button
          onClick={toggleCurrency}
          title="Switch currency between USD and INR"
          style={{
            background: 'rgba(22, 29, 27, 0.85)',
            border: '1px solid rgba(88, 167, 155, 0.15)',
            borderRadius: '999px',
            cursor: 'pointer',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#F7F4EE',
            fontSize: '12px',
            fontWeight: 600,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#58A79B'
            e.currentTarget.style.background = 'rgba(88, 167, 155, 0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(88, 167, 155, 0.15)'
            e.currentTarget.style.background = 'rgba(22, 29, 27, 0.85)'
          }}
        >
          <span style={{ color: '#58A79B' }}>{currency === 'USD' ? '$' : '₹'}</span>
          <span>{currency}</span>
        </button>

        {/* Cart Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            position: 'relative',
            background: 'rgba(22, 29, 27, 0.85)',
            border: '1px solid rgba(88, 167, 155, 0.15)',
            borderRadius: '50%',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F7F4EE',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#58A79B'
            e.currentTarget.style.background = 'rgba(88, 167, 155, 0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(88, 167, 155, 0.15)'
            e.currentTarget.style.background = 'rgba(22, 29, 27, 0.85)'
          }}
          aria-label="Open Shopping Cart"
        >
          <ShoppingBag size={18} strokeWidth={1.8} color="#F7F4EE" />
          {totalItemsCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#2D5A47',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(45, 90, 71, 0.4)',
              }}
            >
              {totalItemsCount}
            </motion.span>
          )}
        </button>

        {/* Table Reservation Button */}
        <a
          href="#reservations"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('#reservations', 'Reservations')
          }}
          className="btn-primary-teal"
          style={{
            marginLeft: '4px',
            padding: '9px 20px',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <Calendar size={14} />
          Book Table
        </a>
      </div>

      {/* ── Mobile Toggle ── */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          background: 'rgba(22, 29, 27, 0.85)',
          border: '1px solid rgba(88, 167, 155, 0.15)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          color: '#F7F4EE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="mobile-toggle"
        aria-label="Toggle Navigation Menu"
      >
        {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
      </button>

      {/* ── Mobile Menu Dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: '16px',
              right: '16px',
              marginTop: '10px',
              padding: '16px',
              borderRadius: '20px',
              background: 'rgba(22, 29, 27, 0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(88, 167, 155, 0.15)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(item.href, item.name)
                }}
                style={{
                  display: 'block',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: active === item.name ? '#F7F4EE' : '#8A9B94',
                  background:
                    active === item.name
                      ? 'rgba(88, 167, 155, 0.12)'
                      : 'transparent',
                  marginBottom: '4px',
                }}
              >
                {item.name}
              </a>
            ))}

            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(88, 167, 155, 0.12)',
              }}
            >
              <button
                onClick={toggleCurrency}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '12px',
                  background: 'rgba(88, 167, 155, 0.08)',
                  border: '1px solid rgba(88, 167, 155, 0.15)',
                  color: '#F7F4EE',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Currency: <span style={{ color: '#58A79B' }}>{currency}</span>
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false)
                  setIsCartOpen(true)
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '12px',
                  background: '#58A79B',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <ShoppingBag size={15} /> Cart ({totalItemsCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 860px) {
          .nav-pill { display: flex !important; }
          .nav-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 859px) {
          .nav-pill { display: none !important; }
          .nav-actions { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </motion.header>
  )
}
