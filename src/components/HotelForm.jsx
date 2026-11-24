import React from 'react';
import { useEffect, useState } from 'react';

const emptyValues = {
  title: '',
  description: '',
  latitude: '',
  longitude: '',
  price: '',
  image: '',
};

function validate(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = 'Enter a hotel name.';
  if (!values.description.trim()) errors.description = 'Add a short description.';

  const latitude = Number(values.latitude);
  if (values.latitude === '' || !Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
    errors.latitude = 'Enter a latitude from -90 to 90.';
  }

  const longitude = Number(values.longitude);
  if (values.longitude === '' || !Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
    errors.longitude = 'Enter a longitude from -180 to 180.';
  }

  const price = Number(values.price);
  if (values.price === '' || !Number.isFinite(price) || price <= 0) {
    errors.price = 'Price must be greater than zero.';
  }
  return errors;
}

export default function HotelForm({ hotel, onSave, onCancel }) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setValues(hotel ? { ...hotel } : emptyValues);
    setErrors({});
    setImageError('');
  }, [hotel]);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  }

  function chooseImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setImageError('Choose an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setValues((current) => ({ ...current, image: reader.result }));
        setImageError('');
      } else {
        setImageError('This image could not be previewed. Please try another file.');
      }
    };
    reader.onerror = () => setImageError('This image could not be read. Please try another file.');
    reader.readAsDataURL(file);
  }

  async function submitForm(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    const saved = await onSave({
      ...values,
      id: hotel?.id,
      title: values.title.trim(),
      description: values.description.trim(),
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
      price: Number(values.price),
    });
    setSaving(false);
    if (saved) onCancel();
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onCancel();
    }}>
      <section className="form-modal" role="dialog" aria-modal="true" aria-labelledby="hotel-form-title">
        <div className="modal-heading">
          <div>
            <span className="eyebrow">{hotel ? 'PROPERTY DETAILS' : 'NEW PROPERTY'}</span>
            <h2 id="hotel-form-title">{hotel ? 'Edit hotel' : 'Add a hotel'}</h2>
          </div>
          <button className="icon-button" onClick={onCancel} aria-label="Close form">×</button>
        </div>
        <form className="hotel-form" onSubmit={submitForm} noValidate>
          <label className="image-upload">
            {values.image ? (
              <img src={values.image} alt="Hotel image preview" className="image-preview" />
            ) : (
              <span className="upload-placeholder"><span aria-hidden="true">↥</span><strong>Upload a hotel photo</strong><small>Choose an image from your device</small></span>
            )}
            <input type="file" accept="image/*" onChange={chooseImage} />
          </label>
          {imageError && <p className="field-error">{imageError}</p>}

          <label className="form-field">
            <span>Hotel name <i>*</i></span>
            <input name="title" value={values.title} onChange={updateField} placeholder="e.g. The Grand Azure" />
            {errors.title && <small className="field-error">{errors.title}</small>}
          </label>
          <label className="form-field">
            <span>Description <i>*</i></span>
            <textarea name="description" rows="3" value={values.description} onChange={updateField} placeholder="Share what makes this stay special" />
            {errors.description && <small className="field-error">{errors.description}</small>}
          </label>
          <div className="form-grid">
            <label className="form-field">
              <span>Latitude <i>*</i></span>
              <input type="number" step="any" name="latitude" value={values.latitude} onChange={updateField} placeholder="25.2048" />
              {errors.latitude && <small className="field-error">{errors.latitude}</small>}
            </label>
            <label className="form-field">
              <span>Longitude <i>*</i></span>
              <input type="number" step="any" name="longitude" value={values.longitude} onChange={updateField} placeholder="55.2708" />
              {errors.longitude && <small className="field-error">{errors.longitude}</small>}
            </label>
          </div>
          <label className="form-field">
            <span>Price per night (USD) <i>*</i></span>
            <div className="input-prefix"><span>$</span><input type="number" min="0.01" step="0.01" name="price" value={values.price} onChange={updateField} placeholder="200" /></div>
            {errors.price && <small className="field-error">{errors.price}</small>}
          </label>
          <div className="form-actions">
            <button type="button" className="button button-light" onClick={onCancel}>Cancel</button>
            <button type="submit" className="button button-primary" disabled={saving}>{saving ? 'Saving…' : 'Save hotel'}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
