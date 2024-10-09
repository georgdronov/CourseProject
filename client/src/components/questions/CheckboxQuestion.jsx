import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export const CheckboxQuestion = ({ title, description, options }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold d-block">{title}</Form.Label>
      {description && (
        <Form.Text className="text-muted d-block mb-3">{description}</Form.Text>
      )}
      <Row>
        {options.map((option, index) => (
          <Col key={index} xs={12} sm={6} md={4}>
            <Form.Check type="checkbox" label={option} className="mb-2" />
          </Col>
        ))}
      </Row>
    </Form.Group>
  );
};
