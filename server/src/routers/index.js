require("express-async-errors");
const express = require("express");

const usersRouter = require("./usersRouter");
const appRouter = express.Router();
appRouter.use("/users", usersRouter);
module.exports = appRouter;
