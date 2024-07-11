const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const bodyParser = require("body-parser");
const db = require("./models/index");
const errorHandler = require("./middleware/errorHandler");
const routerAuth = require("./routers/auth");
const { swaggerUi, specs } = require("./configs/swaggerConfig");

require("dotenv").config();

db.sequelize.sync();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.set("socketio", io);

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(cors({ origin: "*" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Worapakorn Jarusiriphot application." });
});

app.use("/api/auth", routerAuth);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(`Visit the application at: http://localhost:${PORT}`);
  console.log(
    `API documentation is available at: http://localhost:${PORT}/api-docs`
  );
  console.log(
    `Swagger JSON is available at: http://localhost:${PORT}/swagger.json`
  );
});
