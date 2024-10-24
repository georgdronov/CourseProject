import { Router } from "express";
import db from "../db.js";

const router = Router();

// Creating a new form
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

// Getting all forms
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

// Getting a specific form by ID
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

// Updating a form
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

// Deleting a form
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

export default router;