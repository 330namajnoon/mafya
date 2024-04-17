import { useContext, useEffect } from "react";
import { getRooms } from "../../actions/rooms";
import appContext from "../../contexts/AppContext";
import { Background } from "./styles";
import socket from "../../socket";
import User from "../../modules/User";
import GameRoom from "../../modules/GameRoom";
import UserCard from "../UserCard";

const UserPage = () => {
    const gameState = useContext(appContext);

    const roomRegister = (roomId: number, user: User) => {
        socket.emit(`getRoomData`, roomId, user);
    }

    useEffect(() => {
        getRooms(gameState);
        socket.emit("login");
        socket.on("login", (id) => {
            const search = new URLSearchParams(window.location.search);
            let name = "";
            if (search.get("userName"))
                name = search.get("userName") as string;
            else
                name = prompt("Tu nombre:") as string;
            const user = new User(id, name, gameState.avatars.getAvatarFromName("avatar001"));
            if (search.get("roomId"))
                roomRegister(parseInt(search.get("roomId") as string), user);
            gameState.dispatch(gameState.setMe(user));
        })

        socket.on(`${gameState.currentRoom?.roomData.id}_sendRoomData`, (room: GameRoom) => {
            console.log(room);
        });

        socket.on("sendCurrentRoom", (room: GameRoom) => {
            if (gameState.currentRoom) {
                gameState.updateCurrentRoom(room);
            } else {
                console.log(room)
                gameState.setCurrentRoom(room.roomData, null);
                gameState.dispatch(gameState.updateCurrentRoom(room));
            }
            gameState.start();
        })
        return () => {
            socket.off("login", (id) => {
                console.log(id);
            });
        }
    }, [])

    useEffect(() => {
        if (gameState.rooms)
            console.log(gameState.rooms)
    }, [gameState.rooms]);

    if (gameState.me && gameState.currentRoom) {
        const me = gameState.getUserById(gameState.me.id);
        if (me)
            return (
                <Background>
                    <UserCard width={window.innerWidth} height={window.innerHeight} user={me} />
                </Background>
            )
    }

    return null;

}

export default UserPage;