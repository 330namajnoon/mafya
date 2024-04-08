import axios from "axios";
import GameState from "../modules/GameState";
import { serverURL } from "../config";
import Room from "../modules/Room";

export type GetRoomsResponse = {
    status: number;
    rooms: Room[];
}

const getRooms = (gameState: GameState) => {
    axios.get<GetRoomsResponse>(`${serverURL}/rooms`).then(res => {
        gameState.setRooms(res.data.rooms);
    })
    .catch((err: any) => {
        console.log(err);
    })
}

export {getRooms};