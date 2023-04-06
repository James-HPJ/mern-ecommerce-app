import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Form, Link, useRouteLoaderData } from "react-router-dom";
import BrandSVG from "../ui/BrandSVG";

import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineFileAdd,
  AiOutlineLogout,
  AiOutlineBarcode,
  AiOutlineDatabase,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import { Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const MainNavigation = () => {
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const authLoader = useRouteLoaderData("root");
  const { token, isAdmin } = authLoader;

  const openCartModal = () => {
    dispatch(uiActions.openCartModal());
  };

  return (
    <Navbar bg="info" expand="lg">
      <Container className="py-3">
        <BrandSVG />

        <Navbar.Brand className="ms-3">
          <Link to="/">Aquarium Market</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end align-items-center"
        >
          <Nav className="me-3 ">
            <Nav.Link as={Link} to="/">
              <span className="me-1">
                <AiOutlineHome />
              </span>
              Home
            </Nav.Link>
            {!token && (
              <Nav.Link as={Link} to="/login">
                <span className="me-1">
                  <AiOutlineLogin />
                </span>
                Login
              </Nav.Link>
            )}
            {!isAdmin && (
              <Nav.Link onClick={openCartModal}>
                <span className="me-1">
                  <AiOutlineShoppingCart />
                </span>
                Cart
                {cartTotalQuantity > 0 && (
                  <Badge pill bg="success" className="ms-1">
                    {cartTotalQuantity}
                  </Badge>
                )}
              </Nav.Link>
            )}
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/?category=livestock">
                Live Stock
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?category=tank">
                Tanks
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/?category=filter">
                Filtration Systems
              </NavDropdown.Item>
            </NavDropdown>
            {token && !isAdmin && (
              <Nav.Link as={Link} to="/orders-current">
                <span className="me-1">
                  <AiOutlineBarcode />
                </span>
                Orders
              </Nav.Link>
            )}
            {token && (
              <Form action="/logout" method="post">
                <Button
                  variant="link"
                  type="submit"
                  style={{ textDecoration: "none", color: "rgba(0,0,0,0.55)" }}
                >
                  <span className="me-1">
                    <AiOutlineLogout />
                  </span>
                  Logout
                </Button>
              </Form>
            )}
            {isAdmin && (
              <>
                <Nav.Link as={Link} to="/new-product" className="text-light">
                  <span className="me-1">
                    <AiOutlineFileAdd />
                  </span>
                  Create New Product
                </Nav.Link>
                <Nav.Link as={Link} to="/orders-admin" className="text-light">
                  <span className="me-1">
                    <AiOutlineDatabase />
                  </span>
                  View All Orders
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
