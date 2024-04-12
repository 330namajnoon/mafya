import { useContext, useEffect, useRef, useState } from "react";
import appContext from "../../contexts/AppContext";
import { Background, BackgroundTransparent, Button, ButtonsBack, StoriesBack, Story, TimeChanger, TimerBack, TimerCup, UserCards } from "./styles";
import UserCard from "../UserCard";
import RoleManager from "../RoleManager";
import socket from "../../socket";
import Room from "../../modules/Room";
import God from "../../modules/God";

const GodPage = () => {
    const { currentRoom, dispatch, setCurrentRoom } = useContext(appContext);
    const [time, setTime] = useState(50);
    const [fileName, setFileName] = useState("Elige una canción");
    const file = useRef(null);

    const fileOnchange = () => {
        if (file.current) {
            let f = file.current as HTMLInputElement;
            if (f.files)
                setFileName(f.files[0].name);
        }
    }

    const setTimerChanger = (value: number = window.innerWidth / 2) => {
        const timerCup = document.getElementById("timerCup") as HTMLElement;
        const timerChanger = document.getElementById("timerChanger") as HTMLElement;
        const timerCupWidth = timerCup.getBoundingClientRect().width as number;
        const timerCupLeft = timerCup.getBoundingClientRect().left as number;
        if ((value) < (timerCupWidth + timerCupLeft)) {
            const time = ((value - timerCupLeft) / (timerCupWidth - timerCupLeft)) * (95 * 2); 
            timerChanger.style.width = value - timerCupLeft + "px";
            setTime(Math.floor(time));
        }
    }

    const timeOnChange = (e:any) => {
       setTimerChanger(e.touches[0].clientX);
    }

    const addNewStory = () => {
        if (currentRoom && currentRoom.usersSelected.length > 0) {
            const description = prompt("Cuenta la historia:") as string;
            dispatch(currentRoom.addStory(description), undefined);
        }
    }
    
    useEffect(() => {
        const search = new URLSearchParams(window.location.search);
        let name = ""; 
        if (search.get("roomName"))
            name = search.get("roomName") as string;
        else
            name = prompt("Escribe un nombre para tu sala: ") as string;
        if (name && name.length > 0) {
            socket.emit("createRoom", new Room(0, name));
        }
        socket.on("createRoom", (roomData: Room) => {
            let name = ""; 
            if (search.get("adminName"))
                name = search.get("roomName") as string;
            else
                name = prompt("Tu nombre: ") as string;
            if (name && name.length > 0) {
                const god = new God(name);
                setCurrentRoom(roomData, god);
            }
        })
        return () => {
            socket.off("createRoom", () => {

            })
        }
        setTimerChanger();
    }, [])

    if (currentRoom) {
        const { users } = currentRoom;
        return (
            <Background>
                <input onChange={fileOnchange} ref={file} type="file" style={{display: "none"}} />
                <BackgroundTransparent>
                    <UserCards>
                        { users.map((user, index) => (
                            <UserCard width={160} height={260} key={index} user={user} />
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
                        <Button>Play</Button>
                    </ButtonsBack>
                    <TimerBack>
                        <TimerCup id="timerCup">
                            {time}s
                            <TimeChanger onTouchMove={timeOnChange} id="timerChanger"/>
                        </TimerCup>
                        <Button>Aplicar el tiempo</Button>
                    </TimerBack>
                    <StoriesBack>
                        <Button onClick={addNewStory}>Añadir una historia</Button>
                        { currentRoom.stories.map((story, index) => (
                            <Story key={index}>
                                { story.users.map((user, i) => (
                                    <UserCard key={i} user={user} width={50} height={85}/>
                                ))}
                                <h4>
                                    {story.description}
                                </h4>
                            </Story>
                        ))}
                    </StoriesBack>
                </BackgroundTransparent>
            </Background>
        )
    }
    else
        return null
}

export default GodPage;