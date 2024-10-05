import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Components
import { CheckboxQuestion } from "../components/questions/CheckboxQuestion.jsx";
import { MultiLineQuestion } from "../components/questions/MultiLineQuestion.jsx";
import { NumberQuestion } from "../components/questions/NumberQuestion.jsx";
import { SingleLineQuestion } from "../components/questions/SingleLineQuestion.jsx";
// import { DateField } from "../components/questions/DateField.jsx";
// import { UserInfoField } from "../components/questions/UserInfoField.jsx";

export const FormBuilder = (props) => {
  const [selectedQuestionType, setSelectedQuestionType] = React.useState("");

  const handleSelectChange = (event) => {
    setSelectedQuestionType(event.target.value);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col>
          <div className="shadow bg-light p-5 rounded">
            <h1 className="text-center mb-2">Welcome to Form builder!</h1>
            <h3>Create your own unique form</h3>
            <Form className="mt-4">
              <Form.Group controlId="questionTypeSelect">
                <Form.Label className="fw-bold">
                  Chose a question type
                </Form.Label>
                <Form.Select
                  aria-label="Chose a question type"
                  onChange={handleSelectChange}
                  value={selectedQuestionType}
                  className="mb-3"
                >
                  <option value="SingleLineQuestion">
                    Single Line Question
                  </option>
                  <option value="MultiLineQuestion">Multi Line Question</option>
                  <option value="NumberQuestion">Number Question</option>
                  <option value="CheckboxQuestion">Checkbox Question</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" className="mt-1">
                Create Question
              </Button>
            </Form>
            <div className="preview-section mt-5">
              <h3>Preview</h3>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
