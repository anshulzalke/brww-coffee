import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ArtisanShowcase3D from './components/ArtisanShowcase3D'
import Menu from './components/Menu'
import RoasteryStory from './components/RoasteryStory'
import ReservationSection from './components/ReservationSection'
import ReviewsSection from './components/ReviewsSection'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'

export default function App() {
  return (
    <CartProvider>
      <div style={{ backgroundColor: '#121615', minHeight: '100vh', color: '#F7F4EE' }}>
        <Navbar />
        <main>
          <Hero />
          <ArtisanShowcase3D />
          <Menu />
          <RoasteryStory />
          <ReservationSection />
          <ReviewsSection />
        </main>
        <Footer />
        <CartDrawer />
        <CheckoutModal />
      </div>
    </CartProvider>
  )
}
