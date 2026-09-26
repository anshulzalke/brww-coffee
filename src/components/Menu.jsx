import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { Plus, Search, Star, Sparkles, X, Check, Coffee } from 'lucide-react'

const isCupImage = (src) => src && src.includes('/cup-') && src.endsWith('.png')

const categories = [
  { id: 'all', label: 'All Offerings' },
  { id: 'hot-brews', label: 'Hot Brews' },
  { id: 'cold-brews', label: 'Cold Brews' },
  { id: 'manual-drip', label: 'Manual Drip' },
  { id: 'artisan-desserts', label: 'Artisan Desserts' },
]

export default function Menu() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  // Modal Customization State
  const [milk, setMilk] = useState('Whole Milk')
  const [sweetness, setSweetness] = useState('Standard')
  const [extras, setExtras] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [addedNotice, setAddedNotice] = useState(false)

  const { addToCart, formatPrice, setIsCartOpen } = useCart()

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('/api/menu')
        if (res.ok) {
          const json = await res.json()
          if (json.data && json.data.length > 0) {
            setItems(json.data)
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('API fetch failed, using fallback data', err)
      }

      // Fallback in case of network issue
      const fallback = [
        {
          id: 'velvet-flat-white',
          name: 'Velvet Flat White',
          category: 'hot-brews',
          price: 4.75,
          rating: 4.9,
          roast: 'Medium-Dark',
          origin: 'Huila, Colombia',
          notes: ['Velvet Cocoa', 'Hazelnut', 'Silky Crema'],
          description: 'Double ristretto poured over micro-textured steamed milk with a silky caramel finish.',
          image: '/cup-1.png',
        },
        {
          id: 'nitro-velvet-brew',
          name: '24-Hour Nitro Velvet Brew',
          category: 'cold-brews',
          price: 5.75,
          rating: 4.9,
          roast: 'Cold Steep',
          origin: 'Yirgacheffe, Ethiopia',
          notes: ['Guinness Head', 'Blackberry', 'Brown Sugar'],
          description: 'Steeped for 24 hours and infused with food-grade pure nitrogen for a cascading velvet texture.',
          image: '/cup-2.png',
        },
        {
          id: 'yirgacheffe-v60',
          name: 'Ethiopian Yirgacheffe G1 V60',
          category: 'manual-drip',
          price: 6.25,
          rating: 5.0,
          roast: 'Light Floral',
          origin: 'Gedeo, Ethiopia',
          notes: ['Meyer Lemon', 'White Peach', 'Earl Grey'],
          description: 'Washed heirloom lot hand-poured through Hario V60 spiral dripper at 93°C.',
          image: '/velvet-drip.jpg',
        },
        {
          id: 'tiramisu-tart',
          name: 'Velvet Espresso Tiramisu Tart',
          category: 'artisan-desserts',
          price: 6.50,
          rating: 5.0,
          roast: 'Espresso Paired',
          origin: 'Piedmont Mascarpone',
          notes: ['Valrhona Cacao', 'Kahlúa', 'Sable Crust'],
          description: 'Cocoa sablé crust with espresso ladyfingers, velvety mascarpone sabayon, and 24k gold leaf.',
          image: '/velvet-dessert.jpg',
        },
      ]
      setItems(fallback)
      setLoading(false)
    }

    fetchMenu()
  }, [])

  const openCustomizationModal = (item) => {
    setSelectedItem(item)
    setMilk('Whole Milk')
    setSweetness('Standard')
    setExtras([])
    setQuantity(1)
    setAddedNotice(false)
  }

  const toggleExtra = (extraName) => {
    setExtras((prev) =>
      prev.includes(extraName) ? prev.filter((e) => e !== extraName) : [...prev, extraName]
    )
  }

  const handleModalAdd = () => {
    if (!selectedItem) return
    addToCart(selectedItem, { milk, sweetness, extras }, quantity)
    setAddedNotice(true)
    setTimeout(() => {
      setSelectedItem(null)
      setIsCartOpen(true)
    }, 600)
  }

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes && item.notes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())))
    return matchesCategory && matchesSearch
  })

  return (
    <section
      id="menu"
      className="pt-28 md:pt-36"
      style={{
        position: 'relative',
        backgroundColor: '#121615',
        paddingBottom: 'clamp(60px, 10vh, 110px)',
        paddingLeft: 'clamp(20px, 5vw, 60px)',
        paddingRight: 'clamp(20px, 5vw, 60px)',
        overflow: 'hidden',
        scrollMarginTop: '100px',
      }}
    >
      {/* Background Vintage Noise */}
      <div
        className="vintage-noise"
        style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}
      />

      {/* Marquee Title */}
      <style>{`
        @keyframes marquee-ltr {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0%); }
        }
        .menu-marquee { animation: marquee-ltr 22s linear infinite; }
      `}</style>

      <div aria-hidden style={{ overflow: 'hidden', marginBottom: '24px', lineHeight: 1 }}>
        <div
          className="menu-marquee"
          style={{ display: 'flex', width: 'max-content', userSelect: 'none', pointerEvents: 'none' }}
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              style={{
                whiteSpace: 'nowrap',
                fontFamily: 'Cinzel, serif',
                fontWeight: 700,
                fontSize: 'clamp(50px, 8.5vw, 110px)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(88, 167, 155, 0.06)',
                paddingRight: '0.5em',
              }}
            >
              BRWW Artisanal Selection · Single Origin Reserve · Handcrafted Extractions
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
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
            Curated Artisanal Bar
          </span>
          <h2
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              color: '#F7F4EE',
              fontWeight: 800,
              margin: '0 0 16px 0',
            }}
          >
            Our Handcrafted Offerings
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
            Explore our curated selection of hot extractions, cold velvet brews, single-origin manual drips, and paired desserts.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          {/* Category Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              padding: '6px',
              background: 'rgba(22, 29, 27, 0.65)',
              borderRadius: '999px',
              border: '1px solid rgba(45, 90, 71, 0.12)',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: activeCategory === cat.id ? 600 : 400,
                  color: activeCategory === cat.id ? '#121615' : '#b4bcba',
                  background: activeCategory === cat.id ? '#58A79B' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '300px',
            }}
          >
            <Search
              size={16}
              color="#58A79B"
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search origin, notes, brew..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 16px 9px 40px',
                borderRadius: '999px',
                background: 'rgba(22, 29, 27, 0.75)',
                border: '1px solid rgba(45, 90, 71, 0.15)',
                color: '#F7F4EE',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </div>
        </div>

        {/* Menu Cards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#58A79B' }}>
            <Coffee className="animate-spin" size={32} style={{ margin: '0 auto 12px' }} />
            <p>Brewing menu items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#8A9B94' }}>
            <p>No artisanal items matched your search.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                className="vintage-glass-card"
                style={{
                  borderRadius: '20px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onClick={() => openCustomizationModal(item)}
              >
                {/* Rating Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(22, 29, 27, 0.85)',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(200, 138, 88, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#F7F4EE',
                    zIndex: 2,
                  }}
                >
                  <span>{item.rating.toFixed(1)}</span>
                  <Star size={11} fill="#C88A58" color="#C88A58" />
                </div>

                {/* Item Image with Soft Shadow */}
                <div
                  style={{
                    height: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    position: 'relative',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      borderRadius: item.image.endsWith('.jpg') ? '12px' : '0',
                      filter: 'drop-shadow(0 14px 20px rgba(88, 167, 155, 0.06))',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>

                {/* Origin Tag */}
                <div style={{ marginBottom: '6px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#58A79B',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.origin || item.roast}
                  </span>
                </div>

                {/* Item Title */}
                <h3
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '1.25rem',
                    color: '#F7F4EE',
                    fontWeight: 700,
                    margin: '0 0 8px 0',
                    lineHeight: 1.25,
                  }}
                >
                  {item.name}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12.5px',
                    lineHeight: 1.6,
                    color: '#8A9B94',
                    margin: '0 0 16px 0',
                    flexGrow: 1,
                  }}
                >
                  {item.description}
                </p>

                {/* Tasting Notes Tags */}
                {item.notes && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginBottom: '18px',
                    }}
                  >
                    {item.notes.map((note) => (
                      <span
                        key={note}
                        style={{
                          fontSize: '10.5px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(88, 167, 155, 0.1)',
                          color: '#8A9B94',
                          border: '1px solid rgba(45, 90, 71, 0.10)',
                        }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                )}

                {/* Card Footer: Price and Add Button */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(88, 167, 155, 0.14)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: '#F7F4EE',
                    }}
                  >
                    {formatPrice(item.price)}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      openCustomizationModal(item)
                    }}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: '#2D5A47',
                      border: 'none',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(45, 90, 71, 0.20)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)'
                      e.currentTarget.style.backgroundColor = '#6ec4b7'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.backgroundColor = '#58A79B'
                    }}
                    aria-label={`Customize and add ${item.name}`}
                  >
                    <Plus size={18} strokeWidth={2.4} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── Item Detail & Customization Modal ── */}
      <AnimatePresence>
        {selectedItem && (
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(10, 13, 12, 0.85)',
                backdropFilter: 'blur(10px)',
              }}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '540px',
                maxHeight: '90vh',
                overflowY: 'auto',
                borderRadius: '24px',
                background: 'rgba(22, 29, 27, 0.96)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(45, 90, 71, 0.15)',
                boxShadow: '0 24px 60px rgba(45, 90, 71, 0.10)',
                padding: '28px',
                color: '#F7F4EE',
                zIndex: 10,
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
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

              {/* Modal Header with Image */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    flexShrink: 0,
                    borderRadius: '16px',
                    background: 'rgba(22, 29, 27, 0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(45, 90, 71, 0.12)',
                  }}
                >
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    style={{
                      maxHeight: '85%',
                      maxWidth: '85%',
                      objectFit: 'contain',
                      borderRadius: selectedItem.image.endsWith('.jpg') ? '10px' : '0',
                    }}
                  />
                </div>
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
                    {selectedItem.roast || 'Artisanal Craft'}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'Playfair Display, Georgia, serif',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      margin: '4px 0',
                    }}
                  >
                    {selectedItem.name}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#58A79B',
                    }}
                  >
                    {formatPrice(selectedItem.price)}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#8A9B94', marginBottom: '20px' }}>
                {selectedItem.description}
              </p>

              {/* Milk Customization (for coffee drinks) */}
              {!selectedItem.id.includes('tart') && !selectedItem.id.includes('cheesecake') && (
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#F7F4EE', display: 'block', marginBottom: '8px' }}>
                    Artisan Milk Choice
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {['Whole Milk', 'Oat Milk (+ $0.50)', 'Almond Milk (+ $0.50)', 'No Milk (Black)'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setMilk(opt.split(' (')[0])}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          background: milk === opt.split(' (')[0] ? 'rgba(45, 90, 71, 0.12)' : 'rgba(18, 22, 21, 0.6)',
                          border: milk === opt.split(' (')[0] ? '1px solid #58A79B' : '1px solid rgba(45, 90, 71, 0.10)',
                          color: milk === opt.split(' (')[0] ? '#F7F4EE' : '#9ea9a6',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sweetness Preference */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#F7F4EE', display: 'block', marginBottom: '8px' }}>
                  Sweetness Level
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Unsweetened', 'Standard', 'Extra Sweet'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSweetness(lvl)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        background: sweetness === lvl ? 'rgba(45, 90, 71, 0.12)' : 'rgba(18, 22, 21, 0.6)',
                        border: sweetness === lvl ? '1px solid #58A79B' : '1px solid rgba(45, 90, 71, 0.10)',
                        color: sweetness === lvl ? '#F7F4EE' : '#9ea9a6',
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Add-ons */}
              <div style={{ marginBottom: '22px' }}>
                <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#F7F4EE', display: 'block', marginBottom: '8px' }}>
                  Connoisseur Add-ons
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    'Extra Ristretto Shot (+ $0.75)',
                    'House Velvet Cream (+ $0.60)',
                  ].map((extra) => {
                    const isSelected = extras.includes(extra)
                    return (
                      <button
                        key={extra}
                        type="button"
                        onClick={() => toggleExtra(extra)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: isSelected ? 'rgba(45, 90, 71, 0.10)' : 'rgba(18, 22, 21, 0.6)',
                          border: isSelected ? '1px solid #58A79B' : '1px solid rgba(45, 90, 71, 0.10)',
                          color: isSelected ? '#F7F4EE' : '#9ea9a6',
                        }}
                      >
                        <span>{extra}</span>
                        {isSelected && <Check size={14} color="#58A79B" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Quantity Counter & Add CTA */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(45, 90, 71, 0.10)',
                }}
              >
                {/* Quantity Stepper */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(22, 29, 27, 0.85)',
                    borderRadius: '999px',
                    padding: '6px 14px',
                    border: '1px solid rgba(45, 90, 71, 0.15)',
                  }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#F7F4EE',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                  >
                    –
                  </button>
                  <span style={{ fontWeight: 700, fontSize: '14px', minWidth: '16px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#F7F4EE',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleModalAdd}
                  className="btn-primary-teal"
                  style={{
                    flex: 1,
                    padding: '12px 20px',
                    fontSize: '14px',
                    borderRadius: '999px',
                  }}
                >
                  {addedNotice ? (
                    <>
                      <Check size={16} /> Added to BRWW Cart!
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} /> Add to Order · {formatPrice(selectedItem.price * quantity)}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
