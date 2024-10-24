import React, { useState, useEffect, useCallback } from "react";
import { Form } from "react-bootstrap";

export const MakeTitleQuestion = ({
  title: formTitle,
  description: formDescription,
  onUpdate,
}) => {
  const [localTitle, setLocalTitle] = useState(formTitle || "");
  const [localDescription, setLocalDescription] = useState(formDescription || "");

  useEffect(() => {
    setLocalTitle(formTitle || "");
  }, [formTitle]);

  useEffect(() => {
    setLocalDescription(formDescription || "");
  }, [formDescription]);

  const handleUpdate = useCallback(() => {
    if (localTitle !== formTitle || localDescription !== formDescription) {
      console.log("Updating:", { title: localTitle, description: localDescription });
      onUpdate({ title: localTitle, description: localDescription });
    }
  }, [localTitle, localDescription, formTitle, formDescription, onUpdate]);

  useEffect(() => {
    handleUpdate();
  }, [localTitle, localDescription]); 

  return (
    <div className="mb-3">
      <Form.Group controlId="formTitle">
        <h3 className="mb-3">Create form title</h3>
        <Form.Control
          type="text"
          placeholder="Enter form title"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formDescription" className="mt-3">
        <h3 className="mb-3">Create form description</h3>
        <Form.Control
          as="textarea"
          placeholder="Enter form description"
          rows={3}
          value={localDescription}
          onChange={(e) => setLocalDescription(e.target.value)}
          style={{ resize: "none" }}
        />
      </Form.Group>
    </div>
  );
};
