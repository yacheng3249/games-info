import { combineReducers } from "redux";
import gamesReducer from "./gamesReducer";
import detailReducer from "./detailReducer";

const rootReducer = combineReducers({
  game: gamesReducer,
  detail: detailReducer
});

export default rootReducer;