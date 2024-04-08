import GameRoom from "./GameRoom";
import God from "./God";
import Room from "./Room";

export default class GameState {
    god: God | null = null;
    status: "START" | "GOD" | "USER" = "START";
    rooms!: Room[] | null;
    currentRoom: GameRoom | null = null;

    setState: (state: GameState) => void;

    constructor(setState: any) {
        this.setState = setState;
    }

    setRooms = (rooms: Room[]) => {
        this.rooms = rooms;
        this.setState(this);
    }

    setCurrentRoom = (roomData: Room, god: God) => {
        this.currentRoom = new GameRoom(roomData, god);
        this.god = god;
        this.status = "GOD";
        this.setState(this);
    }

    setStatus = (status: "START" | "GOD" | "USER") => {
        this.status = status;
        this.setState(this);
    }
}
