import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const atlassianName = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;


export const jiraService = {
  async createTicket(summary, priority, link, username) {
    const url = `https://${domain}.atlassian.net/rest/api/2/issue`;
    const auth = {
      username: atlassianName,
      password: password,
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
          `${atlassianName}:${password}`
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
