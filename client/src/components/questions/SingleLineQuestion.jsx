import React from "react";
import { Form } from "react-bootstrap";

export const SingleLineQuestion = ({ title, description }) => {
  return (
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">{title}</Form.Label>
        <Form.Control type="text" placeholder={description} />
      </Form.Group>
  );
};
