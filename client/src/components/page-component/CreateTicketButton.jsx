import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

export const CreateTicketButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateTicket = async () => {
    setIsLoading(true);
    setMessage("");

    const projectKey = "SCRUM";
    const issueType = "Task";
    const summary = "Test Summary";
    const description = "Detailed description of the ticket.";

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/jira/create-ticket`,
        {
          projectKey,
          issueType,
          summary,
          description,
          link: window.location.href,
          username: localStorage.getItem("username"),
        }
      );

      if (response.data.ticket) {
        setMessage(`Ticket created successfully: ${response.data.ticket}`);
      } else {
        setMessage("Error with creating ticket: ticket data is undefined.");
      }
    } catch (error) {
      setMessage("Error with creating ticket");
      console.error("Error with creating ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleCreateTicket} disabled={isLoading}>
        {isLoading ? "Creating ticket..." : "Create ticket in Jira"}
      </Button>
      {message && <p>{message}</p>}
    </div>
  );
};
