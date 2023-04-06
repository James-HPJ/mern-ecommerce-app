import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { cartActions } from "../../store/cartSlice";

const OrderForm = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const authLoader = useRouteLoaderData("root");
  const { token } = authLoader;

  const [orderError, setOrderError] = useState(null);

  const addressIR = useRef();
  const address2IR = useRef();
  const postalIR = useRef();
  const paymentNameIR = useRef();
  const paymentNumberIR = useRef();
  const paymentExpireIR = useRef();
  const paymentCCVIR = useRef();

  const [paymentMethod, setPaymentMethod] = useState("credit");

  const paymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const navigate = useNavigate();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const checkoutHandler = async (event) => {
    event.preventDefault();

    const newOrder = {
      orderlist: cart,
      shippingDetails: {
        address: addressIR.current.value + " " + address2IR.current.value,
        postal: postalIR.current.value,
      },
      paymentDetails: {
        method: paymentMethod,
        name: paymentNameIR.current.value,
        cardNumber: paymentNumberIR.current.value,
        expiration: paymentExpireIR.current.value,
        ccv: paymentCCVIR.current.value,
      },
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
          body: JSON.stringify(newOrder),
        }
      );

      if (!response.ok) {
        throw new Error("Could not confirm your order");
      }
    } catch (error) {
      setOrderError(error.message);
    }

    dispatch(cartActions.emptyCart());

    alert("We have recieved your order!");

    navigate("/");
  };

  return (
    <div className="col-md-8 order-md-1">
      <h4 className="mb-3">Billing address</h4>
      <form method="post" onSubmit={checkoutHandler}>
        <div className="mb-3">
          <label hmtlfor="address">Address</label>
          <input
            ref={addressIR}
            type="text"
            name="address"
            className="form-control"
            id="address"
            placeholder="e.g. Jurong East St 1234"
            required
          />
          <div className="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>
        <div className="mb-3">
          <label hmtlfor="address2">
            Address 2 <span className="text-muted">(Optional)</span>
          </label>
          <input
            ref={address2IR}
            type="text"
            name="address2"
            className="form-control"
            id="address2"
            placeholder="e.g. #01-234"
            defaultValue=""
          />
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label hmtlfor="postal">Postal Code</label>
            <input
              ref={postalIR}
              type="text"
              name="postal"
              className="form-control"
              id="postal"
              minLength={6}
              required
            />
            <div className="invalid-feedback">
              Postal code required(min 6 characters).
            </div>
          </div>
        </div>
        <hr className="mb-4" />

        <h4 className="mb-3">Payment</h4>

        <div className="d-block my-3">
          <div className="custom-control custom-radio">
            <input
              id="credit"
              name="paymentMethod"
              type="radio"
              className="custom-control-input"
              value="credit"
              checked={paymentMethod === "credit"}
              onChange={paymentMethodChange}
              required
            />
            <label className="custom-control-label" hmtlfor="credit">
              Credit card
            </label>
          </div>
          <div className="custom-control custom-radio">
            <input
              id="debit"
              name="paymentMethod"
              type="radio"
              value="debit"
              className="custom-control-input"
              checked={paymentMethod === "debit"}
              onChange={paymentMethodChange}
              required
            />
            <label className="custom-control-label" hmtlfor="debit">
              Debit card
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label hmtlfor="cc-name">Name on card</label>
            <input
              ref={paymentNameIR}
              type="text"
              name="paymentName"
              className="form-control"
              id="cc-name"
              required
            />
            <small className="text-muted">Full name as displayed on card</small>
            <div className="invalid-feedback">Name on card is required</div>
          </div>
          <div className="col-md-6 mb-3">
            <label hmtlfor="cc-number">Credit card number</label>
            <input
              ref={paymentNumberIR}
              type="text"
              name="paymentNumber"
              className="form-control"
              id="cc-number"
              minLength={6}
              required
            />
            <div className="invalid-feedback">
              Credit card number is required
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label hmtlfor="cc-expiration">Expiration</label>
            <input
              ref={paymentExpireIR}
              type="text"
              name="paymentExpire"
              className="form-control"
              placeholder="mm/yy"
              id="cc-expiration"
              required
            />
            <div className="invalid-feedback">Expiration date required</div>
          </div>
          <div className="col-md-3 mb-3">
            <label hmtlfor="cc-cvv">CVV</label>
            <input
              ref={paymentCCVIR}
              type="text"
              name="paymentCCV"
              className="form-control"
              id="cc-cvv"
              minLength={3}
              required
            />
            <div className="invalid-feedback">Security code required</div>
          </div>
        </div>
        <button
          className="btn btn-primary btn-lg btn-block"
          type="submit"
          disabled={isSubmitting}
        >
          Continue to checkout
        </button>
        {orderError && (
          <Alert variant="danger" className="mt-2">
            {orderError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default OrderForm;
