export async function createJiraTicket(issueData) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/jira/create-ticket`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.ATLASSIAN_API_KEY}`,
        },
        body: JSON.stringify(issueData),
      }
    );

    if (!response.ok) {
      throw new Error(`Error create Ticket: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Ticket create:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
