import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ProductCard from "./ProductCard";
import { useLoaderData } from "react-router-dom";
import SearchBar from "../Search/SearchBar";

const ProductList = () => {
  const data = useLoaderData();
  const { products } = data;
  return (
    <>
      <SearchBar />
      {products.length === 0 && <p>No Products Found!</p>}
      <Container>
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} key={product._id}>
              <ProductCard
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                id={product._id}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductList;
