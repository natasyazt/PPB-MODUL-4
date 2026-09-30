function Cart({ cart, onUpdate, onRemove, onClose }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <>
      <div className="cart-backdrop" onClick={onClose} />
      <aside className="cart-panel">
        <div className="cart-header">
          <h2 className="cart-title display">Keranjang Belanja</h2>
          <button className="cart-close-btn" onClick={onClose} aria-label="Tutup keranjang">✕</button>
        </div>

        {cart.length === 0 ? (
          <p className="cart-empty">Keranjang masih kosong.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.name} className="cart-item">
                  <img
                    className="cart-item-img"
                    src={item.image}
                    alt=""
                    width="56"
                    height="42"
                  />
                  <div className="cart-item-info">
                    <span className="cart-item-name display">{item.name}</span>
                    <span className="cart-item-price">${item.price.toLocaleString()}</span>
                  </div>
                  <div className="cart-qty">
                    <button
                      className="qty-btn"
                      onClick={() => onUpdate(item.name, item.qty - 1)}
                      aria-label="Kurangi"
                    >−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onUpdate(item.name, item.qty + 1)}
                      aria-label="Tambah"
                    >+</button>
                  </div>
                  <button
                    className="cart-remove"
                    onClick={() => onRemove(item.name)}
                    aria-label="Hapus item"
                  >🗑</button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-value display">${total.toLocaleString()}</span>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default Cart
