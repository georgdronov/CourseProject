import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Header } from "../components/page-component/Header";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      console.log("Login successful");
    } else {
      setErrorMessage(data.message);
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Header />
      <Form className="w-50 bg-light p-5 rounded shadow" onSubmit={handleLogin}>
        <h2 className="mb-4 text-center">Login</h2>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Login
        </Button>
      </Form>
    </Container>
  );
};
