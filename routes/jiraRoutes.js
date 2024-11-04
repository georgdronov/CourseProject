import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/create-ticket", async (req, res) => {
  const jiraUrl =
    "https://course-project-rust-seven.atlassian.net/rest/api/3/issue";
  const jiraToken = process.env.ATLASSIAN_API_KEY;

  try {
    const response = await fetch(jiraUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jiraToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const status = response.status;
    const text = await response.text();

    if (!response.ok) {
      console.error(`Error from Jira API: status ${status}, response: ${text}`);
      return res
        .status(status)
        .json({ message: `Error creating ticket: ${text}` });
    }

    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error while creating ticket:", error);
    res.status(500).json({ message: "Server error while creating ticket" });
  }
});

export default router;
