import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;

const auth = {
  username: username,
  password: password,
};

export async function createIssue(projectKey, issueType, summary, description) {
  try {
    const baseUrl = `https://${domain}.atlassian.net`;
    const data = {
      fields: {
        project: { key: projectKey },
        summary: summary,
        description: description,
        issuetype: { name: issueType },
      },
    };

    const config = {
      headers: { "Content-Type": "application/json" },
      auth: auth,
    };

    const response = await axios.post(`${baseUrl}/rest/api/2/issue`, data, config);

    if (response.data && response.data.key) {
      return response.data.key; 
    } else {
      throw new Error("Ticket creation response missing key property.");
    }
  } catch (error) {
    console.error("Error in createIssue:", error.response?.data || error.message);
    console.error("Response status:", error.response?.status);
    console.error("Response headers:", error.response?.headers);
    throw new Error("Failed to create ticket in Jira");
  }
}
