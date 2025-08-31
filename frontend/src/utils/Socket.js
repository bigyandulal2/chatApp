import {io} from "socket.io-client"
export const socket = io("http://localhost:5000", {
  autoConnect: true,
  transports: ["websocket"],
});
//testing for only
export function registerUsername(username) {
  socket.emit("register", { username });
}