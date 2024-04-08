import { useContext, useEffect } from "react";
import socket from "./socket";
import AppContext from "./contexts/AppContext";
import { getRooms } from "./actions/rooms";
import Room from "./modules/Room";
import GodPage from "./components/GodPage/GodPage";
import God from "./modules/God";
import StartPage from "./components/StartPage";
import UserPage from "./components/UserPage";
const Game = () => {
    const gameState = useContext(AppContext);
    const createRoom = () => {
        const name = prompt("Cual es el nombre de tu mundo?: ");
        if (name && name.length > 0) {
            socket.emit("createRoom", new Room(0, name));
        }
    }

    useEffect(() => {
        socket.on("getRooms", () => getRooms(gameState));
        socket.on("createRoom", (roomData: Room) => {
            const name = prompt("Tu nombre: ");
            if (name && name.length > 0) {
                const god = new God(name);
                gameState.setCurrentRoom(roomData, god);
            }
        })
        return () => {
            socket.off("getRooms");
        }
    }, [])

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