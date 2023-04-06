import React from "react";
import { Link, useRouteError } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import MainNavigation from "../components/layout/MainNavigation";
import Footer from "../components/layout/Footer";

const Error = () => {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <Card className="m-5">
        <Card.Header>Error</Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{message}</Card.Text>
          <Button variant="light">
            <Link to="/">Go Back Home</Link>
          </Button>
        </Card.Body>
      </Card>
      <Footer />
    </>
  );
};

export default Error;
