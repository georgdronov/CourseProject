import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";

const CreateJiraTicket = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [summary, setSummary] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [issueType, setIssueType] = useState("Bug");
  const [reportedBy, setReportedBy] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("Opened"); // Добавляем статус

  const priorityMapping = {
    Highest: {
      id: "1",
      name: "Highest",
      self: "https://course-project-rust-seven.atlassian.net/rest/api/3/priority/1",
      iconUrl: "https://course-project-rust-seven.atlassian.net/images/icons/priorities/highest.svg",
    },
    High: {
      id: "2",
      name: "High",
      self: "https://course-project-rust-seven.atlassian.net/rest/api/3/priority/2",
      iconUrl: "https://course-project-rust-seven.atlassian.net/images/icons/priorities/high.svg",
    },
    Medium: {
      id: "3",
      name: "Medium",
      self: "https://course-project-rust-seven.atlassian.net/rest/api/3/priority/3",
      iconUrl: "https://course-project-rust-seven.atlassian.net/images/icons/priorities/medium.svg",
    },
    Low: {
      id: "4",
      name: "Low",
      self: "https://course-project-rust-seven.atlassian.net/rest/api/3/priority/4",
      iconUrl: "https://course-project-rust-seven.atlassian.net/images/icons/priorities/low.svg",
    },
    Lowest: {
      id: "5",
      name: "Lowest",
      self: "https://course-project-rust-seven.atlassian.net/rest/api/3/priority/5",
      iconUrl: "https://course-project-rust-seven.atlassian.net/images/icons/priorities/lowest.svg",
    },
  };

  const statusMapping = {
    Opened: { id: "10027", value: "Opened" },
    InProgress: { id: "10028", value: "In progress" },
    Fixed: { id: "10030", value: "Fixed" },
    Rejected: { id: "10029", value: "Rejected" },
  };

  useEffect(() => {
    const username = localStorage.getItem("username") || "Guest";
    setReportedBy(username);
    setLink(window.location.href);
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    setError(null);
    setMessage(null);
    setSummary("");
    setPriority("Medium");
    setIssueType("Bug");
    setStatus("Opened"); 
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    const ticketData = {
      fields: {
        project: { key: "SCRUM" },
        summary: summary,
        priority: priorityMapping[priority],
        description: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: `Reported by: ${reportedBy}\nPage link: ${link}`,
                },
              ],
            },
          ],
        },
        issuetype: { name: issueType },
        customfield_10049: statusMapping[status], 
      },
    };

    try {
      const response = await fetch(
        "https://courseproject-5nrc.onrender.com/api/jira/create-ticket",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
    <div>
      <Button variant="primary" onClick={handleModalShow}>
        Create Support Ticket
      </Button>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Jira Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <Form>
            <Form.Group controlId="summary">
              <Form.Label>Summary</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ticket summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="priority" className="mt-3">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Highest">Highest</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Lowest">Lowest</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="issueType" className="mt-3">
              <Form.Label>Issue Type</Form.Label>
              <Form.Control
                as="select"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
              >
                <option value="Bug">Bug</option>
                <option value="Story">Story</option>
                <option value="Task">Task</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="status" className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Opened">Opened</option>
                <option value="InProgress">In progress</option>
                <option value="Fixed">Fixed</option>
                <option value="Rejected">Rejected</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="reportedBy" style={{ display: "none" }}>
              <Form.Control type="text" value={reportedBy} readOnly />
            </Form.Group>
            <Form.Group controlId="link" style={{ display: "none" }}>
              <Form.Control type="text" value={link} readOnly />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Ticket"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateJiraTicket;
