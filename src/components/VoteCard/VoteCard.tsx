import { useContext, useEffect, useState } from "react";
import { serverURL } from "../../config";
import User from "../../modules/User";
import { Background, Button, NotActive, Role, Timer, UserName, Votes } from "./styles";
import appContext from "../../contexts/AppContext";

const VoteCard = (props: { user: User, width: number, height: number }) => {
    const [timeOut, setTimeOut] = useState<NodeJS.Timeout | null>();
    const [isSelected, setIsSelected] = useState(false);
    const gameState = useContext(appContext);
    const { avatar, name, role, isActive, id, votes } = props.user;
    const isGod = (gameState.me?.id === gameState.god?.id);
    const [timer, setTimer] = useState(props.user.timer);

    const vote = (YN: boolean = true) => {
        if (YN) {
            if (gameState.currentRoom && gameState.currentRoom.vote && gameState.me) {
                gameState.dispatch(gameState.vote(gameState.me?.id), `this.vote("${gameState.me?.id}")`);
                gameState.dispatch(gameState.currentRoom.vote = null);
            }
        } else {
            if (gameState.currentRoom && gameState.currentRoom.vote)
                gameState.dispatch(gameState.currentRoom.vote = null);
        }
    }

    const setSelected = () => {
        if (!isSelected)
            gameState.dispatch(gameState.selectUser(id), `
                this.selectUser("${id}");
            `
            );
        else
            gameState.dispatch(gameState.unSelectUser(id), `
                this.unSelectUser("${id}");
            `
            );
        setIsSelected(!isSelected);
        setTimeOut(setTimeout(() => {
            setTimeOut(null);
        }, 500));
        if (timeOut)
            gameState.dispatch(gameState.userSetIsActiveById(id, !isActive), `
                    if (this.currentRoom) {
                        this.currentRoom.users.forEach((user) => {
                            if (user.id === "${id}") {
                                user.isActive = ${!isActive};
                            }
                        })
                    }
                `
            );
    }

    const setTimerWidthTimeOut = () => {
        if (timer > 0)
            setTimeout(() => {
                props.user.timer--;
                setTimer(timer - 1);
            }, 1000)
    }

    useEffect(() => {
        if (props.user.timer > 0) {
            setTimer(props.user.timer);
            setTimerWidthTimeOut();
        }
    })

    return (
        <Background onClick={isGod ? setSelected : () => { }} width={props.width} height={props.height} isSelected={gameState.currentRoom ? gameState.currentRoom.usersSelected.some(u => u.id === id) : false} backUrl={serverURL + avatar?.path}>
            {role && isGod &&
                <Role width={props.width}>
                    <h2>
                        {role}
                    </h2>
                </Role>
            }
            <UserName width={props.width}>
                <h2>
                    {name}
                </h2>
            </UserName>

            <Votes width={props.width}>
                <h2>
                    {votes.length}
                </h2>
            </Votes>

            <Button onClick={() => vote()}>Vota</Button>
            <Button onClick={() => vote(false)}>No quiero votar</Button>

            {!isActive &&
                <NotActive>
                    Fuera
                </NotActive>
            }
            {timer > 0 &&
                <Timer>
                    {timer}s
                </Timer>
            }
        </Background>
    )
}

export default VoteCard;