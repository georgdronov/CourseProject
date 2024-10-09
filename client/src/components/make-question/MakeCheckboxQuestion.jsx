import React, { useState, useCallback, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

export const ComponentName = ({
  id,
  title,
  description,
  options = [],
  onUpdate,
}) => {
  const [localTitle, setLocaltitle] = useState(title || "");
  const [localDescription, setLocalDescription] = useState(description || "");
  const [localOptions, setLocalOptions] = useState(options || [""]);

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
    onUpdate,
    options,
  ]);

  useEffect(() => {
    handleUpdate();
  }, [localTitle, localDescription, localOptions, handleUpdate]);

  const handleTitleChange = (e) => {
    setLocaltitle(e.target.value);
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
    const updateOptions = localOptions.filter((_, i) => i !== index);
    setLocalOptions(updatedOptions);
  };

  return (
    <div className="mb-3 shadow bg-light p-5 rounded">
      <h4 className="mb-3 text-center">Checkbox Question</h4>
      <Form.Group controlId={`questionTitle+${id}`} className="mb-3">
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
          value="localDescription"
          onChange={handleDescriptionChange}
        />
      </Form.Group>

      <h5 className="mb-3">
        Options
      </h5>


    </div>
  );
};
