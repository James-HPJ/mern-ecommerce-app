import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Form, useActionData, useNavigation } from "react-router-dom";

const NewProductForm = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Container className="mt-4 mx-auto vh-100">
      <h4 className="mb-3">Create Product</h4>
      <Form method="post">
        <div className="mb-3">
          <label hmtlfor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            required
          />
          <div className="invalid-feedback">
            Please enter the name of the Product.
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="category">
              Category
            </label>
          </div>
          <select className="custom-select" id="category" name="category">
            <option value="livestock">Live Stock</option>
            <option value="tank">Tank</option>
            <option value="filter">Filter</option>
          </select>
        </div>
        <div className="mb-3">
          <label hmtlfor="description">Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            id="description"
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
            required
          />
          <div className="invalid-feedback">Please enter an image url.</div>
        </div>
        <button
          className="btn btn-primary btn-lg btn-block"
          type="submit"
          disabled={isSubmitting}
        >
          Create New Product
        </button>
        {errors && (
          <Alert variant="danger" className="mt-2">
            {errors.message}
          </Alert>
        )}
      </Form>
    </Container>
  );
};

export default NewProductForm;
