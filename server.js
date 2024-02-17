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
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  let userId = "";
  
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
    userId = userData._id;
  });

  socket.on("join room chat", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("new message", (data) => {
    const chat_room = data.room;
    const sendData = data.data;

    chat_room.users.forEach((user) => {
      if (user._id != data.data.user._id) {
        socket.in(user._id).emit("received", sendData);
      }
    });
  });
});
