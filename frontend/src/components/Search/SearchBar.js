import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const queryChangeHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();

    navigate("/?q=" + searchQuery);
  };

  return (
    <Container>
      <form onSubmit={searchSubmitHandler}>
        <div className="mb-3">
          <label hmtlfor="search">Search Products</label>
          <input
            type="text"
            name="search"
            value={searchQuery}
            onChange={queryChangeHandler}
            className="form-control"
            id="search"
            placeholder="e.g. mono fish"
            required
          />
          <div className="invalid-feedback">Please enter a valid character</div>
        </div>
      </form>
    </Container>
  );
};

export default SearchBar;
