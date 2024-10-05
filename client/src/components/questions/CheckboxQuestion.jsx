import React from "react";
import { Form } from "react-bootstrap";


export const CheckboxQuestion = ({ title }) => {
  return (
    <Form.Group>
      <Form.Check type="checkbox" label="{title}" />
    </Form.Group>
  );
};
