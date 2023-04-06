import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import { redirect } from "react-router-dom";
import OrderForm from "../components/order-summary/OrderForm";
import OrderList from "../components/order-summary/OrderList";

const OrderSummary = () => {
  return (
    <Container className="mt-4 mx-auto vh-100">
      <Row>
        <OrderList />
        <OrderForm />
      </Row>
    </Container>
  );
};

// export const action = async ({ request }) => {
//   const data = await request.formData();

//   const shippingDetails = {
//     address: data.get("address") + " " + data.get("address2"),
//     postal: data.get("postal"),
//     payment: {
//       method: data.get("paymentMethod"),
//       nameOnCard: data.get("paymentName"),
//       cardNumber: data.get("paymentNumber"),
//       expiration: data.get("paymentExpire"),
//       ccv: data.get("paymentCCV"),
//     },
//   };

//   console.log(shippingDetails);

//   alert("We have recieved your order!");

//   return redirect("/");
// };

export default OrderSummary;
