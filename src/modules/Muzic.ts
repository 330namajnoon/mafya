
export default class Muzic {
    name: string;
    element: HTMLAudioElement;
    isUploaded: boolean = false;
    isPlayed: boolean = false;

    constructor(name: string, path: string) {
        this.name = name;
        this.element = new Audio(path);
        const this_ = this; 
        this.element.oncanplaythrough = function() {
            this_.isUploaded = true;
        }
    }
}