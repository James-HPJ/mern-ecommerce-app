import React from "react";
import { useSelector } from "react-redux";

const OrderList = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="col-md-4 order-md-2 mb-4">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Your Cart</span>
        <span className="text-info">{cart.totalQuantity}</span>
      </h4>
      <ul className="list-group mb-3">
        {cart.items.map((item) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between lh-condensed"
              key={item._id}
            >
              <div>
                <h6 className="my-0">
                  {item.name}@${item.price} each
                </h6>
                <small className="text-muted">Quantity: {item.quantity}</small>
              </div>
              <span className="text-muted">${item.totalPrice.toFixed(2)}</span>
            </li>
          );
        })}

        <li className="list-group-item d-flex justify-content-between">
          <span>Total (SGD)</span>
          <strong>${cart.totalAmount.toFixed(2)}</strong>
        </li>
      </ul>
    </div>
  );
};

export default OrderList;
