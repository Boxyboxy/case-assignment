const cors = require("cors");
const { requestLogger } = require("./logger");

module.exports = {
  initializeMiddleware: (app) => {
    app.use(cors());
    app.use(requestLogger);
  },
  ...require("./errorHandler"),
};
