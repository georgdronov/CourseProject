import React from "react";
import { Container } from "react-bootstrap";
import { CreateTicketButton } from "./CreateTicketButton";

export const Footer = () => {
  return (
    <footer className="shadow bg-light p-3 rounded fixed-bottom">
      <Container className="d-flex justify-content-center">
        <CreateTicketButton />
      </Container>
    </footer>
  );
};
