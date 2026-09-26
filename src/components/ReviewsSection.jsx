import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MessageSquarePlus, X, Check, Quote } from 'lucide-react'

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  // Review Form
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [drink, setDrink] = useState('Velvet Flat White')
  const [submitting, setSubmitting] = useState(false)
  const [successNotice, setSuccessNotice] = useState(false)

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch('/api/reviews')
        if (res.ok) {
          const json = await res.json()
          if (json.data && json.data.length > 0) {
            setReviews(json.data)
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('Reviews fetch failed', err)
      }

      setReviews([
        {
          id: 'rev-1',
          name: 'Julian Vance',
          role: 'Specialty Coffee Sommelier',
          rating: 5,
          date: '2 days ago',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
          comment: 'The Panama Geisha Chemex Reserve at BRWW is unequivocally one of the finest extractions on the East Coast. Unbelievable floral clarity and jasmine finish.',
          drink: 'Panama Geisha Chemex',
        },
        {
          id: 'rev-2',
          name: 'Elena Rostova',
          role: 'Architectural Designer',
          rating: 5,
          date: '1 week ago',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
          comment: 'An extraordinary sanctuary. The muted vintage teal decor, warm charcoal textures, and gentle aroma of drum-roasted beans make it my daily writing refuge.',
          drink: '24-Hour Nitro Velvet Brew',
        },
        {
          id: 'rev-3',
          name: 'Aarav Mehta',
          role: 'Gastronomy Writer',
          rating: 5,
          date: '2 weeks ago',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
          comment: 'The pairing of the Velvet Tiramisu Tart with the Smoked Bourbon Espresso is gastronomic perfection. The oat milk texture on the flat white is unmatched.',
          drink: 'Velvet Flat White',
        },
      ])
      setLoading(false)
    }

    fetchReviews()
  }, [])

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!name || !comment) return

    setSubmitting(true)

    const payload = {
      name,
      role: role || 'Coffee Connoisseur',
      rating,
      comment,
      drink,
    }

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setReviews((prev) => [data.review, ...prev])
        setSuccessNotice(true)
        setTimeout(() => {
          setIsReviewModalOpen(false)
          setSuccessNotice(false)
          setName('')
          setRole('')
          setComment('')
        }, 800)
      }
    } catch {
      // Local fallback
      const mockReview = {
        id: 'rev-' + Date.now(),
        name,
        role: role || 'Coffee Enthusiast',
        rating,
        date: 'Just now',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
        comment,
        drink,
      }
      setReviews((prev) => [mockReview, ...prev])
      setIsReviewModalOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="reviews"
      style={{
        position: 'relative',
        backgroundColor: '#121615',
        padding: 'clamp(60px, 10vh, 120px) clamp(20px, 5vw, 60px)',
        overflow: 'hidden',
      }}
    >
      {/* Background Vintage Noise */}
      <div
        className="vintage-noise"
        style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          <div>
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
              Words from Connoisseurs
            </span>
            <h2
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                color: '#F7F4EE',
                fontWeight: 800,
                margin: 0,
              }}
            >
              Praised by Coffee Lovers
            </h2>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="btn-secondary-vintage"
            style={{ padding: '10px 24px', fontSize: '13px' }}
          >
            <MessageSquarePlus size={16} />
            Share Your Experience
          </button>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="vintage-glass-card"
              style={{
                borderRadius: '20px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <Quote
                size={36}
                color="rgba(45, 90, 71, 0.12)"
                style={{ position: 'absolute', top: '20px', right: '20px' }}
              />

              {/* Star Rating */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < rev.rating ? '#C88A58' : 'transparent'}
                    color={i < rev.rating ? '#C88A58' : '#4d5754'}
                  />
                ))}
              </div>

              {/* Quote Comment */}
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13.5px',
                  lineHeight: 1.7,
                  color: '#F7F4EE',
                  margin: '0 0 20px 0',
                  flexGrow: 1,
                  fontStyle: 'italic',
                }}
              >
                "{rev.comment}"
              </p>

              {/* Drink tag */}
              {rev.drink && (
                <div style={{ marginBottom: '16px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#58A79B',
                      background: 'rgba(88, 167, 155, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      border: '1px solid rgba(45, 90, 71, 0.12)',
                    }}
                  >
                    Favorite: {rev.drink}
                  </span>
                </div>
              )}

              {/* Author info */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(45, 90, 71, 0.10)',
                }}
              >
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid rgba(45, 90, 71, 0.15)',
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#F7F4EE' }}>
                    {rev.name}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#8A9B94' }}>
                    {rev.role} · {rev.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReviewModalOpen(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(10, 13, 12, 0.85)',
                backdropFilter: 'blur(10px)',
              }}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
                borderRadius: '24px',
                background: '#161d1b',
                border: '1px solid rgba(45, 90, 71, 0.15)',
                padding: '28px',
                color: '#F7F4EE',
                zIndex: 10,
              }}
            >
              <button
                onClick={() => setIsReviewModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: 'rgba(88, 167, 155, 0.1)',
                  border: 'none',
                  color: '#8A9B94',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>

              <h3
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  margin: '0 0 8px 0',
                }}
              >
                Share Your BRWW Tasting
              </h3>
              <p style={{ fontSize: '13px', color: '#8A9B94', marginBottom: '20px' }}>
                How was your roast, aroma, or ambiance experience today?
              </p>

              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                    Rating
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px',
                        }}
                      >
                        <Star
                          size={24}
                          fill={star <= rating ? '#C88A58' : 'transparent'}
                          color={star <= rating ? '#C88A58' : '#4d5754'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Clara Oswald"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(18, 22, 21, 0.7)',
                      border: '1px solid rgba(45, 90, 71, 0.15)',
                      color: '#F7F4EE',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Preferred Drink / Pairing
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 24-Hour Nitro Velvet Brew"
                    value={drink}
                    onChange={(e) => setDrink(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(18, 22, 21, 0.7)',
                      border: '1px solid rgba(45, 90, 71, 0.15)',
                      color: '#F7F4EE',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Review / Thoughts *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the aroma notes, extraction temperature, or cozy ambiance..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(18, 22, 21, 0.7)',
                      border: '1px solid rgba(45, 90, 71, 0.15)',
                      color: '#F7F4EE',
                      fontSize: '12.5px',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary-teal"
                  style={{ marginTop: '6px', padding: '12px', borderRadius: '10px' }}
                >
                  {successNotice ? (
                    <>
                      <Check size={16} /> Published!
                    </>
                  ) : submitting ? (
                    'Transmitting Review...'
                  ) : (
                    'Submit Connoisseur Review'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
