import { serverURL } from "../config";
import socket from "../socket";
import Avatars, { Avatar } from "./Avatars";
import GameRoom from "./GameRoom";
import Muzic from "./Muzic";
import Room from "./Room";
import Story from "./Story";
import User from "./User";

export default class GameState {
	me: User | null = null;
	avatars: Avatars = new Avatars([
		new Avatar("avatar001", "/assets/avatar001.png"),
		new Avatar("avatar002", "/assets/avatar002.png"),
		new Avatar("avatar003", "/assets/avatar003.jpg"),
		new Avatar("avatar004", "/assets/avatar004.jpg"),
		new Avatar("avatar005", "/assets/avatar005.jpg"),
		new Avatar("avatar006", "/assets/avatar006.jpg"),
		new Avatar("avatar007", "/assets/avatar007.jpg"),
		new Avatar("avatar008", "/assets/avatar008.jpg"),
		new Avatar("avatar009", "/assets/avatar009.jpg"),
		new Avatar("avatar010", "/assets/avatar010.jpg"),
		new Avatar("avatar011", "/assets/avatar011.jpg"),
		new Avatar("avatar012", "/assets/avatar012.jpg"),
		new Avatar("avatar013", "/assets/avatar013.jpg"),
		new Avatar("avatar014", "/assets/avatar014.jpg"),
		new Avatar("avatar015", "/assets/avatar015.jpg"),
		new Avatar("avatar016", "/assets/avatar016.jpg"),
		new Avatar("avatar017", "/assets/avatar017.jpg"),
		new Avatar("avatar018", "/assets/avatar018.jpg"),
		new Avatar("avatar019", "/assets/avatar019.jpg"),
		new Avatar("avatar020", "/assets/avatar020.jpg"),
		new Avatar("avatar021", "/assets/avatar021.jpg"),
		new Avatar("avatar022", "/assets/avatar022.jpg"),
		new Avatar("avatar023", "/assets/avatar023.jpg"),
		new Avatar("avatar024", "/assets/avatar024.jpg"),
		new Avatar("avatar025", "/assets/avatar025.jpg"),
		new Avatar("avatar026", "/assets/avatar026.jpg"),
		new Avatar("avatar027", "/assets/avatar027.jpg"),
		new Avatar("avatar028", "/assets/avatar028.jpg"),
		new Avatar("avatar029", "/assets/avatar029.jpg"),
		new Avatar("avatar030", "/assets/avatar030.jpg"),
		new Avatar("avatar031", "/assets/avatar031.jpg"),
	]);
	god: User | null = null;
	status: "START" | "GOD" | "USER" = new URLSearchParams(
		window.location.search
	).get("page") as any;
	rooms!: Room[] | null;
	currentRoom: GameRoom | null = null;

	setMe = (me: User) => {
		this.me = me;
	};

	setState: (state: GameState) => void;

	constructor(setState: any) {
		this.setState = setState;
	}

	start = () => {
		if (this.currentRoom)
			socket.on(
				`update_${this.currentRoom.roomData.id}`,
				(update: string) => {
					eval(update);
					this.userSave();
					this.setState(this);
				}
			);
	};

	setSearchParams = (name: string, value: string | null) => {
		const searsh = new URLSearchParams(window.location.search);
		if (value) searsh.set(name, value);
		else searsh.delete(name);
		history.pushState(
			null,
			"",
			window.location.pathname + "?" + searsh.toString()
		);
	};

	getSearchParams = (
		paramNames: string[] = ["roomId", "userName", "avatarName"]
	) => {
		const search = new URLSearchParams(window.location.search);
		const params: any = {};
		paramNames.forEach((key: string) => {
			params[key] = search.get(key);
		});
		return params;
	};

	setRooms = (rooms: Room[]) => {
		this.rooms = rooms;
		this.setState(this);
	};

	setCurrentRoom = (roomData: Room, god: User | null) => {
		this.currentRoom = new GameRoom(roomData, god);
		this.god = god;
		this.setState(this);
	};

	updateCurrentRoom = (room: GameRoom) => {
		this.currentRoom = { ...this.currentRoom, ...room };
	};

	setStatus = (status: "START" | "GOD" | "USER") => {
		this.status = status;
		this.setState(this);
	};

	dispatch = (
		action: any,
		socketUpdate: string = "",
		updateValue: any = null
	) => {
		this.setState(this);
		if (this.currentRoom)
			socket.emit(
				"update",
				this.currentRoom.roomData.id,
				socketUpdate,
				updateValue
			);
		return action;
	};

	// current room //
	getAllVotesLength = () => {
		let len = 0;
		if (this.currentRoom) {
			this.currentRoom.users.forEach((user) => {
				len += user.votes.length;
			});
		}
		return len;
	};

	resetAllVotes = () => {
		if (this.currentRoom) {
			this.currentRoom.users.forEach((user) => {
				user.votes = [];
			});
		}
	};

