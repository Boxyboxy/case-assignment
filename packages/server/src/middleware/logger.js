const { format } = require("date-fns");
module.exports = {
  requestLogger: (req, res, next) => {
    const startTime = Date.now();

    res.on("finish", () => {
      const endDate = new Date();
      console.log(
        `[${format(endDate, "dd/MM/yyy - HH:mm:ss")}] ${
          endDate.getTime() - startTime
        }ms - ${req.method} (${res.statusCode}) ${req.originalUrl}`
      );
    });

    next();
  },
};
