import { useContext, useState } from "react";
import AppContext from "./contexts/AppContext";
import GodPage from "./components/GodPage/GodPage";
import StartPage from "./components/StartPage";
import UserPage from "./components/UserPage";
const Game = () => {
    const [loading, setLoading] = useState(true);
    const gameState = useContext(AppContext);

    gameState.avatars.load(() => {
        setLoading(false);
    })
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

    if (loading)
        return <div>Loading</div>
    return page();
}

export default Game;