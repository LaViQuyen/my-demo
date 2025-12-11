const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");
const server = express();
const path = require("path");
const fs = require("fs");
require("dotenv").config();

server.use(express.static(`${__dirname}/dist/browser`));
server.use(cors({ origin: "*" }));
server.use(express.json());
server.use("/upload", express.static(`${__dirname}/upload`));

// Routers
const router = jsonServer.router("db.json");
const systemRouter = require('./routes/system.router')
const emailRouter = require("./routes/mail.router");
const fileRouter = require("./routes/file.router");
const quizRouter = require("./routes/quiz.router");

server.use("/api/system", systemRouter);
server.use("/api/file", fileRouter);
server.use("/api/mail", emailRouter);
server.use("/api/quizz", quizRouter);
server.use("/api/system", systemRouter);
server.use("/api", router);
const dbPath = "db.json";
fs.watchFile(dbPath, (curr, prev) => {
  console.log("db.json file changed. Reloading database...");
  router.db.read();
});

server.get("*", function (req, res) {
  res.sendFile(__dirname + "/dist/browser/index.html");
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
