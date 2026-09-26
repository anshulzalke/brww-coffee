import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { brandConfig } from '../config/brand'
import { Sparkles, ArrowRight, Flame } from 'lucide-react'

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

function Star4({ size = 46, color = 'rgba(45, 90, 71, 0.25)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 46 46" fill="none">
      <path
        d="M23 0 L23 23 L0 23 L23 23 L23 46 L23 23 L46 23 L23 23 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M23 4 L23 23 L4 23 L23 23 L23 42 L23 23 L42 23 L23 23 Z"
        fill="rgba(45, 90, 71, 0.08)"
      />
    </svg>
  )
}

function HeroCoffeeInteractive() {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Gentle 3D spring tilt
  const rotateY = useSpring(useTransform(x, [-1, 1], [-8, 8]), { stiffness: 140, damping: 20 })
  const rotateX = useSpring(useTransform(y, [-1, 1], [6, -6]), { stiffness: 140, damping: 20 })

  function handleMouseMove(e) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) / (rect.width / 2))
    y.set((e.clientY - cy) / (rect.height / 2))
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        cursor: 'default',
        flexShrink: 0,
      }}
    >
      {/* Ambient Soft Green Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(88, 167, 155, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Aroma / Craft Badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '30px',
          left: '-20px',
          zIndex: 25,
          background: 'rgba(22, 29, 27, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(88, 167, 155, 0.2)',
          borderRadius: '999px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Sparkles size={14} color="#58A79B" />
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#F7F4EE', fontFamily: 'Inter, sans-serif' }}>
          Velvet Crema · 93°C
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 4.6, ease: 'easeInOut', delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '-15px',
          zIndex: 25,
          background: 'rgba(22, 29, 27, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(200, 138, 88, 0.2)',
          borderRadius: '999px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Flame size={14} color="#C88A58" />
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#F7F4EE', fontFamily: 'Inter, sans-serif' }}>
          Vintage Cast-Iron Roast
        </span>
      </motion.div>

      {/* Hero Coffee Cups Image — clean, no overlays */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          width: 'clamp(460px, 54vw, 780px)',
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src="/hero-coffee.png"
          alt={`${brandConfig.name} signature artisanal cups`}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
            filter:
              'drop-shadow(0 20px 40px rgba(88, 167, 155, 0.18)) drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
          }}
          draggable={false}
        />


      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflowX: 'clip',
        backgroundColor: '#121615',
      }}
    >
      {/* ── Subtle Paper Texture ── */}
      <div
        className="vintage-noise"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          pointerEvents: 'none',
        }}
      />

      {/* ── Soft Sage Radial Accents ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: [
            'radial-gradient(ellipse 65% 70% at 78% 45%, rgba(88, 167, 155, 0.08) 0%, transparent 65%)',
            'radial-gradient(ellipse 45% 45% at 90% 10%, rgba(88, 167, 155, 0.06) 0%, transparent 55%)',
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(18, 22, 21, 0.6) 0%, transparent 70%)',
          ].join(', '),
          pointerEvents: 'none',
        }}
      />

      {/* ── Content Container ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding:
            'clamp(115px, 16vh, 155px) clamp(24px, 6vw, 80px) clamp(60px, 8vh, 100px)',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(32px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: '560px', flex: '1 1 auto' }}>
          {/* Tagline Chip */}
          <motion.div {...fadeLeft(0.1)} style={{ marginBottom: '24px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '999px',
                border: '1px solid rgba(88, 167, 155, 0.25)',
                background: 'rgba(88, 167, 155, 0.08)',
                color: '#58A79B',
                fontSize: '12.5px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#58A79B',
                  boxShadow: '0 0 6px rgba(88, 167, 155, 0.5)',
                  flexShrink: 0,
                }}
              />
              {brandConfig.tagline}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeLeft(0.22)}
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontWeight: 800,
              fontSize: 'clamp(2.6rem, 5.4vw, 4.3rem)',
              lineHeight: 1.08,
              color: '#F7F4EE',
              letterSpacing: '-0.02em',
              margin: 0,
              marginBottom: '22px',
            }}
          >
            Discover the{' '}
            <span
              style={{
                color: '#58A79B',
                fontStyle: 'italic',
              }}
            >
              Superior
            </span>{' '}
            Taste in Every Sip!
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...fadeLeft(0.36)}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(14px, 1.6vw, 16.5px)',
              lineHeight: 1.76,
              color: '#8A9B94',
              marginBottom: '36px',
              maxWidth: '470px',
            }}
          >
            {brandConfig.subtext}
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            {...fadeUp(0.48)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => scrollTo('menu')}
              className="btn-primary-teal"
              style={{ padding: '14px 34px', fontSize: '15px' }}
            >
              <span>Explore Menu</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => scrollTo('reservations')}
              className="btn-secondary-vintage"
              style={{ padding: '14px 30px', fontSize: '15px' }}
            >
              Book a Table
            </button>
          </motion.div>

          {/* Sensory Metrics */}
          <motion.div
            {...fadeUp(0.6)}
            style={{
              display: 'flex',
              gap: '32px',
              marginTop: '44px',
              paddingTop: '28px',
              borderTop: '1px solid rgba(88, 167, 155, 0.15)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#F7F4EE',
                }}
              >
                100%
              </div>
              <div style={{ fontSize: '12px', color: '#8A9B94' }}>Direct-Trade Lots</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(88, 167, 155, 0.15)' }} />
            <div>
              <div
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#58A79B',
                }}
              >
                205°C
              </div>
              <div style={{ fontSize: '12px', color: '#8A9B94' }}>Cast-Iron Roast</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(88, 167, 155, 0.15)' }} />
            <div>
              <div
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#C88A58',
                }}
              >
                4.9 ★
              </div>
              <div style={{ fontSize: '12px', color: '#8A9B94' }}>Guest Rating</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 3D Interactive Hero Cups Container ── */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: 'clamp(-40px, 2vw, 48px)',
          zIndex: 20,
        }}
      >
        <HeroCoffeeInteractive />
      </div>

      {/* Bottom-right decorative 4-point star */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.85, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <Star4 size={46} />
      </motion.div>
    </section>
  )
}
