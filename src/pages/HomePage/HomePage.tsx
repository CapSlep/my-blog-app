import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./HomePage.scss";
import { useFetch } from "../../hooks";
import { ArticleCard } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faUsers, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
    <>
      <div className="home__hero d-flex flex-column gap-3">
        <h1 className="home__header  fs-1 m-0">
          Welcome to <span className="gradient-text">ThoughtSphere</span>!
        </h1>
        <h4 className="home__subheader fs-5 my-3 text-secondary">
          ThoughtSphere is a platform where you can share ideas, and engage with
          a community of thinkers.
        </h4>
        <div>
          <Button as={Link as any} to={"/articles"} variant="primary" size="lg">
            Browse Articles
          </Button>
        </div>
      </div>

      <Container fluid="md" className="home__container py-5">
        <h4 className="fs-2 pb-3">Featured Articles</h4>
        <div>
          <Row className="g-4 py-3">
            <Col xs={12} md={6} lg={6}>
              <ArticleCard
                cardData={mostUpvotedArticle}
                isLoading={isLoading}
              ></ArticleCard>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <ArticleCard
                cardData={mostCommentedArticle}
                isLoading={isLoading}
              ></ArticleCard>
            </Col>
          </Row>
          <Row>
            <Button
              as={Link as any}
              to={"/articles"}
              variant="link"
              className=" mt-3"
            >
              View all articles...
            </Button>
          </Row>
        </div>
      </Container>

      <div className="text-center bg-light py-5">
        <Container fluid="md">
          <h4 className="fs-2">Why join us</h4>
          <h6 className="fs-5 text-secondary">
            Discover an engaged community of readers and writers who share your
            passions.
          </h6>
          <Row className="g-4 py-3 text-start">
            <Col xs={12} md={6} lg={4}>
              <Card className="p-3 shadow-sm">
                <div className="fs-2 text-primary">
                  <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                </div>
                <h3>Express Yourself</h3>
                <p>
                  Share your ideas, stories, and expertise with a global
                  audience.
                </p>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Card className="p-3 shadow-sm">
                <div className="fs-2 text-primary">
                  <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
                </div>
                <h3>Express Yourself</h3>
                <p>
                  Share your ideas, stories, and expertise with a global
                  audience.
                </p>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <Card className="p-3 shadow-sm">
                <div className="fs-2 text-primary">
                  <FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>
                </div>
                <h3>Express Yourself</h3>
                <p>
                  Share your ideas, stories, and expertise with a global
                  audience.
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default HomePage;
