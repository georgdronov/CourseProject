import React from "react";
import { Form } from "react-bootstrap";


export const CheckboxQuestion = ({ title, props }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">{title}</Form.Label>
      <Form.Check type="checkbox" label={props} />
    </Form.Group>
  );
};
