import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";
// import { getToken } from "../utils/auth-utils";

// const token = getToken();

export const fetchCartData = (token) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/cart`,
        {
          headers: {
            "Authorization": "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart");
      }

      const data = await response.json();
      const cart = data.cart;

      return cart;
    };

    try {
      const cart = await fetchData();
      dispatch(cartActions.replaceCart(cart));
    } catch (error) {
      dispatch(uiActions.errorNotification(error.message));
    }
  };
};

export const sendCartData = (cart, token) => {
  return async (dispatch) => {
    const sendData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/cart`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendData();
    } catch (error) {
      dispatch(uiActions.errorNotification(error.message));
    }
  };
};
