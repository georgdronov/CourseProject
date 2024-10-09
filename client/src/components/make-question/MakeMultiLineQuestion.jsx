import React, { useState, useEffect, useCallback } from "react";
import { Form, Button } from "react-bootstrap";

export const MakeMultiLineQuestion = ({ id, title, description, onUpdate, onDelete }) => {
  const [localTitle, setLocalTitle] = useState(title || "");
  const [localDescription, setLocalDescription] = useState(description || "");

  const handleUpdate = useCallback(() => {
    if (localTitle !== title || localDescription !== description) {
      onUpdate(id, { title: localTitle, description: localDescription });
    }
  }, [
    localTitle,
    localDescription,
    id,
    title,
    description,
    onUpdate,
  ]);

  useEffect(() => {
    handleUpdate();
  }, [localTitle, localDescription, id, title, description, handleUpdate]);

  const handleTitleChange = (e) => {
    setLocalTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setLocalDescription(e.target.value);
  };

  return (
    <div className="mb-3 shadow bg-light p-5 rounded position-relative">
      <h4 className="mb-3 text-center">Multi Line Question</h4>
      <Button
        variant="link"
        className="position-absolute  end-0 m-2 p-0"
        onClick={() => onDelete(id)}
        style={{
          fontSize: "1.5rem",
          color: "black",
          textDecoration: "none",
          top: "-10px",
        }}
      >
        &times;
      </Button>
      <Form.Group controlId={`questionTitle_${id}`} className="mb-3">
        <Form.Label className="fw-bold">Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter question title"
          value={localTitle}
          onChange={handleTitleChange}
        />
      </Form.Group>
      <Form.Group controlId={`questionDescription_${id}`} className="mb-3">
        <Form.Label className="fw-bold">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter question description"
          value={localDescription}
          onChange={handleDescriptionChange}
          style={{ resize: "none" }}
        />
      </Form.Group>
    </div>
  );
};
