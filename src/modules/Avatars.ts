import { serverURL } from "../config";

export class Avatar {
    name: string;
    path: string;

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }
}

export default class Avatars {
    avatars: Avatar[] = [];
    avatarsLoaded: Avatar[] = [];
    
    constructor(avatars: Avatar[]) {
        this.avatars = avatars;
    }

    getAvatarFromName = (name: string): Avatar => {
        return this.avatarsLoaded.find(a => a.name === name) as Avatar;
    }

    load = (callback: (lenght: number) => void) => {

        this.avatars.forEach(a => {
            const image = new Image();
            image.src = serverURL + a.path;
            image.onload = () => {
                this.avatarsLoaded.push(a);
                if (this.avatars.length === this.avatarsLoaded.length)
                    callback(this.avatars.length);
            }
        })
    }
}