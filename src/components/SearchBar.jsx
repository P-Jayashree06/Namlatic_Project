import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-control">
      <span className="visually-hidden">Search hotels by name</span>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search hotels by name…" />
      {value && <button type="button" className="search-clear" onClick={() => onChange('')} aria-label="Clear search">×</button>}
    </label>
  );
}
