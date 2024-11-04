export async function createJiraTicket(issueData) {

  try {
    const response = await fetch(
      "https://courseproject-5nrc.onrender.com/api/jira/create-ticket",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: issueData,
        mode: "no-cors",
        
      }
    );
    console.log(issueData)

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
