import { useEffect, useState } from "react";
import "./App.css";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load products");
        }

        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setStatus("ready");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, []);

  const featuredProduct =
    products.length > 0
      ? products.reduce((topItem, item) =>
          item.price > topItem.price ? item : topItem,
        )
      : null;
  const averagePrice =
    products.length > 0
      ? Math.round(
          products.reduce((sum, item) => sum + item.price, 0) / products.length,
        )
      : 0;

  return (
    <div className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="hero-panel">
        <div className="hero-copy-block">
          <p className="eyebrow">Cloud-native commerce, dressed properly</p>
          <h1>Launch a storefront that feels as sharp as the stack behind it.</h1>
          <p className="hero-copy">
            This demo now reads like a modern product drop instead of a raw API dump,
            with a cinematic hero, structured stats, and product cards that give your
            DevOps showcase actual presence.
          </p>

          <div className="hero-actions">
            <a className="primary-action" href="#catalog">
              Explore the catalog
            </a>
            <p className="stack-note">React, Vite, Express, MySQL, Docker, Kubernetes</p>
          </div>
        </div>

        <div className="hero-showcase">
          <article className="showcase-card feature-card">
            <span className="card-label">Featured signal</span>
            <h2>{featuredProduct ? featuredProduct.name : "Curating products"}</h2>
            <p>
              {featuredProduct
                ? `${currencyFormatter.format(featuredProduct.price)} leads the current catalog and anchors the visual hierarchy.`
                : "The storefront is fetching inventory and preparing the hero spotlight."}
            </p>
          </article>

          <article className="showcase-card metric-card">
            <span className="card-label">Snapshot</span>

            <div className="metric-row">
              <div>
                <strong>{products.length}</strong>
                <span>live products</span>
              </div>

              <div>
                <strong>{currencyFormatter.format(averagePrice)}</strong>
                <span>average price</span>
              </div>
            </div>

            <div className="metric-pulse">
              <span className="pulse-dot" />
              <p>
                {status === "ready"
                  ? "Inventory feed connected"
                  : status === "error"
                    ? "Catalog feed unavailable"
                    : "Syncing catalog feed"}
              </p>
            </div>
          </article>
        </div>
      </header>

      <main className="content-grid">
        <section className="catalog-panel" id="catalog">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Storefront grid</p>
              <h2>Products with some attitude</h2>
            </div>
            <p className="section-copy">
              The catalog keeps the data simple and lets spacing, type, color, and
              motion carry the mood.
            </p>
          </div>

          {status === "loading" && (
            <div className="status-banner">Loading the current product lineup...</div>
          )}

          {status === "error" && (
            <div className="status-banner error-banner">
              The backend product feed could not be reached. Start the API to populate
              the grid.
            </div>
          )}

          {status === "ready" && (
            <div className="product-grid">
              {products.map((product, index) => (
                <article className="product-card" key={product.id}>
                  <span className="product-index">0{index + 1}</span>
                  <div className="product-copy">
                    <h3>{product.name}</h3>
                    <p>
                      Built for a clean demo flow: quick scan, bold price signal, and a
                      polished card treatment.
                    </p>
                  </div>

                  <div className="product-footer">
                    <strong>{currencyFormatter.format(product.price)}</strong>
                    <span>Ready to deploy</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="manifest-panel">
          <p className="eyebrow">Why it lands better</p>
          <h2>Design that supports the engineering story.</h2>

          <div className="manifest-list">
            <article>
              <span>01</span>
              <p>Stronger typography and contrast build a more deliberate first impression.</p>
            </article>
            <article>
              <span>02</span>
              <p>Cards and panels create clearer information hierarchy without adding fake data.</p>
            </article>
            <article>
              <span>03</span>
              <p>Ambient gradients and subtle motion make the page feel alive without becoming noisy.</p>
            </article>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;