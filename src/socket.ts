import { io } from "socket.io-client";
import { serverURL } from "./config";

const socket = io(serverURL);

export default socket;