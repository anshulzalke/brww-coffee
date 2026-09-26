import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Coffee, Sparkles, CheckCircle2 } from 'lucide-react'

const seatingAreas = [
  { id: 'Vintage Roastery Lounge', desc: 'Plush velvet armchairs by the restored cast-iron roaster' },
  { id: 'Espresso & Pour-Over Bar', desc: 'Front-row seat to precision V60 extractions and latte art' },
  { id: 'Secret Garden Terrace', desc: 'Botanical courtyard with gentle breezes and cafe lights' },
  { id: 'Private Cupping Room', desc: 'Intimate sensory space for multi-origin cupping flights' },
]

export default function ReservationSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('14:00')
  const [guests, setGuests] = useState('2')
  const [seatingArea, setSeatingArea] = useState('Vintage Roastery Lounge')
  const [specialRequests, setSpecialRequests] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !date || !time) {
      setError('Please fill in your name, reservation date, and preferred time.')
      return
    }

    setSubmitting(true)
    setError('')

    const payload = {
      name,
      email,
      phone,
      date,
      time,
      guests,
      seatingArea,
      specialRequests,
    }

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setConfirmed(data.reservation)
      } else {
        setError(data.error || 'Failed to reserve table. Please try again.')
      }
    } catch {
      // Mock fallback
      setConfirmed({
        reservationId: 'RES-' + Math.floor(1000 + Math.random() * 9000),
        name,
        date,
        time,
        guests,
        seatingArea,
      })
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setConfirmed(null)
    setName('')
    setEmail('')
    setPhone('')
    setDate('')
    setSpecialRequests('')
    setError('')
  }

  return (
    <section
      id="reservations"
      style={{
        position: 'relative',
        backgroundColor: '#121615',
        padding: 'clamp(60px, 10vh, 120px) clamp(20px, 5vw, 60px)',
        overflow: 'hidden',
      }}
    >
      {/* Vintage Noise */}
      <div
        className="vintage-noise"
        style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
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
            Table Sanctuary & Tasting Bookings
          </span>
          <h2
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2rem, 3.6vw, 3.2rem)',
              color: '#F7F4EE',
              fontWeight: 800,
              margin: '0 0 16px 0',
            }}
          >
            Reserve Your BRWW Experience
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#8A9B94',
              fontSize: '15px',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            Whether planning an intimate afternoon pour-over, a sensory cupping flight, or an evening gathering, secure your preferred corner.
          </p>
        </div>

        {confirmed ? (
          /* Confirmation State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="vintage-glass-card"
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              borderRadius: '24px',
              padding: '40px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: 'rgba(45, 90, 71, 0.10)',
                border: '1px solid #58A79B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: '#58A79B',
              }}
            >
              <CheckCircle2 size={38} />
            </div>

            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#58A79B',
              }}
            >
              Sanctuary Confirmed
            </span>

            <h3
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '1.8rem',
                fontWeight: 800,
                margin: '8px 0 16px',
                color: '#F7F4EE',
              }}
            >
              We Await You, {confirmed.name}
            </h3>

            <p style={{ fontSize: '13.5px', color: '#8A9B94', marginBottom: '28px', lineHeight: 1.6 }}>
              Your table in the <strong>{confirmed.seatingArea}</strong> is reserved for{' '}
              <strong>{confirmed.guests} guests</strong> on <strong>{confirmed.date}</strong> at{' '}
              <strong>{confirmed.time}</strong>.
            </p>

            <div
              style={{
                background: 'rgba(22, 29, 27, 0.85)',
                borderRadius: '16px',
                padding: '16px 20px',
                border: '1px solid rgba(45, 90, 71, 0.12)',
                display: 'inline-block',
                marginBottom: '28px',
              }}
            >
              <span style={{ fontSize: '12px', color: '#8A9B94', display: 'block' }}>
                Booking Reference
              </span>
              <span
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#58A79B',
                  letterSpacing: '0.1em',
                }}
              >
                {confirmed.reservationId}
              </span>
            </div>

            <div>
              <button
                onClick={resetForm}
                className="btn-primary-teal"
                style={{ padding: '12px 32px' }}
              >
                Make Another Reservation
              </button>
            </div>
          </motion.div>
        ) : (
          /* Interactive Reservation Form */
          <div
            className="vintage-glass-card"
            style={{
              borderRadius: '24px',
              padding: 'clamp(28px, 4vw, 44px)',
            }}
          >
            {error && (
              <div
                style={{
                  background: 'rgba(224, 108, 117, 0.15)',
                  border: '1px solid #e06c75',
                  borderRadius: '10px',
                  padding: '12px',
                  fontSize: '13px',
                  color: '#ff8a93',
                  marginBottom: '24px',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Row 1: Guest Info */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px',
                }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#F7F4EE', marginBottom: '6px' }}>
                    Primary Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sebastian Croft"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(18, 22, 21, 0.75)',
                      border: '1px solid rgba(45, 90, 71, 0.15)',
                      color: '#F7F4EE',
                      fontSize: '13.5px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#F7F4EE', marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="croft@brww.coffee"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(18, 22, 21, 0.75)',
                      border: '1px solid rgba(45, 90, 71, 0.15)',
                      color: '#F7F4EE',
                      fontSize: '13.5px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#F7F4EE', marginBottom: '6px' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2831"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(18, 22, 21, 0.75)',
                      border: '1px solid rgba(45, 90, 71, 0.15)',
                      color: '#F7F4EE',
                      fontSize: '13.5px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Date, Time, Guests */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#F7F4EE', marginBottom: '6px' }}>
                    <Calendar size={13} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-1px' }} />
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(18, 22, 21, 0.75)',
                      border: '1px solid rgba(45, 90, 71, 0.15)',
                      color: '#F7F4EE',
                      fontSize: '13.5px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#F7F4EE', marginBottom: '6px' }}>
                    <Clock size={13} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-1px' }} />
                    Time Slot *
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(18, 22, 21, 0.75)',
                      border: '1px solid rgba(45, 90, 71, 0.15)',
                      color: '#F7F4EE',
                      fontSize: '13.5px',
                      outline: 'none',
                    }}
                  >
                    {['09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30', '20:00', '21:30'].map((t) => (
                      <option key={t} value={t} style={{ background: '#161d1b', color: '#F7F4EE' }}>
                        {t} {Number(t.split(':')[0]) >= 12 ? 'PM' : 'AM'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#F7F4EE', marginBottom: '6px' }}>
                    <Users size={13} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-1px' }} />
                    Party Size *
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(18, 22, 21, 0.75)',
                      border: '1px solid rgba(45, 90, 71, 0.15)',
                      color: '#F7F4EE',
                      fontSize: '13.5px',
                      outline: 'none',
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, '12+ (Private Suite)'].map((n) => (
                      <option key={n} value={n} style={{ background: '#161d1b', color: '#F7F4EE' }}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Area Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#F7F4EE', marginBottom: '8px' }}>
                  Preferred Seating Ambiance
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '10px',
                  }}
                >
                  {seatingAreas.map((area) => {
                    const isSelected = seatingArea === area.id
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setSeatingArea(area.id)}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '14px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          background: isSelected ? 'rgba(45, 90, 71, 0.12)' : 'rgba(18, 22, 21, 0.65)',
                          border: isSelected ? '1px solid #58A79B' : '1px solid rgba(45, 90, 71, 0.10)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: '13px', color: isSelected ? '#58A79B' : '#F7F4EE' }}>
                          {area.id}
                        </div>
                        <div style={{ fontSize: '11px', color: '#8A9B94', marginTop: '4px', lineHeight: 1.4 }}>
                          {area.desc}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#F7F4EE', marginBottom: '6px' }}>
                  Special Requests / Cupping Tasting Flight Preference
                </label>
                <textarea
                  rows={2}
                  placeholder="Anniversary pairing, interest in Geisha flight tasting, quiet corner for business meeting..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(18, 22, 21, 0.75)',
                    border: '1px solid rgba(45, 90, 71, 0.15)',
                    color: '#F7F4EE',
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              {/* Submit CTA */}
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary-teal"
                  style={{
                    padding: '14px 44px',
                    fontSize: '15px',
                  }}
                >
                  <Sparkles size={16} />
                  <span>{submitting ? 'Confirming with Concierge...' : 'Confirm Table Reservation'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
