import { useContext, useState } from "react";
import { Background, CreateRoleBack, CreateRoleButton, Role, ShareRolesButton } from "./styles";
import appContext from "../../contexts/AppContext";

const RoleManager = () => {
    const gameState = useContext(appContext);
    const { currentRoom, setState } = useContext(appContext);
    const [roles, setRoles] = useState<string[]>([]);

    const createNewRole = () => {
        const name = prompt("Nombre de personaje:");
        if (name)
            setRoles([...roles, name])
    }

    const share = () => {
        if (currentRoom) {
            let rs = roles;
            while (rs.length > 0 && currentRoom.users.some(u => !u.role)) {
                let pos = Math.floor(Math.random() * currentRoom.users.length);
                let pos1 = Math.floor(Math.random() * rs.length);
                if (!currentRoom.users[pos].role) {
                    currentRoom.users[pos].setRole(rs[pos1]);
                    rs = rs.filter((r, i) => (r && i !== pos1));
                }
            }
            setRoles(rs);
            setState(gameState);
        }
    }

    const deleteRole = (index: number) => {
        setRoles(roles.filter((r, i) => (r && i !== index)));
    }

    return (
        <Background>
            <CreateRoleBack>
                {roles.map((role, index) => (
                    <Role onClick={() => deleteRole(index)} key={index}>
                        {role}
                    </Role>
                ))}
                <CreateRoleButton onClick={createNewRole}>
                    Crear personajes
                </CreateRoleButton>
            </CreateRoleBack>
            <ShareRolesButton onClick={share}>
                Compartir
            </ShareRolesButton>
        </Background>
    )
}

export default RoleManager;