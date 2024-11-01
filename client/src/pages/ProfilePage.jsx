import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Header } from "../components/page-component/Header";
import Loader from "../components/page-component/Spinner";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
  const [userForms, setUserForms] = useState([]);
  const [username, setUsername] = useState("");

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
        // Update the forms list after deletion
        setUserForms(userForms.filter(form => form.id !== id));
      } catch (error) {
        console.error("Error deleting form:", error);
      }
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 shadow bg-light p-5 rounded mt-5">
      <Header />
      <Loader />
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
                    {form.description || "Нет доступного описания"}
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
    </Container>
  );
};
