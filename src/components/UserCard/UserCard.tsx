import { useContext, useEffect, useState } from "react";
import { serverURL } from "../../config";
import User from "../../modules/User";
import { Background, NotActive, Role, Timer } from "./styles";
import appContext from "../../contexts/AppContext";

const UserCard = (props: { user: User, width: number, height: number }) => {
    const [timeOut, setTimeOut] = useState<NodeJS.Timeout | null>();
    const [isSelected, setIsSelected] = useState(false);
    const gameState = useContext(appContext);
    const { avatar, name, role, isActive, id } = props.user;
    const isGod = (gameState.me?.id === gameState.god?.id);
    const [timer, setTimer] = useState(props.user.timer);

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
        <Background onClick={isGod ? setSelected : () => { }} width={props.width} height={props.height} isSelected={gameState.currentRoom ? gameState.currentRoom.usersSelected.some(u => u.id === id) : false}>
            {role && isGod &&
                <Role width={props.width}>
                    <h2>
                        {role}
                    </h2>
                </Role>
            }
            <img src={serverURL + avatar.path} alt="" />
            <h3>{name}</h3>

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

export default UserCard;