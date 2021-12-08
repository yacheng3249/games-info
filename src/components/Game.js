import React from "react";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";
import { Link } from "react-router-dom";
import { popup } from '../animation';
//import { smallImage } from "../util";

const Game = ({ name, released, image, id }) => {
  const dispatch = useDispatch();

  const getDetailHandler = () => {
    document.body.style.overflow = 'hidden';
    dispatch(loadDetail(id));
  }

  const stringPathId = id.toString();

  return (
    <StyleGame layoutId={stringPathId} onClick={getDetailHandler} /* variants={popup} initial="hidden" animate="show" */>
      <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title ${stringPathId}`}>{name}</motion.h3>
        <p>{released}</p>
        <motion.img layoutId={`image ${stringPathId}`} src={image} alt={name} />
      </Link>
    </StyleGame>
  );
}

const StyleGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    box-shadow: none;
    border: 1px #e2e2e2 solid;
    margin-bottom: 1rem;
  }
`;

export default Game;