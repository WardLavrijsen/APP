const express = require("express");
const ChangeController = require("./ChangeController");

const router = express.Router();
const controller = new ChangeController();

router
  .route("/energyprice")
  .patch(controller.energyprice.bind(controller))
  .get((req, res) => res.send("Please send a PATCH request"));

router
  .route("/email")
  .patch(controller.email.bind(controller))
  .get((req, res) => res.send("Please send a PATCH request"));

router
  .route("/postalcode")
  .patch(controller.postalcode.bind(controller))
  .get((req, res) => res.send("Please send a PATCH request"));

router
  .route("/deleteaccount")
  .delete(controller.deleteaccount.bind(controller))
  .get((req, res) => res.send("Please send a DELETE request"));

router
  .route("/deletedevice")
  .delete(controller.deletedevice.bind(controller))
  .get((req, res) => res.send("Please send a DELETE request"));

module.exports = router;
