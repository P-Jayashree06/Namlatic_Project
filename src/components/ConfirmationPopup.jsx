import React from 'react';

export default function ConfirmationPopup({ hotel, busy, onConfirm, onCancel }) {
  if (!hotel) return null;
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
        <span className="confirm-icon" aria-hidden="true">!</span>
        <h2 id="delete-title">Delete this hotel?</h2>
        <p><strong>{hotel.title}</strong> will be removed from your hotel list. This action cannot be undone.</p>
        <div className="form-actions">
          <button className="button button-light" onClick={onCancel}>Keep hotel</button>
          <button className="button button-danger" disabled={busy} onClick={onConfirm}>{busy ? 'Deleting…' : 'Delete hotel'}</button>
        </div>
      </section>
    </div>
  );
}
