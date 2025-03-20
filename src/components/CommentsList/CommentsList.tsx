import "./CommentsList.scss";

interface commentType {
  id: string; // add id property
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
      {comments?.map((c: commentType) => (
        <div className="alert alert-dark" key={c.id}>
          <h6>{c.postedBy}</h6>
          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentsList;
