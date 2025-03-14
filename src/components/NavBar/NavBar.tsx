import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./NavBar.scss";
import { Button } from "react-bootstrap";
import { useUser } from "../../hooks";

function NavBar() {
  const navigate = useNavigate();
  const { isLoading, user } = useUser();

  return (
    <Navbar sticky="top" expand={true} className="navbar__holder">
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

        <Navbar.Collapse className="justify-content-end gap-0 column-gap-3">
          {isLoading ? (
            <Navbar.Text>Loading...</Navbar.Text>
          ) : (
            <>
              {user && <Navbar.Text>Signed in as: {user.email}</Navbar.Text>}
              {user ? (
                <Button
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
