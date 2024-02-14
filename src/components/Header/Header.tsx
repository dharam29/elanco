import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const [activeNav, setActiveNav] = useState("application");
  const router = useRouter();
  return (
    <header className="web-header">
      <Navbar expand="lg" className="cus-navbar">
        <Container>
          <Navbar.Brand
            className="home-logo"
            onClick={() => {
              router.push("/");
              setActiveNav("application");
            }}
          >
            Elanco
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                className={
                  activeNav === "application" ? "text-white" : "text-white"
                }
                onClick={() => {
                  router.push("/");
                  setActiveNav("application");
                }}
              >
                Applications
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
