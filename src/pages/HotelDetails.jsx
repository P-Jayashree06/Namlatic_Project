import React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

function distanceInKilometres(first, second) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const latitudeDifference = toRadians(second.latitude - first.latitude);
  const longitudeDifference = toRadians(second.longitude - first.longitude);
  const value = Math.sin(latitudeDifference / 2) ** 2
    + Math.cos(toRadians(first.latitude)) * Math.cos(toRadians(second.latitude))
    * Math.sin(longitudeDifference / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

export default function HotelDetails({ hotel, onBack }) {
  const [locationMessage, setLocationMessage] = useState('');
  const [locating, setLocating] = useState(false);
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${hotel.longitude - 0.015}%2C${hotel.latitude - 0.01}%2C${hotel.longitude + 0.015}%2C${hotel.latitude + 0.01}&layer=mapnik&marker=${hotel.latitude}%2C${hotel.longitude}`;

  function findMyDistance() {
    if (!navigator.geolocation) {
      setLocationMessage('Geolocation is not supported by this browser.');
      return;
    }
    setLocating(true);
    setLocationMessage('');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const distance = distanceInKilometres(
          { latitude: coords.latitude, longitude: coords.longitude },
          { latitude: Number(hotel.latitude), longitude: Number(hotel.longitude) },
        );
        setLocationMessage(`You are approximately ${distance.toFixed(1)} km from this hotel.`);
        setLocating(false);
      },
      (error) => {
        const message = error.code === error.PERMISSION_DENIED
          ? 'Location permission was denied. You can still view the hotel on the map.'
          : 'Your location could not be determined. Please try again.';
        setLocationMessage(message);
        setLocating(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  }

  return (
    <>
      <Helmet>
        <title>{hotel.title} | Hotel Management</title>
        <meta name="description" content={`${hotel.description.slice(0, 145)}${hotel.description.length > 145 ? '…' : ''}`} />
        <meta property="og:title" content={`${hotel.title} | Staywise`} />
        <meta property="og:description" content={hotel.description} />
        <meta property="og:image" content={hotel.image} />
      </Helmet>
      <main className="details-shell">
        <button className="back-button" onClick={onBack}><span aria-hidden="true">←</span> Back to hotels</button>
        <article className="details-card">
          <img className="details-image" src={hotel.image} alt={`${hotel.title} hotel exterior and rooms`} />
          <div className="details-content">
            <div className="details-title-row">
              <div><p className="eyebrow">HOTEL OVERVIEW</p><h1>{hotel.title}</h1></div>
              <div className="details-price">${Number(hotel.price).toLocaleString()}<small> / night</small></div>
            </div>
            <p className="details-description">{hotel.description}</p>
            <div className="coordinates">
              <div><span className="coordinate-icon" aria-hidden="true">⌖</span><div><small>LATITUDE</small><strong>{Number(hotel.latitude).toFixed(4)}°</strong></div></div>
              <div><span className="coordinate-icon" aria-hidden="true">⌖</span><div><small>LONGITUDE</small><strong>{Number(hotel.longitude).toFixed(4)}°</strong></div></div>
            </div>
            <div className="map-heading"><div><p className="eyebrow">LOCATION</p><h2>Find your way here</h2></div><button className="button button-light locate-button" onClick={findMyDistance} disabled={locating}>{locating ? 'Finding you…' : '◎  Use my location'}</button></div>
            {locationMessage && <p className="location-message" role="status">{locationMessage}</p>}
            <iframe className="location-map" title={`Map showing the location of ${hotel.title}`} src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <a className="map-link" href={`https://www.openstreetmap.org/?mlat=${hotel.latitude}&mlon=${hotel.longitude}#map=15/${hotel.latitude}/${hotel.longitude}`} target="_blank" rel="noreferrer">Open larger map <span aria-hidden="true">↗</span></a>
          </div>
        </article>
      </main>
    </>
  );
}
