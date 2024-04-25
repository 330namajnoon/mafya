import axios from "axios";
import GameState from "../modules/GameState";
import { serverURL } from "../config";
import Room from "../modules/Room";

export type GetRoomsResponse = {
    status: number;
    rooms: Room[];
}

export type UploadFileResponse = {
    status: number;
    filePath: string;
}

const getRooms = (gameState: GameState) => {
    axios.get<GetRoomsResponse>(`${serverURL}/rooms`).then(res => {
        gameState.setRooms(res.data.rooms);
    })
    .catch((err: any) => {
        console.log(err);
    })
}

const uploadFile = (gameState: GameState, file: File) => {
    if (gameState.currentRoom) {
        const formData = new FormData();
        formData.append("roomId", gameState.currentRoom.roomData.id + "");
        formData.append("file", file);
        axios.post<UploadFileResponse>(`${serverURL}/uploadFile`, formData).then((res) => {
            gameState.dispatch(gameState.uploadMuzic(res.data.filePath), `this.uploadMuzic("${res.data.filePath}")`);
        }).catch(err => {
            console.log(err);
        });
    }
}

export {getRooms, uploadFile};