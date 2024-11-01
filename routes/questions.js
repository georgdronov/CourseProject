import { Router } from "express";
import db from "../db.js";

const router = Router();

// Creating questions
router.post("/", async (req, res) => {
  const questions = req.body;
  try {
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).send("Missing questions");
    }

    const query = `
      INSERT INTO questions (form_id, title, description, type, options, position, username)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const results = [];
    for (const question of questions) {
      const result = await db.query(query, [
        question.form_id,
        question.title,
        question.description,
        question.type,
        question.options,
        question.position,
        question.username,
      ]);
      results.push(result.rows[0]);
    }

    res.status(201).send(results);
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).send("Error creating question");
  }
});

// Get all questions by form_id
router.get("/form/:form_id", async (req, res) => {
  const { form_id } = req.params;
  try {
    const result = await db.query(
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

// Delete question by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const questionExists = await db.query(
      "SELECT id FROM questions WHERE id = $1",
      [id]
    );
    if (questionExists.rowCount === 0) {
      return res.status(404).send("Question not found");
    }

    await db.query("DELETE FROM questions WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).send("Error deleting question");
  }
});

export default router;
