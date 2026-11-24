import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationPopup from './components/ConfirmationPopup';
import HotelForm from './components/HotelForm';
import Notification from './components/Notification';
import HotelDetails from './pages/HotelDetails';
import HotelList from './pages/HotelList';
import { deleteHotel, loadHotels, saveHotel } from './redux/hotelSlice';

function readHotelId(pathname) {
  const match = pathname.match(/^\/hotel\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function App() {
  const dispatch = useDispatch();
  const { items: hotels, status } = useSelector((state) => state.hotels);
  const [hotelToEdit, setHotelToEdit] = useState(null);
  const [hotelToDelete, setHotelToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const [currentHotelId, setCurrentHotelId] = useState(() => readHotelId(window.location.pathname));

  useEffect(() => {
    dispatch(loadHotels());
  }, [dispatch]);

  useEffect(() => {
    const onPopState = () => setCurrentHotelId(readHotelId(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!notification) return undefined;
    const timeout = window.setTimeout(() => setNotification(null), 3600);
    return () => window.clearTimeout(timeout);
  }, [notification]);

  function navigateToHotel(id) {
    window.history.pushState({}, '', `/hotel/${encodeURIComponent(id)}`);
    setCurrentHotelId(id);
    window.scrollTo(0, 0);
  }

  function navigateToList() {
    window.history.pushState({}, '', '/');
    setCurrentHotelId(null);
    window.scrollTo(0, 0);
  }

  async function handleSave(hotel) {
    const isEditing = Boolean(hotel.id);
    const result = await dispatch(saveHotel({ ...hotel, id: hotel.id || `hotel-${Date.now()}` }));
    if (result) {
      setNotification({ type: 'success', message: isEditing ? 'Hotel details updated successfully.' : 'Hotel added successfully.' });
    } else {
      setNotification({ type: 'error', message: 'Hotel could not be saved. Please try again.' });
    }
    return result;
  }

  async function handleDelete() {
    const deletedHotel = hotelToDelete;
    const result = await dispatch(deleteHotel(deletedHotel.id));
    setHotelToDelete(null);
    if (result) {
      setNotification({ type: 'success', message: `${deletedHotel.title} was deleted.` });
      if (currentHotelId === deletedHotel.id) navigateToList();
    } else {
      setNotification({ type: 'error', message: 'Hotel could not be deleted. Please try again.' });
    }
  }

  const currentHotel = hotels.find((hotel) => hotel.id === currentHotelId);
  const isLoading = status === 'loading' && hotels.length === 0;

  return (
    <>
      {currentHotel ? (
        <HotelDetails hotel={currentHotel} onBack={navigateToList} />
      ) : currentHotelId && !isLoading ? (
        <main className="not-found"><p className="eyebrow">PROPERTY NOT FOUND</p><h1>We couldn't find that hotel.</h1><button className="button button-primary" onClick={navigateToList}>Back to hotels</button></main>
      ) : (
        <HotelList onAdd={() => setHotelToEdit(false)} onEdit={setHotelToEdit} onDelete={setHotelToDelete} onView={navigateToHotel} />
      )}
      {hotelToEdit !== null && <HotelForm hotel={hotelToEdit || null} onSave={handleSave} onCancel={() => setHotelToEdit(null)} />}
      <ConfirmationPopup hotel={hotelToDelete} busy={status === 'loading'} onConfirm={handleDelete} onCancel={() => setHotelToDelete(null)} />
      <Notification notification={notification} onDismiss={() => setNotification(null)} />
    </>
  );
}
