import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
  const storedExpiration = localStorage.getItem("expiration");
  const expiration = new Date(storedExpiration);
  const now = new Date();
  const duration = expiration.getTime() - now.getTime();

  return duration;
};

export const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
};

export const isAdmin = () => {
  const booleanAsString = localStorage.getItem("isAdmin");

  return booleanAsString === "true";
};

export const authLoader = () => {
  return { token: getToken(), isAdmin: isAdmin() };
};

export const checkTokenLoader = () => {
  const token = getToken();
  if (!token) {
    return redirect("/");
  }

  return null;
};

export const checkIsAdminLoader = () => {
  const token = getToken();
  const admin = isAdmin();

  if (!token || admin === false) {
    return redirect("/");
  }

  return null;
};
