import { useContext, useEffect } from "react";
import { getRooms } from "../../actions/rooms";
import appContext from "../../contexts/AppContext";
import { Background } from "./styles";
import socket from "../../socket";

const UserPage = () => {
    const gameState = useContext(appContext);

    useEffect(() => {
        getRooms(gameState);
        return () => {

        }
    })

    return (
        <Background>

        </Background>
    )
}

export default UserPage;