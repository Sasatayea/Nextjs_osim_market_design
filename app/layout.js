"use client";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.css";

import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";

export default function RootLayout({ children }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle");
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>OSIM Market — Premium Men&apos;s Fashion</title>
        <meta
          name="description"
          content="Discover premium men's fashion at OSIM Market. Curated collections of top-quality clothing, shoes and accessories at unbeatable prices."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          fontFamily: "var(--font-body)",
          backgroundColor: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <NavBar />
        <CartProvider>
          <main style={{ flex: 1 }}>{children}</main>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
