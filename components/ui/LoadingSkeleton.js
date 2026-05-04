"use client";

import { Box } from "@mui/material";

/* ── Generic skeleton block ── */
export function LoadingSkeleton({ width = "100%", height = 20, borderRadius = "var(--radius-sm)", style = {} }) {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
}

/* ── Product card skeleton ── */
export function ProductCardSkeleton() {
  return (
    <div
      style={{
        background: "var(--surface)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--border)",
      }}
    >
      <div className="skeleton" style={{ height: 220, borderRadius: 0 }} />
      <div style={{ padding: "16px" }}>
        <div className="skeleton skeleton-text lg" />
        <div className="skeleton skeleton-text" style={{ width: "80%" }} />
        <div style={{ marginTop: 12 }}>
          <div className="skeleton skeleton-text" style={{ width: "40%" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Product grid skeleton ── */
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 20,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/* ── Profile page skeleton ── */
export function ProfileSkeleton() {
  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 8,
        p: 4,
        background: "var(--surface)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <div
        className="skeleton skeleton-avatar"
        style={{ margin: "0 auto 20px" }}
      />
      <div
        className="skeleton skeleton-text lg"
        style={{ margin: "0 auto 8px", width: "50%" }}
      />
      <div
        className="skeleton skeleton-text"
        style={{ margin: "0 auto", width: "70%" }}
      />
      <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center" }}>
        <div className="skeleton" style={{ width: 100, height: 36, borderRadius: "var(--radius-md)" }} />
        <div className="skeleton" style={{ width: 100, height: 36, borderRadius: "var(--radius-md)" }} />
      </div>
    </Box>
  );
}

/* ── Dashboard table row skeleton ── */
export function TableRowSkeleton({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "12px 16px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="skeleton" style={{ width: 50, height: 50, borderRadius: "var(--radius-sm)", flexShrink: 0 }} />
          <div className="skeleton skeleton-text" style={{ flex: 1, marginBottom: 0 }} />
          <div className="skeleton" style={{ width: 80, height: 32, borderRadius: "var(--radius-sm)" }} />
        </div>
      ))}
    </>
  );
}

export default LoadingSkeleton;
