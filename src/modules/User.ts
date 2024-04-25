import { Avatar } from "./Avatars";
import Muzic from "./Muzic";

export default class User {
    id: string;
    name: string;
    avatar: Avatar | null;
    isActive: boolean = true;
    role: string | null = null;
    muzic: Muzic | null = null;
    timer: number = 0;
    votes: string[] = [];
    isOnline: boolean = false;


    constructor(id: string, name: string, avatar: Avatar | null = null) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
    }

}