import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export const TopNavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Select test" id="basic-nav-dropdown">
              <NavDropdown.Item>Maximum finger strength</NavDropdown.Item>
              <NavDropdown.Item>
                Critical Force (not available yet)
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Select hand" id="basic-nav-dropdown">
              <NavDropdown.Item>Left</NavDropdown.Item>
              <NavDropdown.Item>Right</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Select grip type" id="basic-nav-dropdown">
              <NavDropdown.Item>half crimp</NavDropdown.Item>
              <NavDropdown.Item>4 fingers drag</NavDropdown.Item>
              <NavDropdown.Item>3 fingers drag</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
