const express = require("express");
const path = require("path");

const router = express.Router();

const raspberry = require("./raspberry");
const authController = require("./users/authController");
const resetController = require("./resetController");

router
  .route("/signup")
  .post(authController.signup)
  .get((req, res) => res.send("Please send a post request"));

router
  .route("/login")
  .post(authController.login)
  .get((req, res) => res.send("Please send a post request!"));

router
  .route("/adddevice")
  .post(authController.adddevice)
  .get((req, res) => res.send("Please send a post request!"));

router.route("/getuserdata").get(raspberry.getUserData);

router
  .route("/forgotpassword")
  .post(resetController.sendReset)
  .get((req, res) => res.send("Please send a post request!"));
router
  .route("/resetpassword")
  .post(resetController.resetToken)
  .get((req, res) => res.send("Please send a post request!"));

router
  .route("/adddata")
  .post(raspberry.addData)
  .get((req, res) => res.send("Please send a post request?"));

router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/api-info/index.html"))
);

router
  .route("/changeprice")
  .patch(authController.changeprice)
  .get((req, res) => res.send("Please send a patch request"));

router
  .route("/relaypower")
  .post(raspberry.relaypower)
  .get((req, res) => res.send("Please send a post request"));

module.exports = router;
