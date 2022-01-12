const express = require("express");
const path = require("path");

const router = express.Router();

const raspberry = require("./raspberry");
const authController = require("./users/authController");
const resetController = require("./resetController");

router
  .route("/signup")
  .post(authController.signup.bind(authController))
  .get((req, res) => res.send("Please send a post request"));

router
  .route("/login")
  .post(authController.login.bind(authController))
  .get((req, res) => res.send("Please send a post request!"));

router
  .route("/adddevice")
  .post(authController.adddevice.bind(authController))
  .get((req, res) => res.send("Please send a post request!"));

router.route("/getuserdata").get(raspberry.getUserData);

router
  .route("/forgotpassword")
  .post(resetController.sendReset.bind(authController))
  .get((req, res) => res.send("Please send a post request!"));
router
  .route("/resetpassword")
  .post(resetController.resetToken.bind(authController))
  .get((req, res) => res.send("Please send a post request!"));

router
  .route("/adddata")
  .post(raspberry.addData.bind(raspberry))
  .get((req, res) => res.send("Please send a post request?"));

router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/api-info/index.html"))
);

router.route("/relaypower").get(raspberry.relaypower.bind(raspberry));

router
  .route("/setpower")
  .post(raspberry.setpower.bind(raspberry))
  .get((req, res) => res.send("Please send a post request?"));

module.exports = router;
