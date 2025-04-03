import { Link } from "react-router-dom";
import "./PageError.scss";
import { Container } from "react-bootstrap";

//page that is shown when desired page was not found
function PageError() {
  return (
    <Container fluid="md" className="page__error-container">
      <h1>404 Page Not Found!</h1>
      <p>Your link must be broken...</p>
      <Link to={"/"}>Return to Home</Link>
    </Container>
  );
}

export default PageError;
