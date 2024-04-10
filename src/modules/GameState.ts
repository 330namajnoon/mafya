import Avatars, { Avatar } from "./Avatars";
import GameRoom from "./GameRoom";
import God from "./God";
import Room from "./Room";

export default class GameState {
    avatars: Avatars = new Avatars([
        new Avatar("avatar001", "/assets/avatar001.png"),
        new Avatar("avatar002", "/assets/avatar002.png"),
    ]);
    god: God | null = null;
    status: "START" | "GOD" | "USER" = "GOD";
    rooms!: Room[] | null;
    currentRoom: GameRoom | null = new GameRoom({id: 0, name: "Mi sala"}, new God("Sina"));

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
