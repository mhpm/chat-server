const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const path = require("path")
const formatMessage = require("./utils/messages")

const app = express()
const PORT = process.env.PORT || 3000
const server = http.createServer(app)
const io = socketio(server)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/routes/index.html"))
})

// Run when client connects
io.on("connection", (socket) => {
  // Message for all the clients
  socket.emit("welcome", "Welcome to Chat")

  // Runs when client disconnect
  socket.on("disconnect", () => {
    io.emit("welcome", "A user has left the chat")
  })

  // Listen for chatMessage
  socket.on("chatMessage", (user, msg) => {
    io.emit("message", formatMessage(user, msg))
  })

  socket.on("PORT", () => {
    io.emit("getPort", PORT)
  })
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
