import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const jiraService = {
  async createTicket(summary, priority, link, username) {
    const url = `${process.env.JIRA_BASE_URL}/rest/api/3/issue`;
    const auth = {
      username: process.env.JIRA_EMAIL,
      password: process.env.JIRA_API_TOKEN,
    };

    const data = {
      fields: {
        project: {
          key: "SCRUM",
        },
        summary: summary,
        description: `Ticket created from ${link} by ${username}`,
        issuetype: {
          name: "Task",
        },
        priority: {
          name: priority,
        },
        reporter: {
          name: username,
        },
      },
    };

    console.log("Sending request to Jira:", { url, data, auth });

    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
        Authorization: `Basic ${Buffer.from(
          `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
        ).toString("base64")}`,
      });
      console.log("Response from Jira:", response.data);
      return response.data;
    } catch (error) {
      console.log(
        "Error with creation ticket in Jira",
        error.response ? error.response.data : error
      );
      throw error;
    }
  },
};
