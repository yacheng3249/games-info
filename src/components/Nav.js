import React, { useState } from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import logo from '../img/logo.svg'
import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from 'react-redux';
import { fadeIn } from '../animation';

const Nav = () => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState('');

  const inputHandler = (e) => {
    setTextInput(e.target.value);
  }

  const searchGameHandler = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(textInput));
    setTextInput('');
  }

  const clearSearched = () => {
    dispatch({ type: "CLEAR_SEARCHED" });
  };

  return (
    <StyledNav variants={fadeIn} initial="hidden" animate="show">
      <Logo onClick={clearSearched}>
        <img src={logo} alt="logo" />
        <h1>Ignite</h1>
      </Logo>
      <form className="search">
        <input type="text" onChange={inputHandler} value={textInput} />
        <button onClick={searchGameHandler}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </StyledNav>
  );
}

const StyledNav = styled(motion.div)`
  padding: 3rem 5rem;
  text-align: center;
  input {
    width: 30%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: none;
    outline: none;
    margin-top: 1rem;
    background-color: #e0dfdf;
  }
  button {
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: #ff7676;
    color: white;
  }

  @media screen and (max-width: 768px) {
    padding: 3rem 0rem 0rem;
    input {
      width: 60%;
      padding: 0.3rem;
    }
    button {
      padding: 0.3rem 1rem;
    }
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 1rem;
  cursor: pointer;
  img {
    width: 2rem;
    height: 2rem;
  }
`;

export default Nav;