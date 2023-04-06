import React, { useState } from "react";
import {
  Form as RouterForm,
  useActionData,
  useNavigation,
} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const LoginForm = () => {
  const errors = useActionData();
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const isLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <Container className="mt-5 p-3 vh-100" style={{ width: "25rem" }}>
      <h3>{isLogin ? "Sign In" : "Sign Up"}</h3>

      <Form method="post" as={RouterForm} action="/login">
        {!isLogin && (
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a Username"
              name="username"
            />
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        <Button variant="info" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Checking your credentials..." : "Let's go!"}
        </Button>
        <Button variant="link" onClick={isLoginHandler}>
          {isLogin
            ? "Click here to register a new account"
            : "Click here to login into an existing account"}
        </Button>
        {errors && (
          <Alert variant="danger" className="mt-2">
            {errors.message}
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default LoginForm;
