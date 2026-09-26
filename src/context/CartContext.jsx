import { createContext, useContext, useState, useEffect } from 'react'
import { brandConfig } from '../config/brand'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('brww_cart') || localStorage.getItem('velvet_brew_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [currency, setCurrency] = useState('USD') // 'USD' | 'INR'
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [orderType, setOrderType] = useState('Dine-In')
  const [promoCode, setPromoCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [promoMessage, setPromoMessage] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('brww_cart', JSON.stringify(cart))
    } catch (e) {
      console.error(e)
    }
  }, [cart])

  // Currency Formatter
  const formatPrice = (usdAmount) => {
    const config = brandConfig.currencies[currency] || brandConfig.currencies.USD
    return config.format(usdAmount)
  }

  // Add Item to Cart with customizable options
  const addToCart = (item, options = {}, quantity = 1) => {
    const milk = options.milk || 'Whole Milk'
    const sweetness = options.sweetness || 'Standard'
    const extras = options.extras || []
    const cartItemId = `${item.id}-${milk}-${sweetness}-${extras.sort().join('-')}`

    // Calculate extra cost if oat/almond milk or extra shot
    let extraCost = 0
    if (milk === 'Oat Milk' || milk === 'Almond Milk') extraCost += 0.50
    if (extras.includes('Extra Ristretto Shot (+ $0.75)')) extraCost += 0.75
    if (extras.includes('House Velvet Cream (+ $0.60)')) extraCost += 0.60

    const unitPrice = item.price + extraCost

    setCart((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId)
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [
        ...prev,
        {
          cartItemId,
          id: item.id,
          name: item.name,
          basePrice: item.price,
          unitPrice,
          quantity,
          image: item.image,
          category: item.category,
          options: {
            milk,
            sweetness,
            extras,
          },
        },
      ]
    })
  }

  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId))
  }

  const clearCart = () => {
    setCart([])
    setPromoCode('')
    setDiscountPercent(0)
    setPromoMessage('')
  }

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase()
    if (clean === 'BRWW10' || clean === 'VELVET10') {
      setDiscountPercent(10)
      setPromoCode('BRWW10')
      setPromoMessage('10% BRWW Connoisseur discount applied!')
      return { success: true, message: '10% discount applied!' }
    } else if (clean === 'ROAST20') {
      setDiscountPercent(20)
      setPromoCode('ROAST20')
      setPromoMessage('20% Master Roaster discount applied!')
      return { success: true, message: '20% discount applied!' }
    } else {
      setDiscountPercent(0)
      setPromoMessage('Invalid promo code. Try BRWW10')
      return { success: false, message: 'Invalid code. Use BRWW10' }
    }
  }

  // Financial calculations in USD
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const discountAmount = (subtotal * discountPercent) / 100
  const taxableAmount = Math.max(0, subtotal - discountAmount)
  const tax = taxableAmount * 0.08 // 8% local cafe tax
  const finalTotal = taxableAmount + tax
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        currency,
        setCurrency,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orderType,
        setOrderType,
        promoCode,
        discountPercent,
        promoMessage,
        applyPromo,
        subtotal,
        discountAmount,
        tax,
        finalTotal,
        totalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
