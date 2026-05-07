"use client";
import Link from "next/link";
import { ScaleOnHover } from "@/components/ui/Animations";

export default function ActionAreaCard({
  name,
  description,
  imageURL,
  myId,
  sale_price,
  regular_price,
  discount_pct,
}) {
  const hasDiscount =
    discount_pct != null &&
    discount_pct > 0 &&
    regular_price != null &&
    regular_price !== sale_price;

  const savingsAmount = hasDiscount
    ? Math.round(Number(regular_price) - Number(sale_price))
    : null;

  return (
    <ScaleOnHover scale={1.02}>
      <Link href={`/isr/${myId}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        <article
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
            cursor: "pointer",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "relative",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "var(--border-light)";
            e.currentTarget.style.boxShadow = "0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,160,76,0.08)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Image container */}
          <div style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--surface-2)",
            flexShrink: 0,
          }}>
            {/* Discount badge */}
            {hasDiscount && (
              <div style={{
                position: "absolute",
                top: 12,
                left: 12,
                zIndex: 2,
                background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
                color: "#0a0804",
                fontSize: "0.62rem",
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
                padding: "4px 9px",
                borderRadius: "var(--r-xs)",
                boxShadow: "var(--shadow-gold)",
              }}>
                -{Math.round(discount_pct)}%
              </div>
            )}

            {/* Image */}
            <div style={{ height: 260, overflow: "hidden" }}>
              {imageURL ? (
                <img
                  src={imageURL}
                  alt={name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    padding: "8px",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  loading="lazy"
                />
              ) : (
                <div style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-4)",
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>

            {/* Bottom gradient fade */}
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "60%",
              background: "linear-gradient(to top, var(--surface) 0%, transparent 100%)",
              pointerEvents: "none",
            }} />
          </div>

          {/* Content */}
          <div style={{
            padding: "18px 18px 20px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}>
            {/* Name */}
            <h3 style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.9rem",
              lineHeight: 1.45,
              color: "var(--text)",
              marginBottom: 6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--gold-light)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text)"}
            >
              {name}
            </h3>

            {/* Description */}
            {description && (
              <p style={{
                color: "var(--text-4)",
                fontSize: "0.78rem",
                lineHeight: 1.55,
                marginBottom: 12,
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>
                {description}
              </p>
            )}

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Price row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 6,
              paddingTop: 12,
              borderTop: "1px solid var(--border)",
              marginTop: 8,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                {sale_price != null && (
                  <span style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: hasDiscount ? "var(--gold-light)" : "var(--text)",
                    letterSpacing: "-0.02em",
                    fontFamily: "var(--font-body)",
                  }}>
                    {Number(sale_price).toLocaleString()} EGP
                  </span>
                )}

                {hasDiscount && (
                  <span style={{
                    textDecoration: "line-through",
                    color: "var(--text-4)",
                    fontSize: "0.78rem",
                  }}>
                    {Number(regular_price).toLocaleString()}
                  </span>
                )}
              </div>

              {hasDiscount && savingsAmount && (
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.06em",
                  color: "var(--success)",
                  background: "var(--success-bg)",
                  padding: "3px 8px",
                  borderRadius: "var(--r-xs)",
                }}>
                  Save {savingsAmount.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </article>
      </Link>
    </ScaleOnHover>
  );
}