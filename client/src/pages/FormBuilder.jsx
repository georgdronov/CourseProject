import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// questions
import { CheckboxQuestion } from "../components/questions/CheckboxQuestion";
import { MultiLineQuestion } from "../components/questions/MultiLineQuestion";
import { NumberQuestion } from "../components/questions/NumberQuestion";
import { SingleLineQuestion } from "../components/questions/SingleLineQuestion";

// make questions
import { MakeTitleQuestion } from "../components/make-titles/MakeTitleQuestion";
import { MakeSingleLineQuestion } from "../components/make-question/MakeSingleLineQuestion";
import { MakeMultiLineQuestion } from "../components/make-question/MakeMultiLineQuestion";
import { MakeNumberQuestion } from "../components/make-question/MakeNumberQuestion";
import { MakeCheckboxQuestion } from "../components/make-question/MakeCheckboxQuestion";

export const FormBuilder = (props) => {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleUpdateForm = ({ title, description }) => {
    setFormTitle(title);
    setFormDescription(description);
  };

  const handleSelectChange = (event) => {
    setSelectedQuestionType(event.target.value);
  };

  const handleCreateQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: selectedQuestionType,
      title: "",
      description: "",
      options: [],
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestionType("");
  };

  const handleUpdateQuestion = (id, updateData) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updateData } : q))
    );
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedQuestions = Array.from(questions);
    const [movedQuestion] = updatedQuestions.splice(source.index, 1);
    updatedQuestions.splice(destination.index, 0, movedQuestion);
    setQuestions(updatedQuestions);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100">
          <Col className="col-12 col-md-6">
            <div className="shadow bg-light p-5 rounded">
              <h1 className="text-center mb-2">Form builder</h1>
              <Form className="mt-4">
                <MakeTitleQuestion
                  title={formTitle}
                  description={formDescription}
                  onUpdate={handleUpdateForm}
                  className="mb-4"
                />

                <Droppable droppableId="questions">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {questions.map((question, index) => {
                        const QuestionComponent = {
                          SingleLineQuestion: MakeSingleLineQuestion,
                          MultiLineQuestion: MakeMultiLineQuestion,
                          NumberQuestion: MakeNumberQuestion,
                          CheckboxQuestion: MakeCheckboxQuestion,
                        }[question.type];

                        return QuestionComponent ? (
                          <Draggable
                            key={question.id}
                            draggableId={question.id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`draggable-question mb-2 ${
                                  snapshot.isDragging ? "dragging" : ""
                                }`}
                                style={{
                                  transition: "transform 0.2s ease",
                                  transform: snapshot.isDragging
                                    ? "scale(1.05)"
                                    : "scale(1)",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <QuestionComponent
                                  id={question.id}
                                  title={question.title}
                                  description={question.description}
                                  options={question.options}
                                  onUpdate={handleUpdateQuestion}
                                  onDelete={handleDeleteQuestion}
                                />
                              </div>
                            )}
                          </Draggable>
                        ) : null;
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                <h3 className="mb-3">Create question</h3>
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
                    <option value="MultiLineQuestion">
                      Multi Line Question
                    </option>
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
            </div>
          </Col>
          <Col className="col-12 col-md-6">
            <div
              className="shadow bg-light p-5 rounded preview-section sticky-top"
              style={{ maxHeight: "100vh", overflowY: "auto" }}
            >
              <div className="preview-section mt-5">
                <h3 className="mb-4 h1 text-center">Preview</h3>
                <div className="mb-3 shadow bg-light p-5 rounded">
                  <h2 className="text-center">{formTitle || "Form Title"}</h2>
                  <p>{formDescription || "Form description goes here..."}</p>

                  {questions.map((question) => {
                    const QuestionComponent = {
                      SingleLineQuestion: SingleLineQuestion,
                      MultiLineQuestion: MultiLineQuestion,
                      NumberQuestion: NumberQuestion,
                      CheckboxQuestion: CheckboxQuestion,
                    }[question.type];

                    return QuestionComponent ? (
                      <QuestionComponent
                        key={question.id}
                        title={question.title}
                        description={question.description}
                        options={question.options}
                      />
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </DragDropContext>
  );
};
