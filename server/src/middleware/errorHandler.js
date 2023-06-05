module.exports = {
  errorHandler: (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;
    res.status(status).json({ error: message });
  },
};
