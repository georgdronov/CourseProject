import { Router } from "express";
import pkg from "pg";
const { Pool } = pkg;

const router = Router();
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// === Form routes ===

// Creating new form
router.post("/", async (req, res) => {
  const { title, description, user_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO forms (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, user_id]
    );
    res.status(201).send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating form");
  }
});

// Get all forms
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM forms");
    res.status(200).send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving forms");
  }
});

// Delete form
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM forms WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting form");
  }
});

// === Question routes ===
// Create new question
router.post("/questions", async (req, res) => {
  const { form_id, title, description, type, options, position, user_id } =
    req.body;
  try {
    const result = await pool.query(
      "INSERT INTO questions (form_id, title, description, type, options, position, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [form_id, title, description, type, options, position, user_id]
    );
    res.status(201).send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating question");
  }
});

// Get all questions for needed form
router.get("/questions/:form_id", async (req, res) => {
  const { form_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM questions WHERE form_id = $1",
      [form_id]
    );
    res.status(200).send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving questions");
  }
});

// Delete question
router.delete("/questions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM questions WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting question");
  }
});

// === Work with answers ===
// Create  new answer
router.post("/responses", async (req, res) => {
  const { form_id, question_id, answer, user_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO responses (form_id, question_id, answer, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [form_id, question_id, answer, user_id]
    );
    res.status(201).send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating response");
  }
});

// Take all answers
router.get("/responses/:form_id", async (req, res) => {
  const { form_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM responses WHERE form_id = $1",
      [form_id]
    );
    res.status(200).send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving responses");
  }
});

export default router;
