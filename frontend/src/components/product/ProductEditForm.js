import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import {
  Form,
  useActionData,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import ProductDeleteModal from "./ProductDeleteModal";

const ProductEditForm = () => {
  const data = useRouteLoaderData("product-detail");
  const errors = useActionData();
  const navigation = useNavigation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const isSubmitting = navigation.state === "submitting";

  const { description, price, stock, image } = data.product;

  return (
    <>
      {showDeleteModal && <ProductDeleteModal onClose={closeDeleteModal} />}
      <Container className="mt-4 mx-auto vh-100">
        <h4 className="mb-3">Edit Product</h4>
        <Form method="patch">
          <div className="mb-3">
            <label hmtlfor="description">Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              id="description"
              defaultValue={description}
              required
            />
            <div className="invalid-feedback">Please enter a description.</div>
          </div>
          <div className="mb-3">
            <label hmtlfor="price">Price</label>
            <input
              type="text"
              pattern="\d+(\.\d{1,2})?"
              name="price"
              className="form-control"
              id="price"
              defaultValue={price}
              required
            />
            <div className="invalid-feedback">Please enter a price.</div>
          </div>
          <div className="mb-3">
            <label hmtlfor="stock">Stock</label>
            <input
              type="number"
              name="stock"
              className="form-control"
              id="stock"
              defaultValue={stock}
              required
            />
            <div className="invalid-feedback">Please enter a stock.</div>
          </div>
          <div className="mb-3">
            <label hmtlfor="image">Image URL</label>
            <input
              type="text"
              name="image"
              className="form-control"
              id="image"
              defaultValue={image}
              required
            />
            <div className="invalid-feedback">Please enter an image url.</div>
          </div>
          <button
            className="btn btn-primary btn-lg btn-block"
            type="submit"
            disabled={isSubmitting}
          >
            Save Changes
          </button>
        </Form>
        <button
          className="btn btn-danger btn-lg btn-block mt-2"
          onClick={openDeleteModal}
        >
          Delete Product
        </button>
        {errors && (
          <Alert variant="danger" className="mt-2">
            {errors.message}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default ProductEditForm;
