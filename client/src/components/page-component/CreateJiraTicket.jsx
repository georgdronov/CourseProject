import React, { useState } from "react";
import { Button, Alert, Container } from "react-bootstrap";

const CreateJiraTicket = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    const ticketData = {
      fields: {
        project: {
          key: "SCRUM",
        },
        summary: "London is the capital of Great Britain 5",
        description: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "London is the capital of Great Britain 5",
                },
              ],
            },
          ],
        },
        issuetype: {
          name: "Bug",
        },
      },
    };

    try {
      const response = await fetch(
        "https://courseproject-5nrc.onrender.com/api/jira/create-ticket",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketData),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error: ${errorMessage}`);
      }

      const data = await response.json();
      setMessage("Ticket created successfully with ID: " + data.id);
    } catch (err) {
      setError("Failed to create ticket: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <Button onClick={handleSubmit} disabled={loading} variant="primary">
        {loading ? "Creating Ticket..." : "Create Ticket in Jira"}
      </Button>

      {error && (
        <Alert
          variant="danger"
          onClose={() => setError(null)}
          dismissible
          className="position-fixed"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "300px",
            zIndex: 1050,
          }}
        >
          {error}
        </Alert>
      )}

      {message && (
        <Alert
          variant="success"
          onClose={() => setMessage(null)}
          dismissible
          className="position-fixed"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "300px",
            zIndex: 1050,
          }}
        >
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default CreateJiraTicket;
