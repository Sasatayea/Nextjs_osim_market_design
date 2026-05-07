"use client";

/* ── Generic skeleton block ── */
export function LoadingSkeleton({
  width = "100%",
  height = 20,
  borderRadius = "var(--r-sm)",
  style = {},
}) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, ...style }}
    />
  );
}

/* ── Product card skeleton ── */
export function ProductCardSkeleton() {
  return (
    <div style={{
      background: "var(--surface)",
      borderRadius: "var(--r-lg)",
      overflow: "hidden",
      border: "1px solid var(--border)",
    }}>
      <div className="skeleton" style={{ height: 260, borderRadius: 0 }} />
      <div style={{ padding: "18px 18px 20px" }}>
        <div className="skeleton" style={{ height: 16, width: "80%", borderRadius: "var(--r-xs)", marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 13, width: "60%", borderRadius: "var(--r-xs)", marginBottom: 16 }} />
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
          <div className="skeleton" style={{ height: 14, width: "45%", borderRadius: "var(--r-xs)" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Product grid skeleton ── */
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "var(--space-6)",
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/* ── Profile page skeleton ── */
export function ProfileSkeleton() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
    }}>
      <div style={{
        width: "100%", maxWidth: 500,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-xl)",
        overflow: "hidden",
      }}>
        <div className="skeleton" style={{ height: 110, borderRadius: 0 }} />
        <div style={{ padding: "32px", textAlign: "center" }}>
          <div className="skeleton" style={{
            width: 88, height: 88, borderRadius: "50%",
            margin: "-60px auto 20px",
            border: "3px solid var(--bg)",
            position: "relative",
            zIndex: 2,
          }} />
          <div className="skeleton" style={{ height: 22, width: "50%", margin: "0 auto 10px", borderRadius: "var(--r-sm)" }} />
          <div className="skeleton" style={{ height: 14, width: "35%", margin: "0 auto 32px", borderRadius: "var(--r-xs)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div className="skeleton" style={{ height: 52, borderRadius: "var(--r-md)" }} />
            <div className="skeleton" style={{ height: 52, borderRadius: "var(--r-md)" }} />
            <div className="skeleton" style={{ height: 44, borderRadius: "var(--r-sm)", marginTop: 8 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Dashboard table row skeleton ── */
export function TableRowSkeleton({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 16,
          padding: "14px 20px",
          borderTop: "1px solid var(--border)",
        }}>
          <div className="skeleton" style={{
            width: 52, height: 52, flexShrink: 0,
            borderRadius: "var(--r-sm)",
          }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton" style={{ height: 13, width: "65%", marginBottom: 6, borderRadius: "var(--r-xs)" }} />
            <div className="skeleton" style={{ height: 11, width: "35%", borderRadius: "var(--r-xs)" }} />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[34, 34, 34].map((w, j) => (
              <div key={j} className="skeleton" style={{ width: w, height: 34, borderRadius: "var(--r-sm)" }} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default LoadingSkeleton;
