import "./CommentsList.scss";

interface commentType {
  postedBy: string;
  text: string;
}

interface props {
  comments: commentType[];
}

function CommentsList({ comments }: props) {
  return (
    <div className="comments__container">
      <h3>Comments</h3>
      {comments.map((c: commentType) => (
        <div className="comment__item" key={c.postedBy}>
          <h6>{c.postedBy}</h6>
          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
