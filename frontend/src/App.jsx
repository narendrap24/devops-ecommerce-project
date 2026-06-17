import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>DevOps E-Commerce Application</h1>
      <h2>Products</h2>

      {products.map((p) => (
        <p key={p.id}>
          {p.name} - ₹{p.price}
        </p>
      ))}
    </div>
  );
}

export default App;