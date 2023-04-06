import React from "react";

import { json, redirect } from "react-router-dom";
import { getToken } from "../utils/auth-utils";
import ProductEditForm from "../components/product/ProductEditForm";

const ProductEdit = () => {
  return <ProductEditForm />;
};

export const action = async ({ request, params }) => {
  const data = await request.formData();

  const token = getToken();

  const updatedFields = {
    description: data.get("description"),
    price: data.get("price"),
    stock: data.get("stock"),
    image: data.get("image"),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/products/product/${params.pid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(updatedFields),
      }
    );

    if (!response.ok) {
      return json({
        message: "Could not update the details, please try again",
      });
    }

    const data = await response.json();
    console.log(data.message);

    alert("Product updated successfully");
    return redirect(`/products/${params.pid}`);
  } catch (error) {
    return json({
      message:
        error.message || "Could not update the new details, please try again",
    });
  }
};

export default ProductEdit;
