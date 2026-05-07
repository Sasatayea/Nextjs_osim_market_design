"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: "var(--bg-alt)",
      borderTop: "1px solid var(--border)",
      color: "var(--text)",
      fontFamily: "var(--font-body)",
    }}>
      {/* Gold divider line */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent 0%, var(--gold-dim) 30%, var(--gold) 50%, var(--gold-dim) 70%, transparent 100%)",
      }} />

      {/* Main footer content */}
      <div style={{
        maxWidth: 1320,
        margin: "0 auto",
        padding: "64px 32px 40px",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "48px",
      }}
        className="footer-grid"
      >
        {/* Brand Column */}
        <div>
          <div style={{ marginBottom: 20 }}>
            <span style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "1.8rem",
              fontStyle: "italic",
              background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Osim.
            </span>
          </div>
          <p style={{
            color: "var(--text-3)",
            fontSize: "0.85rem",
            lineHeight: 1.75,
            maxWidth: 280,
            marginBottom: 28,
          }}>
            {t('footer.tagline')}
          </p>
          {/* Social icons */}
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
              { label: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
              { label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
              { label: "GitHub", path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
            ].map(({ label, path }) => (
              <SocialIcon key={label} label={label} path={path} />
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <FooterColumn title={t('footer.nav_title')}>
          {[
            { label: t('nav.home'), href: "/" },
            { label: t('nav.about'), href: "/About" },
            { label: t('nav.cart'), href: "/cart2" },
            { label: t('nav.account'), href: "/userInfo" },
          ]}
        </FooterColumn>

        {/* Contact */}
        <FooterColumn title={t('footer.contact_title')}>
          {[
            { label: "info@osim-market.com", href: "mailto:info@osim-market.com" },
            { label: "+20 100 000 0000", href: "tel:+201000000000" },
            { label: "Cairo, Egypt", href: "#" },
          ]}
        </FooterColumn>

        {/* Newsletter */}
        <div>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: 20,
          }}>{t('footer.newsletter_eyebrow')}</p>
          <p style={{ color: "var(--text-3)", fontSize: "0.82rem", lineHeight: 1.65, marginBottom: 16 }}>
            {t('footer.newsletter_subtitle')}
          </p>
          <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-sm)",
                padding: "10px 14px",
                color: "var(--text)",
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                outline: "none",
                transition: "border-color 0.2s",
                width: "100%",
              }}
              onFocus={e => e.target.style.borderColor = "var(--gold-dim)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
                color: "#0a0804",
                border: "none",
                borderRadius: "var(--r-sm)",
                padding: "10px 20px",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.05)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = "none"; e.currentTarget.style.transform = "none"; }}
            >
              {t('footer.subscribe')}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1320,
        margin: "0 auto",
        padding: "20px 32px",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <p style={{ color: "var(--text-4)", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>
          © {year} OSIM Store. {t('footer.rights')}
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { key: 'privacy', label: t('footer.privacy') },
            { key: 'terms', label: t('footer.terms') },
            { key: 'cookies', label: t('footer.cookies') }
          ].map(item => (
            <a key={item.key} href="#" style={{
              color: "var(--text-4)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-4)"}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--gold)",
        marginBottom: 20,
      }}>{title}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {children.map(({ label, href }) => (
          <Link key={label} href={href} style={{ textDecoration: "none" }}>
            <span style={{
              color: "var(--text-3)",
              fontSize: "0.85rem",
              lineHeight: 1.5,
              transition: "color 0.2s",
              cursor: "pointer",
              display: "block",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--gold-light)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--text-3)"}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SocialIcon({ label, path }) {
  return (
    <a
      href="#"
      aria-label={label}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "var(--r-sm)",
        border: "1px solid var(--border)",
        color: "var(--text-4)",
        transition: "all 0.25s ease",
        cursor: "pointer",
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "var(--gold-dim)";
        e.currentTarget.style.color = "var(--gold)";
        e.currentTarget.style.background = "rgba(201,160,76,0.06)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = "var(--text-4)";
        e.currentTarget.style.background = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </a>
  );
}