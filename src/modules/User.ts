import { Avatar } from "./Avatars";

export default class User {
    id: string;
    name: string;
    avatar: Avatar;
    isActive: boolean = true;
    role: string | null = null;


    constructor(id: string, name: string, avatar: Avatar) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
    }

    setIsActive = (value: boolean) => {
        this.isActive = value;
    }

    setRole = (role: string) => {
        this.role = role;
    }

}