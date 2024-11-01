import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Header } from "../components/page-component/Header";

export const MainPage = () => {
  const itemsPerPage = 6;

  const [editForms, setEditForms] = useState([]);
  const [fillForms, setFillForms] = useState([]);
  const [currentPageEdit, setCurrentPageEdit] = useState(1);
  const [currentPageFill, setCurrentPageFill] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchForms = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/forms`);
      const data = await response.json();
      console.log("Fetched forms:", data);
      setEditForms(data);
      setFillForms(data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const fetchUsernames = async (formArray) => {
    const promises = formArray.map(async (form) => {
      if (form.userId) {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/users/${form.userId}`
        );
        const userData = await response.json();
        return { ...form, username: userData.username };
      } else {
        return { ...form, username: "Unknown" };
      }
    });

    return Promise.all(promises);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchForms();
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const addUsernamesToForms = async () => {
      const editFormsWithUsernames = await fetchUsernames(editForms);
      const fillFormsWithUsernames = await fetchUsernames(fillForms);
      setEditForms(editFormsWithUsernames);
      setFillForms(fillFormsWithUsernames);
    };

    if (editForms.length > 0) {
      addUsernamesToForms();
    }
  }, [editForms, fillForms]);

  const handleDeleteForm = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this form?"
    );
    if (confirmDelete) {
      try {
        await fetch(`${process.env.REACT_APP_SERVER_URL}/forms/${id}`, {
          method: "DELETE",
        });
        fetchForms();
      } catch (error) {
        console.error("Error deleting form:", error);
      }
    }
  };

  const indexOfLastEditItem = currentPageEdit * itemsPerPage;
  const indexOfFirstEditItem = indexOfLastEditItem - itemsPerPage;

  const indexOfLastFillItem = currentPageFill * itemsPerPage;
  const indexOfFirstFillItem = indexOfLastFillItem - itemsPerPage;

  const currentEditForms = editForms.slice(
    indexOfFirstEditItem,
    indexOfLastEditItem
  );
  const currentFillForms = fillForms.slice(
    indexOfFirstFillItem,
    indexOfLastFillItem
  );

  const totalPagesEdit = Math.ceil(editForms.length / itemsPerPage);
  const totalPagesFill = Math.ceil(fillForms.length / itemsPerPage);

  const handleEditPageChange = (pageNumber) => setCurrentPageEdit(pageNumber);
  const handleFillPageChange = (pageNumber) => setCurrentPageFill(pageNumber);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 shadow bg-light p-5 rounded mt-5">
      <Header />
      <h1 className="text-center mb-5">Welcome to the Form Builder!</h1>

      {isLoggedIn ? (
        <Button
          as={Link}
          to="/form-builder"
          variant="primary"
          className="mb-5"
          size="lg"
        >
          Build Form
        </Button>
      ) : (
        <p className="text-danger mb-5">
          To create a form, you must be logged in.
        </p>
      )}

      {isLoggedIn && (
        <>
          <h2 className="mb-4 text-center">Form Editor</h2>
          <Row className="mb-5 w-100">
            {currentEditForms.map((form) => (
              <Col md={6} lg={4} className="mb-4" key={form.id}>
                <Card className="hover-shadow-lg">
                  <Card.Header>Author: {form.username}</Card.Header>
                  <Card.Body>
                    <Card.Title>{form.title}</Card.Title>
                    <Card.Text>
                      {form.description || "No description available"}
                    </Card.Text>
                    <Button
                      variant="primary"
                      as={Link}
                      to={`/form-builder/${form.id}`}
                    >
                      Edit Form
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteForm(form.id)}
                      className="ms-2"
                    >
                      Delete Form
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {totalPagesEdit > 1 && (
            <Pagination className="mb-4">
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
        </>
      )}

      <h2 className="mb-4 text-center">Fill Out Form</h2>
      <Row className="w-100">
        {currentFillForms.map((form) => (
          <Col md={6} lg={4} className="mb-4" key={form.id}>
            <Card className="hover-shadow-lg">
              <Card.Header>Author: {form.username}</Card.Header>
              <Card.Body>
                <Card.Title>{form.title}</Card.Title>
                <Card.Text>
                  {form.description || "No description available"}
                </Card.Text>
                <Button variant="success">Fill Out Form</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {totalPagesFill > 1 && (
        <Pagination className="success-pagination mb-2">
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
