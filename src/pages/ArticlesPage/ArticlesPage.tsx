import React from "react";
import ArticlesList from "../../components/ArticleList/ArticlesList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function ArticlesPage() {
  // const { isLoading, data: articles } = useFetch("/api/articles");
  const { data, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      return await axios.get("/api/articles");
    },
  });

  return (
    <>
      <h1>Articles</h1>
      <ArticlesList articles={data?.data} isLoading={isLoading}></ArticlesList>
    </>
  );
}

export default ArticlesPage;
