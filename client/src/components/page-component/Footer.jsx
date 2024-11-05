import React from "react";
import { Container } from "react-bootstrap";
import CreateJiraTicket from "./CreateJiraTicket";

export const Footer = () => {
  return (
    <footer className="shadow bg-light p-3 rounded fixed-bottom">
      <Container className="d-flex justify-content-center">
        <CreateJiraTicket/>
      </Container>
    </footer>
  );
};
