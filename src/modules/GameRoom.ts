import God from "./God";
import Room from "./Room";
import Story from "./Story";
import User from "./User";



export default class GameRoom {
    god: God | null;
    roomData: Room;
    users: User[] = [];
    stories: Story[] = []; 
    usersSelected: User[] = [];
    vote: User | null = null;

    constructor(data: Room, god: God | null) {
        this.roomData = data;
        this.god = god;
    }
}