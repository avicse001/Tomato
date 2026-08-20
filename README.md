# 🍅 Tomato — Food Delivery Web Application

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.18-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Oxlint](https://img.shields.io/badge/Oxlint-Enabled-orange?style=for-the-badge)](https://oxc.rs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Tomato** is a modern, fast, and feature-rich Food Delivery web application built with **React 19**, **Vite**, and clean modern CSS. It provides a seamless food ordering experience with category filtering, real-time cart management, promo discount codes, live search, instant toast feedback, user authentication state, and order tracking history.

---

## 🌟 Key Features

### 🍽️ Dynamic Menu & Category Exploration
- Interactive menu selector to browse dishes across multiple categories (Salad, Rolls, Deserts, Sandwich, Cake, Pure Veg, Pasta, Noodles).
- Responsive food card display with detailed descriptions, pricing, and visual star ratings.

### 🛒 Real-time Shopping Cart & Order Calculation
- Quick add/remove counter right from the food card.
- Cart page with itemized breakdown, dynamic quantity modifier, and subtotal calculation.
- Automated free delivery eligibility logic (free on orders over $50).
- Persistent cart state saved to `localStorage`.

### 🎟️ Promo Code Engine
Support for instant coupon codes with dynamic discounts:
| Promo Code | Benefit |
| :--- | :--- |
| `DISCOUNT10` / `TOMATO10` | 10% Discount on total order |
| `SAVE20` | 20% Discount on total order |
| `FREEDEL` / `FREEFOOD` | Unlocks 100% Free Delivery |

### 🔍 Live Dish Search & Modal
- Instant search popup with dynamic filtering by dish name or category.
- Add items directly to cart from search results.

### 🚚 Order Placement & Tracking
- Complete delivery address submission and payment method selection (Cash on Delivery / Online Payment).
- **My Orders** screen with interactive order history and live visual tracking milestones (*Food Processing* ➔ *Out for delivery* ➔ *Delivered*).

### 🔐 Authentication Modal
- Sleek toggleable popup modal for Sign Up and Login.
- User session state with token synchronization to `localStorage`.

### ⚡ Toast Notification System
- Responsive non-intrusive toast notifications for user actions (cart updates, order placement, auth alerts, promo messages).

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler / Tooling**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Linter**: [Oxlint](https://oxc.rs/)
- **State Management**: React Context API (`StoreContext`) + LocalStorage Persistence
- **Styling**: Vanilla CSS (Modular, responsive, custom animations & transitions)

---

## 📂 Project Architecture

```
frontend/
├── public/                  # Static assets & icons
├── src/
│   ├── assets/              # Food images, UI icons, and menu datasets
│   ├── components/
│   │   ├── AppDownload/     # Mobile app promotion CTA
│   │   ├── ExploreMenu/     # Category carousel & filter buttons
│   │   ├── FoodDisplay/     # Food grid renderer
│   │   ├── FoodItem/        # Individual food card with cart controls
│   │   ├── Footer/          # Multi-column footer
│   │   ├── Header/          # Hero banner with call-to-action
│   │   ├── LoginPopup/      # Sign-in & register modal
│   │   ├── Navbar/          # Top navigation bar with cart badges & search trigger
│   │   ├── SearchPopup/     # Global live search dialog
│   │   └── Toast/           # Toast notification banner
│   ├── context/
│   │   └── StoreContext.jsx # Global state management (cart, auth, orders, promos)
│   ├── pages/
│   │   ├── Cart/            # Cart details, promo code form, bill summary
│   │   ├── Home/            # Landing page layout
│   │   ├── MyOrders/        # Order history and parcel tracking
│   │   └── PlaceOrder/      # Checkout & shipping information form
│   ├── App.css
│   ├── App.jsx              # Main App routing and layout shell
│   ├── index.css            # Global CSS tokens, typography, and base styles
│   └── main.jsx             # React DOM root mounting
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18.0.0 or higher) installed:
```bash
node -v
npm -v
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/avicse001/Tomato.git
   cd Tomato
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode with Hot Module Replacement (HMR) |
| `npm run build` | Bundles and optimizes the app for production in the `dist` folder |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Runs `oxlint` to analyze code quality and potential issues |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
