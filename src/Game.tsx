import { useContext, useEffect, useState } from "react";
import AppContext from "./contexts/AppContext";
import GodPage from "./components/GodPage/GodPage";
import StartPage from "./components/StartPage";
import UserPage from "./components/UserPage";
import { colors } from "./config";
import Loading from "./components/Loading";
import socket from "./socket";
import User from "./modules/User";

const Game = () => {
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState(false);
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


    useEffect(() => {
        const userJson = window.localStorage.getItem("user");
        if (userJson) {
            const user: User = JSON.parse(userJson);
            socket.emit("login", user);
        } else {
            socket.emit("signup");
        }

        socket.on("login", (user: string | null) => {
            if (user && userJson) {
                gameState.dispatch(gameState.setMe(JSON.parse(userJson)));
                setLogin(true);
            } else {
                socket.emit("signup");
            }
        })

        socket.on("signup", (userId: string) => {
            const newUser = new User(userId, "");
            window.localStorage.setItem("user", JSON.stringify(newUser));
            gameState.dispatch(gameState.setMe(newUser));
            setLogin(true);
        })

        return () => {
            socket.off("login");
            socket.off("signup");
        }

    }, [])

    if (loading || !login)
        return <Loading />
    return (
        <>
            <span onClick={() => {
                window.location.search = "?page=START";
            }} style={{ fontSize: "30px", padding: "10px", boxSizing: "border-box", color: colors[2], backgroundColor: colors[4], width: "100%", textShadow: `4px 4px ${colors[2] + 70}` }} className="material-symbols-outlined">
                home
            </span>
            {page()}
        </>
    )
}

export default Game;