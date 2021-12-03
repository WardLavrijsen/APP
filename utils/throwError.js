const throwError = (error, statuscode, res) => {
  console.log(error);
  res.status(statuscode).json({
    status: "fail PMU",
    error,
  });
};

module.exports = throwError;
