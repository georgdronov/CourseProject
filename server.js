const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

app.get("/templates", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM templates");
    res.json(result.rows);
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
