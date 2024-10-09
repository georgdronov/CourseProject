import React, { useState, useCallback, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

export const MakeCheckboxQuestion = ({
  id,
  title,
  description,
  options = [],
  onUpdate,
  onDelete
}) => {
  const [localTitle, setLocalTitle] = useState(title || "");
  const [localDescription, setLocalDescription] = useState(description || "");
  const [localOptions, setLocalOptions] = useState(
    options.length ? options : [""]
  );

  const handleUpdate = useCallback(() => {
    if (
      localTitle !== title ||
      localDescription !== description ||
      localOptions !== options
    ) {
      onUpdate(id, {
        title: localTitle,
        description: localDescription,
        options: localOptions,
      });
    }
  }, [
    localTitle,
    localDescription,
    localOptions,
    id,
    title,
    description,
    options,
    onUpdate,
  ]);

  useEffect(() => {
    handleUpdate();
  }, [localTitle, localDescription, localOptions, handleUpdate]);

  const handleTitleChange = (e) => {
    setLocalTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setLocalDescription(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...localOptions];
    updatedOptions[index] = value;
    setLocalOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setLocalOptions([...localOptions, ""]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = localOptions.filter((_, i) => i !== index);
    setLocalOptions(updatedOptions);
  };

  return (
    <div className="mb-3 shadow bg-light p-5 rounded position-relative">
      <h4 className="mb-3 text-center">Checkbox Question</h4>
      <Button
        variant="link" 
        className="position-absolute  end-0 m-2 p-0" 
        onClick={() => onDelete(id)}
        style={{ fontSize: "1.5rem", color: "black", textDecoration: "none", top:"-10px" }}
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
          type="text"
          placeholder="Enter question description"
          value={localDescription}
          onChange={handleDescriptionChange}
        />
      </Form.Group>

      <Form.Label className="fw-bold">Options</Form.Label>
      {localOptions.map((option, index) => (
        <div key={index} className="d-flex mb-2">
          <Form.Control
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="me-2"
          />
          {localOptions.length > 1 && (
            <Button variant="danger" onClick={() => handleRemoveOption(index)}>
              Remove
            </Button>
          )}
        </div>
      ))}
      <Button variant="secondary" onClick={handleAddOption} className="mt-2">
        Add Option
      </Button>
    </div>
  );
};
