"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

const AddToCartButton = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "15px 28px",
        border: "none",
        borderRadius: "var(--r-sm)",
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: "0.85rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all 0.3s ease",
        background: added
          ? "linear-gradient(135deg, var(--success), #2ab87b)"
          : "linear-gradient(135deg, var(--gold-light), var(--gold))",
        color: added ? "#fff" : "#0a0804",
        boxShadow: added
          ? "0 4px 20px rgba(62, 207, 142, 0.3)"
          : "var(--shadow-gold)",
        transform: "translateY(0)",
      }}
      onMouseEnter={e => {
        if (!added) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "var(--shadow-gold-lg)";
          e.currentTarget.style.filter = "brightness(1.05)";
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = added ? "0 4px 20px rgba(62,207,142,0.3)" : "var(--shadow-gold)";
        e.currentTarget.style.filter = "none";
      }}
      onMouseDown={e => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {added ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Added to Cart!
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
};

export default AddToCartButton;