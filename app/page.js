import styles from "./page.module.css";
import ActionAreaCard from "../components/ActionAreaCard";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/Animations";

export const metadata = {
  title: "OSIM Market — Premium Men's Fashion",
  description:
    "Discover curated premium men's fashion at OSIM Market. Shop the latest collections of high-quality clothing, shoes, and accessories.",
};

export default async function Home() {
  async function getData() {
    const res = await fetch("http://localhost:3000/api/products", {
      cache: "no-store",
    });
    return res.json();
  }

  const myData = await getData();

  const groupedProducts = myData.reduce((acc, product) => {
    const category = product.product_category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <main style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroEyebrow}>
            New Collection 2024
          </div>

          <h1 className={styles.heroTitle}>
            Dress With<br />
            <em>Purpose.</em>
          </h1>

          <div className={styles.heroDivider} />

          <p className={styles.heroSubtitle}>
            Curated premium men&apos;s fashion for those who believe
            that style is a statement, not an afterthought.
          </p>

          <div className={styles.heroCta}>
            <button className={styles.heroCtaPrimary}>
              Shop New Arrivals
            </button>
            <button className={styles.heroCtaSecondary}>
              Explore Collections
            </button>
          </div>
        </div>

        <div className={styles.heroScroll}>
          <div className={styles.heroScrollLine} />
          Scroll
        </div>
      </section>

      {/* ── Products ── */}
      <div className={styles.container}>
        <section className={styles.productsSection}>

          {Object.entries(groupedProducts).map(([category, products], i) => (
            <FadeInUp key={category} delay={0.1} duration={0.6}>
              <div className={styles.categoryBlock}>
                <div className={styles.sectionHeaderRow}>
                  <div>
                    <div className={styles.sectionLabel}>Collection</div>
                    <h2 className={styles.sectionTitle}>{category}</h2>
                  </div>
                  <a href="#" className={styles.viewAll}>View All</a>
                </div>

                <StaggerContainer className={styles.grid} staggerDelay={0.08}>
                  {products.map((d) => (
                    <StaggerItem key={d._id}>
                      <ActionAreaCard
                        name={d.name}
                        description={d.description}
                        imageURL={d.primary_image_url}
                        myId={d._id}
                        sale_price={d.sale_price}
                        regular_price={d.regular_price}
                        discount_pct={d.discount_pct}
                      />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeInUp>
          ))}

        </section>
      </div>
    </main>
  );
}
