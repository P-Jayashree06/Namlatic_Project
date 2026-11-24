import React from 'react';

export default function PriceFilter({ minPrice, maxPrice, onChange }) {
  return (
    <div className="price-filter">
      <span className="filter-label">PRICE PER NIGHT</span>
      <label>
        <span className="visually-hidden">Minimum price</span>
        <span>$</span><input type="number" min="0" placeholder="Min" value={minPrice} onChange={(event) => onChange('minPrice', event.target.value)} />
      </label>
      <span className="price-divider">to</span>
      <label>
        <span className="visually-hidden">Maximum price</span>
        <span>$</span><input type="number" min="0" placeholder="Max" value={maxPrice} onChange={(event) => onChange('maxPrice', event.target.value)} />
      </label>
    </div>
  );
}
