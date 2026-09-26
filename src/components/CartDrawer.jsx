import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { X, Trash2, ShoppingBag, ArrowRight, Tag, CheckCircle2 } from 'lucide-react'

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    formatPrice,
    orderType,
    setOrderType,
    applyPromo,
    promoCode,
    discountPercent,
    promoMessage,
    subtotal,
    discountAmount,
    tax,
    finalTotal,
    setIsCheckoutOpen,
  } = useCart()

  const [inputCode, setInputCode] = useState('')

  const handleApplyPromo = (e) => {
    e.preventDefault()
    applyPromo(inputCode)
  }

  const proceedToCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10, 13, 12, 0.75)',
              backdropFilter: 'blur(10px)',
            }}
          />

          {/* Slide-out Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '460px',
              height: '100%',
              background: '#141a18',
              borderLeft: '1px solid rgba(45, 90, 71, 0.15)',
              boxShadow: '-10px 0 40px rgba(45, 90, 71, 0.10)',
              display: 'flex',
              flexDirection: 'column',
              color: '#F7F4EE',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: '24px',
                borderBottom: '1px solid rgba(88, 167, 155, 0.16)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={20} color="#58A79B" />
                <h3
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  Your BRWW Order
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
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
            </div>

            {/* Order Type Toggle */}
            <div style={{ padding: '16px 24px', background: 'rgba(18, 22, 21, 0.5)' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '6px',
                  background: 'rgba(22, 29, 27, 0.85)',
                  padding: '4px',
                  borderRadius: '12px',
                  border: '1px solid rgba(45, 90, 71, 0.12)',
                }}
              >
                {['Dine-In', 'Takeaway', 'Curbside'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    style={{
                      padding: '7px 0',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: orderType === type ? 600 : 400,
                      background: orderType === type ? '#58A79B' : 'transparent',
                      color: orderType === type ? '#121615' : '#9ea9a6',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Cart Items List */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {cart.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: '#8A9B94',
                  }}
                >
                  <ShoppingBag size={42} color="rgba(45, 90, 71, 0.20)" style={{ margin: '0 auto 16px' }} />
                  <p style={{ fontSize: '16px', fontWeight: 600, color: '#F7F4EE', marginBottom: '8px' }}>
                    Your BRWW order is empty
                  </p>
                  <p style={{ fontSize: '13px', marginBottom: '24px' }}>
                    Indulge in our single-origin roasts, velvet cold brews, or artisan desserts.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="btn-primary-teal"
                    style={{ padding: '10px 24px', fontSize: '13px' }}
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      padding: '14px',
                      borderRadius: '16px',
                      background: 'rgba(22, 29, 27, 0.75)',
                      border: '1px solid rgba(45, 90, 71, 0.10)',
                    }}
                  >
                    {/* Item Thumbnail */}
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '12px',
                        background: 'rgba(22, 29, 27, 0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: '1px solid rgba(45, 90, 71, 0.10)',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ maxHeight: '80%', maxWidth: '80%', objectFit: 'contain' }}
                      />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4
                          style={{
                            fontFamily: 'Playfair Display, Georgia, serif',
                            fontSize: '14px',
                            fontWeight: 700,
                            margin: 0,
                            color: '#F7F4EE',
                          }}
                        >
                          {item.name}
                        </h4>
                        <span
                          style={{
                            fontFamily: 'Cinzel, serif',
                            fontWeight: 700,
                            fontSize: '13px',
                            color: '#58A79B',
                          }}
                        >
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>

                      {/* Customization Details */}
                      <div style={{ fontSize: '11px', color: '#8A9B94', margin: '4px 0 8px' }}>
                        {item.options.milk && <span>{item.options.milk} · </span>}
                        {item.options.sweetness && <span>{item.options.sweetness}</span>}
                        {item.options.extras && item.options.extras.length > 0 && (
                          <div>+ {item.options.extras.join(', ')}</div>
                        )}
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'rgba(22, 29, 27, 0.85)',
                            borderRadius: '999px',
                            padding: '3px 10px',
                            border: '1px solid rgba(45, 90, 71, 0.12)',
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.cartItemId, -1)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#F7F4EE',
                              cursor: 'pointer',
                              fontSize: '14px',
                              lineHeight: 1,
                            }}
                          >
                            –
                          </button>
                          <span style={{ fontSize: '12px', fontWeight: 600 }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, 1)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#F7F4EE',
                              cursor: 'pointer',
                              fontSize: '14px',
                              lineHeight: 1,
                            }}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#8A9B94',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer with Totals and Checkout */}
            {cart.length > 0 && (
              <div
                style={{
                  padding: '20px 24px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderTop: '1px solid rgba(45, 90, 71, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Tag
                      size={14}
                      color="#58A79B"
                      style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <input
                      type="text"
                      placeholder="Promo code (BRWW10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 34px',
                        borderRadius: '10px',
                        background: 'rgba(22, 29, 27, 0.85)',
                        border: '1px solid rgba(45, 90, 71, 0.15)',
                        color: '#F7F4EE',
                        fontSize: '12px',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      background: 'rgba(45, 90, 71, 0.10)',
                      border: '1px solid rgba(45, 90, 71, 0.18)',
                      color: '#F7F4EE',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Apply
                  </button>
                </form>

                {promoMessage && (
                  <div
                    style={{
                      fontSize: '11px',
                      color: discountPercent > 0 ? '#58A79B' : '#e06c75',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {discountPercent > 0 && <CheckCircle2 size={12} />}
                    <span>{promoMessage}</span>
                  </div>
                )}

                {/* Subtotal, Taxes, Total */}
                <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8A9B94' }}>
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#58A79B' }}>
                      <span>BRWW Connoisseur ({discountPercent}%)</span>
                      <span>–{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8A9B94' }}>
                    <span>Artisan Tax & Service (8%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: 700,
                      fontSize: '16px',
                      color: '#F7F4EE',
                      paddingTop: '8px',
                      borderTop: '1px solid rgba(45, 90, 71, 0.10)',
                    }}
                  >
                    <span>Total Due</span>
                    <span style={{ fontFamily: 'Cinzel, serif', color: '#58A79B' }}>
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={proceedToCheckout}
                  className="btn-primary-teal"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '14px',
                    borderRadius: '12px',
                  }}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
