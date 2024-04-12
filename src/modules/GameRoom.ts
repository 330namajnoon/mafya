import { Avatar } from "./Avatars";
import God from "./God";
import Room from "./Room";
import Story from "./Story";
import User from "./User";



export default class GameRoom {
    god: God;
    roomData: Room;
    users: User[] = [
        new User("1346", "Feri", new Avatar("avatar001", "/assets/avatar001.png")),
        new User("1586", "Sina", new Avatar("avatar002", "/assets/avatar002.png")),
        new User("1347", "Feri", new Avatar("avatar001", "/assets/avatar001.png")),
    ];
    stories: Story[] = []; 
    usersSelected: User[] = [];

    constructor(data: Room, god: God) {
        this.roomData = data;
        this.god = god;
    }

    addUser = (user: User) => {
        this.users.unshift(user);
    }

    deleteUserById = (id: string) => {
        this.users = this.users.filter(u => u.id !== id);
    }

    selectUser = (id: string) => {
        if (this.usersSelected.some(u => u.id === id)) {
            this.usersSelected = this.usersSelected.filter(u => u.id !== id);
        } else {
            const user = this.users.find(u => u.id === id);
            if (user)
                this.usersSelected.unshift(user);
        }
    }

    addStory = (description: string) => {
        this.stories.unshift(new Story(this.usersSelected, description));
    }
}