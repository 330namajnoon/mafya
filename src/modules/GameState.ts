import { serverURL } from "../config";
import socket from "../socket";
import Avatars, { Avatar } from "./Avatars";
import GameRoom from "./GameRoom";
import Room from "./Room";
import Story from "./Story";
import User from "./User";

export default class GameState {
    me: User | null = null;
    avatars: Avatars = new Avatars([
        new Avatar("avatar001", "/assets/avatar001.png"),
        new Avatar("avatar002", "/assets/avatar002.png"),
    ]);
    god: User | null = null;
    status: "START" | "GOD" | "USER" = new URLSearchParams(window.location.search).get("page") as any;
    rooms!: Room[] | null;
    currentRoom: GameRoom | null = null;

    setMe = (me: User) => {
        this.me = me;
    }

    setState: (state: GameState) => void;

    constructor(setState: any) {
        this.setState = setState;
    }

    start = () => {
        if (this.currentRoom)
            socket.on(`update_${this.currentRoom.roomData.id}`, (update: string, value: any) => {
                eval(update);
                console.log(this, value, update);
                this.setState(this);
            })
    }

    setSearchParams = (name: string, value: string) => {
        const searsh = new URLSearchParams(window.location.search);
        searsh.set(name, value);
        history.pushState(null, "",window.location.pathname + "?" + searsh.toString());
    }

    setRooms = (rooms: Room[]) => {
        this.rooms = rooms;
        this.setState(this);
    }

    setCurrentRoom = (roomData: Room, god: User | null) => {
        this.currentRoom = new GameRoom(roomData, god);
        this.god = god;
        this.setState(this);
    }

    updateCurrentRoom = (room: GameRoom) => {
        this.currentRoom = { ...this.currentRoom, ...room };
    }

    setStatus = (status: "START" | "GOD" | "USER") => {
        this.status = status;
        this.setState(this);
    }

    dispatch = (action: any, socketUpdate: string = "", updateValue: any = null) => {
        this.setState(this);
        if (this.currentRoom)
            socket.emit("update", this.currentRoom.roomData.id, socketUpdate, updateValue);
        return action;
    }

    // current room //
    getAllVotesLength = () => {
        let len = 0;
        if (this.currentRoom) {
            this.currentRoom.users.forEach(user => {
                len += user.votes.length;
            })
        }
        return len;
    }

    resetAllVotes = () => {
        if (this.currentRoom) {
            this.currentRoom.users.forEach(user => {
                user.votes = [];
            })
        }
    }

    setUserVote = () => {
        if (this.currentRoom)
            this.currentRoom.vote = this.currentRoom.usersSelected[0];
    }

    vibrate = () => {
        if (this.currentRoom) {
            this.currentRoom.usersSelected.forEach(user => {
                if (user.id === this.me?.id && this.currentRoom)
                    window.navigator.vibrate([500, 500, 500]);
            })
        }
    }

    setMuzicIsUploaded = (value: boolean, path: string) => {
        if (this.currentRoom) {
            this.currentRoom.usersSelected.forEach(user => {
                if (user.id === this.me?.id) {
                    user.muzicFile = window.document.createElement("audio");
                    user.muzicFile.src = serverURL + path;
                    user.muzicFile.oncanplaythrough = function () {
                        user.muzicIsUploaded = value;
                    };
                }
            })
        }
    }

    muzicPlay = () => {
        if (this.currentRoom) {
            this.currentRoom.usersSelected.forEach(user => {
                console.log(!user.muzicIsPlayed)
                if (user.id === this.me?.id && !user.muzicIsPlayed && user.muzicFile) {
                    user.muzicFile.play();
                    user.muzicIsPlayed = true;
                }
            })
        }
    }

    muzicPause = () => {
        if (this.currentRoom) {
            this.currentRoom.usersSelected.forEach(user => {
                if (user.id === this.me?.id && user.muzicIsPlayed && user.muzicFile) {
                    user.muzicFile.pause();
                    user.muzicFile.currentTime = 0;
                    user.muzicIsPlayed = false;
                }
            })
        }
    }

    setUsersTimer = (time: number) => {
        if (this.currentRoom) {
            this.currentRoom.usersSelected.forEach(user => {
                user.timer = time;
            })
        }
    }

    addUser = (user: User) => {
        if (this.currentRoom)
            this.currentRoom.users.unshift(user);
    }

    deleteUserById = (id: string) => {
        if (this.currentRoom)
            this.currentRoom.users = this.currentRoom.users.filter(u => u.id !== id);
    }

    selectUser = (id: string) => {
        if (this.currentRoom) {
            const user = this.currentRoom.users.find(u => u.id === id);
            if (user)
                if (!this.currentRoom.usersSelected.some(u => u.id === user.id))
                    this.currentRoom.usersSelected.unshift(user);
        }
    }

    unSelectUser = (id: string, all: boolean = false) => {
        if (this.currentRoom && !all) {
            if (this.currentRoom.usersSelected.some(u => u.id === id))
                this.currentRoom.usersSelected = this.currentRoom.usersSelected.filter(u => u.id !== id);
            if (this.currentRoom.usersSelected.length === 0)
                this.currentRoom.vote = null
        } else {
            if (this.currentRoom) {
                this.currentRoom.usersSelected = [];
                if (this.currentRoom.usersSelected.length === 0)
                    this.currentRoom.vote = null
            }
        }
    }

    addStory = (description: string) => {
        if (this.currentRoom)
            this.currentRoom.stories.unshift(new Story(this.currentRoom.usersSelected, description));
    }

    // User //
    vote = (userId: string) => {
        if (this.currentRoom && this.currentRoom.vote && !this.currentRoom.vote.votes.find(v => v === userId)) {
            this.currentRoom.vote.votes.push(userId);
        }
    }
    
    getUserById = (id: string): User | undefined => {
        if (this.currentRoom) {
            const user = this.currentRoom.users.find(u => u.id === id);
            return user;
        }
    }

    userSetIsActiveById = (userId: string, value: boolean) => {
        if (this.currentRoom) {
            const user = this.currentRoom.users.find(u => u.id === userId);
            if (user)
                user.isActive = value;
        }
    }

    userSetRoleById = (userId: string, role: string) => {
        if (this.currentRoom) {
            const user = this.currentRoom.users.find(u => u.id === userId);
            if (user)
                user.role = role;
        }
    }
}
