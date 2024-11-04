import express, { json } from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/create-ticket", async (req, res) => {
 
  const jiraUrl ="https://course-project-rust-seven.atlassian.net/rest/api/3/issue";
  const encodedToken = "ZHJvbm92Z2Vvcmc3MkBnbWFpbC5jb206QVRBVFQzeEZmR0YwU2Fpekg2ajdaTzNFbGp4Q2laYi05R3NTVERaTUt5NkhvQlAyeWR3dlBqTGw3S290dzhTOTJpenlidlZRaUhsVFZQY3pncHc4S0RzdmVXUG5ReWpZMXBvbnduN2NDRXRFTHpneHE5V0xuT05tUXY5QnNQWFFnb0hvWVZEcTBZRzQ3RnpFM0U0Sm5ydjJFTDVmWG5JbWoyRGR2aEc1NUl0WmxGNml3c0FocF84PUNBNjYyNkNE"

  console.log(JSON.stringify(req.body))

  try {
    const response = await fetch(jiraUrl, {
      method: "POST",
      headers: {
        "Authorization" : `Basic ${encodedToken}`,
        "Accept": "application/json",
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
