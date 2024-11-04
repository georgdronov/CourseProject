export async function createJiraTicket(issueData) {
  const encodedToken =
    "QVRBVFRMM3hGZkdGMFNhSGl6SDZqN1pPM0VsA3hDaU1iLTlHc1NEWk1LeGo2SG9CUDJ5eHZwUGpMbDdLb3R3OHM5Mnp6eWJ2VFFpSGxUVnBjWnRycDgwS0RzdmVXRHBYM0x1Y3l5LVRQZnVRR3BTTzhCZ0RlNHRwRUR4Y3Q0NjYyNkNENQ==";
  const decodeToken = (encoded) => {
    return atob(encoded);
  };
  const token = decodeToken(encodedToken);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/jira/create-ticket`,
      {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
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
