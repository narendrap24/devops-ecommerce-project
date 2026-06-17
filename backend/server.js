const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root123",
  database: process.env.DB_NAME || "ecommerce"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      price INT
    )
  `;

  db.query(createTableQuery, () => {
    db.query("SELECT COUNT(*) AS count FROM products", (err, result) => {
      if (!err && result[0].count === 0) {
        db.query(
          "INSERT INTO products (name, price) VALUES ?",
          [[["Laptop", 55000], ["Headphones", 2500], ["Keyboard", 1500]]]
        );
      }
    });
  });
});

app.get("/", (req, res) => {
  res.send("Backend API is running with MySQL");
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "UP", service: "backend", database: "mysql" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});