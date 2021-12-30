const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const validator = require("validator");

const Requests = require("../utils/Requests");
const User = require("../users/userModel");
const throwError = require("../utils/throwError");

class ChangeController {
  constructor() {
    this.User = User;
    this.throwError = throwError;
  }

  async #token(req, res) {
    try {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else {
        Requests.failRequest = 1;
        return this.throwError("No token", 401, res);
      }

      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      return decoded;
    } catch (error) {
      Requests.failRequest = 1;
      return this.throwError(error.message, 400, res);
    }
  }

  #reply(res, data) {
    Requests.succesRequest = 1;
    res.status(200).json({
      status: "ok",
      changed: data,
    });
  }

  async #change(req, res, type) {
    try {
      const decoded = await this.#token(req, res);
      if (!decoded) return;

      const user = await this.User.findById(decoded.id);
      user[`${type}`] = req.body[`${type}`];
      await user.save({ validateBeforeSave: false, new: true });

      this.#reply(res, user[`${type}`]);
    } catch (error) {
      Requests.failRequest = 1;
      return this.throwError(error.message, 400, res);
    }
  }

  energyprice(req, res) {
    if (!req.body.energyprice) {
      Requests.failRequest = 1;
      return this.throwError("No energyprice", 400, res);
    }
    this.#change(req, res, "energyprice");
  }

  email(req, res) {
    if (!req.body.email) {
      Requests.failRequest = 1;
      return this.throwError("No Email", 400, res);
    }

    if (!validator.isEmail(req.body.email)) {
      Requests.failRequest = 1;
      return this.throwError("Not an Email", 400, res);
    }
    this.#change(req, res, "email");
  }

  postalcode(req, res) {
    if (!req.body.postalcode) {
      Requests.failRequest = 1;
      return this.throwError(`No Postal Code`, 400, res);
    }

    if (!validator.isPostalCode(req.body.postalcode, "NL")) {
      Requests.failRequest = 1;
      return this.throwError("Not an postalcode", 400, res);
    }
    this.#change(req, res, "postalcode");
  }

  async deleteaccount(req, res) {
    try {
      const decoded = await this.#token(req, res);
      if (!decoded) return;
      await this.User.findByIdAndDelete(decoded.id);

      this.#reply(res, "deleted");
    } catch (error) {
      Requests.failRequest = 1;
      return this.throwError(error.message, 400, res);
    }
  }

  async deletedevice(req, res) {
    try {
      if (!req.body.id) {
        Requests.failRequest = 1;
        return this.throwError(`No ID`, 400, res);
      }
      const decoded = await this.#token(req, res);
      if (!decoded) return;
      const user = await this.User.findById(decoded.id);

      const result = user.devices.find((device) => device.id === req.body.id);
      if (!result) {
        Requests.failRequest = 1;
        return this.throwError("no device matches this id", 400, res);
      }
      const newdevices = user.devices.filter(
        (device) => device.id !== req.body.id
      );

      user.devices = newdevices;

      await user.save({ validateBeforeSave: false, new: true });
      this.#reply(res, result);
    } catch (error) {
      Requests.failRequest = 1;
      return this.throwError(error.message, 400, res);
    }
  }
}

module.exports = ChangeController;
