import React from "react";
import { Form } from "react-bootstrap";

export const MultiLineQuestion = ({ title, description }) => {
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control as="textarea" rows={3} placeholder="{description}" />
    </Form.Group>
  );
};
