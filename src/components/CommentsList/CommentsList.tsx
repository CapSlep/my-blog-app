import "./CommentsList.scss";
import { Button } from "react-bootstrap";
import { formatDate } from "../../utils";
import { useEffect, useState } from "react";

interface commentType {
  id: string; // add id property
  postedBy: string;
  text: string;
  creationTime: string;
}

interface props {
  comments: commentType[];
}

function CommentsList({ comments }: props) {
  const [commentsList, setCommentsList] = useState<commentType[] | undefined>(
    undefined
  );

  useEffect(() => {
    setCommentsList(
      comments?.slice().sort((a, b) => {
        return (
          new Date(b.creationTime).getTime() -
          new Date(a.creationTime).getTime()
        );
      })
    );
  }, [comments]);

  return (
    <div className="comments__container">
      <h3>Comments</h3>
      <div className="gap-2 d-flex flex-wrap justify-content-start">
        <Button
          onClick={() => {
            setCommentsList(commentsList?.slice().reverse());
          }}
        >
          Reset
        </Button>
      </div>
      {commentsList?.map((c: commentType) => (
        <div className="alert alert-dark" key={c.id}>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h6>{c.postedBy}</h6>{" "}
            <span>{formatDate(c?.creationTime || "")}</span>
          </div>

          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
