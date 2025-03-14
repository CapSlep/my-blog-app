import React from "react";
import ArticlesList from "../../components/ArticleList/ArticlesList";
import articles from "../../article-content";

function ArticlesPage() {
  return (
    <>
      <h1>Articles</h1>
      <ArticlesList articles={articles}></ArticlesList>
    </>
  );
}

export default ArticlesPage;
