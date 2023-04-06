import React from "react";
import Hero from "../components/ui/Hero";
import ProductList from "../components/product/ProductList";
import { json } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Hero />
      <h5 className="text-center my-3">All Products</h5>
      <ProductList />
    </>
  );
};

export const loader = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams;
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("q");

  let products;
  const url = `${process.env.REACT_APP_BACKEND_URL}/products`;

  if (category) {
    const response = await fetch(url + "/" + category);

    if (!response.ok) {
      throw new Error(
        response.message || "could not fetch products by category"
      );
    }

    const data = await response.json();
    products = data.productsByCat;
  } else if (searchQuery) {
    const response = await fetch(url + "/?q=" + searchQuery);
    if (!response.ok) {
      throw new Error(response.message || "could not fetch products by query");
    }

    const data = await response.json();
    products = data.products;
  } else {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.message || "could not fetch products");
    }

    const data = await response.json();
    products = data.products;
  }

  return json({ products });
};

export default Home;
