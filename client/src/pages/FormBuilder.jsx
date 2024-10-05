import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

// Components
import { CheckboxQuestion } from "../components/questions/CheckboxQuestion.jsx";
import { MultiLineQuestion } from "../components/questions/MultiLineQuestion.jsx";
import { NumberQuestion } from "../components/questions/NumberQuestion.jsx";
import { SingleLineQuestion } from "../components/questions/SingleLineQuestion.jsx";
// import { DateField } from "../components/questions/DateField.jsx";
// import { UserInfoField } from "../components/questions/UserInfoField.jsx";

export const FormBuilder = (props) => {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col>
          <div className="shadow bg-light p-5 rounded">
            <h1 className="text-center">Welcome to Form builder!</h1>
            <Form>
              {/* <div className="mb-5">
                <UserInfoField user="UserName" />
                <DateField />
              </div> */}
              <div>
                <SingleLineQuestion
                  title="Your Name"
                  description="Etner your name"
                />
                <MultiLineQuestion
                  title="Your bio"
                  description="Tell about yourself"
                />
                <NumberQuestion title="Your age" description="Enter your age" />
                <CheckboxQuestion title="Are you a developer?" props={"yes"} />
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
