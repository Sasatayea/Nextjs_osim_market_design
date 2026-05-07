"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Your cart is empty"
        description="Looks like you haven't added any products yet. Start exploring our collection!"
        actionLabel="Browse Products"
        actionHref="/"
      />
    );
  }

  const total = cart.reduce((acc, item) => {
    return acc + (Number(item.sale_price) || 0) * (item.qty || 1);
  }, 0);

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <div style={{
      backgroundColor: "var(--bg)",
      minHeight: "100vh",
      fontFamily: "var(--font-body)",
      animation: "fadeIn 0.5s ease forwards",
    }}>
      <div style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: "clamp(32px, 5vw, 64px) clamp(16px, 4vw, 32px)",
      }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "none", cursor: "pointer",
              color: "var(--text-3)", fontFamily: "var(--font-mono)",
              fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "0 0 20px", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-3)"}
            >
              ← Continue Shopping
            </button>
          </Link>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "0.62rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--gold)", marginBottom: 8,
              }}>Your Order</p>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600, fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.1,
              }}>
                Shopping Cart
              </h1>
            </div>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.75rem",
              color: "var(--text-3)", letterSpacing: "0.06em",
              padding: "6px 14px",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-sm)",
            }}>
              {cart.length} {cart.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 24,
          alignItems: "start",
        }}
          className="cart-grid"
        >
          {/* Cart items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {cart.map((item, index) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  gap: 16,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                  animation: `fadeUp 0.4s ${index * 0.06}s ease both`,
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-light)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
              >
                {/* Image */}
                <div style={{
                  width: 120, flexShrink: 0,
                  background: "var(--surface-2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {item.primary_image_url ? (
                    <img
                      src={item.primary_image_url}
                      alt={item.product_name}
                      style={{ width: "100%", height: 120, objectFit: "contain", padding: 8 }}
                    />
                  ) : (
                    <div style={{ width: 120, height: 120, background: "var(--surface-3)" }} />
                  )}
                </div>

                {/* Info */}
                <div style={{
                  flex: 1, padding: "16px 0",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                }}>
                  <div>
                    <p style={{
                      fontWeight: 600, color: "var(--text)",
                      fontSize: "0.9rem", marginBottom: 4, lineHeight: 1.4,
                    }}>
                      {item.product_name}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                      color: "var(--text-4)", letterSpacing: "0.08em",
                    }}>
                      Qty: {item.qty || 1}
                    </p>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600, fontSize: "1.1rem",
                    color: "var(--gold-light)", letterSpacing: "-0.01em",
                  }}>
                    {Number(item.sale_price).toLocaleString()} EGP
                  </p>
                </div>

                {/* Remove button */}
                <div style={{ padding: "16px 16px 16px 0", display: "flex", alignItems: "flex-start" }}>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    aria-label="Remove item"
                    style={{
                      background: "none", border: "1px solid var(--border)",
                      borderRadius: "var(--r-sm)", cursor: "pointer",
                      padding: 7, color: "var(--text-4)",
                      display: "flex", transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "var(--error)";
                      e.currentTarget.style.color = "var(--error)";
                      e.currentTarget.style.background = "var(--error-bg)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.color = "var(--text-4)";
                      e.currentTarget.style.background = "none";
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{
            position: "sticky",
            top: 80,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-xl)",
            overflow: "hidden",
            animation: "fadeUp 0.5s 0.15s ease both",
          }}>
            {/* Summary header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid var(--border)",
            }}>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--gold)", marginBottom: 4,
              }}>Order Summary</p>
            </div>

            <div style={{ padding: "20px 24px" }}>
              {/* Line items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                {cart.map(item => (
                  <div key={item._id} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8,
                  }}>
                    <span style={{
                      color: "var(--text-3)", fontSize: "0.8rem", lineHeight: 1.4, flex: 1,
                    }}>
                      {item.product_name?.substring(0, 30)}{item.product_name?.length > 30 ? "…" : ""}
                    </span>
                    <span style={{ color: "var(--text-2)", fontSize: "0.8rem", fontWeight: 500, whiteSpace: "nowrap" }}>
                      {Number(item.sale_price).toLocaleString()} EGP
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "var(--border)", marginBottom: 16 }} />

              {/* Subtotal */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ color: "var(--text-3)", fontSize: "0.85rem" }}>Subtotal</span>
                <span style={{ color: "var(--text)", fontWeight: 600, fontSize: "0.95rem" }}>
                  {total.toLocaleString("en", { minimumFractionDigits: 2 })} EGP
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <span style={{ color: "var(--text-3)", fontSize: "0.85rem" }}>Shipping</span>
                <span style={{ color: "var(--success)", fontSize: "0.82rem", fontWeight: 500 }}>Free</span>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--gold-dim), transparent)", marginBottom: 16 }} />

              {/* Total */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                  letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-3)",
                }}>Total</span>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600, fontSize: "1.5rem",
                  color: "var(--gold-light)", letterSpacing: "-0.02em",
                }}>
                  {total.toLocaleString("en", { minimumFractionDigits: 2 })} EGP
                </span>
              </div>

              {/* Checkout button */}
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
                  color: "#0a0804",
                  border: "none",
                  borderRadius: "var(--r-sm)",
                  padding: "14px 24px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s",
                  boxShadow: "var(--shadow-gold)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-gold-lg)";
                  e.currentTarget.style.filter = "brightness(1.05)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "var(--shadow-gold)";
                  e.currentTarget.style.filter = "none";
                }}
              >
                Proceed to Checkout →
              </button>

              <p style={{
                textAlign: "center", color: "var(--text-4)",
                fontSize: "0.72rem", fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em", marginTop: 12,
              }}>
                Secure payment via Stripe
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CartPage;
