import React from "react";
import { json, useRouteLoaderData } from "react-router-dom";
import ProductDetailCard from "../components/product/ProductDetailCard";
import ProductSuggestions from "../components/product/ProductSuggestions";

const ProductDetail = () => {
  const data = useRouteLoaderData("product-detail");

  return (
    <>
      <ProductDetailCard product={data.product} />
      <ProductSuggestions suggestedProducts={data.suggestions} />
    </>
  );
};

export const loader = async ({ request, params }) => {
  const productId = params.pid;

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/products/product/${productId}`
    );

    if (!response.ok) {
      throw Error("Product cannot be fetched");
    }

    const data = await response.json();
    const product = data.product;
    const productSuggestions = data.productSuggestions;

    return json({ product, suggestions: productSuggestions });
  } catch (error) {
    throw Error(error.message || "Product cannot be fetched");
  }
};

export default ProductDetail;
