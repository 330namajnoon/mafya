import { serverURL } from "../../config";
import User from "../../modules/User";
import { Background, Role } from "./styles";

const UserCard = (props: {user: User, width: number, height: number}) => {
    const { avatar, name, role , setRole } = props.user;
    setRole("sina")
    
    return (
        <Background width={props.width} height={props.height}>
            { role &&
                <Role width={props.width}>
                    <h2>
                        {role}
                    </h2>
                </Role>
            }
            <img src={serverURL + avatar.path} alt="" />
            <h3>{name}</h3>
        </Background>
    )
}

export default UserCard;