	setUserVote = () => {
		if (this.currentRoom)
			this.currentRoom.vote = this.currentRoom.usersSelected[0];
	};

	vibrate = () => {
		if (this.currentRoom) {
			this.currentRoom.usersSelected.forEach((user) => {
				if (user.id === this.me?.id && this.currentRoom)
					window.navigator.vibrate([500, 500, 500]);
			});
		}
	};

	uploadMuzic = (path: string) => {
		if (this.currentRoom) {
			this.currentRoom.usersSelected.forEach((user) => {
				if (
					user.id === this.me?.id ||
					this.me?.id === this.currentRoom?.god?.id
				)
					user.muzic = new Muzic(
						path.split("/").pop() as string,
						serverURL + path
					);
			});
		}
	};

	muzicPlay = (userPlaySeconds: number) => {
		const play = setInterval(() => {
			const date = new Date();
			const seconds = date.getSeconds();
			if (userPlaySeconds === seconds) {
				if (this.currentRoom) {
					this.currentRoom.usersSelected.forEach((user) => {
						if (
							user.id === this.me?.id &&
							user.muzic &&
							!user.muzic.isPlayed &&
							user.muzic.element
						) {
							user.muzic.element.play();
							user.muzic.isPlayed = true;
						}
					});
				}
				clearInterval(play);
			}
		}, 100)
	};

	muzicPause = () => {
		if (this.currentRoom) {
			this.currentRoom.usersSelected.forEach((user) => {
				if (
					user.id === this.me?.id &&
					user.muzic &&
					user.muzic.isPlayed &&
					user.muzic.element
				) {
					user.muzic.element.pause();
					user.muzic.element.currentTime = 0;
					user.muzic.isPlayed = false;
				}
			});
		}
	};

	setUsersTimer = (time: number) => {
		if (this.currentRoom) {
			this.currentRoom.usersSelected.forEach((user) => {
				user.timer = time;
			});
		}
	};

	addUser = (user: User) => {
		if (this.currentRoom) {
			let userFind = this.currentRoom.users.find((u) => u.id === user.id);
			if (userFind) userFind = user;
			else this.currentRoom.users.unshift(user);
		}
	};

	deleteUserById = (id: string) => {
		if (this.currentRoom)
			this.currentRoom.users = this.currentRoom.users.filter(
				(u) => u.id !== id
			);
	};

	selectUser = (id: string) => {
		if (this.currentRoom) {
			const user = this.currentRoom.users.find((u) => u.id === id);
			if (user)
				if (
					!this.currentRoom.usersSelected.some(
						(u) => u.id === user.id
					)
				)
					this.currentRoom.usersSelected.unshift(user);
		}
	};

	unSelectUser = (id: string, all: boolean = false) => {
		if (this.currentRoom && !all) {
			if (this.currentRoom.usersSelected.some((u) => u.id === id))
				this.currentRoom.usersSelected =
					this.currentRoom.usersSelected.filter((u) => u.id !== id);
			if (this.currentRoom.usersSelected.length === 0)
				this.currentRoom.vote = null;
		} else {
			if (this.currentRoom) {
				this.currentRoom.usersSelected = [];
				if (this.currentRoom.usersSelected.length === 0)
					this.currentRoom.vote = null;
			}
		}
	};

	addStory = (description: string) => {
		if (this.currentRoom)
			this.currentRoom.stories.unshift(
				new Story(
					this.currentRoom.usersSelected.map((user) => ({ ...user })),
					description
				)
			);
	};

	// User //
	setUserIsOnline = (userId: string, value: boolean) => {
		const user = this.getUserById(userId);
		if (user) user.isOnline = value;
	};

	userSave = () => {
		if (this.me) {
			const userFind = this.getUserById(this.me.id);
			if (userFind)
				window.localStorage.setItem("user", JSON.stringify(userFind));
		}
	};

	userReset = () => {
		if (this.me) {
			window.localStorage.setItem(
				"user",
				JSON.stringify(new User(this.me.id, ""))
			);
		}
	};

	getUserById = (id: string) => {
		if (this.currentRoom)
			return this.currentRoom.users.find((user) => user.id === id);
		return null;
	};

	vote = (userId: string) => {
		if (
			this.currentRoom &&
			this.currentRoom.vote &&
			!this.currentRoom.vote.votes.find((v) => v === userId)
		) {
			this.currentRoom.vote.votes.push(userId);
		}
	};

	userSetIsActiveById = (userId: string, value: boolean) => {
		if (this.currentRoom) {
			const user = this.currentRoom.users.find((u) => u.id === userId);
			if (user) user.isActive = value;
		}
	};

	userSetRoleById = (userId: string, role: string) => {
		if (this.currentRoom) {
			const user = this.currentRoom.users.find((u) => u.id === userId);
			if (user) user.role = role;
		}
	};
}

