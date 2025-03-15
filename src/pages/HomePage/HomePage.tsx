import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./HomePage.scss";

function HomePage() {
  return (
    <div className="home__container">
      <h1 className="home__header">Welcome to My Blog App!</h1>
      <h4 className="home__subheader">
        In this Blog you can find many articles about different topics.
      </h4>
      <Container>
        <Row>
          <Col>
            <h4>The most Upvoted Article</h4>
          </Col>
          <Col>
            <h4>The most Upvoted Article</h4>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
