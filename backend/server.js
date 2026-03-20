const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});


// 🔥 MAIN API (FILTER + SORT)
app.get("/products", async (req, res) => {
  try {
    const { minPrice, maxPrice, category, sort } = req.query;

    let query = "SELECT * FROM products WHERE 1=1";
    let values = [];

    if (minPrice) {
      values.push(minPrice);
      query += ` AND price >= $${values.length}`;
    }

    if (maxPrice) {
      values.push(maxPrice);
      query += ` AND price <= $${values.length}`;
    }

    if (category) {
      values.push(category);
      query += ` AND category = $${values.length}`;
    }

    if (sort === "asc") {
      query += " ORDER BY price ASC";
    } else if (sort === "desc") {
      query += " ORDER BY price DESC";
    }

    const result = await pool.query(query, values);
    res.json(result.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});