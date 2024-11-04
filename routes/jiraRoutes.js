import express from "express";
import { jiraService } from "../services/jiraService.js";

const router = express.Router();

router.post("/create-ticket", async (req, res) => {
  const { summary, priority, link, username } = req.body;
  console.log("Received data:", req.body);
  
  if (!summary || !priority || !link || !username) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await jiraService.createTicket(
      summary,
      priority,
      link,
      username
    );
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
