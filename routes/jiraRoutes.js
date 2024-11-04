import express from "express";
import { createIssue } from "../services/create-issue.js";

const router = express.Router();

router.post("/create-ticket", async (req, res) => {
  const { projectKey, issueType, summary, description } = req.body;
  console.log("Received data:", req.body);

  if (!projectKey || !issueType || !summary || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await createIssue(projectKey, issueType, summary, description);
    
    if (!result) {
      return res.status(500).json({ message: "Failed to create ticket in Jira" });
    }

    res.status(200).json({
      message: "Ticket created successfully",
      ticket: result,
    });
  } catch (error) {
    console.error("Error with creating ticket:", error);
    res.status(500).json({ message: "Error with creating ticket in Jira", error: error.message });
  }
});

export default router;
