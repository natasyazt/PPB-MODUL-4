import { useRef } from 'react'

function GunCard({ gun, onAddToCart }) {
  const popup = useRef(null)

  return (
    <li className="card">
      <div className="card-inner">
        <button className="card-btn" onClick={() => popup.current.showModal()}>
          {/* Gambar dengan ukuran seragam (object-fit: contain) */}
          <div className="card-img-wrap">
            <img className="card-img" src={gun.image} alt="" />
          </div>
          <span className="name display">{gun.name}</span>
          <span className="type">
            {gun.type} · {gun.caliber}
          </span>
          <span className="price">${gun.price.toLocaleString()}</span>
        </button>

        <button
          className="add-to-cart-btn"
          type="button"
          onClick={() => onAddToCart(gun)}
        >
          + Tambah ke Keranjang
        </button>
      </div>

      <dialog
        className="popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <img className="popup-img" src={gun.image} alt="" width="240" height="180" />
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p>{gun.description}</p>
        <div className="popup-actions">
          <button
            className="add-to-cart-btn popup-add"
            type="button"
            onClick={() => { onAddToCart(gun); popup.current.close() }}
          >
            + Tambah ke Keranjang
          </button>
          <form method="dialog">
            <button className="popup-close">Close</button>
          </form>
        </div>
      </dialog>
    </li>
  )
}

export default GunCard
