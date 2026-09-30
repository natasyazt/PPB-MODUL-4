import { useState, useMemo } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

const TYPES = ['All', ...Array.from(new Set(GUNS.map((g) => g.type)))]

function Catalog({ onAddToCart }) {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [sortKey, setSortKey] = useState(null)   // 'name' | 'price' | null
  const [sortDir, setSortDir] = useState('asc')  // 'asc' | 'desc'

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const displayed = useMemo(() => {
    let list = GUNS

    // Filter by type
    if (filterType !== 'All') {
      list = list.filter((g) => g.type === filterType)
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((g) => g.name.toLowerCase().includes(q))
    }

    // Sort
    if (sortKey) {
      list = [...list].sort((a, b) => {
        const va = sortKey === 'price' ? a.price : a.name.toLowerCase()
        const vb = sortKey === 'price' ? b.price : b.name.toLowerCase()
        if (va < vb) return sortDir === 'asc' ? -1 : 1
        if (va > vb) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }

    return list
  }, [search, filterType, sortKey, sortDir])

  function sortLabel(key) {
    const arrow = sortDir === 'asc' ? '↑' : '↓'
    return sortKey === key ? `${key === 'name' ? 'Nama' : 'Harga'} ${arrow}` : (key === 'name' ? 'Nama' : 'Harga')
  }

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      {/* Search & Filter Bar */}
      <div className="toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="Cari nama senjata…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Cari senjata"
        />
        <div className="filter-group">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              className={filterType === t ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilterType(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="sort-group">
          <span className="sort-label">Sort:</span>
          <button
            type="button"
            className={sortKey === 'name' ? 'sort-btn active' : 'sort-btn'}
            onClick={() => toggleSort('name')}
          >
            {sortLabel('name')}
          </button>
          <button
            type="button"
            className={sortKey === 'price' ? 'sort-btn active' : 'sort-btn'}
            onClick={() => toggleSort('price')}
          >
            {sortLabel('price')}
          </button>
        </div>
      </div>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{displayed.length} pieces</span>
        </div>
        {displayed.length === 0 ? (
          <p className="no-result">Tidak ada senjata yang cocok.</p>
        ) : (
          <ul className="stock">
            {displayed.map((gun) => (
              <GunCard key={gun.name} gun={gun} onAddToCart={onAddToCart} />
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default Catalog
