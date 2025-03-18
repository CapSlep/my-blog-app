import React from "react";
import { ArticlesList } from "../../components";
import { useFetch } from "../../hooks";

function ArticlesPage() {
  const { response, isLoading } = useFetch("articles", "/api/articles");

  return (
    <>
      <h1>Articles</h1>
      <ArticlesList
        articles={response?.data}
        isLoading={isLoading}
      ></ArticlesList>
    </>
  );
}

export default ArticlesPage;
