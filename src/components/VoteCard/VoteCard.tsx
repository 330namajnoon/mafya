import { useContext } from "react";
import { serverURL } from "../../config";
import User from "../../modules/User";
import { Background, Button, UserName, Votes } from "./styles";
import appContext from "../../contexts/AppContext";

const VoteCard = (props: { user: User, width: number, height: number }) => {
    const gameState = useContext(appContext);
    const { avatar, name, votes } = props.user;

    const vote = (YN: boolean = true) => {
        if (YN) {
            if (gameState.currentRoom && gameState.currentRoom.vote && gameState.me) {
                gameState.dispatch(gameState.vote(gameState.me.id), `this.vote("${gameState.me.id}")`);
                gameState.dispatch(gameState.currentRoom.vote = null);
            }
        } else {
            if (gameState.currentRoom && gameState.currentRoom.vote)
                gameState.dispatch(gameState.currentRoom.vote = null);
        }
    }

    return (
        <Background width={props.width} height={props.height} backUrl={serverURL + avatar?.path}>
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
            <div>
                <Button onClick={() => vote()}>Dar mi Voto</Button>
                <Button onClick={() => vote(false)}>Saltar Votación</Button>
            </div>
        </Background>
    )
}

export default VoteCard;