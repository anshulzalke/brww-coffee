import { motion } from 'framer-motion'

export default function CTABanner() {
  return (
    <section style={{
      position:        'relative',
      backgroundColor: '#F0F4F1',
      overflowX:       'clip',
      minHeight:       '320px',
      display:         'flex',
      alignItems:      'center',
    }}>

      {/* Subtle paper texture */}
      <div style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:  '300px 300px',
        opacity:         0.03,
        pointerEvents:   'none',
      }} />

      {/* Spoon — floats ON TOP of the card, levitating animation */}
      <motion.img
        src="/spoon.png"
        alt=""
        aria-hidden
        draggable={false}
        animate={{ y: [0, -16, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        style={{
          position:     'absolute',
          right:        '-280px',
          bottom:       '10px',
          width:        'clamp(728px, 78vw, 1066px)',
          height:       'auto',
          zIndex:       20,
          pointerEvents:'none',
          userSelect:   'none',
        }}
      />

      {/* ── Content ── */}
      <div style={{
        position:  'relative',
        width:     '100%',
        maxWidth:  '1200px',
        margin:    '0 auto',
        padding:   'clamp(32px, 5vh, 56px) clamp(24px, 6vw, 80px)',
        display:   'flex',
        flexDirection: 'column',
        gap:       '0',
      }}>

        {/* Frosted card */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width:                '100%',
            padding:              'clamp(24px, 3.5vw, 40px)',
            borderRadius:         '20px',
            background:           'rgba(255, 255, 255, 0.85)',
            backdropFilter:       'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border:               '1px solid rgba(45, 90, 71, 0.12)',
            boxShadow:            '0 4px 24px rgba(45, 90, 71, 0.06)',
            display:              'flex',
            flexDirection:        'column',
            gap:                  '20px',
          }}
        >
          {/* Heading */}
          <h2 style={{
            fontFamily:   '"Playfair Display", serif',
            fontWeight:   700,
            fontSize:     'clamp(1.35rem, 2.4vw, 2rem)',
            color:        '#1F2923',
            margin:       0,
            lineHeight:   1.25,
          }}>
            Find out which coffee suits you best
          </h2>

          {/* CTA button */}
          <div>
            <a
              href="#"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                padding:        '11px 28px',
                borderRadius:   '999px',
                border:         '1px solid rgba(45, 90, 71, 0.25)',
                background:     'rgba(45, 90, 71, 0.06)',
                color:          '#2D5A47',
                fontFamily:     'Inter, sans-serif',
                fontSize:       '14px',
                fontWeight:     500,
                textDecoration: 'none',
                letterSpacing:  '0.01em',
                transition:     'background 0.18s, border-color 0.18s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background   = 'rgba(45, 90, 71, 0.12)'
                e.currentTarget.style.borderColor  = 'rgba(45, 90, 71, 0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background   = 'rgba(45, 90, 71, 0.06)'
                e.currentTarget.style.borderColor  = 'rgba(45, 90, 71, 0.25)'
              }}
            >
              Take the test
            </a>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            marginTop:  '20px',
            display:    'flex',
            gap:        '20px',
            flexWrap:   'wrap',
          }}
        >
          {['Coffee news', 'Telegram', 'Instagram'].map((label, i) => (
            <a
              key={label}
              href="#"
              style={{
                fontFamily:     'Inter, sans-serif',
                fontSize:       '12px',
                color:          '#5A6B63',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                transition:     'color 0.18s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#2D5A47'}
              onMouseLeave={e => e.currentTarget.style.color = '#5A6B63'}
            >
              {label}
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
