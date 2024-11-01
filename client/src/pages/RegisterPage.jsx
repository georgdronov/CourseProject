import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Header } from "../components/page-component/Header";

export const RegisterPage = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
        <Header/>
      <Form className="w-50 bg-light p-5 rounded shadow">
        <h2 className="mb-4 text-center">Register</h2>
        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100 mt-3">
          Register
        </Button>
      </Form>
    </Container>
  );
};

