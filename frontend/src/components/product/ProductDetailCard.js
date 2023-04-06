import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { useDispatch } from "react-redux";
import { Link, useRouteLoaderData } from "react-router-dom";
import { cartActions } from "../../store/cartSlice";

const ProductDetailCard = ({ product }) => {
  const [showAlert, setShowAlert] = useState(false);
  const authLoader = useRouteLoaderData("root");
  const { isAdmin, token } = authLoader;

  useEffect(() => {
    if (!showAlert) {
      return;
    }

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [showAlert]);

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addToCart({
        _id: product._id,
        price: product.price,
        name: product.name,
      })
    );

    setShowAlert(true);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6} className="mr-2">
          <Image src={product.image} fluid />
        </Col>
        <Col md={6}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <h4>${product.price.toFixed(2)}</h4>
          {!token && <p>Login to add this product to your cart!</p>}
          {token && (
            <Button variant="primary" onClick={addToCartHandler}>
              Add to Cart
            </Button>
          )}
          {showAlert && (
            <Alert variant="success">
              We have added {product.name} to your cart!
            </Alert>
          )}
          {isAdmin && (
            <Button as={Link} to="edit" className="ms-1">
              Edit Product
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailCard;
