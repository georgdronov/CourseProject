import React from "react";
import { Form } from "react-bootstrap";

export const DateField = (props) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Form.Group className="mb-2">
      <Form.Label className="fw-bold">Date</Form.Label>
      <Form.Control type="text" value={currentDate} readOnly />
    </Form.Group>
  );
};
