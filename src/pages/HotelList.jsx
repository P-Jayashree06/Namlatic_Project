import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import HotelCard from '../components/HotelCard';
import Pagination from '../components/Pagination';
import PriceFilter from '../components/PriceFilter';
import SearchBar from '../components/SearchBar';

const PAGE_SIZE = 4;

export default function HotelList({ onAdd, onEdit, onDelete, onView }) {
  const { items: hotels, status, error } = useSelector((state) => state.hotels);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [search, minPrice, maxPrice]);

  const filteredHotels = useMemo(() => hotels.filter((hotel) => {
    const matchesName = hotel.title.toLowerCase().includes(search.trim().toLowerCase());
    const matchesMinimum = minPrice === '' || Number(hotel.price) >= Number(minPrice);
    const matchesMaximum = maxPrice === '' || Number(hotel.price) <= Number(maxPrice);
    return matchesName && matchesMinimum && matchesMaximum;
  }), [hotels, search, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredHotels.length / PAGE_SIZE);
  const visibleHotels = filteredHotels.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const updatePrice = (key, value) => (key === 'minPrice' ? setMinPrice(value) : setMaxPrice(value));

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <>
      <Helmet>
        <title>Hotel Management | Staywise</title>
        <meta name="description" content="Browse, search, and manage hotel listings in your Staywise property directory." />
      </Helmet>
      <Header onAddHotel={onAdd} />
      <main className="page-shell">
        <section className="welcome-row">
          <div>
            <p className="eyebrow">YOUR PROPERTY DIRECTORY</p>
            <h1>Find your next <span>favorite stay.</span></h1>
            <p className="welcome-copy">A simple space to explore and manage your hotel collection.</p>
          </div>
          <div className="welcome-stat"><span aria-hidden="true">⌂</span><div><strong>{hotels.length}</strong><small>properties listed</small></div></div>
        </section>

        <section className="listing-panel" aria-label="Hotel listings">
          <div className="listing-toolbar">
            <SearchBar value={search} onChange={setSearch} />
            <PriceFilter minPrice={minPrice} maxPrice={maxPrice} onChange={updatePrice} />
          </div>
          <div className="results-heading">
            <div><h2>All hotels</h2><span>{filteredHotels.length} {filteredHotels.length === 1 ? 'stay' : 'stays'} to explore</span></div>
            {(search || minPrice || maxPrice) && <button className="reset-button" onClick={() => { setSearch(''); setMinPrice(''); setMaxPrice(''); }}>Clear filters <span aria-hidden="true">×</span></button>}
          </div>

          {status === 'loading' && hotels.length === 0 ? (
            <div className="empty-state"><span className="loading-dot" />Loading your hotels…</div>
          ) : status === 'failed' && hotels.length === 0 ? (
            <div className="empty-state"><strong>Hotels could not be loaded.</strong><p>{error}</p></div>
          ) : visibleHotels.length > 0 ? (
            <div className="hotel-grid">
              {visibleHotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} onView={onView} onEdit={onEdit} onDelete={onDelete} />)}
            </div>
          ) : (
            <div className="empty-state"><span className="empty-icon" aria-hidden="true">⌕</span><strong>No hotels found</strong><p>Try a different search or adjust your price range.</p></div>
          )}

          <div className="listing-bottom">
            <span className="page-summary">{filteredHotels.length === 0 ? 'No properties to show' : `Showing ${Math.min((page - 1) * PAGE_SIZE + 1, filteredHotels.length)}–${Math.min(page * PAGE_SIZE, filteredHotels.length)} of ${filteredHotels.length} properties`}</span>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </section>
        <footer className="site-footer"><span>stay<span className="footer-accent">wise</span></span><span>Thoughtful stays, all in one place.</span></footer>
      </main>
    </>
  );
}
