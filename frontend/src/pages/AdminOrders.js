import React from "react";
import { json, redirect, useLoaderData } from "react-router-dom";
import OrdersList from "../components/customer-orders/OrdersList";
import { getToken, isAdmin } from "../utils/auth-utils";

const AdminOrders = () => {
  const loaderData = useLoaderData();
  const orders = loaderData.orders;

  return <OrdersList orders={orders} admin token={loaderData.token} />;
};

export const loader = async () => {
  const token = getToken();
  const isAdministrator = isAdmin();

  if (!token || !isAdministrator) {
    return redirect("/");
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/orders/admin`,
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

    return json({ orders: data.orders, token: token });
  } catch (err) {
    throw new Error("Could not get orders");
  }
};

export default AdminOrders;
