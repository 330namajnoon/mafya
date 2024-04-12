import User from "./User";

export default class Story {
    users: User[] = [];
    description: string = "";

    constructor(users: User[], description: string) {
        this.users = users;
        this.description = description;
    }
    
}