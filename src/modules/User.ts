import { Avatar } from "./Avatars";

export default class User {
    id: string;
    name: string;
    avatar: Avatar | null;
    isActive: boolean = true;
    role: string | null = null;
    timer: number = 0;


    constructor(id: string, name: string, avatar: Avatar | null = null) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
    }

}