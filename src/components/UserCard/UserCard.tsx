import { useContext, useState } from "react";
import { serverURL } from "../../config";
import User from "../../modules/User";
import { Background, NotActive, Role } from "./styles";
import appContext from "../../contexts/AppContext";

const UserCard = (props: { user: User, width: number, height: number }) => {
    const [timeOut, setTimeOut] = useState<NodeJS.Timeout | null>();
    const gameState = useContext(appContext);
    const { avatar, name, role, isActive, id, setIsActive } = props.user;

    const setSelected = () => {
        gameState.dispatch(gameState.currentRoom?.selectUser(id));
        setTimeOut(setTimeout(() => {
            setTimeOut(null);
        }, 500));
        if (timeOut)
            gameState.dispatch(setIsActive(!isActive), `
                    if (this.currentRoom) {
                        this.currentRoom.users.forEach((user) => {
                            if (user.id === "${id}") {
                                user.setIsActive(${!isActive});
                                console.log(this.currentRoom);
                            }
                        })
                    }
                `
            );
    }

    return (
        <Background onClick={setSelected} width={props.width} height={props.height} isSelected={gameState.currentRoom ? gameState.currentRoom.usersSelected.some(u => u.id === id) : false}>
            {role &&
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
        </Background>
    )
}

export default UserCard;