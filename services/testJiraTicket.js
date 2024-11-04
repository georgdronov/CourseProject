import axios from "axios";

async function createJiraTicket() {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/jira/create-ticket",
      {
        summary: "Test Summary",
        priority: "High",
        link: "https://google.com/",
      }
    );
    console.log("Ticket create successful", response.data);
  } catch (error) {
    console.error("Error with creating ticket", error);
  }
}

createJiraTicket()
