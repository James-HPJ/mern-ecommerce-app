import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function ProductCard(props) {
  return (
    <Card className="my-1">
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text>${props.price.toFixed(2)}</Card.Text>
        <Button variant="primary">
          <Link to={`/products/${props.id}`}>Details</Link>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
