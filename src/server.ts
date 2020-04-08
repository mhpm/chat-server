import express, {Application, Request, Response, NextFunction} from "express"
import http from "http";
import socketio from "socket.io";
//import path from "path";
import formatMessage from "./utils/messages"

const app:Application = express()
const PORT:string | number = process.env.PORT || 4001
const server:any = http.createServer(app)
const io:any = socketio(server)

app.get(process.env.NODE_ENV === "production" ? "/chat-server" : "/", (req: Request, res: Response, next: NextFunction) => {
  //res.sendFile(path.join(__dirname + "/routes/index.html"));
  res.send(JSON.stringify({ Hello: 'Server Lives!'}));
});

// Run when client connects
io.on("connection", (socket:any) => {
  // Message for all the clients
  socket.emit("welcome", "Welcome to Chat")

  // Runs when client disconnect
  socket.on("disconnect", () => {
    io.emit("welcome", "A user has left the chat")
  })

  // Listen for chatMessage
  socket.on("chatMessage", (user:any, msg:string) => {
    io.emit("message", formatMessage(user, msg))
  })

  socket.on("PORT", () => {    
    io.emit("getPort", PORT)
  })
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
