import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";

const OrderDetail = (props) => {
  const { id, orderlist, shippingDetails, isFulfilled, createdAt } =
    props.order;
  const orderDate = new Date(createdAt).toLocaleDateString("en-GB");

  const [toggleSwitch, setToggleSwitch] = useState(isFulfilled);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    let timer;
    if (alert) {
      timer = setTimeout(() => {
        setAlert(null);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/orders`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + props.token,
          },
          body: JSON.stringify({
            id: id,
            isFulfilled: toggleSwitch,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Could not save fulfilled status");
      }

      setAlert({ message: "fulfilled status updated.", status: "success" });
    } catch (error) {
      setAlert({
        mesage: error.message || "Could not change fulfilled status",
        status: "error",
      });
    }
  };

  return (
    <>
      <ListGroup.Item>
        <p className="fw-bold">Order number: {id}</p>
        <p>Date: {orderDate}</p>
        <ol>
          {orderlist.items.map((item) => (
            <li key={item._id}>
              {item.name} @${item.price} x {item.quantity} = ${item.totalPrice}
            </li>
          ))}
        </ol>
        <p className="fw-bold">
          Total Bill: ${orderlist.totalAmount.toFixed(2)}
        </p>
        <hr />
        <p>
          Ship to: {shippingDetails.address}, {shippingDetails.postal}
        </p>
        <p>Status: {isFulfilled ? "Delivered" : "Pending"}</p>
        {props.admin && (
          <Form onSubmit={submitHandler}>
            <Form.Check
              type="switch"
              name="isFulFilled"
              id="isFulFilled"
              label="Fulfilled?"
              defaultChecked={toggleSwitch}
              value={toggleSwitch}
              onChange={() => {
                setToggleSwitch((state) => !state);
              }}
            />
            <Button variant="info" type="submit">
              save
            </Button>
            {alert && (
              <Alert variant={alert.status === "error" ? "danger" : "info"}>
                {alert.message}
              </Alert>
            )}
          </Form>
        )}
      </ListGroup.Item>
    </>
  );
};

export default OrderDetail;
