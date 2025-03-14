import React, { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import articles from "../../article-content";
import axios from "axios";
import { CommentsList, AddCommentForm } from "../../components";
import { Button } from "react-bootstrap";
import "./ArticlePage.scss";

function ArticlePage() {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments: initialComments } =
    useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);

  async function upvoteClicked() {
    const response = await axios.post("/api/articles/" + name + "/upvote");
    const updatedArticleData = response.data;
    setUpvotes(updatedArticleData.upvotes);
  }

  async function addComment(nameText: string, commentText: string) {
    const response = await axios.post("/api/articles/" + name + "/comments", {
      postedBy: nameText,
      text: commentText,
    });
    const updatedArticleData = response.data;
    setComments(updatedArticleData.comments);
  }

  const article = articles.find((a) => a.name === name);

  if (!article) {
    throw new Error("No such article");
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvote__container">
        <Button className="upvote__button" onClick={upvoteClicked}>
          Upvote
        </Button>
        <p className="upvote__text">
          This article has <span>{upvotes}</span> upvotes!
        </p>
      </div>
      {article.content.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <AddCommentForm onAddComment={addComment}></AddCommentForm>
      <CommentsList comments={comments}></CommentsList>
    </>
  );
}

export async function loader({ params }: any) {
  const response = await axios.get("/api/articles/" + params.name);
  const { upvotes, comments } = response.data;
  return { upvotes, comments };
}

export default ArticlePage;
