"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { ProfileSkeleton } from "@/components/ui/LoadingSkeleton";

export default function UserInfoPage() {
  const [session, setSession] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    authClient.getSession().then((res) => {
      setSession(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const syncUser = async () => {
      if (!session?.data?.user) return;
      try {
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(session.data.user),
        });
      } catch (err) {
        console.log(err);
      }
    };
    syncUser();
  }, [session]);

  useEffect(() => {
    const fetchUser = async () => {
      const email = session?.data?.user?.email;
      if (!email) return;
      setUserLoading(true);
      try {
        const res = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setUserLoading(false);
      }
    };
    fetchUser();
  }, [session]);

  const login = () => {
    authClient.signIn.social({ provider: "github" });
  };

  const logout = async () => {
    await authClient.signOut();
    setSession(null);
  };

  if (loading) return <ProfileSkeleton />;

  /* ── Login screen ── */
  if (!session?.data?.user) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--bg)",
        fontFamily: "var(--font-body)",
        padding: "24px",
        animation: "fadeIn 0.5s ease",
      }}>
        <div style={{
          width: "100%",
          maxWidth: 420,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-xl)",
          overflow: "hidden",
          boxShadow: "var(--shadow-xl)",
        }}>
          {/* Top accent bar */}
          <div style={{
            height: 3,
            background: "linear-gradient(90deg, var(--gold-dim), var(--gold-light), var(--gold-dim))",
          }} />

          <div style={{ padding: "48px 40px" }}>
            {/* Logo mark */}
            <div style={{
              width: 56, height: 56,
              borderRadius: "var(--r-md)",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 28,
            }}>
              <span style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600, fontSize: "1.3rem", fontStyle: "italic",
                background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>O.</span>
            </div>

            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "var(--gold)", marginBottom: 12,
            }}>
              Account Access
            </p>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600, fontSize: "1.9rem",
              color: "var(--text)", letterSpacing: "-0.02em",
              lineHeight: 1.15, marginBottom: 10,
            }}>
              Welcome Back
            </h1>

            <p style={{
              color: "var(--text-3)", fontSize: "0.88rem",
              lineHeight: 1.65, marginBottom: 36,
            }}>
              Sign in with your GitHub account to access your profile and manage your orders.
            </p>

            <button
              onClick={login}
              style={{
                width: "100%",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                background: "var(--surface-3)",
                border: "1px solid var(--border-2)",
                borderRadius: "var(--r-sm)",
                padding: "13px 24px",
                color: "var(--text)",
                fontFamily: "var(--font-body)", fontWeight: 600,
                fontSize: "0.85rem", letterSpacing: "0.02em",
                cursor: "pointer", transition: "all 0.25s",
                marginBottom: 12,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--gold-dim)";
                e.currentTarget.style.background = "var(--surface-hover)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border-2)";
                e.currentTarget.style.background = "var(--surface-3)";
              }}
            >
              {/* GitHub icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>

            <p style={{
              textAlign: "center", color: "var(--text-4)",
              fontSize: "0.72rem", fontFamily: "var(--font-mono)", letterSpacing: "0.06em",
            }}>
              Secure sign-in via OAuth 2.0
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (userLoading || !user) {
    return <ProfileSkeleton />;
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      })
    : null;

  /* ── Profile screen ── */
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "var(--bg)",
      fontFamily: "var(--font-body)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "clamp(32px, 5vw, 64px) 24px",
      animation: "fadeIn 0.5s ease",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 500,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-xl)",
        overflow: "hidden",
        boxShadow: "var(--shadow-xl)",
      }}>
        {/* Gradient banner */}
        <div style={{
          height: 110,
          background: "linear-gradient(135deg, #0f0e08 0%, #1a1508 40%, rgba(201,160,76,0.15) 100%)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative lines */}
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              position: "absolute",
              top: 0, left: `${20 + i * 30}%`,
              width: 1, height: "100%",
              background: "linear-gradient(180deg, transparent, rgba(201,160,76,0.15), transparent)",
            }} />
          ))}
        </div>

        {/* Avatar overlap */}
        <div style={{ 
          textAlign: "center", 
          marginTop: -48, 
          paddingBottom: 8,
          position: "relative",
          zIndex: 2,
        }}>
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              style={{
                width: 88, height: 88,
                borderRadius: "50%",
                border: "3px solid var(--gold-dim)",
                boxShadow: "var(--shadow-gold)",
                display: "inline-block",
                objectFit: "cover",
                background: "var(--surface)", // ensure no transparency shows through
              }}
            />
          ) : (
            <div style={{
              width: 88, height: 88, borderRadius: "50%",
              background: "linear-gradient(135deg, var(--gold-dim), var(--gold))",
              border: "3px solid var(--border)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2rem",
              color: "#0a0804",
            }}>
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", padding: "12px 32px 0" }}>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600, fontSize: "1.6rem",
            color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 4,
          }}>
            {user.name}
          </h1>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "var(--gold)", background: "rgba(201,160,76,0.07)",
            border: "1px solid rgba(201,160,76,0.18)",
            padding: "4px 12px", borderRadius: "var(--r-xs)",
          }}>
            GitHub Account
          </span>
        </div>

        {/* Divider */}
        <div style={{ margin: "24px 32px 0", height: 1, background: "var(--border)" }} />

        {/* Info rows */}
        <div style={{ padding: "20px 32px 32px", display: "flex", flexDirection: "column", gap: 12 }}>
          <InfoRow label="Email" value={user.email} icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          } />
          {memberSince && (
            <InfoRow label="Member Since" value={memberSince} icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            } />
          )}

          {/* Logout */}
          <button
            onClick={logout}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              width: "100%", marginTop: 8,
              background: "none",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "var(--r-sm)",
              padding: "12px 24px",
              color: "var(--error)",
              fontFamily: "var(--font-body)", fontWeight: 600,
              fontSize: "0.82rem", letterSpacing: "0.06em",
              cursor: "pointer", transition: "all 0.25s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--error)";
              e.currentTarget.style.background = "var(--error-bg)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)";
              e.currentTarget.style.background = "none";
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, icon }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      background: "var(--bg)",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-md)",
      padding: "12px 16px",
    }}>
      <div style={{ color: "var(--gold)", flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.6rem",
          letterSpacing: "0.15em", textTransform: "uppercase",
          color: "var(--text-4)", marginBottom: 2,
        }}>{label}</p>
        <p style={{ color: "var(--text-2)", fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value}
        </p>
      </div>
    </div>
  );
}
