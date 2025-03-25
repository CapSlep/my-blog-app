import "./CommentsList.scss";
import { Button, ToggleButton } from "react-bootstrap";
import { formatDate } from "../../utils";
import { useUser } from "../../hooks";
import { useState } from "react";
import { LikeButton } from "../";

interface commentType {
  id: string; // add id property
  postedBy: string;
  text: string;
  creationTime: string | undefined;
}

interface props {
  comments: commentType[];
}

function CommentsList({ comments }: props) {
  const { user } = useUser(); //getting user from useUser hook

  return (
    <div className="comments__container">
      <h3>Comments</h3>
      <div className="gap-2 d-flex flex-wrap justify-content-start">
        <Button
          onClick={() => {
            // sortArticles(SortMethods.upvotes);
          }}
        >
          Sort by Upvotes
        </Button>
        <Button
          onClick={() => {
            // sortArticles(SortMethods.time);
          }}
        >
          Sort by Time
        </Button>
        <Button
          onClick={() => {
            // sortArticles(SortMethods.default);
          }}
        >
          Reset
        </Button>
      </div>
      {comments?.map((c: commentType) => (
        <div className="alert alert-dark" key={c.id}>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h6>{c.postedBy}</h6>{" "}
            <span>{formatDate(c?.creationTime || "")}</span>
          </div>

          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <p>{c.text}</p>
            <div>{user && <LikeButton></LikeButton>}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
