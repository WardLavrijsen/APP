const express = require("express");
const Requests = require("./Requests");

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json(Requests.values());
});

router.route("/requests").get((req, res) => {
  res.status(200).json(Requests.requests);
});

router.route("/instance").get((req, res) => {
  res.status(200).json(Requests.instance);
});

module.exports = router;
