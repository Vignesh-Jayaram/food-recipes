import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + searchTerm);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <FaSearch />
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        value={searchTerm}
      />
    </FormStyle>
  );
}

const FormStyle = styled.form`
  margin: auto;
  width: 30rem;
  position: relative;
  input {
    border: none;
    outline: none;
    border-radius: 2rem;
    width: 100%;
    background: linear-gradient(#494949, #313131);
    padding: 0.5rem 2rem;
    font-size: 1rem;
    color: white;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
  }
`;

export default Search;
