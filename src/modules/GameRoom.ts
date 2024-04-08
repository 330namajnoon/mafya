import God from "./God";
import Room from "./Room";



export default class GameRoom {
    god: God;
    roomData: Room;

    constructor(data: Room, god: God) {
        this.roomData = data;
        this.god = god;
    }
}