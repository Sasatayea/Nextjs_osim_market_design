import ActionAreaCard from "../../components/ActionAreaCard";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import Image from "next/image";

// ✅ Force static generation (SSG) — built once at build time, never re-fetched
export const dynamic = "force-static";

async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_APIURL, {
    cache: "force-cache", // SSG: cache forever, only refreshes on rebuild
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }

  return res.json();
}

const AboutPage = async () => {
  const myData = await getData();

  return (
    <main style={styles.main}>
      {/* ── Ambient Background globally applied in globals.css ── */}

      {/* ════════════════════════════════════════
          SECTION 1 — HERO WITH IMAGE
      ════════════════════════════════════════ */}
      <FadeInUp duration={0.8}>
        <section style={styles.heroSection}>
          <div style={styles.heroContent}>
            <span style={styles.eyebrow}>Est. 2024 — Cairo, Egypt</span>
            <h1 style={styles.heroTitle}>
              Where <span style={styles.accent}>Elegance</span>
              <br />
              Meets <span style={styles.accent}>Expression.</span>
            </h1>
            <p style={styles.heroSub}>
              OSIM Market is more than a store — it&apos;s a destination for men who
              believe that how you dress is a reflection of who you are.
            </p>
            <div style={styles.divider} />
          </div>
          <div style={styles.heroImageWrap}>
            <img
              src="https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&q=80&auto=format&fit=crop"
              alt="Premium men's fashion — OSIM Market"
              style={styles.heroImage}
            />
            <div style={styles.heroImageOverlay} />
          </div>
        </section>
      </FadeInUp>

      {/* ════════════════════════════════════════
          SECTION 2 — STATS ROW
      ════════════════════════════════════════ */}
      <StaggerContainer className="stats-container" staggerDelay={0.1}>
        <section style={styles.statsRow}>
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: myData?.length ?? "—", label: "Premium Products" },
            { value: "100%", label: "Quality Guarantee" },
            { value: "24/7", label: "Customer Support" },
          ].map((stat) => (
            <StaggerItem key={stat.label}>
              <div style={styles.statCard}>
                <span style={styles.statValue}>{stat.value}</span>
                <span style={styles.statLabel}>{stat.label}</span>
              </div>
            </StaggerItem>
          ))}
        </section>
      </StaggerContainer>

      {/* ════════════════════════════════════════
          SECTION 3 — BRAND STORY (Image + Text)
      ════════════════════════════════════════ */}
      <FadeInUp>
        <section style={styles.splitSection}>
          <div style={styles.splitImage}>
            <img
              src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=700&q=80&auto=format&fit=crop"
              alt="Fashion craftsmanship and fabric detail"
              style={styles.splitImg}
            />
          </div>
          <div style={styles.splitText}>
            <span style={styles.miniLabel}>Our Story</span>
            <h2 style={styles.splitTitle}>Born From a Passion for Style</h2>
            <p style={styles.splitBody}>
              OSIM Market was founded with a singular vision: to make premium
              men&apos;s fashion accessible to everyone. We started as a small curated
              collection and grew into a destination trusted by thousands of
              style-conscious men across Egypt and beyond.
            </p>
            <p style={styles.splitBody}>
              Every piece in our collection is carefully selected — we don&apos;t chase
              fast fashion. Instead, we focus on timeless designs, quality fabrics,
              and pieces that make you feel confident every time you step out.
            </p>
            <div style={styles.dividerSmall} />
          </div>
        </section>
      </FadeInUp>

      {/* ════════════════════════════════════════
          SECTION 4 — MISSION & VISION
      ════════════════════════════════════════ */}
      <FadeInUp>
        <section style={styles.missionStrip}>
          <span style={styles.miniLabelCenter}>Mission & Vision</span>
          <blockquote style={styles.quote}>
            {'"'}To redefine men&apos;s fashion in the Middle East — making premium style
            <em style={styles.quoteEm}> accessible</em>,
            <em style={styles.quoteEm}> sustainable</em>, and
            <em style={styles.quoteEm}> effortless</em>.{'"'}
          </blockquote>
          <div style={styles.missionGrid}>
            {[
              {
                icon: "🎯",
                title: "Our Mission",
                text: "To curate and deliver premium men's fashion that combines quality, affordability, and modern style — empowering men to express themselves through what they wear.",
              },
              {
                icon: "🔭",
                title: "Our Vision",
                text: "To become the go-to fashion destination for the modern Middle Eastern man — known for exceptional curation, seamless shopping, and uncompromising quality.",
              },
            ].map((item) => (
              <div key={item.title} style={styles.missionCard}>
                <span style={{ fontSize: "2rem", marginBottom: "16px", display: "block" }}>{item.icon}</span>
                <h3 style={styles.valueTitle}>{item.title}</h3>
                <p style={styles.valueBody}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeInUp>

      {/* ════════════════════════════════════════
          SECTION 5 — QUALITY & CRAFTSMANSHIP (Text + Image)
      ════════════════════════════════════════ */}
      <FadeInUp>
        <section style={styles.splitSectionReverse}>
          <div style={styles.splitText}>
            <span style={styles.miniLabel}>Quality & Craftsmanship</span>
            <h2 style={styles.splitTitle}>Every Detail Matters</h2>
            <p style={styles.splitBody}>
              We partner directly with manufacturers who share our obsession with
              quality. From the thread count in a cotton shirt to the grain of
              leather on a belt — we inspect, test, and approve every item before
              it reaches you.
            </p>
            <div style={styles.qualityList}>
              {[
                "Hand-selected fabrics from premium mills",
                "Rigorous multi-point quality inspection",
                "Durable stitching and reinforced construction",
                "Eco-conscious packaging and shipping",
              ].map((item) => (
                <div key={item} style={styles.qualityItem}>
                  <span style={styles.qualityCheck}>✓</span>
                  <span style={styles.qualityText}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={styles.splitImage}>
            <img
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=700&q=80&auto=format&fit=crop"
              alt="Quality fabric and tailoring close-up"
              style={styles.splitImg}
            />
          </div>
        </section>
      </FadeInUp>

      {/* ════════════════════════════════════════
          SECTION 6 — STYLE IDENTITY
      ════════════════════════════════════════ */}
      <FadeInUp>
        <section style={styles.styleIdentitySection}>
          <div style={styles.styleIdentityOverlay} />
          <div style={styles.styleIdentityContent}>
            <span style={styles.miniLabelCenter}>Style Identity</span>
            <h2 style={styles.styleIdentityTitle}>
              Modern. Minimal. <span style={styles.accent}>Meaningful.</span>
            </h2>
            <p style={styles.styleIdentityBody}>
              Our aesthetic lives at the intersection of contemporary streetwear and
              classic menswear. Clean silhouettes, neutral palettes with bold accents,
              and versatile pieces that transition seamlessly from day to night.
            </p>
          </div>
        </section>
      </FadeInUp>

      {/* ════════════════════════════════════════
          SECTION 7 — CORE VALUES
      ════════════════════════════════════════ */}
      <FadeInUp>
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.miniLabelCenter}>What We Stand For</span>
            <h2 style={styles.sectionTitle}>Our Core Values</h2>
          </div>
          <StaggerContainer style={styles.valuesGrid}>
            {[
              {
                icon: "✦",
                title: "Uncompromising Quality",
                body: "We source only the finest materials, ensuring every item meets our strict standards of excellence before it reaches your wardrobe.",
              },
              {
                icon: "◆",
                title: "Accessible Luxury",
                body: "Premium fashion shouldn't come with a premium-only price tag. We bring you exceptional design at prices that make sense.",
              },
              {
                icon: "●",
                title: "Customer First",
                body: "Your satisfaction drives everything we do — from seamless shopping and fast shipping to hassle-free returns and dedicated support.",
              },
              {
                icon: "▲",
                title: "Sustainable Approach",
                body: "We believe in fashion that respects both people and planet. We're committed to ethical sourcing and eco-friendly practices.",
              },
            ].map((v) => (
              <StaggerItem key={v.title}>
                <div style={styles.valueCard}>
                  <span style={styles.valueIcon}>{v.icon}</span>
                  <h3 style={styles.valueTitle}>{v.title}</h3>
                  <p style={styles.valueBody}>{v.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </FadeInUp>

      {/* ════════════════════════════════════════
          SECTION 8 — FEATURED COLLECTION
      ════════════════════════════════════════ */}
      {/* <FadeInUp delay={0.2}>
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.miniLabelCenter}>Shop the Look</span>
            <h2 style={styles.sectionTitle}>Featured Collection</h2>
            <p style={styles.sectionDesc}>
              A hand-picked selection of our most popular pieces this season.
            </p>
          </div>

          <StaggerContainer style={styles.grid}>
            {myData?.slice(0, 8).map((d) => (
              <StaggerItem key={d._id}>
                <div style={styles.cardWrapper}>
                  <ActionAreaCard
                    name={d.product_name}
                    description={d.product_description}
                    imageURL={d.primary_image_url}
                    myId={d._id}
                    sale_price={d.sale_price}
                    regular_price={d.regular_price}
                    discount_pct={d.discount_pct}
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </FadeInUp> */}

      {/* ── SSG Badge (dev-friendly indicator) ── */}
      <div style={styles.ssgBadge} title="Statically Generated at Build Time">
        <span style={styles.ssgDot} />
        SSG · Static
      </div>
    </main>
  );
};

export default AboutPage;

/* ─────────────────────────────────────────────
   STYLES  — inline object map
   Palette: deep charcoal + warm gold + cream
───────────────────────────────────────────── */
const C = {
  bg: "var(--bg)",
  surface: "var(--surface)",
  surfaceLight: "var(--surface-raised)",
  border: "var(--border)",
  borderLight: "var(--border-light)",
  text: "var(--text)",
  muted: "var(--text-muted)",
  accent: "var(--accent)",
  accentLight: "var(--accent-light)",
  white: "#fff",
};

const styles = {
  main: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#000000",
    color: C.text,
    fontFamily: "var(--font-inter, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif)",
    overflowX: "hidden",
  },
  bgTexture: {
    position: "fixed",
    inset: 0,
    backgroundImage: `radial-gradient(ellipse at 20% 10%, rgba(201,145,58,0.04) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 90%, rgba(201,145,58,0.03) 0%, transparent 50%)`,
    pointerEvents: "none",
    zIndex: 0,
  },

  /* ── Hero ── */
  heroSection: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    minHeight: "85vh",
    maxWidth: "1400px",
    margin: "0 auto",
    alignItems: "center",
    gap: "40px",
    padding: "40px 48px",
  },
  heroContent: {
    maxWidth: "560px",
  },
  heroImageWrap: {
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    height: "100%",
    minHeight: "500px",
    maxHeight: "700px",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroImageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.6))",
    pointerEvents: "none",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: "11px",
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: C.accent,
    border: `1px solid ${C.accent}`,
    borderRadius: "4px",
    padding: "6px 14px",
    marginBottom: "32px",
  },
  heroTitle: {
    fontSize: "clamp(2.4rem, 5vw, 4rem)",
    fontWeight: "800",
    lineHeight: "1.12",
    color: C.white,
    letterSpacing: "-0.03em",
    margin: "0 0 24px",
  },
  accent: {
    color: C.accent,
    fontStyle: "italic",
  },
  heroSub: {
    fontSize: "1.05rem",
    lineHeight: "1.8",
    color: C.muted,
    maxWidth: "480px",
  },
  divider: {
    width: "56px",
    height: "2px",
    background: `linear-gradient(90deg, ${C.accent}, transparent)`,
    margin: "40px 0 0",
  },
  dividerSmall: {
    width: "40px",
    height: "2px",
    background: `linear-gradient(90deg, ${C.accent}, transparent)`,
    margin: "32px 0 0",
  },

  /* ── Mini Labels ── */
  miniLabel: {
    display: "inline-block",
    fontSize: "11px",
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: C.accent,
    marginBottom: "16px",
  },
  miniLabelCenter: {
    display: "block",
    fontSize: "11px",
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: C.accent,
    marginBottom: "16px",
    textAlign: "center",
  },

  /* ── Stats ── */
  statsRow: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1px",
    background: C.border,
    borderTop: `1px solid ${C.border}`,
    borderBottom: `1px solid ${C.border}`,
  },
  statCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "48px 20px",
    background: C.bg,
    gap: "10px",
    transition: "background 0.3s",
  },
  statValue: {
    fontSize: "2.8rem",
    fontWeight: "800",
    color: C.accentLight,
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "0.72rem",
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  },

  /* ── Split (Image + Text) Sections ── */
  splitSection: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 48px",
    gap: "64px",
    alignItems: "center",
  },
  splitSectionReverse: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 48px",
    gap: "64px",
    alignItems: "center",
  },
  splitImage: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    aspectRatio: "4/5",
  },
  splitImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  splitText: {
    maxWidth: "480px",
  },
  splitTitle: {
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
    fontWeight: "700",
    color: C.white,
    letterSpacing: "-0.02em",
    margin: "0 0 20px",
    lineHeight: "1.25",
  },
  splitBody: {
    fontSize: "0.95rem",
    color: C.muted,
    lineHeight: "1.85",
    margin: "0 0 16px",
  },

  /* ── Quality Checklist ── */
  qualityList: {
    marginTop: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  qualityItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  qualityCheck: {
    color: C.accent,
    fontWeight: "700",
    fontSize: "1rem",
    flexShrink: 0,
  },
  qualityText: {
    fontSize: "0.88rem",
    color: C.text,
    lineHeight: "1.5",
  },

  /* ── Style Identity ── */
  styleIdentitySection: {
    position: "relative",
    zIndex: 1,
    backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "scroll",
    minHeight: "450px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  styleIdentityOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(10,10,10,0.82)",
    backdropFilter: "blur(2px)",
  },
  styleIdentityContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "680px",
    padding: "80px 32px",
  },
  styleIdentityTitle: {
    fontSize: "clamp(1.8rem, 4vw, 3rem)",
    fontWeight: "800",
    color: C.white,
    letterSpacing: "-0.03em",
    margin: "0 0 20px",
    lineHeight: "1.2",
  },
  styleIdentityBody: {
    fontSize: "1rem",
    color: "#aaa",
    lineHeight: "1.85",
    maxWidth: "560px",
    margin: "0 auto",
  },

  /* ── Mission Strip ── */
  missionStrip: {
    position: "relative",
    zIndex: 1,
    background: C.surface,
    borderTop: `1px solid ${C.border}`,
    borderBottom: `1px solid ${C.border}`,
    padding: "80px 32px 60px",
    textAlign: "center",
  },
  quote: {
    maxWidth: "720px",
    margin: "0 auto 48px",
    fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
    fontStyle: "italic",
    color: C.text,
    lineHeight: "1.7",
    borderLeft: "none",
  },
  quoteEm: {
    color: C.accentLight,
    fontStyle: "italic",
  },
  missionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  missionCard: {
    padding: "36px 28px",
    background: C.surfaceLight,
    border: `1px solid ${C.border}`,
    borderRadius: "10px",
    textAlign: "left",
  },

  /* ── Section ── */
  section: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 32px",
  },
  sectionHeader: {
    marginBottom: "48px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
    fontWeight: "700",
    color: C.white,
    letterSpacing: "-0.02em",
    margin: "0 0 12px",
  },
  sectionDesc: {
    color: C.muted,
    fontSize: "0.95rem",
    maxWidth: "500px",
    margin: "0 auto",
    lineHeight: "1.7",
  },

  /* ── Cards Grid ── */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px",
  },
  cardWrapper: {
    borderRadius: "10px",
    overflow: "hidden",
    border: `1px solid ${C.border}`,
    transition: "border-color 0.3s, transform 0.3s",
  },

  /* ── Values ── */
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  valueCard: {
    padding: "36px 28px",
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: "10px",
    transition: "border-color 0.3s, transform 0.3s",
  },
  valueIcon: {
    display: "block",
    fontSize: "1.6rem",
    color: C.accent,
    marginBottom: "18px",
  },
  valueTitle: {
    fontSize: "1.05rem",
    fontWeight: "700",
    color: C.white,
    margin: "0 0 10px",
    letterSpacing: "-0.01em",
  },
  valueBody: {
    fontSize: "0.88rem",
    color: C.muted,
    lineHeight: "1.75",
    margin: 0,
  },

  /* ── SSG Badge ── */
  ssgBadge: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
    color: C.muted,
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "default",
    userSelect: "none",
  },
  ssgDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#4ade80",
    display: "inline-block",
  },
};
