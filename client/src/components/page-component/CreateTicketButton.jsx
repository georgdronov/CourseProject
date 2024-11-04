import React, { useState } from "react";
import axios from "axios";

export const CreateTicketButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreateTicket = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/jira/create-ticket`,
        {
          summary: "Test Summary",
          priority: "High",
          link: window.location.href,
          username: localStorage.getItem("username"),
        }
      );

      setMessage(`Ticket create success: ${response.data.ticket.key}`);
    } catch (error) {
      setMessage("Error with creating ticket");
      console.error("Error with creating ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleCreateTicket} disabled={isLoading}>
        {isLoading ? "Creating ticket..." : "Create ticket in Jira"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};
