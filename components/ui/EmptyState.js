"use client";

import Link from "next/link";

export default function EmptyState({
  icon = "📭",
  title = "Nothing here yet",
  description = "",
  actionLabel = "",
  actionHref = "/",
}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      padding: "80px 24px",
      textAlign: "center",
      fontFamily: "var(--font-body)",
      animation: "fadeIn 0.5s ease forwards",
    }}>
      {/* Icon */}
      <div style={{
        fontSize: "3.5rem",
        marginBottom: 24,
        animation: "float 3s ease-in-out infinite",
        lineHeight: 1,
      }}>
        {icon}
      </div>

      {/* Decorative line */}
      <div style={{
        width: 40, height: 1,
        background: "linear-gradient(90deg, transparent, var(--gold-dim), transparent)",
        marginBottom: 24,
      }} />

      <h2 style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "1.7rem",
        color: "var(--text)",
        letterSpacing: "-0.02em",
        marginBottom: 10,
      }}>
        {title}
      </h2>

      {description && (
        <p style={{
          color: "var(--text-3)",
          maxWidth: 380,
          marginBottom: 32,
          fontSize: "0.88rem",
          lineHeight: 1.7,
        }}>
          {description}
        </p>
      )}

      {actionLabel && (
        <Link href={actionHref} style={{ textDecoration: "none" }}>
          <button style={{
            background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
            color: "#0a0804",
            border: "none",
            borderRadius: "var(--r-sm)",
            padding: "12px 28px",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "0.82rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.25s",
            boxShadow: "var(--shadow-gold)",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "var(--shadow-gold-lg)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "var(--shadow-gold)";
            }}
          >
            {actionLabel} →
          </button>
        </Link>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
