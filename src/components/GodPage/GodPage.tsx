import { useContext, useEffect } from "react";
import socket from "../../socket";
import Room from "../../modules/Room";
import God from "../../modules/God";
import appContext from "../../contexts/AppContext";
import { Background } from "./styles";

const GodPage = () => {
    const gameState = useContext(appContext);

    useEffect(() => {
        // const name = prompt("Escribe un nombre para tu sala: ");
        // if (name && name.length > 0) {
        //     socket.emit("createRoom", new Room(0, name));
        // }
        // socket.on("createRoom", (roomData: Room) => {
        //     const name = prompt("Tu nombre: ");
        //     if (name && name.length > 0) {
        //         const god = new God(name);
        //         gameState.setCurrentRoom(roomData, god);
        //     }
        // })
        // return () => {
        //     socket.off("createRoom", () => {

        //     })
        // }
    }, [])
    return (
        <Background>

        </Background>
    )
}

export default GodPage;