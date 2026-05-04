# OSIM Market

OSIM Market is a premium, modern e-commerce platform built with Next.js and React. It features a sophisticated, high-performance user interface with smooth cinematic animations, secure authentication, scalable database management, and integrated payment processing. The project aims to provide a top-tier shopping experience with an elegant dark-mode aesthetic.

## Features & Technology Stack

### Core Framework
- **Next.js (v16)**: The core framework providing server-side rendering, App Router, and optimized performance.
- **React (v19)**: The UI library used for building interactive and component-driven user interfaces.

### Styling & UI Libraries
The project utilizes a powerful combination of styling tools to achieve a premium, dynamic design:
- **Tailwind CSS**: The primary utility-first CSS framework used for rapid, responsive layout structuring and consistent design tokens.
- **Material UI (MUI)**: Used for specific, robust pre-built components (like ActionAreaCards, Drawers, and Icons) to accelerate development while maintaining a professional look.
- **Framer Motion**: Powers the cinematic user experience with sophisticated entrance animations, micro-interactions, and smooth layout transitions.
- **Bootstrap**: Included alongside standard CSS modules for flexible layout structuring and utility classes.
- **Emotion**: The CSS-in-JS library powering MUI components.

### Authentication (GitHub OAuth)
- **Better-Auth Integration**: Secure user authentication and session management is handled via `better-auth`.
- **GitHub OAuth**: Users can seamlessly and securely log in using their GitHub accounts. This provides a frictionless onboarding experience, relying on OAuth 2.0 standards to handle identity verification without the need to manage sensitive passwords directly on our servers.

### Database (MongoDB)
- **MongoDB**: A scalable, flexible NoSQL database used as the primary data store.
- **Data Management**: It handles the secure storage and rapid retrieval of dynamic e-commerce data, including the product catalog, user profiles, active shopping carts, and comprehensive order history. Its document-oriented structure is ideal for the scalable and varied data schemas required by a modern digital marketplace.

### Payments (Stripe)
- **Stripe Integration**: Complete, secure end-to-end payment processing using the official Stripe Node.js library.
- **Checkout Flow**: Handles secure checkout sessions, ensuring PCI-compliant credit card processing. Stripe manages the secure transaction workflow, order validations, and provides a robust framework for handling webhooks and payment confirmations.

## Getting Started

### Prerequisites
Ensure you have the following installed and set up:
- Node.js (v18 or higher recommended)
- MongoDB Cluster/Instance
- Stripe Account (for API keys)
- GitHub Developer Account (for OAuth App setup)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Environment Configuration:
Create a `.env` file in the root directory and configure the necessary credentials for the external services (MongoDB URI, Stripe Secret Key, GitHub Client ID, and GitHub Client Secret).

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## Project Structure Overview
- `/app`: Next.js App Router containing all page routes, layouts, and API endpoints.
- `/components`: Reusable React components (e.g., `NavBar`, `Footer`, `ActionAreaCard`).
- `/lib` / `/data`: Utility functions, database connection configurations, and shared logic.
- `/public`: Static assets including images, icons, and fonts.
