import React, { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import articles from "../../article-content";
import axios from "axios";
import { CommentsList, AddCommentForm } from "../../components";
import { Button } from "react-bootstrap";
import "./ArticlePage.scss";
import { useUser } from "../../hooks";

function ArticlePage() {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments: initialComments } =
    useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);
  const { isLoading, user } = useUser();

  async function upvoteClicked() {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(
      "/api/articles/" + name + "/upvote",
      null,
      { headers }
    );
    const updatedArticleData = response.data;
    setUpvotes(updatedArticleData.upvotes);
  }

  async function addComment(nameText: string, commentText: string) {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(
      "/api/articles/" + name + "/comments",
      {
        postedBy: nameText,
        text: commentText,
      },
      { headers }
    );
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
        {user && (
          <Button className="upvote__button" onClick={upvoteClicked}>
            Upvote
          </Button>
        )}
        <p className="upvote__text">
          This article has <span>{upvotes}</span> upvotes!
        </p>
      </div>
      {article.content.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {user ? (
        <AddCommentForm onAddComment={addComment}></AddCommentForm>
      ) : (
        <p>Log In to add a comment</p>
      )}

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
