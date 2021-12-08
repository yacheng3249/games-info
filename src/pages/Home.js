import React, { useEffect } from "react";
import GameDetail from "../components/GameDetail";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
import Game from '../components/Game';
import styled from 'styled-components';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { useLocation } from "react-router-dom";
import { fadeIn } from '../animation';


const Home = () => {
  //Get the current location
  const location = useLocation();
  const pathId = location.pathname.split('/')[2];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames())
  }, ['dispatch']);

  const { popular, newGames, upcoming, searched } = useSelector(state => state.game);

  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      {/* <AnimateSharedLayout type="crossfade"> */}
      <AnimatePresence>
        {pathId && <GameDetail pathId={pathId} />}
      </AnimatePresence>
      { searched.length >= 1 && (
        <div className="searched">
          <h2>Searched Games</h2>
          <Games>
            {searched.map(searchedGame => (
              <Game
                name={searchedGame.name}
                released={searchedGame.released}
                id={searchedGame.id}
                image={searchedGame.background_image}
                key={searchedGame.id}
              />
            ))}
          </Games>
        </div>
      )}
      <h2>Upcoming Games</h2>
      <Games>
        {upcoming.map(upcomingGame => (
          <Game
            name={upcomingGame.name}
            released={upcomingGame.released}
            id={upcomingGame.id}
            image={upcomingGame.background_image}
            key={upcomingGame.id}
          />
        ))}
      </Games>
      <h2>Popular Games</h2>
      <Games>
        {popular.map(popularGame => (
          <Game
            name={popularGame.name}
            released={popularGame.released}
            id={popularGame.id}
            image={popularGame.background_image}
            key={popularGame.id}
          />
        ))}
      </Games>
      <h2>New Games</h2>
      <Games>
        {newGames.map(newGame => (
          <Game
            name={newGame.name}
            released={newGame.released}
            id={newGame.id}
            image={newGame.background_image}
            key={newGame.id}
          />
        ))}
      </Games>
      {/* </AnimateSharedLayout> */}
    </GameList>
  );
}

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }

  @media screen and (max-width: 768px) {
    padding: 0rem 1rem;
    h2 {
      padding: 5rem 0rem 2rem 0rem;
      font-size: 2rem;
    }
  }
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export default Home;