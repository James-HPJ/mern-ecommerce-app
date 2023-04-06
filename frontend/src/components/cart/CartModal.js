import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import { cartActions } from "../../store/cartSlice";
import { useLoaderData, useNavigate } from "react-router-dom";

const CartModal = (props) => {
  const authLoader = useLoaderData();
  const { token } = authLoader;
  const navigate = useNavigate();

  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(uiActions.closeCartModal());
  };

  const proceedToOrder = () => {
    closeModalHandler();
    navigate("/order-summary");
  };

  const addToCartHandler = (item) => {
    dispatch(cartActions.addToCart(item));
  };

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  if (!token) {
    return (
      <Modal show={showCart} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Please Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Login or register a new account to start adding to cart!.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  if (cart.items.length === 0) {
    return (
      <Modal show={showCart} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>No items in cart yet!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please add an item to the cart.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <Modal show={showCart} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {cart.items.map((item) => (
              <ListGroup.Item key={item._id}>
                <p>
                  {item.name} x {item.quantity}
                </p>
                <Button
                  size="md"
                  onClick={removeFromCartHandler.bind(null, item._id)}
                  className="me-1"
                >
                  -
                </Button>
                <Button
                  size="md"
                  onClick={addToCartHandler.bind(null, {
                    _id: item._id,
                    name: item.name,
                    price: item.price,
                  })}
                >
                  +
                </Button>
                <hr />
                <p className="text-end">
                  subtotal: ${item.totalPrice.toFixed(2)}
                </p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item className="fw-semibold text-end">
              total items: {cart.totalQuantity}
            </ListGroup.Item>
            <ListGroup.Item variant="info" className="fw-bold text-end">
              total amount: ${cart.totalAmount.toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalHandler}>
            Close
          </Button>
          <Button variant="primary" onClick={proceedToOrder}>
            Go to Order Summary
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartModal;
