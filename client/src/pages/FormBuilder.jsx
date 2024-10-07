import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// questions
import { CheckboxQuestion } from "../components/questions/CheckboxQuestion.jsx";
import { MultiLineQuestion } from "../components/questions/MultiLineQuestion.jsx";
import { NumberQuestion } from "../components/questions/NumberQuestion.jsx";
import { SingleLineQuestion } from "../components/questions/SingleLineQuestion.jsx";

// make question
import { MakeSingleLineQuestion } from "../components/make-question/MakeSingleLineQuestion.jsx";

export const FormBuilder = (props) => {
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedQuestionType(event.target.value);
  };

  const handleCreateQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: selectedQuestionType,
      title: "",
      description: "",
      options: [], // maybe later add options
    };

    setQuestions([...questions, newQuestion]);
    setSelectedQuestionType("");
  };

  const handleUpdateQuestion = (id, updateData) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updateData } : q))
    );
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col>
          <div className="shadow bg-light p-5 rounded">
            <h1 className="text-center mb-2">Welcome to Form builder!</h1>
            <h3>Create your own unique form</h3>
            <Form className="mt-4">



              {questions.map((question) => {
                const QuestionComponent = {
                  SingleLineQuestion: MakeSingleLineQuestion,
                  // MultiLineQuestion: MakeMultiLineQuestion,
                  // NumberQuestion: MakeNumberQuestion,
                  // CheckboxQuestion: MakeCheckboxQuestion,
                }[question.type];

                return QuestionComponent ? (
                  <QuestionComponent
                    key={question.id}
                    id={question.id}
                    title={question.title}
                    description={question.description}
                    options={question.options}
                    onUpdate={handleUpdateQuestion}
                  />
                ) : null;
              })}

              <Form.Group controlId="questionTypeSelect">
                <Form.Label className="fw-bold">
                  Choose a question type
                </Form.Label>
                <Form.Select
                  aria-label="Choose a question type"
                  onChange={handleSelectChange}
                  value={selectedQuestionType}
                  className="mb-3"
                >
                  <option value="">Select a question type</option>
                  <option value="SingleLineQuestion">
                    Single Line Question
                  </option>
                  <option value="MultiLineQuestion">Multi Line Question</option>
                  <option value="NumberQuestion">Number Question</option>
                  <option value="CheckboxQuestion">Checkbox Question</option>
                </Form.Select>
              </Form.Group>
              <Button
                variant="primary"
                className="mt-1"
                onClick={handleCreateQuestion}
              >
                Create Question
              </Button>
            </Form>
            <div className="preview-section mt-5">
              <h3 className="mb-4">Preview</h3>
              <div className="mb-3 shadow bg-light p-5 rounded">
                {questions.map((question) =>
                  question.type === "SingleLineQuestion" ? (
                    <SingleLineQuestion
                      key={question.id}
                      title={question.title}
                      description={question.description}
                    />
                  ) : null
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
