const express = require("express");
const path = require("path");

const router = express.Router();

const fs = require("fs");

const jsonread = fs.readFileSync("./test.json");
const jsondata = JSON.parse(jsonread);

router.route("/");

router
  .route("/")
  .get((req, res) =>
    res.sendFile(path.join(__dirname, "public/home/index.html"))
  );

router
  .route("/login")
  .get((req, res) =>
    res.sendFile(path.join(__dirname, "public/auth//login/index.html"))
  );

router
  .route("/resetpassword/")
  .get((req, res) =>
    res.sendFile(path.join(__dirname, "public/auth/resetauth/index.html"))
  );

router
  .route("/signup")
  .get((req, res) =>
    res.sendFile(path.join(__dirname, "public/auth/signup/index.html"))
  );

router
  .route("/forgotpassword")
  .get((req, res) =>
    res.sendFile(path.join(__dirname, "public/auth/forgotpassword/index.html"))
  );

router
  .route("/about")
  .get((req, res) =>
    res.sendFile(path.join(__dirname, "public/aboutUs/index.html"))
  );

router
  .route("/dashboard")
  .get((req, res) =>
    res.sendFile(path.join(__dirname, "public/dashboard/index.html"))
  );

router.route("/testdata").get((req, res) => res.status(200).json(jsondata));

module.exports = router;
