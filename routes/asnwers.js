import { Router } from "express";
import db from "../db.js"; 

const router = Router();

// Create new answer
router.post("/responses", async (req, res) => {
    const { form_id, question_id, answer, user_id } = req.body;
    try {
      if (!form_id || !question_id || !answer || !user_id) {
        return res.status(400).send("Missing required fields");
      }
  
      const formExists = await db.query("SELECT id FROM forms WHERE id = $1", [
        form_id,
      ]);
      const questionExists = await db.query(
        "SELECT id FROM questions WHERE id = $1",
        [question_id]
      );
  
      if (formExists.rowCount === 0) {
        return res.status(404).send("Form not found");
      }
  
      if (questionExists.rowCount === 0) {
        return res.status(404).send("Question not found");
      }
  
      const result = await db.query(
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
      const result = await db.query(
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