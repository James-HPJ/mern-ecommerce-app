import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Carousel } from "@trendyol-js/react-carousel";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const ProductSuggestions = ({ suggestedProducts }) => {
  return (
    <>
      <Container>
        <h5 className="mt-5 mb-3">Other Similar Products:</h5>
        <CardGroup>
          <Carousel
            show={3}
            slide={1}
            transition={0.5}
            leftArrow={<AiOutlineArrowLeft size={25} />}
            rightArrow={<AiOutlineArrowRight size={25} />}
          >
            {suggestedProducts.map((product) => {
              return (
                <Card key={product._id}>
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>${product.price.toFixed(2)}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button>
                      <Link to={`/products/${product._id}`}>Details</Link>
                    </Button>
                  </Card.Footer>
                </Card>
              );
            })}
          </Carousel>
        </CardGroup>
      </Container>
    </>
  );
};

export default ProductSuggestions;
