const app = require("./app");
const { connectDB } = require("./config/database");
const cloudinary = require("cloudinary");

connectDB();
const port = process.env.PORT || 4000;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = require("socket.io")(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "https://chat-front-chi.vercel.app",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join-user", (userId) => {
    socket.emit("me", "Welcome to Chat App - " + userId);
  });

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log("User Joined Room: " + roomId);
  });

  socket.on("new message", (data) => {
    // send send to all users in the room
    socket.to(data.room).emit("received", data);
  });
});
