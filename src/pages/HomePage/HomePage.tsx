import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./HomePage.scss";
import { useFetch } from "../../hooks";
import { ArticleCard } from "../../components";

function HomePage() {
  const { response, isLoading } = useFetch("articles", "/api/articles");

  const mostUpvotedArticle = response?.data.reduce((prev: any, current: any) =>
    prev.upvotes > current.upvotes ? prev : current
  );

  const mostCommentedArticle = response?.data.reduce(
    (prev: any, current: any) =>
      prev.comments.lenght > current.comments.lenght ? prev : current
  );

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
            <ArticleCard
              cardData={mostUpvotedArticle}
              isLoading={isLoading}
            ></ArticleCard>
          </Col>
          <Col>
            <h4>The most Commented Article</h4>
            <ArticleCard
              cardData={mostCommentedArticle}
              isLoading={isLoading}
            ></ArticleCard>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
