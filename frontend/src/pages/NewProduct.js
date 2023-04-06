import React from "react";
import { json, redirect } from "react-router-dom";
import NewProductForm from "../components/product/NewProductForm";
import { getToken } from "../utils/auth-utils";

const NewProduct = () => {
  return <NewProductForm />;
};

export const action = async ({ request }) => {
  const data = await request.formData();
  const token = getToken();

  const newProduct = {
    name: data.get("name"),
    description: data.get("description"),
    category: data.get("category"),
    price: data.get("price"),
    stock: data.get("stock"),
    image: data.get("image"),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(newProduct),
      }
    );

    if (response.status === 401 || response.status === 422) {
      return json({ message: "Invalid inputs or credentials required." });
    }

    if (!response.ok) {
      return json({
        message: "error, could not create product, please try again later",
      });
    }

    alert("Product Created!");
    return redirect("/");
  } catch (err) {
    return json({ message: "error, could not create product" });
  }
};

export default NewProduct;
