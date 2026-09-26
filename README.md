# BRWW — Artisanal Roastery & Luxury Coffee Experience

An immersive, full-stack coffee brand web application built with a modern React frontend and Express backend. Designed with an editorial vintage dark aesthetic, smooth interactive transitions, and an end-to-end cafe ordering flow.

---

## Key Features

- **3D & Video Scroll Showcase:** Dynamic cup preview sequence and interactive product showcases.
- **Interactive Artisan Menu:** Categorized coffee selections (Hot Brews, Cold Brews, Single-Origin, Manual Drip, Patisserie) with price calculations and flavor profiles.
- **Cart & Slide-out Checkout Drawer:** Complete client-side state management for cart operations, quantity adjustments, and modal checkout workflows.
- **Table Reservation Suite:** Validated booking system for in-house cafe experiences.
- **Full-Stack Architecture:** Node.js/Express mock backend handling reservations, order processing, and dynamic menu data.
- **Bespoke Vintage Palette:** Built around `#121615` (vintage dark charcoal), `#F7F4EE` (warm paper cream), and `#58A79B` (muted artisanal teal).

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend:** Node.js, Express.js
- **Media & Assets:** Canvas-driven scroll video sequences, SVG iconography
- **Tooling:** ESLint, PostCSS

---

## Project Structure

```text
├── public/                 # Static assets, cup video sequences, brand media
├── server/                 # Express backend server and endpoints
│   ├── server.js           # API entry point (orders, reservations, menu)
│   └── data/               # Persistent mock data
├── src/
│   ├── assets/             # Vector icons and brand marks
│   ├── components/         # Modular UI components (Navbar, Hero, Menu, Cart, etc.)
│   ├── config/             # Theme tokens and brand configuration
│   ├── context/            # React context providers for cart and app state
│   ├── App.jsx             # Main application layout
│   └── index.css           # Global typography, color tokens, and utility resets
├── index.html              # Document entry with brand fonts and metadata
├── vite.config.js          # Vite config with dev proxy to backend API
└── package.json            # Scripts and dependencies