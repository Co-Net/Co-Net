const mongoose = require("mongoose"),
  express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  logger = require("morgan"),
  cookieParser = require("cookie-parser"),
  axios = require("axios"),
  passport = require("passport");
require("dotenv").config();
require("./api/auth/auth");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
var connectedUsers = {};
var timeouts = {};
io.on("connection", function (socket) {
  // console.log("Client connected");
  socket.emit("connected");
  socket.on("login", (username, inParty, status) => {
    connectedUsers[socket.id] = username;
    // If user refreshed, set to false to prevent timeout
    if (timeouts[username]) {
      // console.log(`${username} refreshed`);
      timeouts[username] = false;
    } else {
      var setStatus = "";
      if (status === "Invisible") {
        setStatus = "Invisible";
      } else if (inParty) {
        setStatus = "In-Game";
      } else if (status === "Away") {
        setStatus = "Away";
      } else {
        setStatus = "Active";
      }
      // If timeout for id doesnt exist, user was timedout and is trying to reconnect or is first time joining
      axios
        .put(`http://localhost:3001/users/${username}`, {
          status: setStatus
        })
        .then(() => {
          // console.log("logged in as " + username);
          timeouts[username] = false;
        });
    }
  });

  socket.on("disconnect", function () {
    const disconnectedUsername = connectedUsers[socket.id];
    timeouts[disconnectedUsername] = true;
    // console.log(`Client ${disconnectedUsername} disconnected`);
    setTimeout(function () {
      if (timeouts[disconnectedUsername] == true) {
        axios
          .put(`http://localhost:3001/users/${disconnectedUsername}`, {
            status: "Offline",
          })
          .then(() => {
            console.log(`Client ${disconnectedUsername} timedout`);
            delete connectedUsers[socket.id];
            delete timeouts[disconnectedUsername];
          });
      }
    }, 10000); // 10 second till timeout
  });
});

app.use(
  cors({
    credentials: true,
    origin: `http://localhost:3000`,
  })
);
app.use(cookieParser(process.env.JWT_SECRET));

// Routers
const userRouter = require("./api/routes/userRouter");
const userTagRouter = require("./api/routes/userTagRouter");
const gameRouter = require("./api/routes/gameRouter");
const forumRouter = require("./api/routes/forumPostRouter");
const secureRouter = require("./api/routes/secureRouter");
const steamRouter = require("./api/routes/steamRouter");
const gameTagRouter = require("./api/routes/gameTagRouter");
const messageThreadRouter = require("./api/routes/messageThreadRouter");
const partyRouter = require("./api/routes/partyRouter");
// this is our MongoDB database
const dbRoute = `mongodb+srv://${process.env.DB_CREDENTIALS}@cluster0-8hzh3.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once("open", () => console.log("Connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// Routes
app.use("/users", userRouter);
app.use("/userTags", userTagRouter);
app.use("/games", gameRouter);
app.use("/forum", forumRouter);
app.use(
  "/user",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/users/guest",
  }),
  secureRouter
);
app.use("/auth", steamRouter);
app.use("/messageThread", messageThreadRouter);
app.use("/party", partyRouter);
// launch our backend into a port
server.listen(process.env.PORT, () =>
  console.log(`CO-NET LISTENING ON PORT ${process.env.PORT}`)
);
