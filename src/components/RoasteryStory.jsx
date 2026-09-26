import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { brandConfig } from '../config/brand'
import { Compass, Flame, Droplets, Award, Sparkles } from 'lucide-react'

function SeamlessVideo({ src }) {
  const refA = useRef(null)
  const refB = useRef(null)
  const active = useRef('A')
  const rafId = useRef(null)

  useEffect(() => {
    const a = refA.current
    const b = refB.current
    if (!a || !b) return

    a.play().catch(() => {})

    function tick() {
      const primary = active.current === 'A' ? a : b
      const secondary = active.current === 'A' ? b : a

      if (primary && primary.readyState >= 2 && primary.duration) {
        const remaining = primary.duration - primary.currentTime
        if (remaining <= 0.5 && secondary.paused) {
          secondary.currentTime = 0
          secondary.play().catch(() => {})
        }
        if (primary.ended || remaining <= 0.05) {
          primary.style.opacity = '0'
          secondary.style.opacity = '1'
          active.current = active.current === 'A' ? 'B' : 'A'
          primary.pause()
        }
      }
      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId.current)
      if (a) a.pause()
      if (b) b.pause()
    }
  }, [src])

  const base = {
    width: '100%',
    display: 'block',
    mixBlendMode: 'normal',
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <video ref={refA} src={src} muted playsInline preload="auto" style={{ ...base }} />
      <video
        ref={refB}
        src={src}
        muted
        playsInline
        preload="auto"
        style={{ ...base, position: 'absolute', top: 0, left: 0, opacity: 0, transition: 'opacity 0.15s' }}
      />
    </div>
  )
}

const craftPillars = [
  {
    icon: Compass,
    title: 'Terroir & Direct Trade',
    description:
      'We source exclusively from shade-grown micro-lots at 1,800m+ altitudes in Ethiopia, Colombia, and the Western Ghats, directly paying 40% above fair-trade.',
  },
  {
    icon: Flame,
    title: 'Vintage Cast-Iron Roasting',
    description:
      'Our restored 1962 cast-iron drum roasters maintain thermal inertia at 205°C, developing complex maillard sweetness without acrid scorch.',
  },
  {
    icon: Droplets,
    title: 'Precision Micro-Extraction',
    description:
      'Customized 93°C water profiles, triple-filtered volcanic mineral water, and exact 9-bar pressure yields our signature thick velvet crema.',
  },
  {
    icon: Award,
    title: 'The BRWW Barista Guild',
    description:
      'Every barista undergoes 400+ hours of cupping immersion, sensory calibration, and manual pour-over artistry before serving your cup.',
  },
]

export default function RoasteryStory() {
  const [activeTab, setActiveTab] = useState('pillars') // 'pillars' | 'timeline'

  return (
    <section
      id="craft"
      style={{
        position: 'relative',
        backgroundColor: '#121615',
        padding: 'clamp(70px, 11vh, 120px) clamp(20px, 5vw, 60px)',
        overflow: 'hidden',
      }}
    >
      {/* Background Vintage Noise */}
      <div
        className="vintage-noise"
        style={{ position: 'absolute', inset: 0, opacity: 0.07, pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
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
            Heritage Roastery & Craftsmanship
          </span>
          <h2
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: '#F7F4EE',
              fontWeight: 800,
              margin: '0 0 16px 0',
            }}
          >
            The Story Behind {brandConfig.name}
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#8A9B94',
              fontSize: '15px',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            A decade-long quest for coffee purity. From mist-shrouded mountain estates to our vintage copper bar, discover the obsessive craft in every pour.
          </p>

          {/* Toggle Tabs */}
          <div
            style={{
              display: 'inline-flex',
              gap: '6px',
              padding: '6px',
              background: 'rgba(22, 29, 27, 0.75)',
              borderRadius: '999px',
              border: '1px solid rgba(45, 90, 71, 0.12)',
              marginTop: '28px',
            }}
          >
            <button
              onClick={() => setActiveTab('pillars')}
              style={{
                padding: '8px 24px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'pillars' ? '#58A79B' : 'transparent',
                color: activeTab === 'pillars' ? '#121615' : '#b4bcba',
                transition: 'all 0.2s ease',
              }}
            >
              Artisanal Pillars
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              style={{
                padding: '8px 24px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'timeline' ? '#58A79B' : 'transparent',
                color: activeTab === 'timeline' ? '#121615' : '#b4bcba',
                transition: 'all 0.2s ease',
              }}
            >
              Roastery Milestones
            </button>
          </div>
        </div>

        {activeTab === 'pillars' ? (
          /* 3-Column Showcase with Seamless Video */
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(24px, 4vw, 56px)',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {/* Left 2 Pillars */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {craftPillars.slice(0, 2).map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="vintage-glass-card"
                    style={{ borderRadius: '18px', padding: '24px' }}
                  >
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(45, 90, 71, 0.10)',
                        border: '1px solid rgba(45, 90, 71, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '14px',
                        color: '#58A79B',
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'Playfair Display, Georgia, serif',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#F7F4EE',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '13px', lineHeight: 1.65, color: '#8A9B94', margin: 0 }}>
                      {item.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            {/* Center Video Slot */}
            <div
              style={{
                flex: '0 0 clamp(280px, 32vw, 420px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(45, 90, 71, 0.15)',
                  background: '#1a2220',
                  boxShadow: '0 20px 50px rgba(45, 90, 71, 0.10)',
                }}
              >
                <SeamlessVideo src="/cup-video.mp4" />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(22, 29, 27, 0.85)',
                    padding: '6px 16px',
                    borderRadius: '999px',
                    border: '1px solid rgba(45, 90, 71, 0.15)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: '#58A79B',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <Sparkles size={12} style={{ display: 'inline', marginRight: '6px' }} />
                  Continuous Velvet Pour
                </div>
              </div>
            </div>

            {/* Right 2 Pillars */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {craftPillars.slice(2, 4).map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="vintage-glass-card"
                    style={{ borderRadius: '18px', padding: '24px' }}
                  >
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(45, 90, 71, 0.10)',
                        border: '1px solid rgba(45, 90, 71, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '14px',
                        color: '#58A79B',
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'Playfair Display, Georgia, serif',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#F7F4EE',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '13px', lineHeight: 1.65, color: '#8A9B94', margin: 0 }}>
                      {item.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ) : (
          /* Interactive Roastery Milestones Timeline */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {brandConfig.roasteryMilestones.map((m, index) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="vintage-glass-card"
                style={{
                  borderRadius: '20px',
                  padding: '28px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-10px',
                    fontFamily: 'Cinzel, serif',
                    fontWeight: 900,
                    fontSize: '4.5rem',
                    color: 'rgba(45, 90, 71, 0.05)',
                    userSelect: 'none',
                    lineHeight: 1,
                  }}
                >
                  {m.year}
                </div>

                <div
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#58A79B',
                    marginBottom: '12px',
                  }}
                >
                  {m.year}
                </div>

                <h4
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#F7F4EE',
                    marginBottom: '10px',
                  }}
                >
                  {m.title}
                </h4>

                <p style={{ fontSize: '13px', lineHeight: 1.65, color: '#8A9B94', margin: 0 }}>
                  {m.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
