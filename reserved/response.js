class Response {
  success(statusCode, data, message, res) {
    res.json(statusCode, [
      {
        statusCode,
        status: "Success",
        payload: {
          data,
          message,
        },
      },
    ]);
  }

  error(statusCode, message, res) {
    res.json(statusCode, [
      {
        statusCode,
        status: "Error",
        payload: {
          data: "No data",
          message,
        },
      },
    ]);
  }
}

module.exports = Response;
