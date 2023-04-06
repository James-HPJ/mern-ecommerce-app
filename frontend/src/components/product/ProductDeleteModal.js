import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../../utils/auth-utils";

const ProductDeleteModal = (props) => {
  const token = getToken();
  const params = useParams();
  const productId = params.pid;

  const [isError, setIsError] = useState(null);

  const navigate = useNavigate();

  const handleClose = () => {
    props.onClose();
  };

  const deleteHandler = async () => {
    console.log(productId);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/products/product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": "Bearer " + token,
          },
        }
      );

      if (response.status === 401) {
        setIsError("Wrong credentials, admin rights required to delete.");
      }

      if (!response.ok) {
        setIsError("Could not delete product");
      }

      alert("Product deleted!");
      navigate("/");
    } catch (error) {
      setIsError("Could not delete product");
    }
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wish to delete product?</Modal.Body>
      <Modal.Footer>
        {isError && (
          <Alert variant="danger" className="mt-2">
            {isError}
          </Alert>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={deleteHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDeleteModal;
