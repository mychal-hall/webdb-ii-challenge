const express = require("express");
const helmet = require("helmet");

// Importing zoosRouter as Zoosrouter.
const ZoosRouter = require("./zoos/zoosRouter.js");

const server = express();

server.use(express.json());
server.use(helmet());

// Using zoosRouter have the server set default path to /api/zoos
server.use("/api/zoos", ZoosRouter);

// API is online notification.
server.get("/", (req, res) => {
  res.send(`<h1>API is online.</h1>`);
});

// Exporting server
module.exports = server;
