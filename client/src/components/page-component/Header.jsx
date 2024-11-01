import React from "react";
import { Navbar, Button, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const username = localStorage.getItem("username");
  return (
    <Navbar fixed="top" className="shadow bg-light p-3 rounded">
      <Container className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {!isHomePage && (
            <Button as={Link} to="/" variant="primary" size="sm" className="me-3">
              Back to Main Page
            </Button>
          )}
        </div>

        <div className="d-flex align-items-center">
          <span className="me-3">Hello {username ? username : "Guest"}!</span>
          {!username ? (
            <>
              <Button as={Link} to="/login" variant="outline-primary" size="sm" className="me-2">
                Login
              </Button>
              <Button as={Link} to="/register" variant="outline-success" size="sm">
                Register
              </Button>
            </>
          ) : (
            <Button variant="outline-danger" size="sm" onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("username"); 
              window.location.reload();
            }}>
              Logout
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
};
