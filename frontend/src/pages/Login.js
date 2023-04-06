import React from "react";
import { json, redirect } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";

const Login = () => {
  return <LoginForm />;
};

export const action = async ({ request, params }) => {
  const data = await request.formData();

  const username = data.get("username");
  const password = data.get("password");
  const email = data.get("email");

  const loginMode = username ? "signup" : "login";

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/${loginMode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      }
    );

    if (response.status === 401 || response.status === 422) {
      return json({
        message: "Wrong Credentials, please login again",
      });
    }

    if (!response.ok) {
      return json({
        message: "We are unable to log you in, please try again later.",
      });
    }

    const userData = await response.json();

    localStorage.setItem("token", userData.token);
    localStorage.setItem("isAdmin", userData.isAdmin);

    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);
    localStorage.setItem("expiration", expirationTime.toISOString());

    return redirect("/");
  } catch (err) {
    return json({
      message: "We are unable to log you in, please try again later.",
    });
  }
};

export default Login;
