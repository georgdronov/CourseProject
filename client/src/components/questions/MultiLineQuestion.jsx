import React from "react";
import { Form } from "react-bootstrap";

export const MultiLineQuestion = ({ title, description }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">{title}</Form.Label>
      <Form.Control as="textarea" rows={3} placeholder={description} style={{resize: "none"}}/>
    </Form.Group>
  );
};
