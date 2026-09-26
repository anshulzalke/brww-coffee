import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const dataDir = path.join(__dirname, 'data')

// Helper function to read JSON
function readJSON(file, fallback = []) {
  try {
    const filePath = path.join(dataDir, file)
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2))
      return fallback
    }
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    console.error(`Error reading ${file}:`, err)
    return fallback
  }
}

// Helper function to write JSON
function writeJSON(file, data) {
  try {
    const filePath = path.join(dataDir, file)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (err) {
    console.error(`Error writing ${file}:`, err)
    return false
  }
}

// 1. GET /api/menu
app.get('/api/menu', (req, res) => {
  const menu = readJSON('menu.json', [])
  const { category } = req.query
  if (category && category !== 'all') {
    const filtered = menu.filter(item => item.category === category)
    return res.json({ success: true, count: filtered.length, data: filtered })
  }
  res.json({ success: true, count: menu.length, data: menu })
})

// 2. POST /api/orders
app.post('/api/orders', (req, res) => {
  const { customer, items, total, orderType, currency, paymentMethod, specialInstructions } = req.body

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Order must contain at least one item.' })
  }

  const orders = readJSON('orders.json', [])
  const orderId = 'BRWW-' + Math.floor(100000 + Math.random() * 900000)
  
  const newOrder = {
    orderId,
    timestamp: new Date().toISOString(),
    status: 'Confirmed',
    estimatedPrepTime: '12-15 mins',
    customer: customer || { name: 'Artisanal Guest' },
    items,
    total: total || 0,
    currency: currency || 'USD',
    orderType: orderType || 'Dine-In',
    paymentMethod: paymentMethod || 'Card at Counter',
    specialInstructions: specialInstructions || '',
  }

  orders.unshift(newOrder)
  writeJSON('orders.json', orders)

  console.log(`[BRWW] New order placed: ${orderId} | Items: ${items.length} | Total: ${total}`)
  res.status(201).json({
    success: true,
    message: 'Your artisanal coffee order has been placed successfully.',
    order: newOrder,
  })
})

// 3. POST /api/reservations
app.post('/api/reservations', (req, res) => {
  const { name, email, phone, date, time, guests, seatingArea, specialRequests } = req.body

  if (!name || !date || !time || !guests) {
    return res.status(400).json({
      success: false,
      error: 'Name, date, time, and guest count are required.',
    })
  }

  const reservations = readJSON('reservations.json', [])
  const reservationId = 'RES-' + Math.floor(1000 + Math.random() * 9000)

  const newReservation = {
    reservationId,
    timestamp: new Date().toISOString(),
    name,
    email: email || '',
    phone: phone || '',
    date,
    time,
    guests: Number(guests),
    seatingArea: seatingArea || 'Vintage Lounge',
    specialRequests: specialRequests || '',
    status: 'Confirmed',
  }

  reservations.unshift(newReservation)
  writeJSON('reservations.json', reservations)

  console.log(`[BRWW] Table reservation: ${reservationId} | Guest: ${name} (${guests} ppl) on ${date} at ${time}`)
  res.status(201).json({
    success: true,
    message: 'Table reserved successfully at BRWW.',
    reservation: newReservation,
  })
})

// 4. GET /api/reviews
app.get('/api/reviews', (req, res) => {
  const reviews = readJSON('reviews.json', [])
  res.json({ success: true, count: reviews.length, data: reviews })
})

// 5. POST /api/reviews
app.post('/api/reviews', (req, res) => {
  const { name, role, rating, comment, drink } = req.body
  if (!name || !comment || !rating) {
    return res.status(400).json({ success: false, error: 'Name, rating, and comment are required.' })
  }

  const reviews = readJSON('reviews.json', [])
  const newReview = {
    id: 'rev-' + Date.now(),
    name,
    role: role || 'Coffee Connoisseur',
    rating: Number(rating),
    date: 'Just now',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
    comment,
    drink: drink || 'Velvet Roast Espresso',
  }

  reviews.unshift(newReview)
  writeJSON('reviews.json', reviews)

  res.status(201).json({ success: true, review: newReview })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'BRWW API', time: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`☕ BRWW API Server listening on http://localhost:${PORT}`)
})
