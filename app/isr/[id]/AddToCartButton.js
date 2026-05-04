"use client";

import { useCart } from "@/app/context/CartContext";
import { Button } from "@mui/material";
import { ShoppingCart, Check } from "@mui/icons-material";
import { useState } from "react";

const AddToCartButton = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      onClick={handleClick}
      startIcon={added ? <Check /> : <ShoppingCart />}
      sx={{
        background: added
          ? "linear-gradient(135deg, var(--success), #00d2a0)"
          : "linear-gradient(135deg, var(--primary), #8b5cf6)",
        color: "#fff",
        borderRadius: "var(--radius-md)",
        py: 1.5,
        fontWeight: 700,
        textTransform: "none",
        fontSize: "1rem",
        letterSpacing: "0.01em",
        boxShadow: added
          ? "0 4px 20px rgba(0, 184, 148, 0.3)"
          : "0 4px 20px var(--primary-glow)",
        transition: "all 0.3s ease",
        "&:hover": {
          background: added
            ? "linear-gradient(135deg, var(--success), #00d2a0)"
            : "linear-gradient(135deg, var(--primary-hover), #9b6ff7)",
          transform: "translateY(-2px)",
          boxShadow: added
            ? "0 8px 28px rgba(0, 184, 148, 0.4)"
            : "0 8px 28px var(--primary-glow)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
      }}
    >
      {added ? "Added to Cart!" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;