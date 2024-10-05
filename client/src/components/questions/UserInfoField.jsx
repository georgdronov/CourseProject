import React from "react";
import { Form } from "react-bootstrap";

export const UserInfoField = ({ user }) => {
  return (
    <Form.Group>
      <Form.Label>User</Form.Label>
      <Form.Control type="text" value={user} readOnly />
    </Form.Group>
  );
};
