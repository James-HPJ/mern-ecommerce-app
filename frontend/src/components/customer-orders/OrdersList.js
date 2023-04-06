import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import OrderDetail from "./OrderDetail";

const OrdersList = (props) => {
  const { orders, admin, token } = props;

  return (
    <Container className="mt-3 ">
      <h3>Orders</h3>
      {orders.length === 0 && (
        <h3
          className="text-center mt-5 border rounded py-2
      "
        >
          no orders
        </h3>
      )}
      <ListGroup>
        {orders.length > 0 &&
          orders.map((order) => (
            <OrderDetail
              key={order.id}
              order={order}
              admin={admin}
              token={token}
            />
          ))}
        {!orders && orders.length === 0 && (
          <ListGroup.Item>No Orders Found!</ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  );
};

export default OrdersList;
