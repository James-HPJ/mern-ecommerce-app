import React from "react";
import { json, redirect, useLoaderData } from "react-router-dom";
import { getToken } from "../utils/auth-utils";
import OrdersList from "../components/customer-orders/OrdersList";

const UserOrders = () => {
  const loaderData = useLoaderData();
  const orders = loaderData.orders;

  return <OrdersList orders={orders} />;
};

export const loader = async () => {
  const token = getToken();
  if (!token) {
    return redirect("/");
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/orders`,
      {
        headers: {
          "Authorization": "Bearer " + token,
        },
      }
    );

    if (!response) {
      throw new Error("Could not get orders");
    }

    const data = await response.json();

    return json({ orders: data.orders });
  } catch (err) {
    throw new Error("Could not get orders");
  }
};

export default UserOrders;
