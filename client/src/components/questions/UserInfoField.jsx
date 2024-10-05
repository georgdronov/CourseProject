import React from "react";
import { Form } from "react-bootstrap";

export const UserInfoField = ({ user }) => {
  return (
    <Form.Group className="mb-2">
      <Form.Label className="fw-bold">User</Form.Label>
      <Form.Control type="text" value={user} readOnly />
    </Form.Group>
  );
};
