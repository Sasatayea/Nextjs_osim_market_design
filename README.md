# 🏛️ OSIM Market — Obsidian Luxury E-Commerce

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.2.0-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-22.1.0-626CD9?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.2.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![i18next](https://img.shields.io/badge/i18next-Multi--Language-26A69A?style=for-the-badge&logo=i18next)](https://www.i18next.com/)

**OSIM Market** is a premium, award-winning digital experience reimagining men's fashion e-commerce. Built with a bespoke **"Obsidian Luxury"** design system, it combines high-performance server-side rendering with sophisticated cinematic motion design.

---

## ✨ Key Features

-   **💎 Obsidian Luxury UI**: A bespoke design language featuring deep obsidian tones, gold gradients, and glassmorphism.
-   **🌍 Multi-Language Support**: Full English and Arabic (RTL) integration powered by `i18next`.
-   **🎬 Cinematic Animations**: Fluid entrance sequences and micro-interactions using `Framer Motion`.
-   **🔐 Secure Auth**: Seamless GitHub OAuth integration via `better-auth`.
-   **💳 Professional Checkout**: End-to-end secure payment processing with `Stripe`.
-   **⚡ High Performance**: Optimized SSR/ISR data fetching for lightning-fast catalog browsing.
-   **📱 Fully Responsive**: Tailored editorial layouts for Desktop, Tablet, and Mobile.

---

## 🛠️ Technical Architecture

### Core Stack
*   **Next.js 16 (App Router)**: Orchestrating server components and optimized routing.
*   **React 19**: Driving the interactive UI layer.
*   **MongoDB**: Scalable NoSQL architecture for products, users, and order management.

### Styling & Design System
*   **Tailwind CSS 4**: Utility-first foundation for responsive layouts.
*   **Bespoke CSS Modules**: Custom-crafted glassmorphism and obsidian design tokens.
*   **Material UI (MUI) 9**: Robust component framework for complex dashboard elements.
*   **Typography**: 
    *   *Cormorant Garamond*: For editorial display headings.
    *   *DM Sans / Cairo*: For high-readability body text (EN/AR).

### Services & Utilities
*   **Better-Auth**: Production-grade authentication middleware.
*   **Stripe SDK**: Secure payment orchestration and webhook handling.
*   **i18next**: Context-aware translation management with RTL detection.
*   **Framer Motion 12**: Advanced physics-based animations.

---

## 📂 Project Structure

```bash
├── app/               # Next.js App Router (Pages, APIs, Layouts)
├── components/        # UI Component Library
│   ├── ui/            # Atomic components (Animations, Skeletons)
│   ├── NavBar.jsx     # Smart Navigation with i18n
│   └── Footer.js      # Global translated Footer
├── lib/               # Shared logic & i18n configuration
├── context/           # React Context (Cart, Auth state)
├── public/            # Static assets & brand media
└── styles/            # Global design tokens & legacy CSS
```

---

## 🚀 Getting Started

### 1. Environment Configuration
Create a `.env` file in the root directory:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
BETTER_AUTH_SECRET=your_secret
GITHUB_CLIENT_ID=your_id
GITHUB_CLIENT_SECRET=your_secret

# Payments
STRIPE_SECRET_KEY=your_stripe_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_pub_key

# App
NEXT_PUBLIC_APIURL=http://localhost:3000
```

### 2. Installation
```bash
npm install
```

### 3. Development
```bash
npm run dev
```

---

## 🔗 Project Links

*   **Demo Video**: [Watch Preview](https://drive.google.com/file/d/1mSbY9zuKWhctywoH2UTrqTppZm2B4MaB/view?usp=sharing)
*   **Technical Explanation**: [Review Documentation](https://drive.google.com/file/d/1Md-8C3ylTbr2dLSrDslwijyaD4t974sj/view?usp=sharing)

---

<div align="center">
  <p>Built with passion for the modern gentleman.</p>
  <sub>© 2024 OSIM Market. All rights reserved.</sub>
</div>
