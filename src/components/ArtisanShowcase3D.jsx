import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { brandConfig } from '../config/brand'
import { useCart } from '../context/CartContext'
import { Sparkles, RotateCw, Wind, Flame, Plus } from 'lucide-react'

const showcaseCups = [
  {
    id: 'velvet-cup-1',
    name: 'Artisan Kraft Sleeve',
    subtitle: 'Signature Velvet Flat White Cup',
    image: '/cup-1.png',
    tint: '#58A79B',
    roast: 'Medium Velvet',
    temp: '93°C',
    notes: 'Velvet Crema · Hazelnut · Cacao',
    price: 4.75,
  },
  {
    id: 'velvet-cup-2',
    name: 'Teal Glaze Reserve',
    subtitle: 'Cold-Brew & Nitro Special Edition',
    image: '/cup-2.png',
    tint: '#6ec4b7',
    roast: 'Cold Steep Reserve',
    temp: '4°C Chill',
    notes: 'Micro-Bubbles · Cascara Fizz',
    price: 5.75,
  },
  {
    id: 'velvet-cup-3',
    name: 'Ribbed Charcoal Tumbler',
    subtitle: 'Dark Roast Heritage Double Shot',
    image: '/cup-3.png',
    tint: '#3d7a71',
    roast: 'Dark Cast-Iron',
    temp: '95°C Intense',
    notes: 'Smoked Oak · 85% Cacao Truffle',
    price: 4.25,
  },
]

