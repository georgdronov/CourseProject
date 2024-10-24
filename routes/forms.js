import { Router } from "express";
import db from "../db.js";

const router = Router();

// Create new form
router.post("/", async (req, res) => {
  const { title, description, user_id } = req.body;
  try {
    if (!title || !description || !user_id) {
      return res.status(400).send("Missing required fields");
    }

    const result = await db.query(
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
    const { rows } = await db.pool.query(
      "SELECT * FROM forms ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get form by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM forms WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).send("Form not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).send("Internal server error");
  }
});

// Update form
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, user_id } = req.body;

  try {
    const formExists = await db.query("SELECT id FROM forms WHERE id = $1", [
      id,
    ]);
    if (formExists.rowCount === 0) {
      return res.status(404).send("Form not found");
    }

    const result = await db.query(
      "UPDATE forms SET title = $1, description = $2, user_id = $3 WHERE id = $4 RETURNING *",
      [title, description, user_id, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating form:", err);
    res.status(500).send("Error updating form");
  }
});

// Delete form
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const formExists = await db.query("SELECT id FROM forms WHERE id = $1", [
      id,
    ]);
    if (formExists.rowCount === 0) {
      return res.status(404).send("Form not found");
    }

    await db.query("DELETE FROM forms WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting form:", err);
    res.status(500).send("Error deleting form");
  }
});

// Create question
router.post("/:formId/questions", async (req, res) => {
  const { formId } = req.params;
  const { title, description, type, options, position, user_id } = req.body;

  try {
    if (!title || !type || !user_id) {
      return res.status(400).send("Missing required fields");
    }

    const result = await db.query(
      "INSERT INTO questions (form_id, title, description, type, options, position, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [formId, title, description, type, options, position, user_id]
    );

    res.status(201).send(result.rows[0]);
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).send("Error creating question");
  }
});

// Get all questions for a specific form
router.get("/:formId/questions", async (req, res) => {
  const { formId } = req.params;
  try {
    const { rows } = await db.query(
      "SELECT * FROM questions WHERE form_id = $1 ORDER BY position",
      [formId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update question
router.put("/:formId/questions/:questionId", async (req, res) => {
  const { formId, questionId } = req.params;
  const { title, description, type, options, position, user_id } = req.body;

  try {
    const questionExists = await db.query(
      "SELECT id FROM questions WHERE id = $1 AND form_id = $2",
      [questionId, formId]
    );
    if (questionExists.rowCount === 0) {
      return res.status(404).send("Question not found");
    }

    const result = await db.query(
      "UPDATE questions SET title = $1, description = $2, type = $3, options = $4, position = $5, user_id = $6 WHERE id = $7 RETURNING *",
      [title, description, type, options, position, user_id, questionId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating question:", err);
    res.status(500).send("Error updating question");
  }
});

// Delete question
router.delete("/:formId/questions/:questionId", async (req, res) => {
  const { formId, questionId } = req.params;
  try {
    const questionExists = await db.query(
      "SELECT id FROM questions WHERE id = $1 AND form_id = $2",
      [questionId, formId]
    );
    if (questionExists.rowCount === 0) {
      return res.status(404).send("Question not found");
    }

    await db.query("DELETE FROM questions WHERE id = $1", [questionId]);
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).send("Error deleting question");
  }
});

export default router;
