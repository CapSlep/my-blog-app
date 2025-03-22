import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CommentsList, AddCommentForm } from "../../components";
import { useUser, useFetch } from "../../hooks";
import { Placeholder, Spinner, ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid"; // import uuid for generating unique ids
import "./ArticlePage.scss";
import { ArticleData } from "../../types";
import { formatDate } from "../../utils";

function ArticlePage() {
  const { name } = useParams(); //get the article name from parameters of the link in router
  const { response, isLoading } = useFetch(
    name || "", // ensure name is a string
    name ? `/api/articles/${name}` : "", // ensure the URL is a string
    Boolean(name)
  );

  const { user } = useUser(); //getting user from useUser hook
  const [upvotes, setUpvotes] = useState(response?.data.upvotes);
  const [comments, setComments] = useState(response?.data.comments);
  const [checked, setChecked] = useState(false);
  const [articleData, setArticleData] = useState<ArticleData | null>(null);

  useEffect(() => {
    if (!isLoading && response) {
      setArticleData(response.data);
      setUpvotes(response.data.upvotes);
      setComments(response.data.comments);
      setChecked(response.data.upvoteIds.includes(user?.uid));
    }
  }, [isLoading, response, user]);

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
      setChecked(response.data.upvoteIds.includes(user?.uid));
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
        id: uuidv4(), // generate a unique id for the comment
        postedBy: nameText,
        text: commentText,
      },
      { headers }
    ); // send post request for adding comments for current article with user token as headers and get response
    const updatedArticleData = response.data; //get article data after adding comment
    setComments(updatedArticleData.comments); //update state of comments for displaying in ui
    // send post request for adding comments for current article with user token as headers and get response
  }

  return (
    <>
      {isLoading ? (
        <>
          <Placeholder as="h1" animation="glow">
            <Placeholder xs={4} />
          </Placeholder>

          <Placeholder.Button xs={2} animation="glow">
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className=" ms-2">Loading...</span>
          </Placeholder.Button>

          {[...Array(2)].map((_, index) => (
            <Placeholder key={index} as="p" className="mt-3" animation="glow">
              <Placeholder xs={12} size="sm" />
              <Placeholder xs={12} size="sm" />
              <Placeholder xs={12} size="sm" />
              <Placeholder xs={8} size="sm" />
            </Placeholder>
          ))}
        </>
      ) : (
        <>
          <h1>{articleData?.title}</h1>
          <div className="upvote__container">
            {user && (
              <ToggleButton
                className="mb-2 upvote__button"
                id="toggle-check"
                type="checkbox"
                variant="outline-success"
                checked={checked}
                value="1"
                onClick={upvoteClicked}
              >
                <FontAwesomeIcon icon={faHeart} />
              </ToggleButton>
            )}
            <p className="upvote__text">
              This article has <span>{upvotes}</span> upvotes!
            </p>
            <div>{formatDate(articleData?.creationDate || "")}</div>
          </div>
          {articleData?.content.map((c: string) => (
            <p key={c} className="mb-4">
              {c}
            </p>
          ))}
          {user ? (
            <AddCommentForm onAddComment={addComment}></AddCommentForm>
          ) : (
            <p>Log In to add a comment</p>
          )}

          <CommentsList comments={comments}></CommentsList>
        </>
      )}
    </>
  );
}

export default ArticlePage;
