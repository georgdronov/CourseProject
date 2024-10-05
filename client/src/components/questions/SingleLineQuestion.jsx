import React from "react";
import { Form } from "react-bootstrap";

export const SingleLineQuestion = ({ title, description }) => {
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control type="text" placeholder="{description}" />
    </Form.Group>
  );
};
