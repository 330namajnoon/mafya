import { useContext, useEffect, useRef, useState } from "react";
import appContext from "../../contexts/AppContext";
import { Background, BackgroundTransparent, Button, ButtonsBack, StoriesBack, Story, TextInput, TimeChanger, TimerBack, TimerCup, UserCards, UserRegisterBack } from "./styles";
import UserCard from "../UserCard";
import RoleManager from "../RoleManager";
import socket from "../../socket";
import Room from "../../modules/Room";
import User from "../../modules/User";
import { uploadFile } from "../../actions/rooms";

const GodPage = () => {
    const { currentRoom, dispatch, setCurrentRoom } = useContext(appContext);
    const gameState = useContext(appContext);

    const [isPlayed, setIsPlayed] = useState(false);
    const [step, setStep] = useState<"REGISTER" | "PLAY">("REGISTER");
    const [roomName, setRoomName] = useState("");
    const [userName, setUserName] = useState("");
    const [time, setTime] = useState<number | null>(null);
    const [fileName, setFileName] = useState("Elige una canción");

    const file = useRef(null);

    const fileOnchange = () => {
        if (file.current) {
            let f = file.current as HTMLInputElement;
            if (f.files) {
                setFileName(f.files[0].name);
                uploadFile(gameState, f.files[0]);
            }
        }
    }

    const setTimerChanger = (value: number = window.innerWidth / 2) => {
        const timerCup = document.getElementById("timerCup");
        const timerChanger = document.getElementById("timerChanger");
        if (timerCup && timerChanger) {
            const timerCupWidth = timerCup.getBoundingClientRect().width as number;
            const timerCupLeft = timerCup.getBoundingClientRect().left as number;
            if ((value) < (timerCupWidth + timerCupLeft)) {
                const time = ((value - timerCupLeft) / (timerCupWidth - timerCupLeft)) * (95 * 2);
                timerChanger.style.width = value - timerCupLeft + "px";
                setTime(Math.floor(time));
            }
        }
    }

    const play_pause = () => {
        if (!isPlayed) {
            gameState.dispatch(null, `this.muzicPlay()`);
            setIsPlayed(!isPlayed);
        } else {
            gameState.dispatch(null, `this.muzicPause()`);
            setIsPlayed(!isPlayed);
        }
    }

    const timeOnChange = (e: any) => {
        setTimerChanger(e.touches[0].clientX);
    }

    const addNewStory = () => {
        if (currentRoom && currentRoom.usersSelected.length > 0) {
            const description = prompt("Cuenta la historia:") as string;
            dispatch(gameState.addStory(description));
        }
    }

    const setUsersTimer = () => {
        if (time)
            gameState.dispatch(gameState.setUsersTimer(time), `this.setUsersTimer(${time})`);
    }

    useEffect(() => {
        const search = new URLSearchParams(window.location.search);
        const name = search.get("adminName");
        const roomName = search.get("roomName")

        if (name && roomName) {
            setRoomName(roomName);
            setUserName(name);
            socket.emit("createRoom", new Room(0, roomName));
        }
        socket.on("createRoom", (roomData: Room) => {
            const god = new User(roomData.id + "", userName);
            const me = god;
            gameState.dispatch(gameState.setMe(me));
            setCurrentRoom(roomData, god);
            setStep("PLAY");
            gameState.start();
        })

        socket.on("userLogout", (userId: string) => {
            if (gameState.currentRoom) {
                gameState.currentRoom.users = gameState.currentRoom.users.filter(user => user.id !== userId);
                gameState.dispatch(null, `
                    if (this.currentRoom)
                        this.currentRoom.users = value;
                `, gameState.currentRoom.users);
            }
        })
        return () => {
            socket.off("createRoom", () => {

            })
        }
    }, [])

    useEffect(() => {
        if (gameState.currentRoom) {
            socket.on(`getRoomData_${gameState.currentRoom.roomData.id}`, (user: User) => {
                gameState.addUser(user);
                socket.emit("sendCurrentRoom", gameState.currentRoom);
            })
        }
    }, [gameState.currentRoom])

    useEffect(() => {
        if (!time)
            setTimerChanger();
    })

    return (
        <Background>
            {step === "REGISTER" || !currentRoom ?
                (
                    <UserRegisterBack>
                        <TextInput onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Nombre de usuario"/>
                        <TextInput onChange={(e) => setRoomName(e.target.value)} type="text" placeholder="Nombre de sala"/>
                        <Button onClick={() => {
                            if (userName !== "" && roomName !== "")
                                gameState.setSearchParams("adminName", userName);
                                gameState.setSearchParams("roomName", roomName);
                                socket.emit("createRoom", new Room(0, roomName));
                        }}>Empezar</Button>
                    </UserRegisterBack>
                )
                :
                (
                    <>
                        <input onChange={fileOnchange} ref={file} type="file" style={{ display: "none" }} />
                        <BackgroundTransparent>
                            <UserCards>
                                {currentRoom.users.map((user, index) => (
                                    <UserCard width={160} height={260} key={index} user={user} style={{marginLeft: "5px"}} />
                                ))}
                            </UserCards>
                            <RoleManager />
                            <ButtonsBack>
                                <Button onClick={() => {
                                    if (file.current) {
                                        let f = file.current as HTMLInputElement;
                                        f.click();
                                    }
                                }}>{fileName}</Button>
                                <Button onClick={play_pause}>{isPlayed ? "PAUSE" : "PLAY"}</Button>
                            </ButtonsBack>
                            <TimerBack>
                                <TimerCup id="timerCup">
                                    {time}s
                                    <TimeChanger onTouchMove={timeOnChange} id="timerChanger" />
                                </TimerCup>
                                <Button onClick={setUsersTimer}>Aplicar el tiempo</Button>
                            </TimerBack>
                            <ButtonsBack>
                                <Button onClick={() => !gameState.currentRoom?.vote ? gameState.dispatch(gameState.setUserVote(), `this.setUserVote()`) : gameState.dispatch(gameState.unSelectUser("", true), `this.unSelectUser("", true)`)}>{!gameState.currentRoom?.vote ? "Votar" : "Se estan votando"}</Button>
                                { gameState.getAllVotesLength() > 0 && 
                                    <Button onClick={() => gameState.dispatch(gameState.resetAllVotes(), `this.resetAllVotes()`)}>Resetear votas</Button>
                                }
                            </ButtonsBack>
                            <StoriesBack>
                                <Button onClick={addNewStory}>Añadir una historia</Button>
                                {currentRoom.stories.map((story, index) => (
                                    <Story key={index}>
                                        {story.users.map((user, i) => (
                                            <UserCard key={i} user={user} width={50} height={85} />
                                        ))}
                                        <h4>
                                            {story.description}
                                        </h4>
                                    </Story>
                                ))}
                            </StoriesBack>
                        </BackgroundTransparent>
                    </>
                )}
        </Background>
    )

}

export default GodPage;