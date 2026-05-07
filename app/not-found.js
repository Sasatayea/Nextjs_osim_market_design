import Link from "next/link";

const NotFound = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh",
      textAlign: "center",
      padding: "40px 24px",
      backgroundColor: "var(--bg)",
      fontFamily: "var(--font-body)",
      animation: "fadeIn 0.6s ease forwards",
    }}>
      {/* 404 */}
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(7rem, 18vw, 12rem)",
        fontWeight: 300,
        lineHeight: 1,
        letterSpacing: "-0.05em",
        fontStyle: "italic",
        background: "linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-dim) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        marginBottom: 8,
      }}>
        404
      </div>

      {/* Decorative line */}
      <div style={{
        width: 60, height: 1,
        background: "linear-gradient(90deg, transparent, var(--gold-dim), transparent)",
        marginBottom: 28,
      }} />

      <h1 style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "clamp(1.4rem, 3vw, 2rem)",
        color: "var(--text)",
        letterSpacing: "-0.02em",
        marginBottom: 12,
      }}>
        Page Not Found
      </h1>

      <p style={{
        color: "var(--text-3)",
        maxWidth: 400,
        marginBottom: 40,
        fontSize: "0.88rem",
        lineHeight: 1.75,
      }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>

      <Link href="/" style={{ textDecoration: "none" }}>
        <button style={{
          background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
          color: "#0a0804",
          border: "none",
          borderRadius: "var(--r-sm)",
          padding: "13px 32px",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: "0.82rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "pointer",
          boxShadow: "var(--shadow-gold)",
          transition: "all 0.25s",
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
          ← Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
