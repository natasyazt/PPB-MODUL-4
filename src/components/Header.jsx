const NAV = ['Catalog', 'About', 'Contact']

function Header({ tab, onTab, cartCount, onCartOpen }) {
  return (
    <header className="header">
      <span className="brand display">Bore &amp; Barrel</span>
      <nav className="nav">
        {NAV.map((item) => (
          <button
            key={item}
            type="button"
            className={tab === item ? 'nav-link active' : 'nav-link'}
            onClick={() => onTab(item)}
          >
            {item}
          </button>
        ))}
      </nav>
      <button
        type="button"
        className="cart-btn"
        onClick={onCartOpen}
        aria-label="Buka keranjang belanja"
      >
        🛒
        {cartCount > 0 && (
          <span className="cart-badge">{cartCount}</span>
        )}
      </button>
    </header>
  )
}

export default Header
