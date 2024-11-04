import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const jiraService = {
  async createTicket(summary, priority, link) {
    const url = `${process.env.JIRA_BASE_URL}/rest/api/3/issue`;
    const auth = {
      username: process.env.JIRA_EMAIL,
      password: "ATATT3xFfGF0B-JSBu7SSMkTG5bQ7aKb_0GSmM_6V3r73S16DR7WWOx_0vwWU86jcNTFWo8moiRp6lhVeM1FeGSYDIcZsy51tcI0gJa5D9kYoBExymT0Jg9tjj2XYDHJkoEzEgEw93j8VjXeQ1TbYNuMu6xCm_ahcvFvJ5ZCvB3SC9oUC9dbQQc=E47ED5D0",
    };

    const username = localStorage.getItem("username");

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
