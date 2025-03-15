import { useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import "./AddCommentForm.scss";

//interface to frame the component props
interface props {
  onAddComment: Function;
}

//form to create new Comment from callbacks
function AddCommentForm({ onAddComment }: props) {
  const [nameText, setNameText] = useState(""); //state to remember and pass name of comment creator in callback
  const [commentText, setCommentText] = useState(""); //state to remember and pass comment text in callback

  return (
    <Form
      className="add__comment-container"
      onSubmit={(e) => {
        e.preventDefault();
        onAddComment(nameText, commentText);
        setNameText("");
        setCommentText("");
      }}
    >
      <h3 className="add__comment-title">Add your Comment</h3>
      <Form.Group className="add__comment-label">
        <Form.Label className="label__title">Name:</Form.Label>
        <Form.Control
          className="input__area"
          type="text"
          value={nameText}
          onChange={(e) => {
            setNameText(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="add__comment-label">
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

      <Button className="add__comment-button">Add Comment</Button>
    </Form>
  );
}

export default AddCommentForm;
