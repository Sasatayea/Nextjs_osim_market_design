"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/app/context/CartContext";

const NavBar = () => {
  const [session, setSession] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menOpen, setMenOpen] = useState(false);
  const [saleOpen, setSaleOpen] = useState(false);
  const [menMobileOpen, setMenMobileOpen] = useState(false);
  const [saleMobileOpen, setSaleMobileOpen] = useState(false);

  let cart = [];
  try {
    const cartContext = useCart();
    cart = cartContext?.cart || [];
  } catch {
    cart = [];
  }

  useEffect(() => {
    authClient.getSession().then(setSession);

    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navbarStyle = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: scrolled
      ? "rgba(8, 10, 13, 0.95)"
      : "rgba(8, 10, 13, 0.6)",
    backdropFilter: "blur(20px) saturate(1.5)",
    WebkitBackdropFilter: "blur(20px) saturate(1.5)",
    borderBottom: `1px solid ${scrolled ? "var(--border)" : "rgba(30,34,50,0.3)"}`,
    transition: "all 0.3s ease",
  };

  return (
    <>
      <nav style={navbarStyle} role="navigation" aria-label="Main navigation">
        <div style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 32px",
          height: scrolled ? 60 : 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          transition: "height 0.3s ease",
        }}>

          {/* ── Hamburger (mobile) ── */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              color: "var(--text-2)",
              flexShrink: 0,
            }}
            className="nav-hamburger"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M2 5.5h18M2 11h18M2 16.5h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* ── Logo ── */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <span style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "1.6rem",
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 60%, #c49a40 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontStyle: "italic",
            }}>
              Osim.
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="nav-desktop-links" style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flex: 1,
            justifyContent: "center",
          }}>
            <NavLink href="/">Home</NavLink>

            {/* Men Dropdown */}
            <div 
              style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}
              onMouseEnter={() => setMenOpen(true)}
              onMouseLeave={() => setMenOpen(false)}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: menOpen ? "var(--gold-light)" : "var(--text-3)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  letterSpacing: "0.01em",
                  padding: "8px 14px",
                  borderRadius: "var(--r-sm)",
                  transition: "all 0.2s ease",
                  backgroundColor: menOpen ? "rgba(201,160,76,0.07)" : "transparent",
                }}
              >
                Men
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ transform: menOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s ease" }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {menOpen && (
                <DropdownMenu>
                  {["New Arrivals", "T-Shirts & Tops", "Pants & Trousers", "Outerwear", "Shoes", "Accessories"].map((item) => (
                    <DropdownItem key={item}>{item}</DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </div>

            {/* Sale Dropdown */}
            <div 
              style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}
              onMouseEnter={() => setSaleOpen(true)}
              onMouseLeave={() => setSaleOpen(false)}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "var(--gold)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  letterSpacing: "0.04em",
                  padding: "8px 14px",
                  borderRadius: "var(--r-sm)",
                  transition: "all 0.2s ease",
                  backgroundColor: saleOpen ? "rgba(201,160,76,0.07)" : "transparent",
                }}
              >
                Sale
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ transform: saleOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s ease" }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {saleOpen && (
                <DropdownMenu>
                  <DropdownItem icon="🔥">Flash Sale — Up to 70%</DropdownItem>
                  <DropdownItem icon="🏷">Winter Clearance</DropdownItem>
                  <DropdownItem icon="✨">Member Exclusives</DropdownItem>
                </DropdownMenu>
              )}
            </div>

            <NavLink href="/About">About</NavLink>

            {session?.data?.user && (
              <NavLink href="/Dashboard">Dashboard</NavLink>
            )}
          </div>

          {/* ── Search Bar (desktop) ── */}
          <div className="nav-search" style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-sm)",
            padding: "7px 14px",
            width: 240,
            flexShrink: 0,
            transition: "all 0.25s ease",
          }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--gold-dim)";
              e.currentTarget.style.boxShadow = "0 0 0 3px var(--gold-glow)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="var(--text-4)" strokeWidth="1.3"/>
              <path d="M10.5 10.5l3 3" stroke="var(--text-4)" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              style={{
                background: "none",
                border: "none",
                outline: "none",
                color: "var(--text)",
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                width: "100%",
              }}
            />
          </div>

          {/* ── Right Icons ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* User */}
            <Link href="/userInfo">
              <IconBtn aria-label="Account">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </IconBtn>
            </Link>

            {/* Cart */}
            <Link href="/cart2">
              <IconBtn aria-label={`Cart — ${cart.length} items`} style={{ position: "relative" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                {cart.length > 0 && (
                  <span style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
                    color: "#0a0804",
                    fontSize: "0.58rem",
                    fontWeight: 800,
                    width: 17,
                    height: 17,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-body)",
                    lineHeight: 1,
                  }}>
                    {cart.length}
                  </span>
                )}
              </IconBtn>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            zIndex: 1100,
            animation: "fadeIn 0.25s ease",
          }}
        />
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: 300,
          background: "var(--surface-2)",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid var(--border)",
          zIndex: 1200,
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          boxShadow: mobileOpen ? "20px 0 50px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {/* Drawer header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px",
          borderBottom: "1px solid var(--border)",
        }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "1.5rem",
            fontStyle: "italic",
            background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Osim.
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-sm)",
              cursor: "pointer",
              padding: "8px",
              color: "var(--text-4)",
              display: "flex",
              transition: "all 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile nav items */}
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          <MobileLink href="/" onClick={() => setMobileOpen(false)} icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 12L12 3l9 9M5 10v10h5v-5h4v5h5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          }>Home</MobileLink>

          <button
            onClick={() => setMenMobileOpen(!menMobileOpen)}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "none", border: "none", cursor: "pointer",
              color: "var(--text-2)", fontFamily: "var(--font-body)", fontWeight: 500,
              fontSize: "0.95rem", padding: "14px", borderRadius: "var(--r-md)",
              transition: "all 0.2s",
              backgroundColor: menMobileOpen ? "rgba(255,255,255,0.03)" : "transparent",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Men
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: menMobileOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          {menMobileOpen && (
            <div style={{ paddingLeft: 38, paddingBottom: 8, marginTop: 4 }}>
              {["New Arrivals", "T-Shirts", "Pants", "Shoes", "Accessories"].map((item) => (
                <button key={item} onClick={() => setMobileOpen(false)} style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text-4)", fontFamily: "var(--font-body)", fontSize: "0.85rem",
                  padding: "10px 0", transition: "color 0.2s",
                }}>
                  {item}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setSaleMobileOpen(!saleMobileOpen)}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "none", border: "none", cursor: "pointer",
              color: "var(--gold)", fontFamily: "var(--font-body)", fontWeight: 600,
              fontSize: "0.95rem", padding: "14px", borderRadius: "var(--r-md)",
              transition: "all 0.2s",
              backgroundColor: saleMobileOpen ? "rgba(201,160,76,0.05)" : "transparent",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Sale
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: saleMobileOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          {saleMobileOpen && (
            <div style={{ paddingLeft: 38, paddingBottom: 8, marginTop: 4 }}>
              {["Flash Sale", "Winter Clearance", "Member Deals"].map((item) => (
                <button key={item} onClick={() => setMobileOpen(false)} style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--gold-dim)", fontFamily: "var(--font-body)", fontSize: "0.85rem",
                  padding: "10px 0", transition: "color 0.2s",
                }}>
                  {item}
                </button>
              ))}
            </div>
          )}

          <MobileLink href="/About" onClick={() => setMobileOpen(false)} icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          }>About</MobileLink>

          {session?.data?.user && (
            <MobileLink href="/Dashboard" onClick={() => setMobileOpen(false)} icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5"/><rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5"/><rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5"/></svg>
            }>Dashboard</MobileLink>
          )}
        </nav>

        {/* Drawer footer */}
        <div style={{ padding: "24px", borderTop: "1px solid var(--border)" }}>
          <Link href="/userInfo" onClick={() => setMobileOpen(false)} style={{ textDecoration: "none" }}>
            <button style={{
              width: "100%",
              background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
              color: "#0a0804",
              border: "none",
              borderRadius: "var(--r-sm)",
              padding: "12px 20px",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "var(--shadow-gold)",
            }}>
              Account Portal
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (max-width: 768px) {
          .nav-hamburger { display: flex !important; }
          .nav-desktop-links, .nav-search { display: none !important; }
        }
        @media (max-width: 1024px) {
          .nav-search { display: none !important; }
        }
      `}</style>
    </>
  );
};

/* ── Sub-components ── */

function NavLink({ href, children }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <span style={{
        color: "var(--text-3)",
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        fontSize: "0.85rem",
        letterSpacing: "0.01em",
        padding: "8px 14px",
        borderRadius: "var(--r-sm)",
        transition: "all 0.2s ease",
        display: "block",
        cursor: "pointer",
      }}
        onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "var(--surface)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "var(--text-3)"; e.currentTarget.style.background = "transparent"; }}
      >
        {children}
      </span>
    </Link>
  );
}

function DropdownMenu({ children }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(10, 12, 16, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-md)",
        boxShadow: "var(--shadow-xl)",
        minWidth: 220,
        padding: "10px",
        marginTop: "10px",
        animation: "slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: 2000,
      }}
    >
      {/* Arrow */}
      <div style={{
        position: "absolute",
        top: -6,
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        width: 12,
        height: 12,
        background: "rgba(10, 12, 16, 0.95)",
        borderTop: "1px solid var(--border)",
        borderLeft: "1px solid var(--border)",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

function DropdownItem({ children, icon }) {
  return (
    <button style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      width: "100%",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--text-3)",
      fontFamily: "var(--font-body)",
      fontSize: "0.85rem",
      fontWeight: 400,
      padding: "10px 14px",
      borderRadius: "var(--r-sm)",
      transition: "all 0.15s ease",
      textAlign: "left",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "var(--gold-light)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--text-3)"; }}
    >
      {icon && <span style={{ fontSize: "1.1rem" }}>{icon}</span>}
      {children}
    </button>
  );
}

function IconBtn({ children, style, "aria-label": ariaLabel, ...rest }) {
  return (
    <button
      aria-label={ariaLabel}
      style={{
        background: "transparent",
        border: "1px solid transparent",
        borderRadius: "var(--r-sm)",
        cursor: "pointer",
        padding: "8px",
        color: "var(--text-3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.25s ease",
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = "var(--gold-light)";
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.background = "var(--surface)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = "var(--text-3)";
        e.currentTarget.style.borderColor = "transparent";
        e.currentTarget.style.background = "transparent";
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

function MobileLink({ href, onClick, children, icon }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }} onClick={onClick}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        color: "var(--text-2)",
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        fontSize: "0.95rem",
        padding: "14px",
        borderRadius: "var(--r-md)",
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "var(--gold-light)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--text-2)"; }}
      >
        {icon && <span style={{ color: "var(--text-4)" }}>{icon}</span>}
        {children}
      </div>
    </Link>
  );
}

export default NavBar;