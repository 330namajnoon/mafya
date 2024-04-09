import { useContext } from "react";
import AppContext from "./contexts/AppContext";
import GodPage from "./components/GodPage/GodPage";
import StartPage from "./components/StartPage";
import UserPage from "./components/UserPage";
const Game = () => {
    const gameState = useContext(AppContext);
    const page = () => {
        switch (gameState.status) {
            case "START":        
                return <StartPage />
            case "GOD":
                return <GodPage />
            case "USER":
                return <UserPage />
        }
    }

    return page();
}

export default Game;