import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <nav className="pagination" aria-label="Hotel list pages">
      <button className="page-button page-arrow" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>← <span>Previous</span></button>
      <div className="page-numbers">
        {pages.map((page) => (
          <button key={page} className={`page-button ${page === currentPage ? 'page-active' : ''}`} aria-current={page === currentPage ? 'page' : undefined} onClick={() => onPageChange(page)}>{page}</button>
        ))}
      </div>
      <button className="page-button page-arrow" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}><span>Next</span> →</button>
    </nav>
  );
}
