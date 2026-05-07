"use client";

import styles from "./page.module.css";
import ActionAreaCard from "../components/ActionAreaCard";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/Animations";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Home() {
  const { t } = useTranslation();
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setMyData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (loading) return null; // Or a skeleton

  const groupedProducts = myData.reduce((acc, product) => {
    const category = product.product_category || "Uncategorized";
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
            {t('hero.eyebrow')}
          </div>

          <h1 className={styles.heroTitle}>
            {t('hero.title')}<br />
            <em>{t('hero.purpose')}</em>
          </h1>

          <div className={styles.heroDivider} />

          <p className={styles.heroSubtitle}>
            {t('hero.subtitle')}
          </p>

          <div className={styles.heroCta}>
            <button className={styles.heroCtaPrimary}>
              {t('hero.shop_new')}
            </button>
            <button className={styles.heroCtaSecondary}>
              {t('hero.explore')}
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

          {Object.entries(groupedProducts).map(([category, products]) => (
            <FadeInUp key={category} delay={0.1} duration={0.6}>
              <div className={styles.categoryBlock}>
                <div className={styles.sectionHeaderRow}>
                  <div>
                    <div className={styles.sectionLabel}>{t('common.collection')}</div>
                    <h2 className={styles.sectionTitle}>{category}</h2>
                  </div>
                  <a href="#" className={styles.viewAll}>{t('common.view_all')}</a>
                </div>

                <StaggerContainer className={styles.grid} staggerDelay={0.08}>
                  {products.map((d) => (
                    <StaggerItem key={d._id}>
                      <ActionAreaCard
                        name={d.product_name}
                        description={d.product_description}
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
