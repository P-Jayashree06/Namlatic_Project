import React from 'react';

export default function HotelCard({ hotel, onView, onEdit, onDelete }) {
  return (
    <article className="hotel-card">
      <button
        className="hotel-card-image-button"
        onClick={() => onView(hotel.id)}
        aria-label={`View ${hotel.title} details`}
      >
        <img className="hotel-card-image" src={hotel.image} alt={`${hotel.title} hotel`} />
        <span className="image-badge">HOTEL</span>
      </button>
      <div className="hotel-card-body">
        <div className="hotel-card-heading">
          <button className="hotel-title-link" onClick={() => onView(hotel.id)}>
            {hotel.title}
          </button>
          <span className="hotel-price">${Number(hotel.price).toLocaleString()}<small> / night</small></span>
        </div>
        <p className="hotel-description">{hotel.description}</p>
        <div className="hotel-card-footer">
          <button className="text-button" onClick={() => onView(hotel.id)}>View details <span aria-hidden="true">→</span></button>
          <div className="card-actions">
            <button className="button button-light button-small" onClick={() => onEdit(hotel)} aria-label={`Edit ${hotel.title}`}>Edit</button>
            <button className="button button-danger button-small" onClick={() => onDelete(hotel)} aria-label={`Delete ${hotel.title}`}>Delete</button>
          </div>
        </div>
      </div>
    </article>
  );
}
