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

    try {
      const response = await axios.post(url, data, {
        auth: auth,
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.log("Error with creation ticket in Jira", error);
      throw error;
    }
  },
};
