import React from "react";
import { ArticlesList } from "../../components";
import { useFetch } from "../../hooks";
import { Container } from "react-bootstrap";

function ArticlesPage() {
  const { response, isLoading } = useFetch("articles", "/api/articles");

  return (
    <Container fluid="md">
      <h1>Articles</h1>
      <ArticlesList
        articles={response?.data}
        isLoading={isLoading}
      ></ArticlesList>
    </Container>
  );
}

export default ArticlesPage;
