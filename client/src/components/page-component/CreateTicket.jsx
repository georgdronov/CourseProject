import React, { useState } from "react";
import { createJiraTicket } from "../../api/jiraApi";

export const CreateTicket = () => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCreateTicket = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const issueData = {"fields":{"project":{"key":"SCRUM"},"summary":"TEST2","description":{"type":"doc","version":1,"content":[{"type":"paragraph","content":[{"type":"text","text":"TEST2"}]}]},"issuetype":{"name":"Bug"}}};

    try {
      const data = await createJiraTicket(issueData);
      setSuccess(`Ticket created: ${data.key}`);
    } catch (err) {
      setError(`Error creating ticket: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create a Jira Ticket</h2>
      <button onClick={handleCreateTicket} disabled={loading}>
        {loading ? "Creating..." : "Create Ticket"}
      </button>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
