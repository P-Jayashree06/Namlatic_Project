# Namlatic — Hotel Management

A responsive hotel listing management app built with React, Redux, plain CSS, and React Helmet. It supports creating, viewing, editing, searching, filtering, and deleting hotel listings.

## Features

- Responsive hotel cards with search, price filters, and pagination.
- Shared add/edit form with validation and local image previews.
- Hotel details with coordinates, an OpenStreetMap view, and optional browser geolocation.
- Redux state with browser `localStorage` persistence.
- Dynamic page titles and metadata.

## Dummy backend

This assessment project intentionally has no server or database. `src/redux/hotelApi.js` simulates asynchronous API operations in the browser, and hotel data is saved in `localStorage`.

## Requirements

- Node.js and npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`. The project is frontend-only; hotel changes are stored in the browser where they are made.
