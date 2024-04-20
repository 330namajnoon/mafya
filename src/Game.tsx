import { useContext, useState } from "react";
import AppContext from "./contexts/AppContext";
import GodPage from "./components/GodPage/GodPage";
import StartPage from "./components/StartPage";
import UserPage from "./components/UserPage";
import { colors } from "./config";
import Loading from "./components/Loading";

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
        return <Loading />
    return (
        <>
            <span onClick={() => {
                window.location.search = "?page=START";
            }} style={{fontSize: "30px", padding: "10px", color: colors[2], backgroundColor: colors[4], width: "100%", textShadow: `4px 4px ${colors[2] + 70}`}} className="material-symbols-outlined">
                home
            </span>
            {page()}
        </>
    )
}

export default Game;