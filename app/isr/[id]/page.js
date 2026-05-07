import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Chip, Stack, Divider } from "@mui/material";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export const metadata = {
  title: "Product — OSIM Market",
};

const Page = async ({ params }) => {
  let { id } = await params;

  async function getProduct(id) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      next: { revalidate: 60 },
    });
    return res.json();
  }

  const product = await getProduct(id);

  if (!product) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        minHeight: "60vh", color: "var(--text-3)", fontFamily: "var(--font-body)", gap: 16,
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p style={{ fontSize: "1.1rem" }}>Product not found</p>
        <Link href="/" style={{ color: "var(--gold)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.15em" }}>← Back to Shop</Link>
      </div>
    );
  }

  const {
    product_name, product_category, sale_price, regular_price,
    discount_pct, color, color_options, available_sizes,
    material, product_description, primary_image_url,
    product_page_url, source_website, sku,
  } = product;

  const hasDiscount = discount_pct && regular_price && regular_price !== sale_price;
  const sizes = available_sizes?.split(",").map((s) => s.trim()) || [];
  const colors = color_options?.split(/[\n,]/).map((c) => c.trim()) || [];
  const savingsPct = hasDiscount
    ? Math.round(((Number(regular_price) - Number(sale_price)) / Number(regular_price)) * 100)
    : 0;

  return (
    <div style={{
      backgroundColor: "var(--bg)",
      minHeight: "100vh",
      fontFamily: "var(--font-body)",
      animation: "fadeIn 0.5s ease forwards",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "clamp(24px, 5vw, 64px) clamp(16px, 4vw, 40px)",
      }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{
          display: "flex", alignItems: "center", gap: 8,
          marginBottom: 40, flexWrap: "wrap",
        }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span 
              className="hover-gold"
              style={{
                color: "var(--text-4)", fontSize: "0.78rem",
                fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
                transition: "color 0.2s",
              }}
            >Home</span>
          </Link>
          <span style={{ color: "var(--border-2)", fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>/</span>
          {product_category && (
            <>
              <span style={{ color: "var(--text-4)", fontSize: "0.78rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>
                {product_category}
              </span>
              <span style={{ color: "var(--border-2)", fontSize: "0.78rem", fontFamily: "var(--font-mono)" }}>/</span>
            </>
          )}
          <span style={{ color: "var(--text-3)", fontSize: "0.78rem", fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>
            {product_name?.substring(0, 30)}{product_name?.length > 30 ? "…" : ""}
          </span>
        </nav>

        {/* Main product grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "clamp(300px, 48%, 580px) 1fr",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "start",
        }}
          className="product-grid"
        >
          {/* ── Image ── */}
          <div style={{ position: "sticky", top: 80 }}>
            <div style={{
              borderRadius: "var(--r-xl)",
              overflow: "hidden",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-xl)",
              position: "relative",
            }}>
              {hasDiscount && (
                <div style={{
                  position: "absolute", top: 16, left: 16, zIndex: 2,
                  background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
                  color: "#0a0804",
                  fontFamily: "var(--font-mono)", fontWeight: 700,
                  fontSize: "0.72rem", letterSpacing: "0.08em",
                  padding: "5px 12px", borderRadius: "var(--r-xs)",
                  boxShadow: "var(--shadow-gold)",
                }}>
                  -{discount_pct}% OFF
                </div>
              )}
              {primary_image_url ? (
                <img
                  src={primary_image_url}
                  alt={product_name}
                  className="hover-scale"
                  style={{
                    width: "100%",
                    aspectRatio: "4/5",
                    objectFit: "contain",
                    background: "var(--surface-2)",
                    display: "block",
                    transition: "transform 0.6s ease",
                    padding: "16px",
                  }}
                />
              ) : (
                <div style={{ width: "100%", aspectRatio: "4/5", background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "var(--text-4)", fontSize: "0.85rem" }}>No image</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Details ── */}
          <div style={{ paddingTop: 8 }}>
            {/* Category badge */}
            {product_category && (
              <div style={{ marginBottom: 16 }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.63rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--gold)", background: "rgba(201,160,76,0.07)",
                  border: "1px solid rgba(201,160,76,0.2)",
                  padding: "4px 10px", borderRadius: "var(--r-xs)",
                }}>
                  {product_category}
                </span>
              </div>
            )}

            {/* Product name */}
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)",
              lineHeight: 1.15,
              color: "var(--text)",
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}>
              {product_name}
            </h1>

            {/* SKU */}
            {sku && (
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                color: "var(--text-4)", letterSpacing: "0.15em",
                marginBottom: 28,
              }}>
                SKU: {sku}
              </p>
            )}

            {/* Price block */}
            <div style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: "20px 24px",
              marginBottom: 28,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "2rem",
                  color: hasDiscount ? "var(--gold-light)" : "var(--text)",
                  letterSpacing: "-0.02em",
                }}>
                  {sale_price} EGP
                </span>
                {hasDiscount && (
                  <span style={{
                    textDecoration: "line-through",
                    color: "var(--text-4)",
                    fontSize: "1rem",
                  }}>
                    {regular_price} EGP
                  </span>
                )}
                {hasDiscount && (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                    letterSpacing: "0.08em",
                    color: "var(--success)", background: "var(--success-bg)",
                    padding: "4px 10px", borderRadius: "var(--r-xs)",
                  }}>
                    Save {savingsPct}%
                  </span>
                )}
              </div>
            </div>

            <div style={{ borderBottom: "1px solid var(--border)", marginBottom: 24 }} />

            {/* Sizes */}
            {sizes.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "var(--text-3)", marginBottom: 12,
                }}>
                  Available Sizes
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[...new Set(sizes)].filter(Boolean).map((s) => (
                    <button 
                      key={s} 
                      className="hover-border-gold"
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border-2)",
                        borderRadius: "var(--r-sm)",
                        padding: "7px 16px",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        color: "var(--text-2)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {colors.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "var(--text-3)", marginBottom: 12,
                }}>
                  Color Options
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {colors.filter(Boolean).map((c) => (
                    <span key={c} style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--r-full)",
                      padding: "5px 14px",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      color: "var(--text-2)",
                    }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Material */}
            {material && (
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                marginBottom: 20,
              }}>
                <span style={{ color: "var(--text-4)", fontSize: "0.82rem", fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>
                  Material:
                </span>
                <span style={{ color: "var(--text-2)", fontSize: "0.85rem", fontWeight: 500 }}>
                  {material}
                </span>
              </div>
            )}

            {/* Description */}
            {product_description && (
              <p style={{
                color: "var(--text-3)",
                lineHeight: 1.8,
                fontSize: "0.88rem",
                marginBottom: 32,
              }}>
                {product_description}
              </p>
            )}

            {/* CTA Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <AddToCartButton product={product} />

              {product_page_url && (
                <a
                  href={product_page_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-border-gold"
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "transparent",
                    border: "1px solid var(--border-2)",
                    borderRadius: "var(--r-sm)",
                    padding: "13px 24px",
                    color: "var(--text-3)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "0.82rem",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    textDecoration: "none",
                  }}
                >
                  View on {source_website || "original site"} ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Page;
