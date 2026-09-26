import { useState } from 'react'
import { brandConfig } from '../config/brand'
import { MapPin, Clock, Phone, Mail, Send, CheckCircle2, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterSubscribed(true)
    setNewsletterEmail('')
  }

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#2D5A47',
        color: '#FFFFFF',
        padding: 'clamp(60px, 9vh, 100px) clamp(20px, 5vw, 60px) 40px',
        borderTop: '1px solid rgba(45, 90, 71, 0.3)',
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Background Subtle Texture */}
      <div
        className="vintage-noise"
        style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Col 1: Brand & Ethos */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <span style={{ fontFamily: 'Cinzel, serif', fontWeight: 800, fontSize: brandConfig.monogram.length > 2 ? '10px' : '14px', color: '#FFFFFF', letterSpacing: '0.04em' }}>
                  {brandConfig.monogram}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  letterSpacing: '0.12em',
                  color: '#FFFFFF',
                }}
              >
                {brandConfig.name}
              </span>
            </div>

            <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.65)', marginBottom: '20px' }}>
              Dedicated to slow-roasted single-origin micro-lots, heritage cast-iron drum techniques, and sensory coffee hospitality.
            </p>

            <div style={{ display: 'flex', gap: '14px' }}>
              {brandConfig.contact.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.75)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                >
                  {s.name}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Operational Hours */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Clock size={16} color="rgba(255,255,255,0.7)" />
              <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '14px', fontWeight: 700, margin: 0 }}>
                Tasting Room Hours
              </h4>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Weekdays</strong>
                {brandConfig.contact.hours.weekdays}
              </li>
              <li>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Weekends & Holidays</strong>
                {brandConfig.contact.hours.weekends}
              </li>
              <li style={{ color: '#C88A58', fontStyle: 'italic', fontSize: '12px', paddingTop: '4px' }}>
                {brandConfig.contact.hours.tastingSessions}
              </li>
            </ul>
          </div>

          {/* Col 3: Location & Interactive Map Card */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <MapPin size={16} color="rgba(255,255,255,0.7)" />
              <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '14px', fontWeight: 700, margin: 0 }}>
                Roastery Sanctuary
              </h4>
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: '0 0 14px 0' }}>
              {brandConfig.contact.address}
            </p>

            {/* Stylized Map Card */}
            <div
              style={{
                borderRadius: '14px',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                Heritage Quarter Flagship
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>
                Valet parking available · Courtyard seating
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#C88A58',
                  textDecoration: 'none',
                }}
              >
                <span>Open in Maps</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Mail size={16} color="rgba(255,255,255,0.7)" />
              <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '14px', fontWeight: 700, margin: 0 }}>
                The Velvet Dispatch
              </h4>
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '14px' }}>
              Subscribe for private cupping invitations, seasonal micro-lot drops, and brew guides.
            </p>

            {newsletterSubscribed ? (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '12px',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <CheckCircle2 size={16} color="#C88A58" />
                <span>Welcome! Enjoy 10% off with promo code <strong>BRWW10</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#FFFFFF',
                    fontSize: '12.5px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: '#C88A58',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Heritage Badge */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.45)',
          }}
        >
          <div>
            © {new Date().getFullYear()} {brandConfig.name} Artisanal Roastery Inc. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Charter</span>
            <span>Terms of Craft</span>
            <span>Direct-Trade Audit</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
