import React, { useState, useEffect } from "react";
import { Spinner, Container } from "react-bootstrap";

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/forms`)
      .then((response) => response.json())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (<></>);
};

export default Loader;
