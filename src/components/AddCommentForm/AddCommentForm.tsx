import { useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import "./AddCommentForm.scss";

interface props {
  onAddComment: Function;
}

function AddCommentForm({ onAddComment }: props) {
  const [nameText, setNameText] = useState("");
  const [commentText, setCommentText] = useState("");

  return (
    <div className="add__comment-container">
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

      <Button
        className="add__comment-button"
        onClick={() => {
          onAddComment(nameText, commentText);
          setNameText("");
          setCommentText("");
        }}
      >
        Add Comment
      </Button>
    </div>
  );
}

export default AddCommentForm;
