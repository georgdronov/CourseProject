import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MainPage = (props) => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 shadow bg-light p-5 rounded">
      <h1 className="text-center mb-5">Welcome to the Form Builder!</h1>

      <Button
        as={Link}
        to="/form-builder"
        variant="primary"
        className="mb-5"
        size="lg"
      >
        Build Form
      </Button>

      <h2 className="mb-4 text-center">Form Editor</h2>
      <Row className="mb-5 w-100">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Col md={6} lg={4} className="mb-4" key={idx}>
            <Card className="hover-shadow-lg">
              <Card.Header>Form {idx + 1}</Card.Header>
              <Card.Body>
                <Card.Title>Form Title {idx + 1}</Card.Title>
                <Card.Text>
                  This is a description of form {idx + 1}. You can edit this
                  form.
                </Card.Text>
                <Button variant="primary">Edit Form</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="mb-4 text-center">Fill Out Form</h2>
      <Row className="w-100">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Col md={6} lg={4} className="mb-4" key={idx}>
            <Card className="hover-shadow-lg">
              <Card.Header>Form {idx + 1}</Card.Header>
              <Card.Body>
                <Card.Title>Form Title {idx + 1}</Card.Title>
                <Card.Text>
                  This is a description of form {idx + 1}. You can fill out this
                  form.
                </Card.Text>
                <Button variant="success">Fill Out Form</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
