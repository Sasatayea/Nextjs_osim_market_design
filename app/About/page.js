import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/Animations";

// Force static generation
export const dynamic = "force-static";

async function getData() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "force-cache",
  });
  return res.json();
}

const AboutPage = async () => {
  const myData = await getData();

  return (
    <main style={{ backgroundColor: "var(--bg)", minHeight: "100vh", color: "var(--text)", fontFamily: "var(--font-body)" }}>
      
      {/* ── SECTION 1 — HERO ── */}
      <section style={{
        position: "relative",
        padding: "clamp(80px, 12vw, 160px) 32px",
        textAlign: "center",
        overflow: "hidden",
      }}>
        {/* Atmospheric gradients */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 50% -20%, rgba(201,160,76,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeInUp duration={0.8}>
            <span style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)", fontSize: "0.65rem",
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "var(--gold)", background: "rgba(201,160,76,0.07)",
              border: "1px solid rgba(201,160,76,0.2)",
              padding: "6px 14px", borderRadius: "var(--r-xs)",
              marginBottom: 32,
            }}>
              Est. 2024 — Cairo, Egypt
            </span>
            
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              fontWeight: 600, lineHeight: 1.1,
              letterSpacing: "-0.03em", marginBottom: 32,
            }}>
              Crafting a <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Legacy</em><br />
              of Modern Style.
            </h1>

            <p style={{
              color: "var(--text-3)", fontSize: "clamp(1rem, 2vw, 1.25rem)",
              lineHeight: 1.75, maxWidth: 640, margin: "0 auto 48px",
              fontWeight: 300,
            }}>
              OSIM Market is an editorial destination for the modern man. 
              We curate high-end fashion that bridges the gap between 
              streetwear character and sartorial excellence.
            </p>

            <div style={{
              width: 60, height: 1,
              background: "linear-gradient(90deg, transparent, var(--gold-dim), transparent)",
              margin: "0 auto",
            }} />
          </FadeInUp>
        </div>
      </section>

      {/* ── SECTION 2 — IMAGE SPLIT ── */}
      <section style={{
        maxWidth: 1240, margin: "0 auto",
        padding: "0 32px 100px",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 64,
          alignItems: "center",
        }} className="split-grid">
          <FadeInUp duration={0.8}>
            <div style={{
              borderRadius: "var(--r-xl)",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-xl)",
            }}>
              <img 
                src="https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=1000&q=80&auto=format&fit=crop"
                alt="Editorial Men's Fashion"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </FadeInUp>

          <div style={{ padding: "20px 0" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.65rem",
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "var(--gold)", marginBottom: 16, display: "block",
            }}>The Philosophy</span>
            
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.4rem", fontWeight: 600,
              lineHeight: 1.2, letterSpacing: "-0.02em",
              marginBottom: 24,
            }}>
              Quality Over Abundance.
            </h2>

            <p style={{ color: "var(--text-3)", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: 20 }}>
              In an era of disposable fashion, we stand for the enduring. 
              Every garment in our collection is stress-tested for longevity 
              and selected for its ability to transcend fleeting trends.
            </p>
            
            <p style={{ color: "var(--text-3)", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: 32 }}>
              We believe style is a silent language. It should be articulate, 
              refined, and unapologetically yours.
            </p>

            <div style={{ display: "flex", gap: 32 }}>
              <div>
                <p style={{ color: "var(--gold-light)", fontWeight: 700, fontSize: "1.5rem", marginBottom: 4 }}>10k+</p>
                <p style={{ color: "var(--text-4)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>Curated Sales</p>
              </div>
              <div>
                <p style={{ color: "var(--gold-light)", fontWeight: 700, fontSize: "1.5rem", marginBottom: 4 }}>{myData?.length || 0}</p>
                <p style={{ color: "var(--text-4)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>Premium Pieces</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — CORE VALUES ── */}
      <section style={{
        background: "var(--bg-alt)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "100px 32px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.65rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--gold)", marginBottom: 16, display: "block",
            }}>Our Foundation</span>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.6rem", fontWeight: 600,
              letterSpacing: "-0.02em",
            }}>The Core Principles.</h2>
          </div>

          <StaggerContainer style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}>
            {[
              {
                title: "Curated Selection",
                desc: "We don't stock everything. We only stock the best. Every item undergoes a rigorous selection process.",
                icon: "✦"
              },
              {
                title: "Ethical Sourcing",
                desc: "We partner with manufacturers who respect their craftsmen and the environment in equal measure.",
                icon: "◈"
              },
              {
                title: "Precision Fit",
                desc: "Style is nothing without fit. We provide detailed measurement guides to ensure your silhouette is perfect.",
                icon: "▣"
              }
            ].map(val => (
              <StaggerItem key={val.title}>
                <div style={{
                  padding: "40px 32px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  height: "100%",
                }}>
                  <div style={{ color: "var(--gold)", fontSize: "1.8rem", marginBottom: 24 }}>{val.icon}</div>
                  <h3 style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600, fontSize: "1.1rem",
                    marginBottom: 12,
                  }}>{val.title}</h3>
                  <p style={{ color: "var(--text-3)", fontSize: "0.88rem", lineHeight: 1.7 }}>{val.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── SECTION 4 — VISION QUOTE ── */}
      <section style={{
        padding: "120px 32px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeInUp>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
              fontStyle: "italic",
              lineHeight: 1.6,
              color: "var(--text-2)",
              marginBottom: 40,
            }}>
              &quot;To redefine men&apos;s fashion in the Middle East — 
              making premium style accessible, sustainable, and effortless.&quot;
            </p>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}>
              <div style={{ width: 32, height: 1, background: "var(--gold-dim)" }} />
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--gold)",
              }}>Our Vision 2024</span>
              <div style={{ width: 32, height: 1, background: "var(--gold-dim)" }} />
            </div>
          </FadeInUp>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .split-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </main>
  );
};

export default AboutPage;
