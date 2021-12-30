const Requests = require("./Requests");

const throwError = (error, statuscode, res) => {
  console.log(error);
  Requests.failRequest = 1;
  res.status(statuscode).json({
    status: "fail PMU",
    error,
  });
};

module.exports = throwError;
