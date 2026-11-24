import React from 'react';

export default function Notification({ notification, onDismiss }) {
  if (!notification) return null;
  return (
    <div className={`notification notification-${notification.type || 'success'}`} role="status">
      <span className="notification-mark" aria-hidden="true">{notification.type === 'error' ? '!' : '✓'}</span>
      <span>{notification.message}</span>
      <button onClick={onDismiss} aria-label="Dismiss notification">×</button>
    </div>
  );
}
