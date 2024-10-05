import React from "react";
import { Form } from "react-bootstrap";

export const NumberQuestion = ({ title, description }) => {
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control type="number" min={0} placeholder="{description}" />
    </Form.Group>
  );
};