// Canvas Steam Simulation
function SteamCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    const particles = []

    for (let i = 0; i < 24; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 40,
        y: canvas.height - Math.random() * 20,
        radius: 3 + Math.random() * 6,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.8 - Math.random() * 0.8,
        alpha: 0.1 + Math.random() * 0.25,
        growth: 0.05 + Math.random() * 0.08,
      })
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.radius += p.growth
        p.alpha -= 0.002

        if (p.y < 0 || p.alpha <= 0) {
          p.x = canvas.width / 2 + (Math.random() - 0.5) * 36
          p.y = canvas.height
          p.radius = 3 + Math.random() * 6
          p.alpha = 0.15 + Math.random() * 0.2
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(88, 167, 155, ${Math.max(0, p.alpha * 0.5)})`
        ctx.shadowColor = 'rgba(45, 90, 71, 0.20)'
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={240}
      height={140}
      style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 15,
      }}
    />
  )
}

export default function ArtisanShowcase3D() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const currentCup = showcaseCups[selectedIndex]
  const { addToCart, formatPrice, setIsCartOpen } = useCart()

  // 3D Interactive Spring Tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateY = useSpring(useTransform(x, [-100, 100], [-18, 18]), { stiffness: 120, damping: 18 })
  const rotateX = useSpring(useTransform(y, [-100, 100], [14, -14]), { stiffness: 120, damping: 18 })

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set(e.clientX - cx)
    y.set(e.clientY - cy)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const handleAddCurrent = () => {
    addToCart(
      {
        id: currentCup.id,
        name: currentCup.name,
        price: currentCup.price,
        image: currentCup.image,
        category: 'hot-brews',
      },
      { milk: 'Whole Milk', sweetness: 'Standard' },
      1
    )
    setIsCartOpen(true)
  }

  return (
    <section
      id="cups"
      className="pt-28 md:pt-36"
      style={{
        position: 'relative',
        backgroundColor: '#121615',
        paddingBottom: 'clamp(60px, 9vh, 100px)',
        paddingLeft: 'clamp(20px, 5vw, 60px)',
        paddingRight: 'clamp(20px, 5vw, 60px)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(45, 90, 71, 0.10)',
        scrollMarginTop: '100px',
      }}
    >
      {/* Background Vintage Noise */}
      <div
        className="vintage-noise"
        style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#58A79B',
              display: 'inline-block',
              marginBottom: '10px',
            }}
          >
            Artisanal Vessel & Sleeve Craft
          </span>
          <h2
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              color: '#F7F4EE',
              fontWeight: 800,
              margin: '0 0 14px 0',
            }}
          >
            The Signature {brandConfig.name} Cups
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#8A9B94',
              fontSize: '14.5px',
              maxWidth: '540px',
              margin: '0 auto',
            }}
          >
            Custom recycled kraft sleeves with vintage typography, thermal insulation, and harmonious #{brandConfig.colors.primaryAccent.replace('#', '')} accents.
          </p>
        </div>

        {/* 3D Showcase Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Left: 3D Interactive Cup Stage */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'relative',
              height: '420px',
              borderRadius: '24px',
              background: 'radial-gradient(circle at center, rgba(88, 167, 155, 0.06) 0%, rgba(18, 22, 21, 0.9) 70%)',
              border: '1px solid rgba(45, 90, 71, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: '1000px',
              cursor: 'grab',
              overflow: 'visible',
            }}
          >
            {/* Steam Canvas */}
            <SteamCanvas />

            {/* Glowing Ring Under Cup */}
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                width: '180px',
                height: '40px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(45, 90, 71, 0.20) 0%, transparent 75%)',
                filter: 'blur(8px)',
              }}
            />

            {/* 3D Tilted Cup */}
            <motion.div
              style={{
                rotateY,
                rotateX,
                transformStyle: 'preserve-3d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={currentCup.image}
                alt={currentCup.name}
                style={{
                  height: '280px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 30px rgba(45, 90, 71, 0.12))',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>

            {/* Hint Chip */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(22, 29, 27, 0.85)',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                color: '#8A9B94',
                border: '1px solid rgba(45, 90, 71, 0.12)',
              }}
            >
              <RotateCw size={12} color="#58A79B" />
              <span>Hover & move to inspect 3D sleeve perspective</span>
            </div>
          </div>

          {/* Right: Specifications & Roast Profile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Cup Selector Pills */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {showcaseCups.map((cup, i) => (
                <button
                  key={cup.id}
                  onClick={() => setSelectedIndex(i)}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    borderRadius: '12px',
                    fontSize: '12.5px',
                    fontWeight: selectedIndex === i ? 700 : 500,
                    background: selectedIndex === i ? 'rgba(45, 90, 71, 0.12)' : 'rgba(22, 29, 27, 0.70)',
                    border: selectedIndex === i ? '1px solid #58A79B' : '1px solid rgba(45, 90, 71, 0.10)',
                    color: selectedIndex === i ? '#F7F4EE' : '#9ea9a6',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Cup {i + 1}
                </button>
              ))}
            </div>

            {/* Selected Cup Details */}
            <div
              className="vintage-glass-card"
              style={{ borderRadius: '20px', padding: '28px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#58A79B',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {currentCup.subtitle}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'Playfair Display, Georgia, serif',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: '#F7F4EE',
                      margin: '4px 0 0 0',
                    }}
                  >
                    {currentCup.name}
                  </h3>
                </div>

                <span
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#58A79B',
                  }}
                >
                  {formatPrice(currentCup.price)}
                </span>
              </div>

              {/* Specs Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  margin: '20px 0',
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(18, 22, 21, 0.65)',
                  border: '1px solid rgba(45, 90, 71, 0.10)',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: '#8A9B94' }}>Roast Profile</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#F7F4EE', marginTop: '2px' }}>
                    {currentCup.roast}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#8A9B94' }}>Brew Temperature</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#58A79B', marginTop: '2px' }}>
                    {currentCup.temp}
                  </div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '11px', color: '#8A9B94' }}>Sensory Profile</div>
                  <div style={{ fontSize: '13px', color: '#8A9B94', marginTop: '2px' }}>
                    {currentCup.notes}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddCurrent}
                className="btn-primary-teal"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '14px',
                  borderRadius: '12px',
                }}
              >
                <Plus size={16} />
                <span>Order This Signature BRWW Cup</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
