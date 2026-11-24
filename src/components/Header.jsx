import React from 'react';

export default function Header({ onAddHotel }) {
  return (
    <header className="topbar">
      <a className="brand" href={import.meta.env.BASE_URL} aria-label="Hotel Management home">
        <span className="brand-mark" aria-hidden="true">H</span>
        <span className="brand-name">stay<span>wise</span></span>
      </a>
      <div className="topbar-right">
        <span className="topbar-label">PROPERTY DIRECTORY</span>
        <button className="button button-primary add-button" onClick={onAddHotel}>
          <span aria-hidden="true">＋</span> Add New Hotel
        </button>
      </div>
    </header>
  );
}
