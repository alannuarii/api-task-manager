class Response {
  success(statusCode, data, message, res) {
    res.json(statusCode, [
      {
        payload: {
          data,
          message,
        },
      },
    ]);
  }
}

module.exports = Response;
