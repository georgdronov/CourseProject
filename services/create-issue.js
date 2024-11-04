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
    const response = await axios.post(
      `${baseUrl}/rest/api/2/issue`,
      data,
      config
    );
    return response.data.key; 
  } catch (error) {
    console.error("Error in createIssue:", error.response?.data?.errors || error.message);
    return null;
  }
}
