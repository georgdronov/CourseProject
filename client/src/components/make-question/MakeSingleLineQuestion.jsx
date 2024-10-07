import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { SingleLineQuestion } from "../questions/SingleLineQuestion.jsx";

export const MakeSingleLineQuestion = ({
  id,
  title,
  description,
  onUpdate,
}) => {
  const [localTitle, setLocalTitle] = useState(title || "");
  const [localDescription, setLocalDescription] = useState(description || "");

  const handleTitleChange = (e) => {
    setLocalTitle(e.target.value);
    onUpdate(id, { title: e.target.value, description: localDescription });
  };

  const handleDescriptionChange = (e) => {
    setLocalTitle(e.target.value);
    onUpdate(id, { title: localTitle, description: e.target.value });
  };

  return (
    <div className="mb-3">
      <Form.Group controlId={`questionTitle_${id}`} className="mb-3">
        <Form.Label className="fw-bold">Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Etner question title"
          value={localTitle}
          onChange={handleTitleChange}
        />
      </Form.Group>

      <Form.Group controlId={`questionDescription_${id}`} className="mb-3">
        <Form.Label className="fw-bold">Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Etner question description"
          value={localDescription}
          onChange={handleDescriptionChange}
        />
      </Form.Group>
    </div>
  );
};
