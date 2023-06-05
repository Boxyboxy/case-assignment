const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./configs");
const { initializeMiddleware, errorHandler } = require("./middleware");

const appRouter = require("./routers");
const app = express();

initializeMiddleware(app);
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf;
    },
  })
);

app.use("/", appRouter);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
