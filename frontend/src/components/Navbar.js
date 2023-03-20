import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Path from "../constants/Path";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../features/user/user.reducer";
import { axios } from "../utils/axios";

function Navbarfun() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogut = () => {
    axios.get("/auth/logout").then((response) => {
      if (response.data.message === "Logout Successful") {
        dispatch(deleteUser());
        navigate(Path.LOGIN);
      } else {
        navigate(Path.HOME);
      }
    });
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Button variant="primary" onClick={handlelogut}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarfun;
