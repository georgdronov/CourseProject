import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const domain = process.env.DOMAIN;

const encodedToken = "ZHJvbm92Z2Vvcmc3MkBnbWFpbC5jb206QVRBVFQzeEZmR0YwU2Fpekg2ajdaTzNFbGp4Q2laYi05R3NTVERaTUt5NkhvQlAyeWR3dlBqTGw3S290dzhTOTJpenlidlZRaUhsVFZQY3pncHc4S0RzdmVXUG5ReWpZMXBvbnduN2NDRXRFTHpneHE5V0xuT05tUXY5QnNQWFFnb0hvWVZEcTBZRzQ3RnpFM0U0Sm5ydjJFTDVmWG5JbWoyRGR2aEc1NUl0WmxGNml3c0FocF84PUNBNjYyNkNE"


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
      headers: { "Content-Type": "application/json", "Authorization" : `Basic ${encodedToken}`, },
      
    };

    const response = await axios.post(`${baseUrl}/rest/api/3/issue`, data, config);

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
