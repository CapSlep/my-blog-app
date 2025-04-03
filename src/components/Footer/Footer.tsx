import { Container, Row, Col, Nav } from "react-bootstrap";
import "./footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer__container text-light py-5">
      <Container fluid="md">
        <Row className="pb-4">
          <Col xs={12} md={6} lg={3}>
            <h3 className="fs-3 pb-2">ThoughtSphere</h3>
            <p className="text-secondary">
              A platform for sharing ideas and connecting with like-minded
              individuals.
            </p>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h3 className="fs-3 pb-2">Explore</h3>
            <Nav className="me-auto flex-column gap-2">
              <Nav.Link
                as={Link}
                to={"/"}
                className="text-secondary custom-hover p-0"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/articles"}
                className="text-secondary custom-hover p-0"
              >
                Articles
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/about"}
                className="text-secondary custom-hover p-0"
              >
                About
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h3 className="fs-3 pb-2">Community</h3>
            <Nav className="me-auto flex-column gap-2">
              <Nav.Link href="#" className="text-secondary custom-hover p-0">
                For Writers
              </Nav.Link>
              <Nav.Link href="#" className="text-secondary custom-hover p-0">
                Discussion Forum
              </Nav.Link>
              <Nav.Link href="#" className="text-secondary custom-hover p-0">
                Events
              </Nav.Link>
              <Nav.Link href="#" className="text-secondary custom-hover p-0">
                Referrals
              </Nav.Link>
            </Nav>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <h3 className="fs-3 pb-2">Legal</h3>
            <Nav className="me-auto flex-column gap-2">
              <Nav.Link href="#" className="text-secondary custom-hover p-0">
                Privacy Policy
              </Nav.Link>
              <Nav.Link href="#" className="text-secondary custom-hover p-0">
                Terms of Service
              </Nav.Link>
              <Nav.Link href="#" className="text-secondary custom-hover p-0">
                Content Policy
              </Nav.Link>
              <Nav.Link href="#" className="text-secondary custom-hover p-0">
                Cookie Policy
              </Nav.Link>
            </Nav>
          </Col>
        </Row>

        <Row className="pt-4 border-top border-secondary border-opacity-50">
          <Col>© 2023 ThoughtSphere. All rights reserved.</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
