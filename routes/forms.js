import { Router } from "express";
import db from "../db.js";

const router = Router();

// Create new form
router.post("/", async (req, res) => {
  const { title, description, username } = req.body;
  try {
    if (!title || !description || !username) {
      return res.status(400).send("Missing required fields");
    }

    const result = await db.query(
      "INSERT INTO forms (title, description, username) VALUES ($1, $2, $3) RETURNING *",
      [title, description, username]
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
  const { title, description, username } = req.body;

  try {
    const formExists = await db.query("SELECT id FROM forms WHERE id = $1", [
      id,
    ]);
    if (formExists.rowCount === 0) {
      return res.status(404).send("Form not found");
    }

    const result = await db.query(
      "UPDATE forms SET title = $1, description = $2, username = $3 WHERE id = $4 RETURNING *",
      [title, description, username, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating form:", err);
    res.status(500).send("Error updating form");
  }
});

// Delete form and its associated questions
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const formExists = await db.query("SELECT id FROM forms WHERE id = $1", [id]);
    if (formExists.rowCount === 0) {
      return res.status(404).send("Form not found");
    }

    await db.query("DELETE FROM questions WHERE form_id = $1", [id]);
    
    await db.query("DELETE FROM forms WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting form:", err);
    res.status(500).send("Error deleting form");
  }
});


export default router;
