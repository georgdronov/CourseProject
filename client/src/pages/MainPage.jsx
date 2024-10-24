import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MainPage = (props) => {
  const itemsPerPage = 6;

  const formsForEditing = Array.from({ length: 15 });
  const formsForFilling = Array.from({ length: 20 });

  const totalFormsEdit = formsForEditing.length;
  const totalFormsFill = formsForFilling.length;

  const [currentPageEdit, setCurrentPageEdit] = useState(1);
  const [currentPageFill, setCurrentPageFill] = useState(1);

  const indexOfLastEditItem = currentPageEdit * itemsPerPage;
  const indexOfFirstEditItem = indexOfLastEditItem - itemsPerPage;

  const indexOfLastFillItem = currentPageFill * itemsPerPage;
  const indexOfFirstFillItem = indexOfLastFillItem - itemsPerPage;

  const currentEditForms = formsForEditing.slice(
    indexOfFirstEditItem,
    indexOfLastEditItem
  );
  const currentFillForms = formsForFilling.slice(
    indexOfFirstFillItem,
    indexOfLastFillItem
  );

  const totalPagesEdit = Math.ceil(totalFormsEdit / itemsPerPage);
  const totalPagesFill = Math.ceil(totalFormsFill / itemsPerPage);

  const handleEditPageChange = (pageNumber) => setCurrentPageEdit(pageNumber);
  const handleFillPageChange = (pageNumber) => setCurrentPageFill(pageNumber);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 shadow bg-light p-5 rounded">
      <h1 className="text-center mb-5">Welcome to the Form Builder!</h1>

      <Button
        as={Link}
        to="/form-builder"
        variant="primary"
        className="mb-5"
        size="lg"
      >
        Build Form
      </Button>

      <h2 className="mb-4 text-center">Form Editor</h2>
      <Row className="mb-5 w-100">
        {currentEditForms.map((_, idx) => (
          <Col md={6} lg={4} className="mb-4" key={indexOfFirstEditItem + idx}>
            <Card className="hover-shadow-lg">
              <Card.Header>Form {indexOfFirstEditItem + idx + 1}</Card.Header>
              <Card.Body>
                <Card.Title>
                  Form Title {indexOfFirstEditItem + idx + 1}
                </Card.Title>
                <Card.Text>
                  This is a description of form {indexOfFirstEditItem + idx + 1}
                  . You can edit this form.
                </Card.Text>
                <Button variant="primary">Edit Form</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {totalPagesEdit > 1 && (
        <Pagination>
          {[...Array(totalPagesEdit).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPageEdit}
              onClick={() => handleEditPageChange(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}

      <h2 className="mb-4 text-center">Fill Out Form</h2>
      <Row className="w-100">
        {currentFillForms.map((_, idx) => (
          <Col md={6} lg={4} className="mb-4" key={indexOfFirstFillItem + idx}>
            <Card className="hover-shadow-lg">
              <Card.Header>Form {indexOfFirstFillItem + idx + 1}</Card.Header>
              <Card.Body>
                <Card.Title>
                  Form Title {indexOfFirstFillItem + idx + 1}
                </Card.Title>
                <Card.Text>
                  This is a description of form {indexOfFirstFillItem + idx + 1}
                  . You can fill out this form.
                </Card.Text>
                <Button variant="success">Fill Out Form</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {totalPagesFill > 1 && (
        <Pagination className="success-pagination">
          {[...Array(totalPagesFill).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPageFill}
              onClick={() => handleFillPageChange(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
};
