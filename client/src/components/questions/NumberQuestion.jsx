import React from "react";
import { Form } from "react-bootstrap";

export const NumberQuestion = ({ title, description }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">{title}</Form.Label>
      <Form.Control type="number" min={0} placeholder={description} />
    </Form.Group>
  );
};
