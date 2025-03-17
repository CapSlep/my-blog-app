import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Button, Spinner, Nav, Navbar } from "react-bootstrap";
import { useUser } from "../../hooks";
import "./NavBar.scss";

function NavBar() {
  const navigate = useNavigate(); //setting navigate function to navigate to other pages by event
  const { isLoading, user } = useUser(); //getting variables from useUser hook to display user info

  return (
    <Navbar
      sticky="top"
      expand="md"
      className="rounded-bottom"
      bg="secondary-subtle"
      data-bs-theme="secondary-subtle"
    >
      <Container fluid className="navbar__container">
        <Navbar.Brand as={Link} to={"/"}>
          My Blog
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/articles"}>
              Articles
            </Nav.Link>
            <Nav.Link as={Link} to={"/about"}>
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end ">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              {user && <Navbar.Text>Signed in as: {user.email}</Navbar.Text>}
              {user ? (
                <Button
                  className="ms-2"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    signOut(getAuth());
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/login");
                  }}
                >
                  Sign In
                </Button>
              )}
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
