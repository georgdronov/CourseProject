import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { Header } from "../components/page-component/Header";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
  const [userForms, setUserForms] = useState([]);
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    consent: false,
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    const fetchUserForms = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/forms`);
        const data = await response.json();

        const filteredForms = data.filter(form => form.username === storedUsername);
        setUserForms(filteredForms);
      } catch (error) {
        console.error("Error loading user forms:", error);
      }
    };

    fetchUserForms();
  }, []);

  const handleDeleteForm = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this form?");
    if (confirmDelete) {
      try {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/forms/${id}`, {
          method: "DELETE",
        });
        setUserForms(userForms.filter(form => form.id !== id));
      } catch (error) {
        console.error("Error deleting form:", error);
      }
    }
  };

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    handleModalClose(); 
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 shadow bg-light p-5 rounded mt-5">
      <Header />
      <h1 className="text-center mb-5">Hello, {username}!</h1>
      <h2 className="text-center mb-4">Your Forms</h2>

      {userForms.length === 0 ? (
        <p className="text-danger text-center">You have not created any forms yet.</p>
      ) : (
        <Row className="w-100">
          {userForms.map((form) => (
            <Col md={6} lg={4} className="mb-4" key={form.id}>
              <Card className="hover-shadow-lg">
                <Card.Header>Author: {form.username}</Card.Header>
                <Card.Body>
                  <Card.Title>{form.title}</Card.Title>
                  <Card.Text>
                    {form.description || "No description available"}
                  </Card.Text>
                  <Button variant="primary" as={Link} to={`/form-builder/${form.id}`}>
                    Edit Form
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteForm(form.id)}
                    className="ms-2"
                  >
                    Delete Form
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <h2 className="text-center mt-5">Additional Information</h2>
      <p className="text-center mb-4">
        Subscribe to our newsletter to stay updated with the latest news and insights! 
        Join our community and never miss out on valuable information that can help you grow and succeed.
      </p>
      <Button variant="info" onClick={handleModalShow}>
        Subscribe to Newsletter
      </Button>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Newsletter Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your first name" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your last name" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter your email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox" 
                label="I confirm that my personal data can be processed" 
                name="consent" 
                checked={formData.consent} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Subscribe
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
