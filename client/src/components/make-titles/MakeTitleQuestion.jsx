import React, { useState, useEffect, useCallback } from "react";

export const MakeTitleQuestion = ({ title, description, onUpdate }) => {
  const [title, setTitle] = useState("Etner title");
  const [description, setDescription] = useState("Enter description");

  useEffect(() => {
    onUpdate({
      titleQuestion: title,
      descriptionuestion: description,
    });
  }, [title, description, onUpdate]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  return(
  <div>
    <h3 className="mb-3 text-center">Enter form title</h3>
    <Form.Groupe controlId="formTitle">
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={handleTitleChange}
        />
    </Form.Groupe>
    <h3 className="mb-3 text-center">Enter form description</h3>
    <Form.Groupe controlId="formTitle">
        <Form.Control
          as="textarea" 
          rows={3}
          placeholder="Enter description"
          value={title}
          onChange={handleDescriptionChange}
          style={{ resize: "none" }}
        />
    </Form.Groupe>
  </div>    

  ) 
};
