import { useContext, useEffect, useState } from "react";
import { getRooms } from "../../actions/rooms";
import appContext from "../../contexts/AppContext";
import { AvatarsListBack, Background, RoomsListBack, UserNameStepBack } from "./styles";
import socket from "../../socket";
import User from "../../modules/User";
import GameRoom from "../../modules/GameRoom";
import UserCard from "../UserCard";
import { serverURL } from "../../config";

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
    const [userState, setUserState] = useState<User>(new User("", "", gameState.avatars.getAvatarFromName("avatar001")));

    const roomRegister = (roomId: number, user: User) => {
        socket.emit(`getRoomData`, roomId, user);
    }

    const setSearchParams = (name: string, value: string) => {
        const searsh = new URLSearchParams(window.location.search);
        searsh.set(name, value);
        history.pushState(null, "",window.location.pathname + "?" + searsh.toString());
    }

   

    useEffect(() => {
        getRooms(gameState);
        socket.emit("login");
        socket.on("login", (id) => {
            setUserState({ ...userState, id });
            setStatus("ROOMS_LIST");
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
            setStatus("PLAY");
        })
        return () => {
            socket.off("login", (id) => {
                console.log(id);
            });
        }
    }, [])

    useEffect(() => {
        if (gameState.rooms) {
            switch (status) {
                case "ROOMS_LIST":
                    const id = new URLSearchParams(window.location.search).get("roomId");
                    if (id) {
                        setRoomId(parseInt(id));
                        setStatus("USER_NAME");
                    }
                    break;
                case "USER_NAME":
                    const userName = new URLSearchParams(window.location.search).get("userName");
                    if (userName) {
                        setUserState({ ...userState, name: userName });
                        setStatus("AVATARS_LIST");
                    }
                    break;
                case "AVATARS_LIST":
                    const avatarName = new URLSearchParams(window.location.search).get("avatarName");
                    if (avatarName) {
                        setUserState({ ...userState, avatar: gameState.avatars.getAvatarFromName(avatarName) });
                        setStatus("PLAY");
                    }
                    break;
                default:
                    break;
            }
        }
    }, [gameState.rooms, status]);


    const getStep = () => {
        switch (status) {
            case "ROOMS_LIST":
                return (
                    <RoomsListBack>
                        {gameState.rooms && gameState.rooms.map((room, i) => (
                            <button onClick={() => {
                                setRoomId(room.id);
                                setStatus("USER_NAME");
                                setSearchParams("roomId", room.id + "");
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
                            setUserState({...userState, name: e.target.value});
                            setSearchParams("userName", e.target.value);
                        }} type="text" placeholder="Tu nombre" className="userName"/>
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
                        { gameState.avatars.avatars.map((avatar, i) => (
                            <img onClick={() => {
                                if (roomId !== null) {
                                    gameState.setMe(userState);
                                    setUserState({...userState, avatar});
                                    roomRegister(roomId, userState);
                                    setSearchParams("avatarName", avatar.name);
                                }
                            }} className="avatar" src={serverURL + avatar.path} key={i} />
                        ))}
                    </AvatarsListBack>
                )

            case "PLAY":
                const user = gameState.currentRoom?.users.find(u => u.id === gameState.me?.id)
                return user && gameState.me && gameState.currentRoom && (
                    <UserCard width={width} height={height} user={user} />
                )

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