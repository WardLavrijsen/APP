const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const throwError = require("./utils/throwError");
const User = require("./users/userModel");

class Raspberry {
  async addData(req, res) {
    try {
      if (!req.body.id) {
        return throwError("Please specify an ID", 400, res);
      }
      if (!req.body.power) {
        return throwError("Please specify a power level", 400, res);
      }

      if (
        req.body.id.split(":")[0] !== "pmu" ||
        req.body.id.split(":")[2] !== "pmu"
      ) {
        return throwError("Not an valid ID!", 400, res);
      }

      const { id, power } = req.body;

      const user = await User.findOne({ devices: { $elemMatch: { id } } });

      if (!user) {
        return throwError("Not Activated", 404, res);
      }

      const index = user.devices.findIndex((device) => device.id === id);

      if (index === -1) {
        return throwError("device doesn't exsists", 404, res);
      }

      if (user.devices[index].archive.length > 200) {
        user.devices[index].archive.split();
      }

      user.devices[index].archive.push({ date: new Date(), power });
      user.markModified("devices");
      await user.save({ validateBeforeSave: false, new: true });

      res.status(200).json({
        status: "ok",
        dataAdded: {
          id,
          power,
        },
      });
    } catch (error) {
      throwError(error.message, 400, res);
    }
  }

  async getUserData(req, res) {
    try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else {
        return throwError("No token", 401, res);
      }

      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);

      if (!currentUser) return throwError("User doesn't exsists", 401, res);

      res.status(200).json({
        status: "ok",
        data: {
          user: currentUser,
        },
      });
    } catch (err) {
      throwError(err.message, 400, res);
    }
  }

  async relaypower(req, res) {
    try {
      if (!req.body.id) {
        return throwError("Please specify an ID", 400, res);
      }
      if (
        req.body.id.split(":")[0] !== "pmu" ||
        req.body.id.split(":")[2] !== "pmu"
      ) {
        return throwError("Not an valid ID!", 400, res);
      }

      const { id } = req.body;
      const user = await User.findOne({ devices: { $elemMatch: { id } } });

      if (!user) {
        return throwError("Not Activated", 404, res);
      }

      const index = user.devices.findIndex((device) => device.id === id);

      res.status(200).json({
        status: "ok",
        powerstatus: user.devices[index].relaypower,
      });
    } catch (err) {
      throwError(err.message, 400, res);
    }
  }
}

module.exports = new Raspberry();
