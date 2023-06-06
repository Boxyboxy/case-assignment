require("express-async-errors");
const express = require("express");

const usersRouter = require("./usersRouter");
const tasksRouter = require("./tasksRouter");
const appRouter = express.Router();
appRouter.use("/users", usersRouter);
appRouter.use("/tasks", tasksRouter);
module.exports = appRouter;
