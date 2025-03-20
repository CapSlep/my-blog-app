import { useEffect, useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import "./AddCommentForm.scss";
import { useUser } from "../../hooks";

//interface to frame the component props
interface props {
  onAddComment: Function;
}

//form to create new Comment from callbacks
function AddCommentForm({ onAddComment }: props) {
  const [nameText, setNameText] = useState(""); //state to remember and pass name of comment creator in callback
  const [commentText, setCommentText] = useState(""); //state to remember and pass comment text in callback
  const [hasName, setHasName] = useState(false); //state to check if user has name
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      if (user.displayName && user.displayName.length > 0) {
        setHasName(true);
      }
    }
  }, [user]);

  return (
    <Form
      // className="add__comment-container"
      className="alert alert-dark"
      onSubmit={(e) => {
        e.preventDefault();
        if (user?.displayName) {
          onAddComment(user.displayName, commentText);
          setCommentText("");
        } else {
          onAddComment(nameText, commentText);
          setNameText("");
          setCommentText("");
        }
      }}
    >
      <h3 className="add__comment-title p-2">Add your Comment</h3>
      <Form.Group className="add__comment-label p-2">
        <Form.Label className="label__title">Comment as:</Form.Label>
        {hasName ? (
          user?.displayName
        ) : (
          <Form.Control
            className="input__area"
            type="text"
            value={nameText}
            onChange={(e) => {
              setNameText(e.target.value);
            }}
          />
        )}
      </Form.Group>
      <Form.Group className="add__comment-label p-2">
        <FloatingLabel label="Text" className="add__comment-text__floating">
          <Form.Control
            as="textarea"
            type="text"
            className="input__area-text"
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
            }}
          />
        </FloatingLabel>
      </Form.Group>

      <Button className="add__comment-button m-2" type="submit">
        Add Comment
      </Button>
    </Form>
  );
}

export default AddCommentForm;
