import { Link } from "react-router-dom";
import "./PageError.scss";

//page that is shown when desired page was not found
function PageError() {
  return (
    <div className="page__error-container">
      <h1>404 Page Not Found!</h1>
      <p>Your link must be broken...</p>
      <Link to={"/"}>Return to Home</Link>
    </div>
  );
}

export default PageError;
