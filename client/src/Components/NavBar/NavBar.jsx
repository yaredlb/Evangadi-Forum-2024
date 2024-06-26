import React, { useContext, useEffect, useState } from "react";
import { Nav, Navbar, Offcanvas, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import evangadiLogo from "../../assets/evangadi-logo-black.png";
import "./NavBar.css";

const NavBar = ({ logout }) => {
  const [sticky, setSticky] = useState(false);
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClickChange = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      expand="md"
      className={`navbar navbar-expand-lg navbar-light bg-light header ${
        sticky ? "sticky" : ""
      }`}
      fixed="top"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">
            <img src={evangadiLogo} alt="Evangadi Logo" className="nav-logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Evangadi
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/" className="nav-txt">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/explained" className="nav-txt">
                How it Works
              </Nav.Link>
              <div className="nav-btn-container">
                <button
                  className="nav-btn btn btn-success"
                  onClick={onClickChange}
                >
                  {token ? "LogOut" : "Sign In"}
                </button>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
