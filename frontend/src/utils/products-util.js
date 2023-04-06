import storedProducts from "../data/products";

export const getAllProducts = () => {
  return storedProducts;
};

export const findProductById = (id) => {
  return storedProducts.find((product) => product._id === id);
};

export const findProductsByCategory = (catergory, id) => {
  return storedProducts.filter(
    (product) => product.category === catergory && product._id !== id
  );
};
