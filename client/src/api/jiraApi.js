export async function createJiraTicket(issueData) {

const encodedToken = "ZHJvbm92Z2Vvcmc3MkBnbWFpbC5jb206QVRBVFQzeEZmR0YwU2Fpekg2ajdaTzNFbGp4Q2laYi05R3NTVERaTUt5NkhvQlAyeWR3dlBqTGw3S290dzhTOTJpenlidlZRaUhsVFZQY3pncHc4S0RzdmVXUG5ReWpZMXBvbnduN2NDRXRFTHpneHE5V0xuT05tUXY5QnNQWFFnb0hvWVZEcTBZRzQ3RnpFM0U0Sm5ydjJFTDVmWG5JbWoyRGR2aEc1NUl0WmxGNml3c0FocF84PUNBNjYyNkNE"

  try {
    const response = await fetch(
      "https://courseproject-5nrc.onrender.com/api/jira/create-ticket",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization" : `Basic ${encodedToken}`,
        },
        body: JSON.stringify(issueData),
        mode: "no-cors",
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
