import { useContext, useEffect, useState } from "react";
import { getRooms } from "../../actions/rooms";
import appContext from "../../contexts/AppContext";
import { AvatarsListBack, Background, RoomsListBack, UserNameStepBack } from "./styles";
import socket from "../../socket";
import User from "../../modules/User";
import GameRoom from "../../modules/GameRoom";
import UserCard from "../UserCard";
import { serverURL } from "../../config";
import { Button } from "../GodPage/styles";
import VoteCard from "../VoteCard";

const width = window.innerWidth;
const height = window.innerHeight;

export type UserPageStatusMap = {
    LOGIN: "LOGIN",
    ROOMS_LIST: "ROOMS_LIST",
    USER_NAME: "USER_NAME",
    AVATARS_LIST: "AVATARS_LIST",
    PLAY: "PLAT"
}

const UserPage = () => {
    const gameState = useContext(appContext);

    const [roomId, setRoomId] = useState<number | null>(null);
    const [status, setStatus] = useState<keyof UserPageStatusMap>("LOGIN");
    const [userState, setUserState] = useState<User>(new User("", ""));

    const roomRegister = (roomId: number, user: User) => {
        socket.emit(`getRoomData`, roomId, user);
    }


    useEffect(() => {
        getRooms(gameState);
    }, [])

    useEffect(() => {
        if (gameState.rooms) {
            socket.emit("login");
            socket.on("login", (id) => {
                const search = new URLSearchParams(window.location.search);
                const roomId = search.get("roomId");
                const userName = search.get("userName");
                const avatarName = search.get("avatarName");
                if (roomId && userName && avatarName && gameState.rooms && gameState.rooms.find(r => r.id === parseInt(roomId))) {
                    const user = new User(id, userName, gameState.avatars.getAvatarFromName(avatarName));
                    roomRegister(parseInt(roomId), user);
                    gameState.setMe(user);
                } else {
                    setUserState({ ...userState, id });
                    setStatus("ROOMS_LIST");
                }
            })

            socket.on("sendCurrentRoom", (room: GameRoom) => {
                if (gameState.currentRoom) {
                    gameState.updateCurrentRoom(room);
                } else {
                    gameState.setCurrentRoom(room.roomData, null);
                    gameState.dispatch(gameState.updateCurrentRoom(room));
                }
                gameState.start();
                setStatus("PLAY");
            })
        }
        return () => {
            socket.off("login", (id) => {
                console.log(id);
            });
        }
    }, [gameState.rooms])


    const getStep = () => {
        switch (status) {
            case "ROOMS_LIST":
                return (
                    <RoomsListBack>
                        {gameState.rooms && gameState.rooms.map((room, i) => (
                            <button onClick={() => {
                                setRoomId(room.id);
                                setStatus("USER_NAME");
                                gameState.setSearchParams("roomId", room.id + "");
                            }} key={i}>
                                {room.name}
                            </button>
                        ))}
                    </RoomsListBack>
                )
            case "USER_NAME":
                return (
                    <UserNameStepBack>
                        <input onChange={(e) => {
                            setUserState({ ...userState, name: e.target.value });
                            gameState.setSearchParams("userName", e.target.value);
                        }} type="text" placeholder="Tu nombre" className="userName" />
                        <button onClick={() => {
                            setStatus("AVATARS_LIST");
                        }} className="userNameButton">
                            Sigiente
                        </button>
                    </UserNameStepBack>
                )

            case "AVATARS_LIST":
                return (
                    <AvatarsListBack>
                        {gameState.avatars.avatars.map((avatar, i) => (
                            <img onClick={() => {
                                if (roomId !== null) {
                                    gameState.setMe(userState);
                                    setUserState({ ...userState, avatar });
                                    roomRegister(roomId, userState);
                                    gameState.setSearchParams("avatarName", avatar.name);
                                }
                            }} className="avatar" src={serverURL + avatar.path} key={i} />
                        ))}
                    </AvatarsListBack>
                )

            case "PLAY":
                const user = gameState.currentRoom?.users.find(u => u.id === gameState.me?.id)
                if (user && gameState.currentRoom && !gameState.currentRoom.vote || ( user && gameState.currentRoom?.vote?.id === gameState.me?.id))
                    return <UserCard width={width} height={height} user={user} />
                if (user && gameState.currentRoom && gameState.currentRoom.vote)
                    return <VoteCard width={width} height={height} user={gameState.currentRoom.vote} />
            default:
                return null;
        }
    }

    return (
        <Background>
            {getStep()}
        </Background>
    )

}

export default UserPage;