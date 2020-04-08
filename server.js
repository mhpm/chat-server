"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
//import path from "path";
const messages_1 = __importDefault(require("./utils/messages"));
const app = express_1.default();
const PORT = process.env.PORT || 4001;
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
app.get(process.env.NODE_ENV === "production" ? "/chat-server" : "/", (req, res, next) => {
    //res.sendFile(path.join(__dirname + "/routes/index.html"));
    res.send(JSON.stringify({ Hello: 'Server Lives!' }));
});
// Run when client connects
io.on("connection", (socket) => {
    // Message for all the clients
    socket.emit("welcome", "Welcome to Chat");
    // Runs when client disconnect
    socket.on("disconnect", () => {
        io.emit("welcome", "A user has left the chat");
    });
    // Listen for chatMessage
    socket.on("chatMessage", (user, msg) => {
        io.emit("message", messages_1.default(user, msg));
    });
    socket.on("PORT", () => {
        io.emit("getPort", PORT);
    });
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
