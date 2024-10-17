import { Router } from "express";
import pkg from "pg";
const { Pool } = pkg;

const router = Router();
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// === form routes ===

// creating new form
router.post("/", async (req, res) => {
  const { title, description, user_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO forms (title, description, user_id) VALUES ($1, $2, $3)  RETURNING *",
      [title, description, user_id]
    );
    res.status(201).send(result.rows[0]);
  } catch (err) {
    res.status(500).send("Error creating form", err);
  }
});

// get all forms
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM forms");
    res.status(201).send(result.rows);
  } catch (err) {
    res.status(500).send("Error getting forms", err);
  }
});

// delete form
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM forms WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).send("Error deleting form", err);
  }
});

export default router;