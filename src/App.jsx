import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Cart from './components/Cart.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  function addToCart(gun) {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === gun.name)
      if (existing) {
        return prev.map((i) =>
          i.name === gun.name ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...gun, qty: 1 }]
    })
  }

  function updateQty(name, qty) {
    if (qty < 1) return removeFromCart(name)
    setCart((prev) =>
      prev.map((i) => (i.name === name ? { ...i, qty } : i))
    )
  }

  function removeFromCart(name) {
    setCart((prev) => prev.filter((i) => i.name !== name))
  }

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <div className="shell">
      <Header
        tab={tab}
        onTab={setTab}
        cartCount={totalItems}
        onCartOpen={() => setCartOpen(true)}
      />

      <main className="main">
        {tab === 'Catalog' && <Catalog onAddToCart={addToCart} />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>

      <Footer />

      {cartOpen && (
        <Cart
          cart={cart}
          onUpdate={updateQty}
          onRemove={removeFromCart}
          onClose={() => setCartOpen(false)}
        />
      )}
    </div>
  )
}

export default App
