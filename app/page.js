import styles from "./page.module.css";
import ActionAreaCard from "../components/ActionAreaCard";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/Animations";

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

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(product);

    return acc;
  }, {});

  console.log(groupedProducts);

  return (
    <main className={styles.container} style={{ backgroundColor: "white", minHeight: "100vh" }}>
      {/* Hero Section */}
      <FadeInUp duration={0.8}>
        <section className={styles.hero}>
          <h1>Redefine Your Style</h1>
          <p>Discover the latest collections and exclusive deals on premium fashion. Elevate your everyday wardrobe with OSIM Market.</p>
          <div className={styles.ctaContainer}>
            <button className={styles.primaryBtn}>Shop New Arrivals</button>
            <button className={styles.secondaryBtn}>Explore Collections</button>
          </div>
        </section>
      </FadeInUp>

      {/* Products Section */}
      <section className={styles.productsSection}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>

          {Object.entries(groupedProducts).map(([category, products]) => (
            <FadeInUp key={category} delay={0.2} duration={0.6}>
              <section>
                <div className={styles.categoryHeader}>
                  <h2 className={styles.sectionTitle}>{category}</h2>
                  <a href="#" className={styles.viewAll}>View All →</a>
                </div>

                <StaggerContainer className={styles.grid} staggerDelay={0.15}>
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
              </section>
            </FadeInUp>
          ))}

      </section>
    </main>
  );
}
