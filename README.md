# React + Vite

Read Journey

A modern, dark-themed book app UI that helps you track your reading habits. Built pixel-perfect from the Figma design and fully responsive for desktop, tablet, and mobile.

Live (Vercel): https://read-journey-blue.vercel.app

Repository: https://github.com/Sailortr/read-journey

Auth flow: Register and Login

Form validation: on Register with Figma’s exact states (normal, hover, error, success)

Redux Toolkit for global state + async thunks

Page skeletons for Library & Recommendations (ready for real API integration)

Design system: Figma colors, radius, spacing, typography reproduced exactly

Device breakpoints:

Desktop: left form panel, right iPhone mockup card (600×736, r:30, bg #1F1F1F)

Tablet: wide form card (704×960, r:30, bg #1F1F1F)

Mobile: iPhone mockup card at the bottom (335×411, r:30, bg #1F1F1F)

Global background color: #141414

Tech Stack

⚛️ React (Vite template)

🧰 Redux Toolkit & Async Thunks

🎨 Tailwind CSS

🚦 React Router

🔔 react-toastify

▲ Vercel (CI/CD & hosting)

Screens

Add screenshots to /screenshots in the repo and update the paths below.

Login (Desktop)
![Login Desktop](./screenshots/login_desktop.png)

Register (Desktop)
![Register Desktop](./screenshots/register_desktop.png)

Tablet & Mobile
![Tablet](./screenshots/tablet.png)
![Mobile](./screenshots/mobile.png)

Getting Started

# 1) Clone

git clone https://github.com/Sailortr/read-journey.git
cd read-journey

# 2) Install

npm install

# 3) Dev server

npm run dev

Vite serves at http://localhost:5173
by default.

Environment Variables (optional)

If you plan to connect to an API:

# .env

VITE_API_BASE_URL=https://api.example.com

Access in code via import.meta.env.VITE_API_BASE_URL.

Scripts
Script Description
npm run dev Start dev server
npm run build Production build
npm run preview Preview the build
npm run lint Run linter (if enabled)
Project Structure
src/
├─ assets/ # SVG/icons/images
├─ components/
│ ├─ auth/ # LoginForm, RegisterForm
│ ├─ books/
│ ├─ dashboard/
│ ├─ layout/ # Header / shell
│ ├─ library/
│ ├─ reading/
│ └─ ui/ # Shared UI pieces
├─ pages/ # Route-level pages
├─ redux/
│ ├─ thunks/ # authThunks, bookThunks
│ ├─ authSlice.js
│ ├─ bookSlice.js
│ ├─ readingSlice.js
│ ├─ uiSlice.js
│ └─ store.js
├─ routes/ # Route config
├─ services/ # API services (ready to expand)
├─ styles/ # Global styles
├─ utils/ # Helpers
├─ App.jsx
└─ main.jsx

State Management

Async actions under redux/thunks/ (e.g., loginThunk, registerThunk, fetchLibraryBooks)

Slices split by responsibility (auth, book, reading, ui)

Design Notes (Figma → Code)

Colors

Background: #141414

Card (form/iPhone): #1F1F1F

Text: #F9F9F9 + grayscale accents

Radius

Card: 30px

Inputs: 12px

Buttons: pill (height 52px → large radius)

Button Behavior

Primary: white background, black text

Hover: subtle darken (hover:bg-gray-200) with smooth transition

Disabled loading text toggles removed as requested (no “Registering…” / “Logging in…” swaps)

Form Validation

Login: validation feedback disabled (clean inputs only)

Register: Figma’s normal/hover/error/success borders & messages reproduced

iPhone Mockup Alignment

Desktop: right panel 600×736px, centered in its card and anchored to bottom (via container alignment)

Mobile: bottom section 335×411px, centered and bottom-aligned

Accessibility

Inputs with descriptive placeholders and icons; aria-label / aria-invalid used where appropriate

Clear :hover / :focus states on buttons/icons

Contrast tuned for a dark theme

Deployment

Vercel builds and deploys automatically

npm run build outputs to dist/, aligned with Vercel defaults

Contributing

Fork the repo

Create a branch: feat/your-feature

Commit and test your changes

Open a Pull Request

For UI changes, please include screenshots to show Figma parity.

License

This repository is intended for learning and portfolio purposes. Third-party assets (icons/images) remain under their original licenses.

Thanks

Project by Muhammet Uzunoğlu
