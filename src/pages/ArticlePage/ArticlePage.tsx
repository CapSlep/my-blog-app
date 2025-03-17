import React, { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import axios from "axios";
import { CommentsList, AddCommentForm } from "../../components";
import { Button } from "react-bootstrap";
import "./ArticlePage.scss";
import { useUser } from "../../hooks";

function ArticlePage() {
  const { name } = useParams(); //get the article name from parameters of the link in router

  const {
    upvotes: initialUpvotes,
    comments: initialComments,
    title,
    content,
  } = useLoaderData(); //get the data from loader of component

  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);
  const { user } = useUser(); //getting user from useUser hook

  //handle the upvotes Click
  async function upvoteClicked() {
    const token = user && (await user.getIdToken()); // get current user token if user exists
    const headers = token ? { authtoken: token } : {}; // set headers for request from user auth token if token exist, if not set headers as empty object
    try {
      const response = await axios.post(
        "/api/articles/" + name + "/upvote",
        null,
        { headers }
      ); // send post request for upvoting current article with user token as headers and get response
      const updatedArticleData = response.data; //get article data after making upvote
      setUpvotes(updatedArticleData.upvotes); //update state of upvotes for displaying in ui
    } catch (error: any) {
      console.warn(error); //if user already upvoted or any other unexpected error rised during request make a warning error
    }
  }

  //handle adding comments
  //params as name of user posted comment and text of the comment
  async function addComment(nameText: string, commentText: string) {
    const token = user && (await user.getIdToken()); // get current user token if user exists
    const headers = token ? { authtoken: token } : {}; // set headers for request from user auth token if token exist, if not set headers as empty object
    const response = await axios.post(
      "/api/articles/" + name + "/comments",
      {
        postedBy: nameText,
        text: commentText,
      },
      { headers }
    ); // send post request for adding comments for current article with user token as headers and get response
    const updatedArticleData = response.data; //get article data after adding comment
    setComments(updatedArticleData.comments); //update state of comments for displaying in ui
  }

  return (
    <>
      <h1>{title}</h1>
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
      {content.map((c: string) => (
        <p key={c}>{c}</p>
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

//loader function that will be exported to run as soon as component rendered
export async function loader({ params }: any) {
  const response = await axios.get("/api/articles/" + params.name); //get article for current article name and get response with article data
  const { upvotes, comments, title, content } = response?.data; //get upvotes and comments data from response
  return { upvotes, comments, title, content }; //return upvotes and comments data to use inside component
}

export default ArticlePage;
