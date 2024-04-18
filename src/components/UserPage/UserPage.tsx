import { useContext, useEffect, useState } from "react";
import { getRooms } from "../../actions/rooms";
import appContext from "../../contexts/AppContext";
import { Background, RoomsListBack, UserNameStepBack } from "./styles";
import socket from "../../socket";
import User from "../../modules/User";
import GameRoom from "../../modules/GameRoom";
import UserCard from "../UserCard";

const width = window.innerWidth;
const height = window.innerHeight;

export type UserPageStatusMap = {
    ROOMS_LIST: "ROOMS_LIST",
    USER_NAME: "USER_NAME",
    AVATARS_LIST: "AVATARS_LIST"
}

const UserPage = () => {
    const gameState = useContext(appContext);

    const [roomId, setRoomId] = useState<number | null>(null);
    const [status, setStatus] = useState<keyof UserPageStatusMap>("ROOMS_LIST");
    const [userState, setUserState] = useState<User>(new User("", "", gameState.avatars.getAvatarFromName("avatar001")));

    const roomRegister = (roomId: number, user: User) => {
        socket.emit(`getRoomData`, roomId, user);
    }

    const setSearchParams = (name: string, value: string) => {
        const searsh = new URLSearchParams(window.location.search);
        searsh.set(name, value);
        history.pushState(null, "",window.location.pathname + "?" + searsh.toString());
    }

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
                        UserName
                    </UserNameStepBack>
                )

            default:
                return null;
        }
    }

    useEffect(() => {
        getRooms(gameState);
        socket.emit("login");
        socket.on("login", (id) => {
            setUserState({ ...userState, id });
        })
        // socket.on("login", (id) => {
        //     const search = new URLSearchParams(window.location.search);
        //     let name = "";
        //     if (search.get("userName"))
        //         name = search.get("userName") as string;
        //     else
        //         name = prompt("Tu nombre:") as string;
        //     const user = new User(id, name, gameState.avatars.getAvatarFromName("avatar001"));
        //     if (search.get("roomId"))
        //         roomRegister(parseInt(search.get("roomId") as string), user);
        //     gameState.dispatch(gameState.setMe(user));
        // })

        // socket.on(`${gameState.currentRoom?.roomData.id}_sendRoomData`, (room: GameRoom) => {
        //     console.log(room);
        // });

        // socket.on("sendCurrentRoom", (room: GameRoom) => {
        //     if (gameState.currentRoom) {
        //         gameState.updateCurrentRoom(room);
        //     } else {
        //         console.log(room)
        //         gameState.setCurrentRoom(room.roomData, null);
        //         gameState.dispatch(gameState.updateCurrentRoom(room));
        //     }
        //     gameState.start();
        // })
        // return () => {
        //     socket.off("login", (id) => {
        //         console.log(id);
        //     });
        // }
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
                default:
                    break;
            }

            console.log(gameState.rooms)
        }
    }, [gameState.rooms, status]);

    
    return (
        <Background>
            {getStep()}
        </Background>
    )

}

export default UserPage;