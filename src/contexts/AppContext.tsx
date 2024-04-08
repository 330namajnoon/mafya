import { createContext } from "react";
import GameState from "../modules/GameState";

const appContext = createContext<GameState>(new GameState(null));

export default appContext;