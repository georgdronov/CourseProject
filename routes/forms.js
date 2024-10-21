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
    if (!title || !description || !user_id) {
      return res.status(400).send("Missing required fields");
    }

    const result = await pool.query(
      "INSERT INTO forms (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, user_id]
    );
    res.status(201).send(result.rows[0]);
  } catch (err) {
    console.error("Error creating form:", err);
    res.status(500).send("Error creating form");
  }
});

// Get all forms
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM forms");
    res.status(200).send(result.rows);
  } catch (err) {
    console.error("Error retrieving forms:", err);
    res.status(500).send("Error retrieving forms");
  }
});

// Delete form
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const formExists = await pool.query("SELECT id FROM forms WHERE id = $1", [
      id,
    ]);
    if (formExists.rowCount === 0) {
      return res.status(404).send("Form not found");
    }

    await pool.query("DELETE FROM forms WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting form:", err);
    res.status(500).send("Error deleting form");
  }
});

// === Question routes ===

// Creating questions for a form
router.post("/questions", async (req, res) => {
  const questions = req.body;
  try {
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).send("Missing questions");
    }

    const query = `
    INSERT INTO questions (form_id, title, description, type, options, position, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `;

    const results = [];
    for (const question of questions) {
      const result = await pool.query(query, [
        question.form_id,
        question.title,
        question.description,
        question.type,
        question.options,
        question.position,
        question.user_id,
      ]);
      results.push(result.rows[0]);
    }

    res.status(201).send(results);
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).send("Error creating question");
  }
});

// Get all questions for a specific form
router.get("/questions/:form_id", async (req, res) => {
  const { form_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM questions WHERE form_id = $1",
      [form_id]
    );
    if (result.rowCount === 0) {
      return res.status(404).send("No questions found for this form");
    }
    res.status(200).send(result.rows);
  } catch (err) {
    console.error("Error retrieving questions:", err);
    res.status(500).send("Error retrieving questions");
  }
});

// Delete question
router.delete("/questions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const questionExists = await pool.query(
      "SELECT id FROM questions WHERE id = $1",
      [id]
    );
    if (questionExists.rowCount === 0) {
      return res.status(404).send("Question not found");
    }

    await pool.query("DELETE FROM questions WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).send("Error deleting question");
  }
});

// === Work with answers ===

// Create new answer
router.post("/responses", async (req, res) => {
  const { form_id, question_id, answer, user_id } = req.body;
  try {
    if (!form_id || !question_id || !answer || !user_id) {
      return res.status(400).send("Missing required fields");
    }

    const formExists = await pool.query("SELECT id FROM forms WHERE id = $1", [
      form_id,
    ]);
    const questionExists = await pool.query(
      "SELECT id FROM questions WHERE id = $1",
      [question_id]
    );

    if (formExists.rowCount === 0) {
      return res.status(404).send("Form not found");
    }

    if (questionExists.rowCount === 0) {
      return res.status(404).send("Question not found");
    }

    const result = await pool.query(
      "INSERT INTO responses (form_id, question_id, answer, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [form_id, question_id, answer, user_id]
    );
    res.status(201).send(result.rows[0]);
  } catch (err) {
    console.error("Error creating response:", err);
    res.status(500).send("Error creating response");
  }
});

// Take all answers for a specific form
router.get("/responses/:form_id", async (req, res) => {
  const { form_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM responses WHERE form_id = $1",
      [form_id]
    );
    if (result.rowCount === 0) {
      return res.status(404).send("No responses found for this form");
    }
    res.status(200).send(result.rows);
  } catch (err) {
    console.error("Error retrieving responses:", err);
    res.status(500).send("Error retrieving responses");
  }
});

export default router;
