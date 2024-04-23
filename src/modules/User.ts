import { Avatar } from "./Avatars";

export default class User {
    id: string;
    name: string;
    avatar: Avatar | null;
    isActive: boolean = true;
    role: string | null = null;
    muzicFile: HTMLAudioElement | null = null;
    muzicIsUploaded = false;
    muzicIsPlayed: boolean = false;
    timer: number = 0;
    votes: string[] = [];
    isOnline: boolean = false;


    constructor(id: string, name: string, avatar: Avatar | null = null) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
    }

}