import React from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useHistory } from "react-router-dom";
import { smallImage } from "../util";
//IMAGES
import playstation from "../img/playstation.svg";
import playstation4 from "../img/playstation4.svg"
import playstation5 from "../img/playstation5.svg"
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import XboxSeriesX from "../img/XboxSeriesX.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import MacOS from "../img/MacOS.svg"
import gamepad from "../img/gamepad.svg";
//Star Images
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";

const GameDetail = ({ pathId }) => {
  const { game, screen, isLoading } = useSelector(state => state.detail);

  const history = useHistory();

  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains('shadow')) {
      document.body.style.overflow = 'auto';
      history.push('/');
    }
  }

  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img src={starFull} alt="starFull" />);
      } else {
        stars.push(<img src={starEmpty} alt="starEmpty" />);
      }
    }
    return stars;
  }

  const getPlatformImage = (platform) => {
    switch (platform) {
      case 'PlayStation':
        return playstation;
      case 'PlayStation 4':
        return playstation4;
      case 'PlayStation 5':
        return playstation5;
      case 'PC':
        return steam;
      case 'Xbox One':
        return xbox;
      case 'Xbox Series S/X':
        return XboxSeriesX;
      case 'Nintendo Switch':
        return nintendo;
      case 'iOS':
        return apple;
      case 'macOS':
        return MacOS;
      default:
        return gamepad;
    }
  }

  return (
    <>
      {!isLoading && (
        <CardShadow className='shadow' onClick={exitDetailHandler}>
          <Detail layoutId={pathId}>
            <Stats>
              <Rating>
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                <p>rating: {game.rating}</p>
                {getStars()}
              </Rating>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms.map(data => (
                    <img key={data.platform.id} src={getPlatformImage(data.platform.name)} alt={data.platform.name} />
                  ))}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img layoutId={`image ${pathId}`} src={smallImage(game.background_image, 1280)} alt={game.name} />
            </Media>
            <Description>
              <p>{game.description_raw}</p>
            </Description>
            <div className="gallery">
              {screen.results.map(screen => (
                <img src={smallImage(screen.image, 1280)} key={screen.id} alt={screen.id} />
              ))}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  );
}

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ff7676;
    }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  z-index: 5;
  color: black;
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Rating = styled(motion.div)`
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`;

const Info = styled(motion.div)`
  text-align: center;
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;

export default GameDetail;