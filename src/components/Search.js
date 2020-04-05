import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const Search = (props) => {
  const handleChange = (e) => {
    props.searchValue(e.target.value);
  };
  return (
    <InputGroup className="mb-3">
      <FormControl placeholder="Search" onChange={handleChange} />
    </InputGroup>
  );
};

export default Search;
