import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import CartModal from "../components/cart/CartModal";
import Footer from "../components/layout/Footer";
import MainNavigation from "../components/layout/MainNavigation";
import { getTokenDuration } from "../utils/auth-utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, sendCartData } from "../store/cartThunk";
import { cartActions } from "../store/cartSlice";

let initial = true;

const RootLayout = (props) => {
  const authLoader = useLoaderData();
  const submit = useSubmit();
  const { token } = authLoader;

  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(cartActions.emptyCart());
      return;
    }
    // ----- Token Management -----
    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);

    // ----- Cart Initialization -----
    if (token) {
      dispatch(fetchCartData(token));
    }
  }, [token, submit, dispatch]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }

    if (!token) {
      return;
    }
    dispatch(sendCartData(cartState, token));
  }, [cartState, token, dispatch]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
        <CartModal />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
